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
import {
  getServerSupabase,
  loadDataFromSupabase,
  insertLeadToSupabase,
  updateLeadStatusInSupabase,
  deleteLeadFromSupabase,
  insertCustomRequestToSupabase,
  updateCustomRequestStatusInSupabase,
  deleteCustomRequestFromSupabase,
  insertContactMessageToSupabase,
  insertTeachingRequestToSupabase,
  updateTeachingRequestStatusInSupabase,
  deleteTeachingRequestFromSupabase,
  upsertServiceInSupabase,
  upsertProjectInSupabase,
  upsertTeachingServiceInSupabase,
  deleteTeachingServiceFromSupabase,
  upsertTeachingConsultationInSupabase,
  upsertSettingsInSupabase
} from './supabase';

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

// In-memory cache for fast reads and resilient fallback
let cachedDb: FullSiteData | null = null;
let lastSupabaseFetch = 0;
const CACHE_TTL_MS = 10000; // 10-second cache TTL for high throughput

/**
 * Merge partial or loaded data with defaults to ensure complete schemas
 */
function mergeWithDefaults(partial: Partial<FullSiteData>): FullSiteData {
  return {
    ...defaultSiteData,
    ...partial,
    settings: {
      ...defaultSiteData.settings,
      ...(partial.settings || {}),
      premiumFeatures: {
        ...defaultSiteData.settings.premiumFeatures,
        ...((partial.settings && partial.settings.premiumFeatures) || {})
      }
    },
    services: partial.services?.length ? partial.services : defaultSiteData.services,
    projects: partial.projects?.length ? partial.projects : defaultSiteData.projects,
    experiences: partial.experiences?.length ? partial.experiences : defaultSiteData.experiences,
    education: partial.education?.length ? partial.education : defaultSiteData.education,
    skillCategories: partial.skillCategories?.length ? partial.skillCategories : defaultSiteData.skillCategories,
    socials: partial.socials?.length ? partial.socials : defaultSiteData.socials,
    leads: partial.leads || [],
    messages: partial.messages || [],
    customRequests: partial.customRequests || [],
    teachingServices: partial.teachingServices?.length ? partial.teachingServices : defaultSiteData.teachingServices,
    teachingRequests: partial.teachingRequests || [],
    teachingConsultation: partial.teachingConsultation || defaultSiteData.teachingConsultation,
    teachingProducts: partial.teachingProducts?.length ? partial.teachingProducts : defaultSiteData.teachingProducts
  };
}

/**
 * Initialize local database file if it doesn't exist
 */
export function initDatabase(): FullSiteData {
  if (cachedDb) return cachedDb;

  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSiteData, null, 2), 'utf-8');
      cachedDb = defaultSiteData;
      return defaultSiteData;
    }

    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<FullSiteData>;
    cachedDb = mergeWithDefaults(parsed);
    return cachedDb;
  } catch (err) {
    console.error('Error initializing database, using default seed:', err);
    cachedDb = defaultSiteData;
    return defaultSiteData;
  }
}

/**
 * Synchronous getDatabase for backward compatibility
 */
export function getDatabase(): FullSiteData {
  return initDatabase();
}

/**
 * Primary Cloud-Ready Data Fetcher
 * When Supabase is connected, reads directly from Supabase.
 * Falls back to in-memory cache and local file storage.
 */
export async function getSiteDataAsync(forceRefresh: boolean = false): Promise<FullSiteData> {
  const supabase = getServerSupabase();
  const now = Date.now();

  if (supabase && (forceRefresh || !cachedDb || now - lastSupabaseFetch > CACHE_TTL_MS)) {
    try {
      const supaData = await loadDataFromSupabase();
      if (supaData) {
        // Hydrate and cache
        const local = initDatabase();
        cachedDb = mergeWithDefaults({
          ...local,
          ...supaData,
          // Preserve static content if not in Supabase
          experiences: local.experiences,
          education: local.education,
          skillCategories: local.skillCategories,
          socials: local.socials
        });
        lastSupabaseFetch = now;
        // Also sync to local file for offline fallback
        saveLocalFile(cachedDb);
        return cachedDb;
      }
    } catch (err) {
      console.warn('Supabase read notice, falling back to local store:', err);
    }
  }

  return getDatabase();
}

/**
 * Save to local JSON file
 */
function saveLocalFile(data: FullSiteData): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${DATA_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
    fs.renameSync(tempFile, DATA_FILE);
    cachedDb = data;
    return true;
  } catch (err) {
    console.error('Error saving local database file:', err);
    return false;
  }
}

export function saveDatabase(data: FullSiteData): boolean {
  return saveLocalFile(data);
}

