import express from 'express';
import path from 'path';
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
  deleteCustomWebsiteRequest
} from './server/db';
import { LeadStatus, CustomRequestStatus } from './src/types';
import { createClient } from '@supabase/supabase-js';

// Lazy Supabase helper
function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  try {
    return createClient(url, key);
  } catch (e) {
    console.warn('Failed to initialize Supabase client:', e);
    return null;
  }
}

// Admin session store (in-memory for active sessions)
const activeAdminTokens = new Set<string>();

function generateToken(): string {
  return `adm_${Date.now()}_${Math.random().toString(36).substring(2, 12)}`;
}

function adminAuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Unauthorized: Missing authorization header' });
    return;
  }
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!activeAdminTokens.has(token)) {
    res.status(401).json({ error: 'Unauthorized: Invalid or expired admin session' });
    return;
  }
  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // --- API Routes FIRST ---

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Public Site Data (includes leads and customRequests for authenticated admins)
  app.get('/api/site-data', (req, res) => {
    try {
      const db = getDatabase();
      const authHeader = req.headers.authorization;
      const isAdmin = authHeader?.startsWith('Bearer ') && activeAdminTokens.has(authHeader.substring(7));
      // Omit private admin passkey from public response
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
        stats: {
          servicesCount: db.services.length,
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
      // Related projects
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
  app.post('/api/leads', (req, res) => {
    try {
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
        fileName
      } = req.body;

      if (!fullName || !email || !serviceRequired || !projectDescription) {
        res.status(400).json({ error: 'Please provide full name, email, service required, and project description' });
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
        fileName: fileName ? String(fileName) : undefined
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

  // Submit Custom Website Upgrade Request (Save to DB & Supabase if configured)
  app.post('/api/custom-website-requests', async (req, res) => {
    try {
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
      const supabase = getSupabaseClient();
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
          } else {
            console.warn('Supabase insertion notice:', sbError.message);
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
  app.post('/api/contact', (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        res.status(400).json({ error: 'Please provide name, email, and message' });
        return;
      }
      const newMsg = addContactMessage({
        name: String(name).trim(),
        email: String(email).trim().toLowerCase(),
        subject: String(subject || 'General Inquiry').trim(),
        message: String(message).trim()
      });
      res.status(201).json({
        success: true,
        message: 'Thank you for reaching out! Your message has been received.',
        messageId: newMsg.id
      });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to send message', details: err?.message });
    }
  });

  // Admin Login
  app.post('/api/admin/login', (req, res) => {
    try {
      const { passkey } = req.body;
      const db = getDatabase();
      const currentPasskey = db.settings.adminPasskey || 'engr-imran-2025';

      if (passkey === currentPasskey) {
        const token = generateToken();
        activeAdminTokens.add(token);
        res.json({
          success: true,
          token,
          message: 'Admin authentication successful'
        });
      } else {
        res.status(401).json({ error: 'Invalid admin passkey. Default is: engr-imran-2025' });
      }
    } catch (err: any) {
      res.status(500).json({ error: 'Authentication failed', details: err?.message });
    }
  });

  // Protected Admin Data endpoint
  app.get('/api/admin/data', adminAuthMiddleware, (req, res) => {
    try {
      const db = getDatabase();
      res.json(db);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to fetch admin data', details: err?.message });
    }
  });

  // Update Service (Prices, Delivery time, descriptions, etc.)
  app.post('/api/admin/services', adminAuthMiddleware, (req, res) => {
    try {
      const service = req.body;
      if (!service.id || !service.name) {
        res.status(400).json({ error: 'Service ID and name are required' });
        return;
      }
      const updated = updateService(service);
      res.json({ success: true, service: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update service', details: err?.message });
    }
  });

  // Update Project
  app.post('/api/admin/projects', adminAuthMiddleware, (req, res) => {
    try {
      const project = req.body;
      if (!project.id || !project.title) {
        res.status(400).json({ error: 'Project ID and title are required' });
        return;
      }
      const updated = updateProject(project);
      res.json({ success: true, project: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update project', details: err?.message });
    }
  });

  // Update Lead Status (Customer Lead Management)
  app.post('/api/admin/leads/status', adminAuthMiddleware, (req, res) => {
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
      res.json({ success: true, lead: updatedLead });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update lead status', details: err?.message });
    }
  });

  // Delete Lead
  app.delete('/api/admin/leads/:id', adminAuthMiddleware, (req, res) => {
    try {
      const success = deleteLead(req.params.id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete lead', details: err?.message });
    }
  });

  // Update Custom Website Request Status
  app.post('/api/admin/custom-requests/status', adminAuthMiddleware, (req, res) => {
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
      res.json({ success: true, request: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update custom request status', details: err?.message });
    }
  });

  // Delete Custom Website Request
  app.delete('/api/admin/custom-requests/:id', adminAuthMiddleware, (req, res) => {
    try {
      const success = deleteCustomWebsiteRequest(req.params.id);
      res.json({ success });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to delete custom request', details: err?.message });
    }
  });

  // Update Social Links
  app.post('/api/admin/socials', adminAuthMiddleware, (req, res) => {
    try {
      const { socials } = req.body;
      if (!Array.isArray(socials)) {
        res.status(400).json({ error: 'Socials must be an array' });
        return;
      }
      const db = getDatabase();
      db.socials = socials;
      saveDatabase(db);
      res.json({ success: true, socials: db.socials });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update socials', details: err?.message });
    }
  });

  // Update Settings
  app.post('/api/admin/settings', adminAuthMiddleware, (req, res) => {
    try {
      const updated = updateSettings(req.body);
      res.json({ success: true, settings: updated });
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to update settings', details: err?.message });
    }
  });

  // Reset to default seed data
  app.post('/api/admin/reset', adminAuthMiddleware, (req, res) => {
    try {
      const reset = resetToDefaults();
      res.json({ success: true, data: reset });
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`S • ENGR Full-Stack Platform running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
