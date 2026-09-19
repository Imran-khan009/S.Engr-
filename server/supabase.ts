import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  FullSiteData,
  Lead,
  CustomWebsiteRequest,
  TeachingServiceRequest,
  Service,
  Project,
  TeachingService,
  TeachingConsultationSettings,
  SiteSettings
} from '../src/types';

// Server-side Supabase client initialization
let serverSupabaseClient: SupabaseClient | null = null;

export function getServerSupabase(): SupabaseClient | null {
  if (serverSupabaseClient) return serverSupabaseClient;

  const url = process.env.SUPABASE_URL;
  // Prioritize service role key on the server to bypass RLS for admin workflows & migrations
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  try {
    serverSupabaseClient = createClient(url, key, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
    return serverSupabaseClient;
  } catch (err) {
    console.error('Failed to initialize server-side Supabase client:', err);
    return null;
  }
}

/**
 * Verify a Supabase Auth JWT token passed from the frontend client.
 * Returns the authenticated user or null.
 */
export async function verifySupabaseToken(token: string) {
  const supabase = getServerSupabase();
  if (!supabase) return null;

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return null;
    }
    return user;
  } catch (err) {
    console.error('Error verifying Supabase user token:', err);
    return null;
  }
}

/**
 * Sync / Seed in-memory or JSON site data to Supabase tables.
 * Can be called during server boot or via the admin reset endpoint.
 */
export async function syncDatabaseToSupabase(data: FullSiteData): Promise<{ success: boolean; message: string }> {
  const supabase = getServerSupabase();
  if (!supabase) {
    return { success: false, message: 'Supabase credentials not configured' };
  }

  try {
    // 1. Site Settings
    const { adminPasskey, ...publicSettings } = data.settings;
    await supabase.from('site_settings').upsert({
      id: 'current',
      brand_name: publicSettings.brandName,
      professional_name: publicSettings.professionalName,
      positioning: publicSettings.positioning,
      brand_concept: publicSettings.brandConcept,
      hero_heading: publicSettings.heroHeading,
      hero_supporting: publicSettings.heroSupporting,
      hero_description: publicSettings.heroDescription,
      email: publicSettings.email,
      whatsapp: publicSettings.whatsapp,
      location: publicSettings.location,
      demo_mode: publicSettings.demoMode,
      show_pricing: publicSettings.showPricing,
      show_services: publicSettings.showServices,
      show_features: publicSettings.showFeatures,
      cta_title: publicSettings.ctaTitle,
      cta_supporting_text: publicSettings.ctaSupportingText,
      upgrade_message: publicSettings.upgradeMessage,
      premium_features: publicSettings.premiumFeatures,
      updated_at: new Date().toISOString()
    });

    // 2. Services
    if (data.services && data.services.length > 0) {
      const servicesPayload = data.services.map(s => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        category: s.category,
        short_description: s.shortDescription,
        problem: s.problem,
        solution: s.solution,
        included_features: s.includedFeatures,
        tools: s.tools,
        pricing_model: s.pricingModel || s.pricingType || 'starting_at',
        starting_price: s.startingPrice,
        estimated_delivery: s.estimatedDelivery,
        portfolio_examples: s.portfolioExamples,
        process: s.process,
        faqs: s.faqs,
        icon_name: s.iconName,
        featured: s.featured ?? false,
        updated_at: new Date().toISOString()
      }));
      await supabase.from('services').upsert(servicesPayload);
    }

    // 3. Projects
    if (data.projects && data.projects.length > 0) {
      const projectsPayload = data.projects.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        description: p.description,
        problem: p.problem,
        solution: p.solution,
        technologies: p.technologies,
        tools: p.tools,
        role: p.role,
        project_type: p.projectType,
        images: p.images,
        live_url: p.liveUrl,
        github_url: p.githubUrl,
        fiverr_url: p.fiverrUrl,
        upwork_url: p.upworkUrl,
        featured: p.featured,
        date: p.date,
        updated_at: new Date().toISOString()
      }));
      await supabase.from('projects').upsert(projectsPayload);
    }

    // 4. Teaching Services
    if (data.teachingServices && data.teachingServices.length > 0) {
      const teachingServicesPayload = data.teachingServices.map(s => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        category: s.category,
        subtitle: s.subtitle,
        short_description: s.shortDescription,
        description: s.description,
        who_is_this_for: s.whoIsThisFor,
        sub_offerings: s.subOfferings,
        what_is_included: s.whatIsIncluded,
        deliverables: s.deliverables,
        sample_preview: s.samplePreview,
        process: s.process,
        faqs: s.faqs,
        pricing_type: s.pricingType,
        starting_price: s.startingPrice,
        premium_price: s.premiumPrice,
        delivery_time: s.deliveryTime,
        icon: s.icon,
        enabled: s.enabled,
        order_index: s.order,
        updated_at: new Date().toISOString()
      }));
      await supabase.from('teaching_services').upsert(teachingServicesPayload);
    }

    // 5. Teaching Consultation
    if (data.teachingConsultation) {
      await supabase.from('teaching_consultation').upsert({
        id: 'current',
        title: data.teachingConsultation.title,
        headline: data.teachingConsultation.headline,
        subtext: data.teachingConsultation.subtext,
        price: data.teachingConsultation.price,
        duration: data.teachingConsultation.duration,
        topics: data.teachingConsultation.topics,
        enabled: data.teachingConsultation.enabled,
        updated_at: new Date().toISOString()
      });
    }

    return { success: true, message: 'Supabase PostgreSQL database synchronized successfully' };
  } catch (err: any) {
    console.error('Failed syncing data to Supabase:', err);
    return { success: false, message: err?.message || 'Database synchronization error' };
  }
}

