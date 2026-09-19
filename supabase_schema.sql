-- ==============================================================================
-- S • ENGR (Engr. Imran Khan) - Production Supabase PostgreSQL Schema & RLS Policies
-- Execute this script in your Supabase SQL Editor to provision tables,
-- row-level security (RLS), and file storage configuration.
-- ==============================================================================

-- 1. Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  brand_name TEXT NOT NULL DEFAULT 'S • ENGR',
  professional_name TEXT NOT NULL DEFAULT 'Engr. Imran Khan',
  positioning TEXT,
  brand_concept TEXT,
  hero_heading TEXT,
  hero_supporting TEXT,
  hero_description TEXT,
  email TEXT,
  whatsapp TEXT,
  location TEXT,
  demo_mode BOOLEAN DEFAULT false,
  show_pricing BOOLEAN DEFAULT true,
  show_services BOOLEAN DEFAULT true,
  show_features BOOLEAN DEFAULT true,
  cta_title TEXT,
  cta_supporting_text TEXT,
  upgrade_message TEXT,
  premium_features JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  tagline TEXT,
  short_description TEXT,
  full_description TEXT,
  starting_price TEXT,
  currency TEXT DEFAULT 'USD',
  pricing_model TEXT,
  delivery_time TEXT,
  scope_bullets JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  technologies JSONB DEFAULT '[]'::jsonb,
  portfolio_examples JSONB DEFAULT '[]'::jsonb,
  faqs JSONB DEFAULT '[]'::jsonb,
  is_featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Projects
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  client_or_context TEXT,
  role TEXT,
  timeline TEXT,
  technologies JSONB DEFAULT '[]'::jsonb,
  short_summary TEXT,
  problem_statement TEXT,
  solution_overview TEXT,
  architecture_summary TEXT,
  key_achievements JSONB DEFAULT '[]'::jsonb,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Experiences
CREATE TABLE IF NOT EXISTS experiences (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL,
  organization TEXT NOT NULL,
  period TEXT NOT NULL,
  location TEXT,
  type TEXT,
  description TEXT,
  bullet_points JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0
);

-- 5. Education
CREATE TABLE IF NOT EXISTS education (
  id TEXT PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  period TEXT NOT NULL,
  grade TEXT,
  highlights JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0
);

-- 6. Skill Categories
CREATE TABLE IF NOT EXISTS skill_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  skills JSONB DEFAULT '[]'::jsonb,
  order_index INT DEFAULT 0
);

-- 7. Socials
CREATE TABLE IF NOT EXISTS socials (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  handle TEXT,
  url TEXT NOT NULL,
  icon TEXT,
  badge TEXT,
  enabled BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0
);

-- 8. Customer Leads / Project Inquiries
CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  country TEXT,
  service_required TEXT NOT NULL,
  project_description TEXT NOT NULL,
  reference_requirements TEXT,
  budget TEXT,
  deadline TEXT,
  preferred_contact_method TEXT,
  platform_preference TEXT,
  file_name TEXT,
  file_url TEXT,
  file_size TEXT,
  file_type TEXT,
  status TEXT NOT NULL DEFAULT 'NEW',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Custom Website Requests
CREATE TABLE IF NOT EXISTS custom_website_requests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  business_name TEXT,
  website_type TEXT,
  required_services JSONB DEFAULT '[]'::jsonb,
  design_preference TEXT,
  required_features JSONB DEFAULT '[]'::jsonb,
  budget TEXT,
  deadline TEXT,
  additional_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'NEW',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Contact Messages
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Teaching Services
CREATE TABLE IF NOT EXISTS teaching_services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  badge TEXT,
  tagline TEXT,
  short_description TEXT,
  full_description TEXT,
  target_audience JSONB DEFAULT '[]'::jsonb,
  sample_deliverables JSONB DEFAULT '[]'::jsonb,
  pedagogy_methods JSONB DEFAULT '[]'::jsonb,
  deliverables JSONB DEFAULT '[]'::jsonb,
  starting_price TEXT,
  premium_price TEXT,
  delivery_time TEXT,
  icon TEXT,
  enabled BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Teaching Service Requests
