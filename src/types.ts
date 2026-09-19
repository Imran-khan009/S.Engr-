export type ServiceCategory = 
  | 'Technology & Web'
  | 'Programming & Software'
  | 'IoT & Smart Technology'
  | 'Creative Design & Branding'
  | 'Digital Marketing & Ads'
  | 'Video Editing'
  | 'Excel & Data Services'
  | 'Construction & Design';

export type PricingModel = 
  | 'Fixed Price'
  | 'Starting From'
  | 'Custom Quote'
  | 'Contact for Quote'
  | 'Hourly Rate'
  | 'Milestone-based'
  | 'fixed'
  | 'starting_at'
  | 'hourly'
  | 'milestone'
  | 'custom_quote';

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
  pricingType?: PricingModel;
  pricingModel?: PricingModel | string;
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
  trade?: string;
  organization: string;
  supportingProgram?: string;
  location: string;
  dates: string;
  startDate?: string;
  status?: string;
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
  fileUrl?: string;
  fileSize?: string;
  fileType?: string;
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

export type TeachingRequestStatus = 
  | 'NEW'
  | 'REVIEWING'
  | 'QUOTED'
  | 'PAYMENT PENDING'
  | 'PAID'
  | 'IN PROGRESS'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface TeachingSubOffering {
  title: string;
  description: string;
}

export interface TeachingService {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  whoIsThisFor: string[];
  subOfferings: TeachingSubOffering[];
  whatIsIncluded: string[];
  deliverables: string[];
  samplePreview: {
    title: string;
    excerpt: string;
    notice: string;
  };
  process: string[];
  faqs: { question: string; answer: string }[];
  pricingType: 'starting_at' | 'fixed' | 'custom_quote';
  startingPrice: string; // e.g. "$45" or "Custom Quote"
  premiumPrice?: string; // optional premium tier, e.g. "$95"
  deliveryTime: string; // e.g. "2-3 Days"
  icon: string; // Icon name e.g. "BookOpen", "Wrench", "Layers", "FileCheck", "Users"
  enabled: boolean;
  order: number;
}

export interface TeachingServiceRequest {
  id: string;
  fullName: string;
  email: string;
  whatsapp: string;
  country: string;
  userRole: 'Teacher' | 'Student' | 'Instructor' | 'Institute' | 'Other';
  subject: string;
  studentLevel: string; // e.g. "Beginners (Grades 6-8)", "Intermediate", "Vocational"
  topic: string;
  courseOrModule: string;
  requiredServiceId: string;
  requiredServiceName: string;
  numberOfLessons: string;
  requiredFormat: string; // "PDF Document" | "Editable Word / Google Docs" | "PowerPoint Presentation" | "Print-Ready Sheets" | "Custom"
  deadline: string;
  budget: string;
  additionalRequirements: string;
  isCustomRequest?: boolean;
  fileAttachment?: {
    fileName: string;
    fileSize?: string;
    fileType?: string;
    fileUrl?: string;
    storagePath?: string;
    dataUrl?: string; // backwards compatibility fallback
  };
  status: TeachingRequestStatus;
  createdAt: string;
  adminNotes?: string;
  supabaseSynced?: boolean;
}

export interface TeachingConsultationSettings {
  title: string;
  headline: string;
  subtext: string;
  price: string; // e.g. "$35"
  duration: string; // e.g. "45 min"
  topics: string[];
  enabled: boolean;
}

export interface TeachingDigitalProduct {
  id: string;
  title: string;
  category: 'Lesson Plan Templates' | 'Teaching Templates' | 'Worksheets' | 'Assessment Packs' | 'Course Planning Templates' | 'Instructor Resources';
  description: string;
  deliverableFormat: string;
  price: string;
  previewPoints: string[];
  isPaid: boolean;
  status: 'active' | 'coming_soon';
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
  teachingServices?: TeachingService[];
  teachingRequests?: TeachingServiceRequest[];
  teachingConsultation?: TeachingConsultationSettings;
  teachingProducts?: TeachingDigitalProduct[];
}

