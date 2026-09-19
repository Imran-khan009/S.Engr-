import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import {
  getDatabase,
  addLead,
  updateLeadStatus,
  deleteLead,
  addContactMessage,
  updateService,
  updateProject,
  updateSettings,
  resetToDefaults,
  saveDatabase,
  addCustomWebsiteRequest,
  updateCustomWebsiteRequestStatus,
  deleteCustomWebsiteRequest,
  addTeachingRequest,
  updateTeachingRequestStatus,
  deleteTeachingRequest,
  saveTeachingService,
  deleteTeachingService,
  updateTeachingConsultation
} from './server/db';
import {
  getServerSupabase,
  verifySupabaseToken,
  syncDatabaseToSupabase
} from './server/supabase';
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
// Supports both Supabase Auth JWTs & Secure Session Tokens
// ==============================================================================
async function adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: Missing or invalid authorization header' });
    return;
  }

  const token = authHeader.substring(7).trim();
  const now = Date.now();

  // 1. Check local session store
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

  // 2. Check direct Supabase Auth JWT token
  const supaUser = await verifySupabaseToken(token);
  if (supaUser) {
    // Cache the verified Supabase token as an active session for efficiency
    activeSessions.set(token, {
      token,
      createdAt: now,
      expiresAt: now + SESSION_TTL_MS,
      userId: supaUser.id,
      email: supaUser.email,
      authMethod: 'supabase'
    });
    return next();
  }

  res.status(401).json({ error: 'Unauthorized: Invalid or expired admin credentials' });
}

// Helper to test if a request has admin privileges without failing
async function checkIsAdmin(req: express.Request): Promise<boolean> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;

  const token = authHeader.substring(7).trim();
  const session = activeSessions.get(token);
  if (session && Date.now() <= session.expiresAt) {
    return true;
  }

  const supaUser = await verifySupabaseToken(token);
  return !!supaUser;
}