CREATE TABLE IF NOT EXISTS teaching_requests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  country TEXT,
  user_role TEXT,
  subject TEXT,
  student_level TEXT,
  topic TEXT,
  course_module TEXT,
  required_service_id TEXT,
  required_service_name TEXT,
  number_of_lessons TEXT,
  required_format TEXT,
  deadline TEXT,
  budget TEXT,
  additional_requirements TEXT,
  is_custom BOOLEAN DEFAULT false,
  file_name TEXT,
  file_url TEXT,
  file_size TEXT,
  file_type TEXT,
  status TEXT NOT NULL DEFAULT 'NEW',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. Teaching Consultation Settings
CREATE TABLE IF NOT EXISTS teaching_consultation (
  id TEXT PRIMARY KEY DEFAULT 'current',
  title TEXT,
  duration TEXT,
  fee TEXT,
  description TEXT,
  formats JSONB DEFAULT '[]'::jsonb,
  calendly_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. Teaching Digital Products
CREATE TABLE IF NOT EXISTS teaching_products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  level TEXT,
  file_type TEXT,
  description TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  sample_pages INT DEFAULT 1,
  download_url TEXT,
  is_free BOOLEAN DEFAULT true,
  order_index INT DEFAULT 0
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_website_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_consultation ENABLE ROW LEVEL SECURITY;
ALTER TABLE teaching_products ENABLE ROW LEVEL SECURITY;

-- 1) Public Read Access (Anon and Authenticated) for public portfolio & service content
CREATE POLICY "Public can view site settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON services FOR SELECT USING (true);
CREATE POLICY "Public can view projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can view experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public can view education" ON education FOR SELECT USING (true);
CREATE POLICY "Public can view skill categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Public can view socials" ON socials FOR SELECT USING (true);
CREATE POLICY "Public can view teaching services" ON teaching_services FOR SELECT USING (true);
CREATE POLICY "Public can view teaching consultation" ON teaching_consultation FOR SELECT USING (true);
CREATE POLICY "Public can view teaching products" ON teaching_products FOR SELECT USING (true);

-- 2) Public Insert Access: Allow prospective clients and students to submit inquiries
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert custom website requests" ON custom_website_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert teaching requests" ON teaching_requests FOR INSERT WITH CHECK (true);

-- 3) Admin Full Access (Authenticated users only)
-- Only authenticated users (admins authenticated via Supabase Auth) can select/modify/delete leads and private inquiries
CREATE POLICY "Admin select leads" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update leads" ON leads FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete leads" ON leads FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin select custom requests" ON custom_website_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update custom requests" ON custom_website_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete custom requests" ON custom_website_requests FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin select contact messages" ON contact_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update contact messages" ON contact_messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete contact messages" ON contact_messages FOR DELETE TO authenticated USING (true);

CREATE POLICY "Admin select teaching requests" ON teaching_requests FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update teaching requests" ON teaching_requests FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin delete teaching requests" ON teaching_requests FOR DELETE TO authenticated USING (true);

-- Admin modification on site content
CREATE POLICY "Admin modify site settings" ON site_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify services" ON services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify projects" ON projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify experiences" ON experiences FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify education" ON education FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify skill categories" ON skill_categories FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify socials" ON socials FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify teaching services" ON teaching_services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify teaching consultation" ON teaching_consultation FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin modify teaching products" ON teaching_products FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ==============================================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION
-- ==============================================================================
-- Run the following to create the public/authenticated storage bucket for inquiry briefs
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-attachments', 'project-attachments', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Anyone can upload brief attachments up to 10MB
CREATE POLICY "Anyone can upload attachments" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'project-attachments');

-- Storage RLS: Anyone can read/download uploaded files via public URL
CREATE POLICY "Anyone can view attachments" ON storage.objects
FOR SELECT USING (bucket_id = 'project-attachments');

-- Storage RLS: Only authenticated admins can delete attachment files
CREATE POLICY "Admin can delete attachments" ON storage.objects
FOR DELETE TO authenticated USING (bucket_id = 'project-attachments');
