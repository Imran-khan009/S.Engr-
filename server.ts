import express from 'express';
import path from 'path';
import crypto from 'crypto';
import helmet from 'helmet';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import {
  getDatabase,
  getSiteDataAsync,
  addLeadAsync,
  updateLeadStatusAsync,
  deleteLeadAsync,
  addContactMessageAsync,
  updateServiceAsync,
  updateProjectAsync,
  updateSettingsAsync,
  resetToDefaults,
  saveDatabase,
  addCustomWebsiteRequestAsync,
  updateCustomWebsiteRequestStatusAsync,
  deleteCustomWebsiteRequestAsync,
  addTeachingRequestAsync,
  updateTeachingRequestStatusAsync,
  deleteTeachingRequestAsync,
  saveTeachingServiceAsync,
  deleteTeachingServiceAsync,
  updateTeachingConsultationAsync
} from './server/db';
import {
  getServerSupabase,
  verifySupabaseToken,
  syncDatabaseToSupabase
} from './server/supabase';
import {
  sanitizeText,
  stripHtml,
  validateEmail,
  sanitizePhone,
  sanitizeStringArray
} from './server/sanitize';
import { LeadStatus, CustomRequestStatus, TeachingRequestStatus } from './src/types';

// ==============================================================================
// RATE LIMITING & BRUTE-FORCE PROTECTION
// ==============================================================================
interface RateLimitEntry {
  count: number;
  resetAt: number;
  blockedUntil?: number;
}

const loginAttempts = new Map<string, RateLimitEntry>();
const submissionLimits = new Map<string, RateLimitEntry>();

function checkRateLimit(
  map: Map<string, RateLimitEntry>,
  key: string,
  maxAttempts: number,
  windowMs: number,
  blockDurationMs: number = 0
): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const entry = map.get(key);

  if (entry?.blockedUntil && now < entry.blockedUntil) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.blockedUntil - now) / 1000)
    };
  }

  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > maxAttempts) {
    if (blockDurationMs > 0) {
      entry.blockedUntil = now + blockDurationMs;
      return {
        allowed: false,
        retryAfterSeconds: Math.ceil(blockDurationMs / 1000)
      };
    }
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000)
    };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

// Clean up stale rate limits every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [k, v] of loginAttempts.entries()) {
    if (now > v.resetAt && (!v.blockedUntil || now > v.blockedUntil)) {
      loginAttempts.delete(k);
    }
  }
  for (const [k, v] of submissionLimits.entries()) {
    if (now > v.resetAt) {
      submissionLimits.delete(k);
    }
  }
}, 10 * 60 * 1000);

// ==============================================================================
// SESSION STORE & SECURE TOKEN MANAGEMENT
// ==============================================================================
interface AdminSession {
  token: string;
  createdAt: number;
  expiresAt: number;
  userId?: string;
  email?: string;
  authMethod: 'supabase' | 'secure_passkey';
}

// 24-hour admin session expiry
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const activeSessions = new Map<string, AdminSession>();

function createSession(authMethod: 'supabase' | 'secure_passkey', userId?: string, email?: string): string {
  const token = `adm_${crypto.randomBytes(32).toString('hex')}`;
  const now = Date.now();
  activeSessions.set(token, {
    token,
    createdAt: now,
    expiresAt: now + SESSION_TTL_MS,
    userId,
    email,
    authMethod
  });
  return token;
}

function removeSession(token: string): boolean {
  return activeSessions.delete(token);
}

// ==============================================================================
// AUTHENTICATION MIDDLEWARE
// Primary: Stateless Supabase Auth JWT Verification (Scales across Cloud Run instances)
// Fallback: In-memory session tokens for single-instance passkey fallback
// ==============================================================================
async function adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.substring(7).trim();
  const now = Date.now();

  // 1. Primary: Verify stateless Supabase Auth JWT token (stateless & multi-instance ready)
  const supaUser = await verifySupabaseToken(token);
  if (supaUser) {
    (req as any).adminUser = supaUser;
    return next();
  }

  // 2. Fallback: Check local session map (for fallback passkey sessions)
  const session = activeSessions.get(token);
  if (session) {
    if (now > session.expiresAt) {
      activeSessions.delete(token);
      res.status(401).json({ error: 'Unauthorized: Admin session expired. Please sign in again.' });
      return;
    }
    // Refresh expiration on activity
    session.expiresAt = now + SESSION_TTL_MS;
    return next();
  }

  res.status(401).json({ error: 'Unauthorized: Invalid or expired admin credentials' });
}