// ==============================================================================
// LEADS PERSISTENCE
// ==============================================================================

export async function addLeadAsync(lead: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: Lead['status'] }): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: lead.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  // Primary: Supabase
  await insertLeadToSupabase(newLead);

  // Secondary/Fallback: Local Cache & File
  const db = getDatabase();
  db.leads.unshift(newLead);
  saveLocalFile(db);

  return newLead;
}

export function addLead(lead: Omit<Lead, 'id' | 'createdAt' | 'status'> & { status?: Lead['status'] }): Lead {
  const newLead: Lead = {
    ...lead,
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: lead.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  const db = getDatabase();
  db.leads.unshift(newLead);
  saveLocalFile(db);

  // Background Supabase persistence
  insertLeadToSupabase(newLead).catch(err => console.warn('Supabase lead background insert notice:', err));

  return newLead;
}

export async function updateLeadStatusAsync(id: string, status: Lead['status'], adminNotes?: string): Promise<Lead | null> {
  // Primary: Supabase
  await updateLeadStatusInSupabase(id, status, adminNotes);

  // Secondary/Fallback: Local
  const db = getDatabase();
  const index = db.leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  db.leads[index].status = status;
  if (adminNotes !== undefined) {
    db.leads[index].adminNotes = adminNotes;
  }
  saveLocalFile(db);
  return db.leads[index];
}

export function updateLeadStatus(id: string, status: Lead['status'], adminNotes?: string): Lead | null {
  const db = getDatabase();
  const index = db.leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  db.leads[index].status = status;
  if (adminNotes !== undefined) {
    db.leads[index].adminNotes = adminNotes;
  }
  saveLocalFile(db);

  updateLeadStatusInSupabase(id, status, adminNotes).catch(err => console.warn('Supabase updateLeadStatus notice:', err));
  return db.leads[index];
}

export async function deleteLeadAsync(id: string): Promise<boolean> {
  // Primary: Supabase
  await deleteLeadFromSupabase(id);

  // Secondary/Fallback: Local
  const db = getDatabase();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);
  if (db.leads.length !== initialLen) {
    saveLocalFile(db);
    return true;
  }
  return false;
}

export function deleteLead(id: string): boolean {
  const db = getDatabase();
  const initialLen = db.leads.length;
  db.leads = db.leads.filter(l => l.id !== id);
  if (db.leads.length !== initialLen) {
    saveLocalFile(db);
    deleteLeadFromSupabase(id).catch(err => console.warn('Supabase deleteLead notice:', err));
    return true;
  }
  return false;
}

// ==============================================================================
// CONTACT MESSAGES PERSISTENCE
// ==============================================================================

export async function addContactMessageAsync(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): Promise<ContactMessage> {
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false
  };

  await insertContactMessageToSupabase(newMsg);

  const db = getDatabase();
  db.messages.unshift(newMsg);
  saveLocalFile(db);
  return newMsg;
}

export function addContactMessage(msg: Omit<ContactMessage, 'id' | 'createdAt' | 'read'>): ContactMessage {
  const newMsg: ContactMessage = {
    ...msg,
    id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    read: false
  };

  const db = getDatabase();
  db.messages.unshift(newMsg);
  saveLocalFile(db);

  insertContactMessageToSupabase(newMsg).catch(err => console.warn('Supabase insertContactMessage notice:', err));
  return newMsg;
}

// ==============================================================================
// CUSTOM WEBSITE REQUESTS PERSISTENCE
// ==============================================================================