/**
 * Load full site data from Supabase if available.
 * Returns null if Supabase is unavailable or empty.
 */
export async function loadDataFromSupabase(): Promise<Partial<FullSiteData> | null> {
  const supabase = getServerSupabase();
  if (!supabase) return null;

  try {
    const [settingsRes, servicesRes, projectsRes, teachingServicesRes, consultationRes, leadsRes, customReqsRes, teachingReqsRes] = await Promise.all([
      supabase.from('site_settings').select('*').eq('id', 'current').maybeSingle(),
      supabase.from('services').select('*').order('order_index', { ascending: true }),
      supabase.from('projects').select('*').order('order_index', { ascending: true }),
      supabase.from('teaching_services').select('*').order('order_index', { ascending: true }),
      supabase.from('teaching_consultation').select('*').eq('id', 'current').maybeSingle(),
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('custom_website_requests').select('*').order('created_at', { ascending: false }),
      supabase.from('teaching_requests').select('*').order('created_at', { ascending: false })
    ]);

    // Build hydrated partial site data
    const partial: Partial<FullSiteData> = {};

    if (settingsRes.data) {
      const s = settingsRes.data;
      partial.settings = {
        brandName: s.brand_name,
        professionalName: s.professional_name,
        positioning: s.positioning,
        brandConcept: s.brand_concept,
        heroHeading: s.hero_heading,
        heroSupporting: s.hero_supporting,
        heroDescription: s.hero_description,
        email: s.email,
        whatsapp: s.whatsapp,
        location: s.location,
        adminPasskey: '', // Never store in public settings
        demoMode: s.demo_mode ?? false,
        showPricing: s.show_pricing ?? true,
        showServices: s.show_services ?? true,
        showFeatures: s.show_features ?? true,
        ctaTitle: s.cta_title,
        ctaSupportingText: s.cta_supporting_text,
        upgradeMessage: s.upgrade_message,
        premiumFeatures: s.premium_features || {}
      };
    }

    if (servicesRes.data && servicesRes.data.length > 0) {
      partial.services = servicesRes.data.map(row => ({
        id: row.id,
        name: row.name,
        slug: row.slug,
        category: row.category,
        shortDescription: row.short_description,
        problem: row.problem || '',
        solution: row.solution || '',
        includedFeatures: row.included_features || [],
        tools: row.tools || [],
        pricingModel: row.pricing_model || 'starting_at',
        startingPrice: row.starting_price,
        estimatedDelivery: row.estimated_delivery || '3-5 Days',
        portfolioExamples: row.portfolio_examples || [],
        process: row.process || [],
        faqs: row.faqs || [],
        iconName: row.icon_name || 'Code',
        featured: row.featured
      }));
    }

    if (projectsRes.data && projectsRes.data.length > 0) {
      partial.projects = projectsRes.data.map(row => ({
        id: row.id,
        title: row.title,
        category: row.category,
        description: row.description || '',
        problem: row.problem || '',
        solution: row.solution || '',
        technologies: row.technologies || [],
        tools: row.tools || [],
        role: row.role || 'Lead Engineer',
        projectType: row.project_type || 'Engineering & Development',
        images: row.images || [],
        liveUrl: row.live_url,
        githubUrl: row.github_url,
        fiverrUrl: row.fiverr_url,
        upworkUrl: row.upwork_url,
        featured: row.featured ?? false,
        date: row.date || '2024'
      }));
    }

    if (teachingServicesRes.data && teachingServicesRes.data.length > 0) {
      partial.teachingServices = teachingServicesRes.data.map(row => ({
        id: row.id,
        slug: row.slug,
        title: row.title,
        category: row.category || 'Technical Education',
        subtitle: row.subtitle || '',
        shortDescription: row.short_description || '',
        description: row.description || '',
        whoIsThisFor: row.who_is_this_for || [],
        subOfferings: row.sub_offerings || [],
        whatIsIncluded: row.what_is_included || [],
        deliverables: row.deliverables || [],
        samplePreview: row.sample_preview || { title: '', excerpt: '', notice: '' },
        process: row.process || [],
        faqs: row.faqs || [],
        pricingType: row.pricing_type || 'starting_at',
        startingPrice: row.starting_price,
        premiumPrice: row.premium_price,
        deliveryTime: row.delivery_time || '2-3 Days',
        icon: row.icon || 'BookOpen',
        enabled: row.enabled ?? true,
        order: row.order_index ?? 0
      }));
    }

    if (consultationRes.data) {
      const c = consultationRes.data;
      partial.teachingConsultation = {
        title: c.title,
        headline: c.headline || c.title,
        subtext: c.subtext || '',
        price: c.price || '$35',
        duration: c.duration || '45 min',
        topics: c.topics || [],
        enabled: c.enabled ?? true
      };
    }

    if (leadsRes.data) {
      partial.leads = leadsRes.data.map(row => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        phone: row.phone,
        whatsapp: row.whatsapp,
        country: row.country,
        serviceRequired: row.service_required,
        projectDescription: row.project_description,
        referenceRequirements: row.reference_requirements,
        budget: row.budget,
        deadline: row.deadline,
        preferredContactMethod: row.preferred_contact_method,
        platformPreference: row.platform_preference,
        fileName: row.file_name,
        fileUrl: row.file_url,
        fileSize: row.file_size,
        fileType: row.file_type,
        status: row.status,
        createdAt: row.created_at,
        adminNotes: row.admin_notes
      }));
    }

    if (customReqsRes.data) {
      partial.customRequests = customReqsRes.data.map(row => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        whatsapp: row.whatsapp,
        businessName: row.business_name,
        websiteType: row.website_type,
        requiredServices: row.required_services || [],
        designPreference: row.design_preference,
        requiredFeatures: row.required_features || [],
        budget: row.budget,
        deadline: row.deadline,
        additionalRequirements: row.additional_requirements,
        status: row.status,
        createdAt: row.created_at,
        adminNotes: row.admin_notes
      }));
    }

    if (teachingReqsRes.data) {
      partial.teachingRequests = teachingReqsRes.data.map(row => ({
        id: row.id,
        fullName: row.full_name,
        email: row.email,
        whatsapp: row.whatsapp,
        country: row.country,
        userRole: row.user_role,
        subject: row.subject,
        studentLevel: row.student_level,
        topic: row.topic,
        courseOrModule: row.course_module,
        requiredServiceId: row.required_service_id || '',
        requiredServiceName: row.required_service_name,
        numberOfLessons: row.number_of_lessons,
        requiredFormat: row.required_format,
        deadline: row.deadline,
        budget: row.budget,
        additionalRequirements: row.additional_requirements,
        isCustomRequest: row.is_custom,
        fileAttachment: row.file_name ? {
          fileName: row.file_name,
          fileSize: row.file_size,
          fileType: row.file_type,
          fileUrl: row.file_url
        } : undefined,
        status: row.status,
        createdAt: row.created_at,
        adminNotes: row.admin_notes
      }));
    }

    return partial;
  } catch (err) {
    console.error('Error loading data from Supabase:', err);
    return null;
  }
}