// Helper to test if a request has admin privileges without failing
async function checkIsAdmin(req: express.Request): Promise<boolean> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

  const token = authHeader.substring(7).trim();

  // 1. Primary stateless Supabase check
  const supaUser = await verifySupabaseToken(token);
  if (supaUser) return true;

  // 2. In-memory session check
  const session = activeSessions.get(token);
  if (session && Date.now() <= session.expiresAt) {
    return true;
  }

  return false;
}

// ==============================================================================
// FILE VALIDATION HELPERS
// Metadata-only validation for attachments uploaded directly to Supabase Storage
// ==============================================================================
const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'image/jpeg',
  'image/png',
  'image/webp'
]);

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB limit

function validateFile(
  fileName?: string,
  fileType?: string,
  fileSize?: number | string
): { valid: boolean; error?: string } {
  if (!fileName) return { valid: true };

  // Sanitize filename and prevent directory traversal
  const sanitized = path.basename(fileName);
  if (sanitized.length > 200) {
    return { valid: false, error: 'File name exceeds 200 characters' };
  }

  if (fileType && !ALLOWED_MIME_TYPES.has(fileType.toLowerCase())) {
    // If mime type is unknown or generic octet-stream, verify file extension
    const ext = path.extname(sanitized).toLowerCase();
    const allowedExts = ['.pdf', '.doc', '.docx', '.ppt', '.pptx', '.xls', '.xlsx', '.txt', '.png', '.jpg', '.jpeg', '.webp'];
    if (!allowedExts.includes(ext)) {
      return {
        valid: false,
        error: `File format ${ext} is not supported. Please upload PDF, Word, PowerPoint, Excel, TXT, or standard image files.`
      };
    }
  }

  if (typeof fileSize === 'number' && fileSize > MAX_FILE_SIZE_BYTES) {
    return { valid: false, error: 'File size exceeds 10MB maximum limit' };
  }

  return { valid: true };
}

