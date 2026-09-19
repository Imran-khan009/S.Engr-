import fs from 'fs';
import path from 'path';
import {
  FullSiteData,
  Lead,
  ContactMessage,
  Service,
  Project,
  SiteSettings,
  CustomWebsiteRequest,
  CustomRequestStatus,
  TeachingService,
  TeachingServiceRequest,
  TeachingRequestStatus,
  TeachingConsultationSettings,
  TeachingDigitalProduct
} from '../src/types';
import { defaultSiteData } from './defaultData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

// Ensure data directory and initial database file exist
export function initDatabase(): FullSiteData {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSiteData, null, 2), 'utf-8');
      return defaultSiteData;
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as FullSiteData;
    
    // Ensure all keys and nested settings exist
    const merged: FullSiteData = {
      ...defaultSiteData,
      ...parsed,
      settings: {
        ...defaultSiteData.settings,
        ...(parsed.settings || {}),
        premiumFeatures: {
          ...defaultSiteData.settings.premiumFeatures,
          ...((parsed.settings && parsed.settings.premiumFeatures) || {})
        }
      },
      services: parsed.services?.length ? parsed.services : defaultSiteData.services,
      projects: parsed.projects?.length ? parsed.projects : defaultSiteData.projects,
      experiences: parsed.experiences?.length ? parsed.experiences : defaultSiteData.experiences,
      education: parsed.education?.length ? parsed.education : defaultSiteData.education,
      skillCategories: parsed.skillCategories?.length ? parsed.skillCategories : defaultSiteData.skillCategories,
      socials: parsed.socials?.length ? parsed.socials : defaultSiteData.socials,
      leads: parsed.leads || [],
      messages: parsed.messages || [],
      customRequests: parsed.customRequests || [],
      teachingServices: parsed.teachingServices && parsed.teachingServices.length > 0 ? parsed.teachingServices : defaultSiteData.teachingServices,
      teachingRequests: parsed.teachingRequests || defaultSiteData.teachingRequests || [],
      teachingConsultation: parsed.teachingConsultation || defaultSiteData.teachingConsultation,
      teachingProducts: parsed.teachingProducts && parsed.teachingProducts.length > 0 ? parsed.teachingProducts : defaultSiteData.teachingProducts
    };

    return merged;
  } catch (err) {
    console.error('Error initializing database, using default seed:', err);
    return defaultSiteData;
  }
}

export function getDatabase(): FullSiteData {
  return initDatabase();
}

export function saveDatabase(data: FullSiteData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
    return true;
  } catch (err) {
    console.error('Error saving database:', err);
    return false;
  }
}

export function addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: Lead['status'] }): Lead {
  const db = getDatabase();
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: lead.status || 'NEW',
    createdAt: new Date().toISOString()
  };
  db.leads.unshift(newLead);
  saveDatabase(db);
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead['status'], adminNotes?: string): Lead | null {
  const db = getDatabase();
  const index = db.leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  db.leads[index].status = status;
  if (adminNotes !== undefined) {
    db.leads[index].adminNotes = adminNotes;
  }
  saveDatabase(db);
  return db.leads[index];
}

export function deleteLead(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);
  if (db.leads.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  const db = getDatabase();
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false
  };
  db.messages.unshift(newMsg);
  saveDatabase(db);
  return newMsg;
}

export function updateService(updated: Service): Service {
  const db = getDatabase();
  const idx = db.services.findIndex(s => s.id === updated.id);
  if (idx !== -1) {
    db.services[idx] = updated;
  } else {
    db.services.push(updated);
  }
  saveDatabase(db);
  return updated;
}

export function updateProject(updated: Project): Project {
  const db = getDatabase();
  const idx = db.projects.findIndex(p => p.id === updated.id);
  if (idx !== -1) {
    db.projects[idx] = updated;
  } else {
    db.projects.push(updated);
  }
  saveDatabase(db);
  return updated;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...settings };
  saveDatabase(db);
  return db.settings;
}