// ==============================================================================
// FILE VALIDATION HELPERS
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

  app.use(express.json({ limit: '15mb' }));

  // --- API Routes FIRST ---

  app.get('/api/health', (req, res) => {
    const supabase = getServerSupabase();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      supabaseConfigured: !!supabase
    });
  });

  // Public Site Data (includes leads and private requests ONLY for verified admins)
  app.get('/api/site-data', async (req, res) => {
    try {
      const db = getDatabase();
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
  app.get('/api/services/:slug', (req, res) => {
    try {
      const db = getDatabase();
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

  // Submit Project Request Lead
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

      if (!fullName || !email || !serviceRequired || !projectDescription) {
        res.status(400).json({ error: 'Please provide full name, email, service required, and project description' });
        return;
      }

      const fileValidation = validateFile(fileName, fileType);
      if (!fileValidation.valid) {
        res.status(400).json({ error: fileValidation.error });
        return;
      }

      const createdLead = addLead({
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        phone: String(phone || '').trim(),
        whatsapp: String(whatsapp || '').trim(),
        country: String(country || 'Not specified').trim(),
        serviceRequired: String(serviceRequired).trim(),
        projectDescription: String(projectDescription).trim(),
        referenceRequirements: String(referenceRequirements || '').trim(),
        budget: String(budget || 'Negotiable').trim(),
        deadline: String(deadline || 'Flexible').trim(),
        preferredContactMethod: String(preferredContactMethod || 'Email').trim(),
        platformPreference: platformPreference === 'Fiverr' || platformPreference === 'Upwork' ? platformPreference : 'Direct',
        fileName: fileName ? String(fileName) : undefined,
        fileUrl: fileUrl ? String(fileUrl) : undefined,
        fileSize: fileSize ? String(fileSize) : undefined,
        fileType: fileType ? String(fileType) : undefined
      });

      // Sync lead to Supabase if available
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('leads').insert([{
            id: createdLead.id,
            full_name: createdLead.fullName,
            email: createdLead.email,
            phone: createdLead.phone,
            whatsapp: createdLead.whatsapp,
            country: createdLead.country,
            service_required: createdLead.serviceRequired,
            project_description: createdLead.projectDescription,
            reference_requirements: createdLead.referenceRequirements,
            budget: createdLead.budget,
            deadline: createdLead.deadline,
            preferred_contact_method: createdLead.preferredContactMethod,
            platform_preference: createdLead.platformPreference,
            file_name: createdLead.fileName,
            file_url: createdLead.fileUrl,
            file_size: createdLead.fileSize,
            file_type: createdLead.fileType,
            status: createdLead.status,
            created_at: createdLead.createdAt
          }]);
        } catch (supaErr) {
          console.warn('Supabase lead sync notice:', supaErr);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Your project request has been submitted successfully! Engr. Imran Khan will review your requirements and reach out promptly.',
        lead: createdLead
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit project request', details: err?.message });
    }
  });

  // Submit Custom Website Upgrade Request
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

      if (!fullName || !email) {
        res.status(400).json({ error: 'Please provide at least your Name and Email.' });
        return;
      }

      const servicesArray = Array.isArray(requiredServices)
        ? requiredServices
        : requiredServices ? [String(requiredServices)] : ['Modern Web & UI Development'];

      const featuresArray = Array.isArray(requiredFeatures)
        ? requiredFeatures
        : requiredFeatures ? [String(requiredFeatures)] : [];

      const newRequest = addCustomWebsiteRequest({
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        whatsapp: String(whatsapp || '').trim(),
        businessName: String(businessName || '').trim(),
        websiteType: String(websiteType || 'Custom Business Website').trim(),
        requiredServices: servicesArray,
        designPreference: String(designPreference || 'Modern Tech & Minimalist').trim(),
        requiredFeatures: featuresArray,
        budget: String(budget || 'Custom Quote').trim(),
        deadline: String(deadline || 'Flexible').trim(),
        additionalRequirements: String(additionalRequirements || '').trim(),
        status: 'NEW'
      });

      // Save to Supabase if configured
      let supabaseSynced = false;
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          const { error: sbError } = await supabase
            .from('custom_website_requests')
            .insert([{
              id: newRequest.id,
              full_name: newRequest.fullName,
              email: newRequest.email,
              whatsapp: newRequest.whatsapp,
              business_name: newRequest.businessName,
              website_type: newRequest.websiteType,
              required_services: newRequest.requiredServices,
              design_preference: newRequest.designPreference,
              required_features: newRequest.requiredFeatures,
              budget: newRequest.budget,
              deadline: newRequest.deadline,
              additional_requirements: newRequest.additionalRequirements,
              status: newRequest.status,
              created_at: newRequest.createdAt
            }]);

          if (!sbError) {
            supabaseSynced = true;
            newRequest.supabaseSynced = true;
            const db = getDatabase();
            const target = db.customRequests?.find(r => r.id === newRequest.id);
            if (target) {
              target.supabaseSynced = true;
              saveDatabase(db);
            }
          }
        } catch (sbErr: any) {
          console.warn('Supabase sync notice:', sbErr.message);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Your custom website requirements have been submitted successfully! Engr. Imran Khan will review your specifications and contact you promptly.',
        request: newRequest,
        supabaseSynced
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
      if (!name || !email || !message) {
        res.status(400).json({ error: 'Name, email, and message are required' });
        return;
      }

      const newMsg = addContactMessage({
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        subject: String(subject || 'General Inquiry').trim(),
        message: String(message).trim()
      });

      // Sync message to Supabase
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('contact_messages').insert([{
            id: newMsg.id,
            name: newMsg.name,
            email: newMsg.email,
            subject: newMsg.subject,
            message: newMsg.message,
            created_at: newMsg.createdAt
          }]);
        } catch (supaErr) {
          console.warn('Supabase contact message sync notice:', supaErr);
        }
      }

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

      if (!fullName || !email) {
        res.status(400).json({ error: 'Please provide at least your Full Name and Email address.' });
        return;
      }

      if (fileAttachment) {
        const fileCheck = validateFile(fileAttachment.fileName, fileAttachment.fileType);
        if (!fileCheck.valid) {
          res.status(400).json({ error: fileCheck.error });
          return;
        }
      }

      // Add to server database
      const newRequest = addTeachingRequest({
        fullName: String(fullName).trim(),
        email: String(email).trim().toLowerCase(),
        whatsapp: String(whatsapp || '').trim(),
        country: String(country || 'Pakistan').trim(),
        userRole: userRole || 'Teacher',
        subject: String(subject || 'General / STEM').trim(),
        studentLevel: String(studentLevel || 'Beginner / General').trim(),
        topic: String(topic || 'Custom Subject Matter').trim(),
        courseOrModule: String(courseOrModule || '').trim(),
        requiredServiceId: String(requiredServiceId || 'ts-custom').trim(),
        requiredServiceName: String(requiredServiceName || (isCustomRequest ? 'Custom Educational Inquiry' : 'Teaching Support')).trim(),
        numberOfLessons: String(numberOfLessons || '1-3 Lessons').trim(),
        requiredFormat: String(requiredFormat || 'Editable Word / Google Docs & PDF').trim(),
        deadline: String(deadline || 'Flexible').trim(),
        budget: String(budget || 'Standard Fee').trim(),
        additionalRequirements: String(additionalRequirements || '').trim(),
        isCustomRequest: Boolean(isCustomRequest),
        fileAttachment: fileAttachment && typeof fileAttachment === 'object' ? {
          fileName: String(fileAttachment.fileName || 'document'),
          fileSize: fileAttachment.fileSize ? String(fileAttachment.fileSize) : undefined,
          fileType: fileAttachment.fileType ? String(fileAttachment.fileType) : undefined,
          fileUrl: fileAttachment.fileUrl ? String(fileAttachment.fileUrl) : undefined,
          storagePath: fileAttachment.storagePath ? String(fileAttachment.storagePath) : undefined,
          dataUrl: fileAttachment.dataUrl ? String(fileAttachment.dataUrl) : undefined
        } : undefined,
        status: 'NEW'
      });

      // Try syncing to Supabase if credentials exist
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('teaching_requests').insert([
            {
              id: newRequest.id,
              full_name: newRequest.fullName,
              email: newRequest.email,
              whatsapp: newRequest.whatsapp,
              country: newRequest.country,
              user_role: newRequest.userRole,
              subject: newRequest.subject,
              student_level: newRequest.studentLevel,
              topic: newRequest.topic,
              course_module: newRequest.courseOrModule,
              required_service_id: newRequest.requiredServiceId,
              required_service_name: newRequest.requiredServiceName,
              number_of_lessons: newRequest.numberOfLessons,
              required_format: newRequest.requiredFormat,
              deadline: newRequest.deadline,
              budget: newRequest.budget,
              additional_requirements: newRequest.additionalRequirements,
              is_custom: newRequest.isCustomRequest,
              file_name: newRequest.fileAttachment?.fileName,
              file_url: newRequest.fileAttachment?.fileUrl,
              file_size: newRequest.fileAttachment?.fileSize,
              file_type: newRequest.fileAttachment?.fileType,
              status: newRequest.status,
              created_at: newRequest.createdAt
            }
          ]);
          newRequest.supabaseSynced = true;
        } catch (supaErr) {
          console.warn('Supabase sync notice for teaching request:', supaErr);
        }
      }

      res.status(201).json({
        success: true,
        message: 'Your teaching service inquiry has been received! Engr. Imran Khan will review your requirements and follow up with a structured plan and timeline.',
        request: newRequest
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to submit teaching request', details: err?.message });
    }
  });

  // ==============================================================================
  // SECURE AUTHENTICATION ROUTES
  // ==============================================================================

  // Supabase Auth Token verification / exchange endpoint
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

      const sessionToken = createSession('supabase', user.id, user.email);
      res.json({
        success: true,
        token: sessionToken,
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

      // Check environment variable first, then fallback to db setting
      const db = getDatabase();
      const expectedPasskey = process.env.ADMIN_PASSKEY || db.settings.adminPasskey;

      if (!expectedPasskey) {
        res.status(401).json({ error: 'No admin passkey configured on the server. Please sign in via Supabase Auth.' });
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

  // Protected Admin Data endpoint
  app.get('/api/admin/data', adminAuthMiddleware, (req, res) => {
    try {
      const db = getDatabase();
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
      const updated = updateService(service);

      // Sync to Supabase if available
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('services').upsert({
            id: updated.id,
            name: updated.name,
            slug: updated.slug,
            category: updated.category,
            short_description: updated.shortDescription,
            problem: updated.problem,
            solution: updated.solution,
            included_features: updated.includedFeatures,
            tools: updated.tools,
            pricing_model: updated.pricingModel || updated.pricingType || 'starting_at',
            starting_price: updated.startingPrice,
            estimated_delivery: updated.estimatedDelivery,
            portfolio_examples: updated.portfolioExamples,
            process: updated.process,
            faqs: updated.faqs,
            icon_name: updated.iconName,
            featured: updated.featured ?? false,
            updated_at: new Date().toISOString()
          });
        } catch (supaErr) {
          console.warn('Supabase service update notice:', supaErr);
        }
      }

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
      const updated = updateProject(project);

      // Sync to Supabase if available
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('projects').upsert({
            id: updated.id,
            title: updated.title,
            category: updated.category,
            role: updated.role,
            technologies: updated.technologies,
            tools: updated.tools,
            description: updated.description,
            problem: updated.problem,
            solution: updated.solution,
            project_type: updated.projectType,
            images: updated.images,
            live_url: updated.liveUrl,
            github_url: updated.githubUrl,
            fiverr_url: updated.fiverrUrl,
            upwork_url: updated.upworkUrl,
            featured: updated.featured,
            date: updated.date,
            updated_at: new Date().toISOString()
          });
        } catch (supaErr) {
          console.warn('Supabase project update notice:', supaErr);
        }
      }

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
      const updatedLead = updateLeadStatus(id, status, adminNotes);
      if (!updatedLead) {
        res.status(404).json({ error: 'Lead not found' });
        return;
      }

      // Sync to Supabase if available
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('leads').update({
            status,
            admin_notes: adminNotes
          }).eq('id', id);
        } catch (supaErr) {
          console.warn('Supabase lead status update notice:', supaErr);
        }
      }

      res.json({ success: true, lead: updatedLead });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update lead status', details: err?.message });
    }
  });

  // Delete Lead
  app.delete('/api/admin/leads/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = deleteLead(req.params.id);

      // Sync delete to Supabase if available
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('leads').delete().eq('id', req.params.id);
        } catch (supaErr) {
          console.warn('Supabase lead delete notice:', supaErr);
        }
      }

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
      const updated = updateCustomWebsiteRequestStatus(id, status, adminNotes);
      if (!updated) {
        res.status(404).json({ error: 'Custom request not found' });
        return;
      }

      // Sync to Supabase
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('custom_website_requests').update({
            status,
            admin_notes: adminNotes
          }).eq('id', id);
        } catch (supaErr) {
          console.warn('Supabase custom request update notice:', supaErr);
        }
      }

      res.json({ success: true, request: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update custom request status', details: err?.message });
    }
  });

  // Delete Custom Website Request
  app.delete('/api/admin/custom-requests/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = deleteCustomWebsiteRequest(req.params.id);
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('custom_website_requests').delete().eq('id', req.params.id);
        } catch (supaErr) {
          console.warn('Supabase custom request delete notice:', supaErr);
        }
      }
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

  // Update Settings
  app.post('/api/admin/settings', adminAuthMiddleware, async (req, res) => {
    try {
      const updated = updateSettings(req.body);

      // Sync to Supabase
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('site_settings').upsert({
            id: 'current',
            brand_name: updated.brandName,
            professional_name: updated.professionalName,
            positioning: updated.positioning,
            brand_concept: updated.brandConcept,
            hero_heading: updated.heroHeading,
            hero_supporting: updated.heroSupporting,
            hero_description: updated.heroDescription,
            email: updated.email,
            whatsapp: updated.whatsapp,
            location: updated.location,
            demo_mode: updated.demoMode,
            show_pricing: updated.showPricing,
            show_services: updated.showServices,
            show_features: updated.showFeatures,
            cta_title: updated.ctaTitle,
            cta_supporting_text: updated.ctaSupportingText,
            upgrade_message: updated.upgradeMessage,
            premium_features: updated.premiumFeatures,
            updated_at: new Date().toISOString()
          });
        } catch (supaErr) {
          console.warn('Supabase settings update notice:', supaErr);
        }
      }

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
      const updated = updateTeachingRequestStatus(id, status, adminNotes);
      if (!updated) {
        res.status(404).json({ error: 'Teaching request not found' });
        return;
      }

      // Sync to Supabase
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('teaching_requests').update({
            status,
            admin_notes: adminNotes
          }).eq('id', id);
        } catch (supaErr) {
          console.warn('Supabase teaching request update notice:', supaErr);
        }
      }

      res.json({ success: true, request: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update teaching request status', details: err?.message });
    }
  });

  // Delete Teaching Request
  app.delete('/api/admin/teaching-requests/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = deleteTeachingRequest(req.params.id);
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('teaching_requests').delete().eq('id', req.params.id);
        } catch (supaErr) {
          console.warn('Supabase teaching request delete notice:', supaErr);
        }
      }
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
      const saved = saveTeachingService(service);

      // Sync to Supabase
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('teaching_services').upsert({
            id: saved.id,
            title: saved.title,
            slug: saved.slug,
            category: saved.category,
            subtitle: saved.subtitle,
            short_description: saved.shortDescription,
            description: saved.description,
            who_is_this_for: saved.whoIsThisFor,
            sub_offerings: saved.subOfferings,
            what_is_included: saved.whatIsIncluded,
            deliverables: saved.deliverables,
            sample_preview: saved.samplePreview,
            process: saved.process,
            faqs: saved.faqs,
            pricing_type: saved.pricingType,
            starting_price: saved.startingPrice,
            premium_price: saved.premiumPrice,
            delivery_time: saved.deliveryTime,
            icon: saved.icon,
            enabled: saved.enabled,
            order_index: saved.order,
            updated_at: new Date().toISOString()
          });
        } catch (supaErr) {
          console.warn('Supabase teaching service update notice:', supaErr);
        }
      }

      res.json({ success: true, service: saved });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to save teaching service', details: err?.message });
    }
  });

  // Delete Teaching Service
  app.delete('/api/admin/teaching-services/:id', adminAuthMiddleware, async (req, res) => {
    try {
      const success = deleteTeachingService(req.params.id);
      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('teaching_services').delete().eq('id', req.params.id);
        } catch (supaErr) {
          console.warn('Supabase teaching service delete notice:', supaErr);
        }
      }
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
      const updated = updateTeachingConsultation(settings);

      const supabase = getServerSupabase();
      if (supabase) {
        try {
          await supabase.from('teaching_consultation').upsert({
            id: 'current',
            title: updated.title,
            headline: updated.headline,
            subtext: updated.subtext,
            price: updated.price,
            duration: updated.duration,
            topics: updated.topics,
            enabled: updated.enabled,
            updated_at: new Date().toISOString()
          });
        } catch (supaErr) {
          console.warn('Supabase consultation update notice:', supaErr);
        }
      }

      res.json({ success: true, consultation: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update consultation settings', details: err?.message });
    }
  });

  // Sync / Migrate all data to Supabase
  app.post('/api/admin/sync-supabase', adminAuthMiddleware, async (req, res) => {
    try {
      const db = getDatabase();
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
      // Also sync reset to Supabase if configured
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