export async function addCustomWebsiteRequestAsync(
  req: Omit<CustomWebsiteRequest, 'id' | 'createdAt' | 'status'> & { status?: CustomRequestStatus }
): Promise<CustomWebsiteRequest> {
  const newRequest: CustomWebsiteRequest = {
    ...req,
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: req.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  await insertCustomRequestToSupabase(newRequest);

  const db = getDatabase();
  if (!db.customRequests) db.customRequests = [];
  db.customRequests.unshift(newRequest);
  saveLocalFile(db);
  return newRequest;
}

export function addCustomWebsiteRequest(
  req: Omit<CustomWebsiteRequest, 'id' | 'createdAt' | 'status'> & { status?: CustomRequestStatus }
): CustomWebsiteRequest {
  const newRequest: CustomWebsiteRequest = {
    ...req,
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: req.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  const db = getDatabase();
  if (!db.customRequests) db.customRequests = [];
  db.customRequests.unshift(newRequest);
  saveLocalFile(db);

  insertCustomRequestToSupabase(newRequest).catch(err => console.warn('Supabase insertCustomRequest notice:', err));
  return newRequest;
}

export async function updateCustomWebsiteRequestStatusAsync(
  id: string,
  status: CustomRequestStatus,
  adminNotes?: string
): Promise<CustomWebsiteRequest | null> {
  await updateCustomRequestStatusInSupabase(id, status, adminNotes);

  const db = getDatabase();
  if (!db.customRequests) db.customRequests = [];
  const index = db.customRequests.findIndex(r => r.id === id);
  if (index === -1) return null;
  db.customRequests[index].status = status;
  if (adminNotes !== undefined) {
    db.customRequests[index].adminNotes = adminNotes;
  }
  saveLocalFile(db);
  return db.customRequests[index];
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
  saveLocalFile(db);

  updateCustomRequestStatusInSupabase(id, status, adminNotes).catch(err => console.warn('Supabase updateCustomRequest notice:', err));
  return db.customRequests[index];
}

export async function deleteCustomWebsiteRequestAsync(id: string): Promise<boolean> {
  await deleteCustomRequestFromSupabase(id);

  const db = getDatabase();
  if (!db.customRequests) return false;
  const initialLen = db.customRequests.length;
  db.customRequests = db.customRequests.filter(r => r.id !== id);
  if (db.customRequests.length !== initialLen) {
    saveLocalFile(db);
    return true;
  }
  return false;
}

export function deleteCustomWebsiteRequest(id: string): boolean {
  const db = getDatabase();
  if (!db.customRequests) return false;
  const initialLen = db.customRequests.length;
  db.customRequests = db.customRequests.filter(r => r.id !== id);
  if (db.customRequests.length !== initialLen) {
    saveLocalFile(db);
    deleteCustomRequestFromSupabase(id).catch(err => console.warn('Supabase deleteCustomRequest notice:', err));
    return true;
  }
  return false;
}

// ==============================================================================
// TEACHING SERVICES & REQUESTS PERSISTENCE
// ==============================================================================

export async function addTeachingRequestAsync(
  req: Omit<TeachingServiceRequest, 'id' | 'createdAt' | 'status'> & { status?: TeachingRequestStatus }
): Promise<TeachingServiceRequest> {
  const newRequest: TeachingServiceRequest = {
    ...req,
    id: `treq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: req.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  await insertTeachingRequestToSupabase(newRequest);

  const db = getDatabase();
  if (!db.teachingRequests) db.teachingRequests = [];
  db.teachingRequests.unshift(newRequest);
  saveLocalFile(db);
  return newRequest;
}

export function addTeachingRequest(
  req: Omit<TeachingServiceRequest, 'id' | 'createdAt' | 'status'> & { status?: TeachingRequestStatus }
): TeachingServiceRequest {
  const newRequest: TeachingServiceRequest = {
    ...req,
    id: `treq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    status: req.status || 'NEW',
    createdAt: new Date().toISOString()
  };

  const db = getDatabase();
  if (!db.teachingRequests) db.teachingRequests = [];
  db.teachingRequests.unshift(newRequest);
  saveLocalFile(db);

  insertTeachingRequestToSupabase(newRequest).catch(err => console.warn('Supabase insertTeachingRequest notice:', err));
  return newRequest;
}

export async function updateTeachingRequestStatusAsync(
  id: string,
  status: TeachingRequestStatus,
  adminNotes?: string
): Promise<TeachingServiceRequest | null> {
  await updateTeachingRequestStatusInSupabase(id, status, adminNotes);

  const db = getDatabase();
  if (!db.teachingRequests) db.teachingRequests = [];
  const index = db.teachingRequests.findIndex(r => r.id === id);
  if (index === -1) return null;
  db.teachingRequests[index].status = status;
  if (adminNotes !== undefined) {
    db.teachingRequests[index].adminNotes = adminNotes;
  }
  saveLocalFile(db);
  return db.teachingRequests[index];
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
  saveLocalFile(db);

  updateTeachingRequestStatusInSupabase(id, status, adminNotes).catch(err => console.warn('Supabase updateTeachingRequest notice:', err));
  return db.teachingRequests[index];
}

export async function deleteTeachingRequestAsync(id: string): Promise<boolean> {
  await deleteTeachingRequestFromSupabase(id);

  const db = getDatabase();
  if (!db.teachingRequests) return false;
  const initialLen = db.teachingRequests.length;
  db.teachingRequests = db.teachingRequests.filter(r => r.id !== id);
  if (db.teachingRequests.length !== initialLen) {
    saveLocalFile(db);
    return true;
  }
  return false;
}

export function deleteTeachingRequest(id: string): boolean {
  const db = getDatabase();
  if (!db.teachingRequests) return false;
  const initialLen = db.teachingRequests.length;
  db.teachingRequests = db.teachingRequests.filter(r => r.id !== id);
  if (db.teachingRequests.length !== initialLen) {
    saveLocalFile(db);
    deleteTeachingRequestFromSupabase(id).catch(err => console.warn('Supabase deleteTeachingRequest notice:', err));
    return true;
  }
  return false;
}

export async function saveTeachingServiceAsync(service: TeachingService): Promise<TeachingService> {
  await upsertTeachingServiceInSupabase(service);

  const db = getDatabase();
  if (!db.teachingServices) db.teachingServices = [];
  const idx = db.teachingServices.findIndex(s => s.id === service.id);
  if (idx !== -1) {
    db.teachingServices[idx] = service;
  } else {
    db.teachingServices.push(service);
  }
  saveLocalFile(db);
  return service;
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
  saveLocalFile(db);

  upsertTeachingServiceInSupabase(service).catch(err => console.warn('Supabase saveTeachingService notice:', err));
  return service;
}

export async function deleteTeachingServiceAsync(id: string): Promise<boolean> {
  await deleteTeachingServiceFromSupabase(id);

  const db = getDatabase();
  if (!db.teachingServices) return false;
  const initialLen = db.teachingServices.length;
  db.teachingServices = db.teachingServices.filter(s => s.id !== id);
  if (db.teachingServices.length !== initialLen) {
    saveLocalFile(db);
    return true;
  }
  return false;
}

export function deleteTeachingService(id: string): boolean {
  const db = getDatabase();
  if (!db.teachingServices) return false;
  const initialLen = db.teachingServices.length;
  db.teachingServices = db.teachingServices.filter(s => s.id !== id);
  if (db.teachingServices.length !== initialLen) {
    saveLocalFile(db);
    deleteTeachingServiceFromSupabase(id).catch(err => console.warn('Supabase deleteTeachingService notice:', err));
    return true;
  }
  return false;
}

export async function updateTeachingConsultationAsync(settings: TeachingConsultationSettings): Promise<TeachingConsultationSettings> {
  await upsertTeachingConsultationInSupabase(settings);

  const db = getDatabase();
  db.teachingConsultation = settings;
  saveLocalFile(db);
  return db.teachingConsultation;
}

export function updateTeachingConsultation(settings: TeachingConsultationSettings): TeachingConsultationSettings {
  const db = getDatabase();
  db.teachingConsultation = settings;
  saveLocalFile(db);

  upsertTeachingConsultationInSupabase(settings).catch(err => console.warn('Supabase updateTeachingConsultation notice:', err));
  return db.teachingConsultation;
}

// ==============================================================================
// SERVICES & PROJECTS PERSISTENCE
// ==============================================================================

export async function updateServiceAsync(updated: Service): Promise<Service> {
  await upsertServiceInSupabase(updated);

  const db = getDatabase();
  const idx = db.services.findIndex(s => s.id === updated.id);
  if (idx !== -1) {
    db.services[idx] = updated;
  } else {
    db.services.push(updated);
  }
  saveLocalFile(db);
  return updated;
}

export function updateService(updated: Service): Service {
  const db = getDatabase();
  const idx = db.services.findIndex(s => s.id === updated.id);
  if (idx !== -1) {
    db.services[idx] = updated;
  } else {
    db.services.push(updated);
  }
  saveLocalFile(db);

  upsertServiceInSupabase(updated).catch(err => console.warn('Supabase updateService notice:', err));
  return updated;
}

export async function updateProjectAsync(updated: Project): Promise<Project> {
  await upsertProjectInSupabase(updated);

  const db = getDatabase();
  const idx = db.projects.findIndex(p => p.id === updated.id);
  if (idx !== -1) {
    db.projects[idx] = updated;
  } else {
    db.projects.push(updated);
  }
  saveLocalFile(db);
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
  saveLocalFile(db);

  upsertProjectInSupabase(updated).catch(err => console.warn('Supabase updateProject notice:', err));
  return updated;
}

// ==============================================================================
// SETTINGS PERSISTENCE
// ==============================================================================

export async function updateSettingsAsync(settings: Partial<SiteSettings>): Promise<SiteSettings> {
  const db = getDatabase();
  db.settings = { ...db.settings, ...settings };
  await upsertSettingsInSupabase(db.settings);
  saveLocalFile(db);
  return db.settings;
}

export function updateSettings(settings: Partial<SiteSettings>): SiteSettings {
  const db = getDatabase();
  db.settings = { ...db.settings, ...settings };
  saveLocalFile(db);

  upsertSettingsInSupabase(db.settings).catch(err => console.warn('Supabase updateSettings notice:', err));
  return db.settings;
}

export function resetToDefaults(): FullSiteData {
  saveLocalFile(defaultSiteData);
  return defaultSiteData;
}