export function addCustomWebsiteRequest(
  req: Omit<CustomWebsiteRequest, 'id' | 'createdAt' | 'status'> & { status?: CustomRequestStatus }
): CustomWebsiteRequest {
  const db = getDatabase();
  const newRequest: CustomWebsiteRequest = {
    ...req,
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: req.status || 'NEW',
    createdAt: new Date().toISOString()
  };
  if (!db.customRequests) {
    db.customRequests = [];
  }
  db.customRequests.unshift(newRequest);
  saveDatabase(db);
  return newRequest;
}

export function updateCustomWebsiteRequestStatus(
  id: string,
  status: CustomRequestStatus,
  adminNotes?: string
): CustomWebsiteRequest | null {
  const db = getDatabase();
  if (!db.customRequests) db.customRequests = [];
  const index = db.customRequests.findIndex(r => r.id === id);
  if (index === -1) return null;
  db.customRequests[index].status = status;
  if (adminNotes !== undefined) {
    db.customRequests[index].adminNotes = adminNotes;
  }
  saveDatabase(db);
  return db.customRequests[index];
}

export function deleteCustomWebsiteRequest(id: string): boolean {
  const db = getDatabase();
  if (!db.customRequests) return false;
  const initialLen = db.customRequests.length;
  db.customRequests = db.customRequests.filter(r => r.id !== id);
  if (db.customRequests.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

// --- Teaching Services & Requests Handlers ---

export function addTeachingRequest(
  req: Omit<TeachingServiceRequest, 'id' | 'createdAt' | 'status'> & { status?: TeachingRequestStatus }
): TeachingServiceRequest {
  const db = getDatabase();
  if (!db.teachingRequests) db.teachingRequests = [];
  const newRequest: TeachingServiceRequest = {
    ...req,
    id: `treq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: req.status || 'NEW',
    createdAt: new Date().toISOString()
  };
  db.teachingRequests.unshift(newRequest);
  saveDatabase(db);
  return newRequest;
}

export function updateTeachingRequestStatus(
  id: string,
  status: TeachingRequestStatus,
  adminNotes?: string
): TeachingServiceRequest | null {
  const db = getDatabase();
  if (!db.teachingRequests) db.teachingRequests = [];
  const index = db.teachingRequests.findIndex(r => r.id === id);
  if (index === -1) return null;
  db.teachingRequests[index].status = status;
  if (adminNotes !== undefined) {
    db.teachingRequests[index].adminNotes = adminNotes;
  }
  saveDatabase(db);
  return db.teachingRequests[index];
}

export function deleteTeachingRequest(id: string): boolean {
  const db = getDatabase();
  if (!db.teachingRequests) return false;
  const initialLen = db.teachingRequests.length;
  db.teachingRequests = db.teachingRequests.filter(r => r.id !== id);
  if (db.teachingRequests.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function saveTeachingService(service: TeachingService): TeachingService {
  const db = getDatabase();
  if (!db.teachingServices) db.teachingServices = [];
  const idx = db.teachingServices.findIndex(s => s.id === service.id);
  if (idx !== -1) {
    db.teachingServices[idx] = service;
  } else {
    db.teachingServices.push(service);
  }
  saveDatabase(db);
  return service;
}

export function deleteTeachingService(id: string): boolean {
  const db = getDatabase();
  if (!db.teachingServices) return false;
  const initialLen = db.teachingServices.length;
  db.teachingServices = db.teachingServices.filter(s => s.id !== id);
  if (db.teachingServices.length !== initialLen) {
    saveDatabase(db);
    return true;
  }
  return false;
}

export function updateTeachingConsultation(settings: TeachingConsultationSettings): TeachingConsultationSettings {
  const db = getDatabase();
  db.teachingConsultation = settings;
  saveDatabase(db);
  return db.teachingConsultation;
}

export function resetToDefaults(): FullSiteData {
  saveDatabase(defaultSiteData);
  return defaultSiteData;
}

