export type ServiceCategory = 
  | 'Technology & Web'
  | 'Programming & Software'
  | 'IoT & Smart Technology'
  | 'Creative Design & Branding'
  | 'Digital Marketing & Ads'
  | 'Video Editing'
  | 'Excel & Data Services'
  | 'Construction & Design';

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  problem: string;
  solution: string;
  includedFeatures: string[];
  tools: string[];
  startingPrice: string; // editable in CMS, e.g. "$120" or "Custom Quote"
  estimatedDelivery: string; // editable in CMS, e.g. "3-5 Days"
  portfolioExamples: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  iconName: string;
  featured?: boolean;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  tools: string[];
  role: string;
  projectType: string;
  diagramType?: 'iot-irrigation' | 'iot-tank' | 'web-noorbal' | 'creative-flow' | 'video-timeline' | 'construction-cad';
  images: string[];
  videoUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  fiverrUrl?: string;
  upworkUrl?: string;
  featured: boolean;
  date: string;
  verifiedNotes?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  dates: string;
  responsibilities: string[];
  skills: string[];
  verified: boolean;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  dates: string;
  location: string;
  details: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; tag: string }[];
}

export type LeadStatus = 
  | 'NEW'
  | 'CONTACTED'
  | 'DISCUSSION'
  | 'QUOTED'
  | 'IN PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Lead {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  serviceRequired: string;
  projectDescription: string;
  referenceRequirements: string;
  budget: string;
  deadline: string;
  preferredContactMethod: string;
  platformPreference: 'Direct' | 'Fiverr' | 'Upwork';
  fileName?: string;
  status: LeadStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface SocialPlatform {
  id: string;
  platform: string;
  name: string;
  url: string;
  handle: string;
  description: string;
  icon: string;
  enabled: boolean;
}

export interface PremiumFeaturesConfig {
  customBranding: boolean;
  customColors: boolean;
  customTypography: boolean;
  customSections: boolean;
  advancedAnimations: boolean;
  advancedPortfolioLayouts: boolean;
  customServicePages: boolean;
  advancedContactLeadSystem: boolean;
  customerDashboard: boolean;
  adminCMS: boolean;
  advancedAnalytics: boolean;
  customDomainSupport: boolean;
  advancedSEO: boolean;
  blogSystem: boolean;
  bookingSystem: boolean;
  clientPortal: boolean;
  paymentIntegration: boolean;
  customApiIntegrations: boolean;
}

export type CustomRequestStatus = 
  | 'NEW'
  | 'REVIEWING'
  | 'PROPOSAL_SENT'
  | 'ACCEPTED'
  | 'IN_DEVELOPMENT'
  | 'DELIVERED'
  | 'ARCHIVED';

export interface CustomWebsiteRequest {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  websiteType: string;
  requiredServices: string[];
  designPreference: string;
  requiredFeatures: string[];
  budget: string;
  deadline: string;
  additionalRequirements: string;
  status: CustomRequestStatus;
  createdAt: string;
  adminNotes?: string;
  supabaseSynced?: boolean;
}

export interface SiteSettings {
  brandName: string;
  professionalName: string;
  positioning: string;
  brandConcept: string;
  heroHeading: string;
  heroSupporting: string;
  heroDescription: string;
  email: string;
  whatsapp: string;
  location: string;
  adminPasskey: string;

  // Admin-controlled settings
  demoMode: boolean; // Demo mode ON/OFF
  showPricing: boolean; // Pricing visibility ON/OFF
  showServices: boolean; // Service visibility ON/OFF
  showFeatures: boolean; // Feature visibility ON/OFF
  ctaTitle: string;
  ctaSupportingText: string;
  upgradeMessage: string;

  // Modular premium features
  premiumFeatures: PremiumFeaturesConfig;
}

export interface FullSiteData {
  settings: SiteSettings;
  services: Service[];
  projects: Project[];
  experiences: ExperienceItem[];
  education: EducationItem[];
  skillCategories: SkillCategory[];
  socials: SocialPlatform[];
  leads: Lead[];
  messages: ContactMessage[];
  customRequests?: CustomWebsiteRequest[];
}