// ==============================================================================
// SERVER INITIALIZATION
// ==============================================================================
async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Security Headers via Helmet
  app.use(helmet({
    contentSecurityPolicy: false, // Managed by Vite build & framework assets
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    frameguard: false, // Disabled to allow Google AI Studio preview iframe rendering
    hsts: process.env.NODE_ENV === 'production' ? {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    } : false,
    xContentTypeOptions: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
    dnsPrefetchControl: { allow: false }
  }));

  // 2. CORS Hardening
  const allowedOrigins = [
    process.env.APP_URL,
    process.env.VITE_APP_URL,
    'https://ai.studio',
    'https://aistudio.google.com'
  ].filter(Boolean) as string[];

  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl, same-origin navigations)
      if (!origin) return callback(null, true);

      const isCloudRun = /^https:\/\/[a-z0-9-]+\.(?:asia-southeast1|us-central1|europe-west1|[a-z0-9-]+)\.run\.app$/.test(origin);
      const isLocalhost = /^http:\/\/localhost(?::\d+)?$/.test(origin);
      const isAiStudio = origin === 'https://ai.studio' || origin === 'https://aistudio.google.com' || origin.endsWith('.google.com');
      const isAllowedCustom = allowedOrigins.includes(origin);

      if (isCloudRun || isLocalhost || isAiStudio || isAllowedCustom || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  }));

  // 3. Payload Size Protection (1MB threshold against Memory DoS)
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // --- API Routes FIRST ---

  app.get('/api/health', (req, res) => {
    const supabase = getServerSupabase();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      supabaseConfigured: !!supabase
    });
  });

  // Public Site Data (hydrated from Supabase primary or local fallback)
  app.get('/api/site-data', async (req, res) => {
    try {
      const db = await getSiteDataAsync();
      const isAdmin = await checkIsAdmin(req);

      // Omit private passkey and sensitive security data from public response
      const { adminPasskey, ...publicSettings } = db.settings;

      res.json({
        settings: publicSettings,
        services: db.services,
        projects: db.projects,
        experiences: db.experiences,
        education: db.education,
        skillCategories: db.skillCategories,
        socials: db.socials,
        leads: isAdmin ? db.leads : [],
        customRequests: isAdmin ? db.customRequests : [],
        teachingServices: db.teachingServices || [],
        teachingConsultation: db.teachingConsultation,
        teachingProducts: db.teachingProducts || [],
        teachingRequests: isAdmin ? (db.teachingRequests || []) : [],
        stats: {
          servicesCount: db.services.length,
          teachingServicesCount: (db.teachingServices || []).length,
          projectsCount: db.projects.length,
          verifiedRolesCount: db.experiences.length
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch site data', details: err?.message });
    }
  });

  // Get specific service by slug
  app.get('/api/services/:slug', async (req, res) => {
    try {
      const db = await getSiteDataAsync();
      const service = db.services.find(s => s.slug === req.params.slug);
      if (!service) {
        res.status(404).json({ error: 'Service not found' });
        return;
      }
      const relatedProjects = db.projects.filter(p =>
        p.category.toLowerCase().includes(service.category.toLowerCase()) ||
        service.portfolioExamples.some(ex => p.title.toLowerCase().includes(ex.toLowerCase()))
      );
      res.json({ service, relatedProjects });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to get service', details: err?.message });
    }
  });

  // Submit Project Request Lead with Sanitization & Supabase Primary Storage
  app.post('/api/leads', async (req, res) => {
    try {
      const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'client';
      const rateCheck = checkRateLimit(submissionLimits, `sub_${clientIp}`, 10, 60 * 1000);
      if (!rateCheck.allowed) {
        res.status(429).json({
          error: `Too many submissions. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`
        });
        return;
      }

      const {
        fullName,
        email,
        phone,
        whatsapp,
        country,
        serviceRequired,
        projectDescription,
        referenceRequirements,
        budget,
        deadline,
        preferredContactMethod,
        platformPreference,
        fileName,
        fileUrl,
        fileSize,
        fileType
      } = req.body;

      // Sanitization & Validation
      const cleanName = stripHtml(fullName, 100);
      const emailValidation = validateEmail(email);
      const cleanService = stripHtml(serviceRequired, 150);
      const cleanDesc = sanitizeText(projectDescription, 5000);

      if (!cleanName || !emailValidation.valid || !cleanService || !cleanDesc) {
        res.status(400).json({
          error: emailValidation.error || 'Please provide full name, a valid email address, service required, and project description'
        });
        return;
      }

      const fileValidation = validateFile(fileName, fileType, fileSize);
      if (!fileValidation.valid) {
        res.status(400).json({ error: fileValidation.error });
        return;
      }

      const createdLead = await addLeadAsync({
        fullName: cleanName,
        email: emailValidation.normalized,
        phone: sanitizePhone(phone),
        whatsapp: sanitizePhone(whatsapp),
        country: stripHtml(country || 'Not specified', 60),
        serviceRequired: cleanService,
        projectDescription: cleanDesc,
        referenceRequirements: sanitizeText(referenceRequirements || '', 2000),
        budget: stripHtml(budget || 'Negotiable', 60),
        deadline: stripHtml(deadline || 'Flexible', 60),
        preferredContactMethod: stripHtml(preferredContactMethod || 'Email', 40),
        platformPreference: platformPreference === 'Fiverr' || platformPreference === 'Upwork' ? platformPreference : 'Direct',
        fileName: fileName ? stripHtml(fileName, 150) : undefined,
        fileUrl: fileUrl ? sanitizeText(fileUrl, 500) : undefined,
        fileSize: fileSize ? stripHtml(String(fileSize), 50) : undefined,
        fileType: fileType ? stripHtml(String(fileType), 80) : undefined
      });

      res.status(201).json({
        success: true,
        message: 'Your project request has been submitted successfully! Engr. Imran Khan will review your requirements and reach out promptly.',
        lead: createdLead
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit project request', details: err?.message });
    }
  });

  // Submit Custom Website Upgrade Request with Sanitization & Supabase Primary Storage
  app.post('/api/custom-website-requests', async (req, res) => {
    try {
      const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'client';
      const rateCheck = checkRateLimit(submissionLimits, `sub_${clientIp}`, 10, 60 * 1000);
      if (!rateCheck.allowed) {
        res.status(429).json({
          error: `Too many submissions. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`
        });
        return;
      }

      const {
        fullName,
        email,
        whatsapp,
        businessName,
        websiteType,
        requiredServices,
        designPreference,
        requiredFeatures,
        budget,
        deadline,
        additionalRequirements
      } = req.body;

      const cleanName = stripHtml(fullName, 100);
      const emailValidation = validateEmail(email);

      if (!cleanName || !emailValidation.valid) {
        res.status(400).json({ error: emailValidation.error || 'Please provide valid Name and Email.' });
        return;
      }

      const servicesArray = sanitizeStringArray(requiredServices, 20, 100);
      const featuresArray = sanitizeStringArray(requiredFeatures, 30, 100);

      const newRequest = await addCustomWebsiteRequestAsync({
        fullName: cleanName,
        email: emailValidation.normalized,
        whatsapp: sanitizePhone(whatsapp),
        businessName: stripHtml(businessName || '', 120),
        websiteType: stripHtml(websiteType || 'Custom Business Website', 100),
        requiredServices: servicesArray.length > 0 ? servicesArray : ['Modern Web & UI Development'],
        designPreference: stripHtml(designPreference || 'Modern Tech & Minimalist', 100),
        requiredFeatures: featuresArray,
        budget: stripHtml(budget || 'Custom Quote', 60),
        deadline: stripHtml(deadline || 'Flexible', 60),
        additionalRequirements: sanitizeText(additionalRequirements || '', 3000),
        status: 'NEW'
      });

      res.status(201).json({
        success: true,
        message: 'Your custom website requirements have been submitted successfully! Engr. Imran Khan will review your specifications and contact you promptly.',
        request: newRequest
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit custom website request', details: err?.message });
    }
  });

  // Submit General Contact Message
  app.post('/api/contact', async (req, res) => {
    try {
      const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'client';
      const rateCheck = checkRateLimit(submissionLimits, `sub_${clientIp}`, 10, 60 * 1000);
      if (!rateCheck.allowed) {
        res.status(429).json({
          error: `Too many messages. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`
        });
        return;
      }

      const { name, email, subject, message } = req.body;
      const cleanName = stripHtml(name, 100);
      const emailValidation = validateEmail(email);
      const cleanMsg = sanitizeText(message, 3000);

      if (!cleanName || !emailValidation.valid || !cleanMsg) {
        res.status(400).json({
          error: emailValidation.error || 'Name, a valid email address, and a message are required'
        });
        return;
      }

      const newMsg = await addContactMessageAsync({
        name: cleanName,
        email: emailValidation.normalized,
        subject: stripHtml(subject || 'General Inquiry', 150),
        message: cleanMsg
      });

      res.status(201).json({
        success: true,
        message: 'Message sent successfully. Thank you for reaching out!',
        messageId: newMsg.id
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to send message', details: err?.message });
    }
  });

  // Submit Teaching Service Request
  app.post('/api/teaching-requests', async (req, res) => {
    try {
      const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'client';
      const rateCheck = checkRateLimit(submissionLimits, `sub_${clientIp}`, 10, 60 * 1000);
      if (!rateCheck.allowed) {
        res.status(429).json({
          error: `Too many requests. Please wait ${rateCheck.retryAfterSeconds} seconds before trying again.`
        });
        return;
      }

      const {
        fullName,
        email,
        whatsapp,
        country,
        userRole,
        subject,
        studentLevel,
        topic,
        courseOrModule,
        requiredServiceId,
        requiredServiceName,
        numberOfLessons,
        requiredFormat,
        deadline,
        budget,
        additionalRequirements,
        isCustomRequest,
        fileAttachment
      } = req.body;

      const cleanName = stripHtml(fullName, 100);
      const emailValidation = validateEmail(email);

      if (!cleanName || !emailValidation.valid) {
        res.status(400).json({ error: emailValidation.error || 'Please provide Full Name and a valid Email address.' });
        return;
      }

      if (fileAttachment) {
        const fileCheck = validateFile(fileAttachment.fileName, fileAttachment.fileType, fileAttachment.fileSize);
        if (!fileCheck.valid) {
          res.status(400).json({ error: fileCheck.error });
          return;
        }
      }

      const newRequest = await addTeachingRequestAsync({
        fullName: cleanName,
        email: emailValidation.normalized,
        whatsapp: sanitizePhone(whatsapp),
        country: stripHtml(country || 'Pakistan', 60),
        userRole: userRole === 'Student' || userRole === 'Parent' || userRole === 'Institution' ? userRole : 'Teacher',
        subject: stripHtml(subject || 'General / STEM', 100),
        studentLevel: stripHtml(studentLevel || 'Beginner / General', 60),
        topic: stripHtml(topic || 'Custom Subject Matter', 150),
        courseOrModule: stripHtml(courseOrModule || '', 100),
        requiredServiceId: stripHtml(requiredServiceId || 'ts-custom', 60),
        requiredServiceName: stripHtml(requiredServiceName || (isCustomRequest ? 'Custom Educational Inquiry' : 'Teaching Support'), 150),
        numberOfLessons: stripHtml(numberOfLessons || '1-3 Lessons', 60),
        requiredFormat: stripHtml(requiredFormat || 'Editable Word / Google Docs & PDF', 100),
        deadline: stripHtml(deadline || 'Flexible', 60),
        budget: stripHtml(budget || 'Standard Fee', 60),
        additionalRequirements: sanitizeText(additionalRequirements || '', 3000),
        isCustomRequest: Boolean(isCustomRequest),
        fileAttachment: fileAttachment && typeof fileAttachment === 'object' ? {
          fileName: stripHtml(fileAttachment.fileName || 'document', 150),
          fileSize: fileAttachment.fileSize ? stripHtml(String(fileAttachment.fileSize), 40) : undefined,
          fileType: fileAttachment.fileType ? stripHtml(String(fileAttachment.fileType), 80) : undefined,
          fileUrl: fileAttachment.fileUrl ? sanitizeText(fileAttachment.fileUrl, 500) : undefined,
          storagePath: fileAttachment.storagePath ? stripHtml(fileAttachment.storagePath, 250) : undefined
        } : undefined,
        status: 'NEW'
      });

      res.status(201).json({
        success: true,
        message: 'Your teaching request has been submitted successfully! Engr. Imran Khan will review your requirements and respond promptly.',
        request: newRequest
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit teaching request', details: err?.message });
    }
  });

  // ==============================================================================
  // SECURE AUTHENTICATION ROUTES
  // ==============================================================================

  // Supabase Auth Token verification / exchange endpoint (Returns cryptographic JWT)
  app.post('/api/admin/verify-supabase', async (req, res) => {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        res.status(400).json({ error: 'Missing accessToken' });
        return;
      }

      const user = await verifySupabaseToken(accessToken);
      if (!user) {
        res.status(401).json({ error: 'Invalid or expired Supabase authentication session' });
        return;
      }

      // Return the verified Supabase JWT so the client stores it directly for stateless authentication
      res.json({
        success: true,
        token: accessToken,
        user: {
          id: user.id,
          email: user.email
        },
        message: 'Supabase authentication verified successfully'
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Verification failed', details: err?.message });
    }
  });

  // Admin Master Passkey Authentication with Brute-Force Rate Limiting
  // Strictly requires non-empty ADMIN_PASSKEY in environment variables
  app.post('/api/admin/login', (req, res) => {
    try {
      const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || 'client';
      const rateCheck = checkRateLimit(loginAttempts, `login_${clientIp}`, 5, 15 * 60 * 1000, 15 * 60 * 1000);

      if (!rateCheck.allowed) {
        res.status(429).json({
          error: `Too many failed login attempts. For security, access is temporarily locked for ${rateCheck.retryAfterSeconds} seconds.`
        });
        return;
      }

      const { passkey } = req.body;
      if (!passkey) {
        res.status(400).json({ error: 'Passkey is required' });
        return;
      }

      // Enforce non-empty process.env.ADMIN_PASSKEY, rejecting login attempts if unconfigured
      const expectedPasskey = (process.env.ADMIN_PASSKEY || '').trim();
      if (!expectedPasskey) {
        res.status(401).json({
          error: 'Passkey authentication is disabled because ADMIN_PASSKEY is not configured in the server environment. Please sign in via Supabase Auth.'
        });
        return;
      }

      // Constant-time comparison to prevent timing attacks
      const passkeyBuffer = Buffer.from(String(passkey));
      const expectedBuffer = Buffer.from(String(expectedPasskey));

      const isMatch = passkeyBuffer.length === expectedBuffer.length &&
        crypto.timingSafeEqual(passkeyBuffer, expectedBuffer);

      if (isMatch) {
        // Reset rate limit on successful authentication
        loginAttempts.delete(`login_${clientIp}`);
        const token = createSession('secure_passkey');

        res.json({
          success: true,
          token,
          expiresIn: SESSION_TTL_MS / 1000,
          message: 'Admin authentication successful'
        });
      } else {
        res.status(401).json({ error: 'Invalid admin credentials.' });
      }
    } catch (err: any) {
      res.status(500).json({ error: 'Authentication failed', details: err?.message });
    }
  });

  // Admin Logout: Invalidate session token
  app.post('/api/admin/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      removeSession(token);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });

  // Protected Admin Data endpoint (Fetches fresh data with Supabase primary)
  app.get('/api/admin/data', adminAuthMiddleware, async (req, res) => {
    try {
      const db = await getSiteDataAsync(true);
      const { adminPasskey, ...safeSettings } = db.settings;
      res.json({
        ...db,
        settings: safeSettings
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch admin data', details: err?.message });
    }
  });

  // Update Service (Prices, Delivery time, descriptions, etc.)
  app.post('/api/admin/services', adminAuthMiddleware, async (req, res) => {
    try {
      const service = req.body;
      if (!service.id || !service.name) {
        res.status(400).json({ error: 'Service ID and name are required' });
        return;
      }
      const updated = await updateServiceAsync(service);
      res.json({ success: true, service: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update service', details: err?.message });
    }
  });

  // Update Project
  app.post('/api/admin/projects', adminAuthMiddleware, async (req, res) => {
    try {
      const project = req.body;
      if (!project.id || !project.title) {
        res.status(400).json({ error: 'Project ID and title are required' });
        return;
      }
      const updated = await updateProjectAsync(project);
      res.json({ success: true, project: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update project', details: err?.message });
    }
  });

  // Update Lead Status (Customer Lead Management)
  app.post('/api/admin/leads/status', adminAuthMiddleware, async (req, res) => {
    try {
      const { id, status, adminNotes } = req.body;
      const validStatuses: LeadStatus[] = [
        'NEW',
        'CONTACTED',
        'DISCUSSION',
        'QUOTED',
        'IN PROGRESS',
        'COMPLETED',
        'CANCELLED'
      ];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ error: 'Invalid lead status' });
        return;
      }
      const updatedLead = await updateLeadStatusAsync(id, status, adminNotes ? sanitizeText(adminNotes, 2000) : undefined);
      if (!updatedLead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }
      res.json({ success: true, lead: updatedLead });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update lead status', details: err?.message });
    }
  });

  // Delete Lead
  app.delete('/api/admin/leads/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = await deleteLeadAsync(req.params.id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete lead', details: err?.message });
    }
  });

  // Update Custom Website Request Status
  app.post('/api/admin/custom-requests/status', adminAuthMiddleware, async (req, res) => {
    try {
      const { id, status, adminNotes } = req.body;
      const validStatuses: CustomRequestStatus[] = [
        'NEW',
        'REVIEWING',
        'PROPOSAL_SENT',
        'ACCEPTED',
        'IN_DEVELOPMENT',
        'DELIVERED',
        'ARCHIVED'
      ];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ error: 'Invalid custom request status' });
        return;
      }
      const updated = await updateCustomWebsiteRequestStatusAsync(id, status, adminNotes ? sanitizeText(adminNotes, 2000) : undefined);
      if (!updated) {
        res.status(404).json({ error: 'Custom request not found' });
        return;
      }
      res.json({ success: true, request: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update custom request status', details: err?.message });
    }
  });

  // Delete Custom Website Request
  app.delete('/api/admin/custom-requests/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = await deleteCustomWebsiteRequestAsync(req.params.id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete custom request', details: err?.message });
    }
  });

  // Update Social Links
  app.post('/api/admin/socials', adminAuthMiddleware, async (req, res) => {
    try {
      const { socials } = req.body;
      if (!Array.isArray(socials)) {
        res.status(400).json({ error: 'Socials must be an array' });
        return;
      }
      const db = getDatabase();
      db.socials = socials;
      saveDatabase(db);

      const supabase = getServerSupabase();
      if (supabase) {
        try {
          const payload = socials.map((s, idx) => ({
            id: s.id,
            platform: s.platform,
            handle: s.handle,
            url: s.url,
            icon: s.icon,
            badge: s.badge,
            enabled: s.enabled,
            is_verified: s.isVerified,
            order_index: idx
          }));
          await supabase.from('socials').upsert(payload);
        } catch (supaErr) {
          console.warn('Supabase socials update notice:', supaErr);
        }
      }

      res.json({ success: true, socials: db.socials });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update socials', details: err?.message });
    }
  });

  // Update Settings (Brand, Position, Hero, Toggles)
  app.post('/api/admin/settings', adminAuthMiddleware, async (req, res) => {
    try {
      const updated = await updateSettingsAsync(req.body);
      const { adminPasskey, ...safeSettings } = updated;
      res.json({ success: true, settings: safeSettings });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update settings', details: err?.message });
    }
  });

  // Update Teaching Request Status
  app.post('/api/admin/teaching-requests/status', adminAuthMiddleware, async (req, res) => {
    try {
      const { id, status, adminNotes } = req.body;
      const validStatuses: TeachingRequestStatus[] = [
        'NEW',
        'REVIEWING',
        'QUOTED',
        'PAYMENT PENDING',
        'PAID',
        'IN PROGRESS',
        'DELIVERED',
        'COMPLETED',
        'CANCELLED'
      ];
      if (!validStatuses.includes(status)) {
        res.status(400).json({ error: 'Invalid teaching request status' });
        return;
      }
      const updated = await updateTeachingRequestStatusAsync(id, status, adminNotes ? sanitizeText(adminNotes, 2000) : undefined);
      if (!updated) {
        res.status(404).json({ error: 'Teaching request not found' });
        return;
      }
      res.json({ success: true, request: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update teaching request status', details: err?.message });
    }
  });

  // Delete Teaching Request
  app.delete('/api/admin/teaching-requests/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = await deleteTeachingRequestAsync(req.params.id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete teaching request', details: err?.message });
    }
  });

  // Save/Update Teaching Service
  app.post('/api/admin/teaching-services', adminAuthMiddleware, async (req, res) => {
    try {
      const service = req.body;
      if (!service.id || !service.title) {
        res.status(400).json({ error: 'Teaching service ID and title are required' });
        return;
      }
      const saved = await saveTeachingServiceAsync(service);
      res.json({ success: true, service: saved });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save teaching service', details: err?.message });
    }
  });

  // Delete Teaching Service
  app.delete('/api/admin/teaching-services/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = await deleteTeachingServiceAsync(req.params.id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete teaching service', details: err?.message });
    }
  });

  // Update Teaching Consultation Settings
  app.post('/api/admin/teaching-consultation', adminAuthMiddleware, async (req, res) => {
    try {
      const settings = req.body;
      if (!settings || !settings.title) {
        res.status(400).json({ error: 'Valid consultation settings object required' });
        return;
      }
      const updated = await updateTeachingConsultationAsync(settings);
      res.json({ success: true, consultation: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update consultation settings', details: err?.message });
    }
  });

  // Sync / Migrate all data to Supabase
  app.post('/api/admin/sync-supabase', adminAuthMiddleware, async (req, res) => {
    try {
      const db = await getSiteDataAsync();
      const result = await syncDatabaseToSupabase(db);
      if (!result.success) {
        res.status(400).json(result);
        return;
      }
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to sync with Supabase', details: err?.message });
    }
  });

  // Reset to default seed data
  app.post('/api/admin/reset', adminAuthMiddleware, async (req, res) => {
    try {
      const reset = resetToDefaults();
      // Sync reset to Supabase if configured
      await syncDatabaseToSupabase(reset);
      const { adminPasskey, ...safeSettings } = reset.settings;
      res.json({ success: true, data: { ...reset, settings: safeSettings } });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to reset data', details: err?.message });
    }
  });

  // --- Vite middleware for development & static serving for production ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`S • ENGR Full-Stack Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
