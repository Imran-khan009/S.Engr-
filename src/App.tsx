/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FullSiteData, Service, Lead, TeachingService } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesMarketplace } from './components/ServicesMarketplace';
import { Portfolio } from './components/Portfolio';
import { StatsSection } from './components/StatsSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { TeachingSection } from './components/TeachingSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

// Modals
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ProjectRequestModal } from './components/ProjectRequestModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TeachingServiceDetailModal } from './components/TeachingServiceDetailModal';
import { TeachingRequestModal } from './components/TeachingRequestModal';
import { CustomWebsiteModal } from './components/CustomWebsiteModal';
import { DemoComparisonModal } from './components/DemoComparisonModal';
import { DemoBanner } from './components/DemoBanner';
import { CvModal } from './components/CvModal';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [siteData, setSiteData] = useState<FullSiteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modal States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState<boolean>(false);
  const [isCustomWebsiteModalOpen, setIsCustomWebsiteModalOpen] = useState<boolean>(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [selectedDetailService, setSelectedDetailService] = useState<Service | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);

  // Teaching Modals State
  const [selectedTeachingServiceForDetail, setSelectedTeachingServiceForDetail] = useState<TeachingService | null>(null);
  const [isTeachingDetailModalOpen, setIsTeachingDetailModalOpen] = useState<boolean>(false);
  const [selectedTeachingServiceForRequest, setSelectedTeachingServiceForRequest] = useState<TeachingService | null>(null);
  const [isTeachingRequestModalOpen, setIsTeachingRequestModalOpen] = useState<boolean>(false);
  const [isTeachingCustomMode, setIsTeachingCustomMode] = useState<boolean>(false);

  const fetchSiteData = async () => {
    try {
      const res = await fetch('/api/site-data');
      if (!res.ok) throw new Error('Failed to load site data');
      const data: FullSiteData = await res.json();
      setSiteData(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error connecting to database');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSiteData();
  }, []);

  // Track active section for top navigation highlighting (6 items: home, services, work, experience, contact)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'work', 'experience', 'teaching-services', 'contact'];
      const scrollPosition = window.scrollY + 120;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenProjectModal = (service?: Service) => {
    setSelectedServiceForModal(service || null);
    setIsProjectModalOpen(true);
  };

  const handleOpenHireModal = (preselectedServiceName?: string) => {
    if (preselectedServiceName && siteData?.services) {
      const found = siteData.services.find(s => s.name.toLowerCase() === preselectedServiceName.toLowerCase());
      handleOpenProjectModal(found);
    } else {
      handleOpenProjectModal();
    }
  };

  const handleLeadSubmitted = (lead: Lead) => {
    fetchSiteData();
  };

  const handleRequestSimilar = (category: string) => {
    const matchedService = siteData?.services.find(s => s.category.toLowerCase().includes(category.toLowerCase()));
    handleOpenProjectModal(matchedService);
  };

  const handleOpenTeachingDetail = (service: TeachingService) => {
    setSelectedTeachingServiceForDetail(service);
    setIsTeachingDetailModalOpen(true);
  };

  const handleOpenTeachingRequest = (service?: TeachingService) => {
    setSelectedTeachingServiceForRequest(service || null);
    setIsTeachingCustomMode(false);
    setIsTeachingRequestModalOpen(true);
  };

  const handleOpenTeachingCustomRequest = () => {
    setSelectedTeachingServiceForRequest(null);
    setIsTeachingCustomMode(true);
    setIsTeachingRequestModalOpen(true);
  };

  const handleScrollToTeaching = () => {
    const el = document.getElementById('teaching-services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading && !siteData) {
    return (
      <div className="min-h-screen bg-[#080d1a] flex flex-col items-center justify-center text-slate-300 font-mono">
        <Loader2 className="w-8 h-8 text-orange-400 animate-spin mb-4" />
        <span className="text-sm font-bold text-white tracking-widest uppercase">
          Initializing S • ENGR - Engr. Imran Khan...
        </span>
        <span className="text-xs text-slate-400 mt-2">
          Engineering Solutions &amp; Verified Services Marketplace
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 flex flex-col relative selection:bg-orange-500 selection:text-white">
      
      {/* Sticky Top Header: Simplified to 6 nav items */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {siteData?.settings?.demoMode === true && (
          <DemoBanner
            onOpenComparison={() => setIsComparisonModalOpen(true)}
            onRequestCustom={() => setIsCustomWebsiteModalOpen(true)}
          />
        )}
        <Navbar
          onOpenHireModal={handleOpenHireModal}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenCustomModal={() => setIsCustomWebsiteModalOpen(true)}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          demoMode={Boolean(siteData?.settings?.demoMode)}
          activeSection={activeSection}
        />
      </div>

      <main className="flex-1 relative z-10">
        
        {/* 1. Hero Section: Single H1, Trust Sub-line, 2 CTAs, Photo, Ambient Glow in hero only */}
        <Hero
          onExploreWork={() => {
            const el = document.getElementById('work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onHireMe={() => handleOpenProjectModal()}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* 2. About Section: Story, Execution Loop & Embedded "Skills Ecosystem" Strip */}
        <AboutSection
          onHireMe={() => handleOpenProjectModal()}
          categories={siteData?.skillCategories || []}
          onSelectSkillForInquiry={() => handleOpenProjectModal()}
        />

        {/* 3. Services: ONE single consolidated 6-card section (Deleted other duplicates) */}
        <ServicesMarketplace
          services={siteData?.services || []}
          onViewDetails={(service) => setSelectedDetailService(service)}
          onRequestService={(service) => handleOpenProjectModal(service)}
          showPricing={siteData?.settings?.showPricing ?? true}
          showServices={siteData?.settings?.showServices ?? true}
        />

        {/* 4. Work Section: Real-world projects with interactive schematics */}
        {siteData?.projects && (
          <Portfolio
            projects={siteData.projects}
            onRequestSimilarService={handleRequestSimilar}
          />
        )}

        {/* 5. Trust Proof Part 1: Results in Numbers (Stats Strip after WORK) */}
        <StatsSection />

        {/* 5. Trust Proof Part 2: Testimonials Section */}
        <TestimonialsSection testimonials={siteData?.testimonials} />

        {/* 5. Trust Proof Part 3: Verified Experience Records & Teaching Callout Banner */}
        <ExperienceTimeline
          experiences={siteData?.experiences || []}
          education={siteData?.education || []}
          onOpenTeachingServices={handleScrollToTeaching}
          onOpenCvModal={() => setIsCvModalOpen(true)}
        />

        {/* Teaching Services (Linked from Footer and Experience Section) */}
        {siteData?.teachingServices && (
          <TeachingSection
            services={siteData.teachingServices}
            consultation={siteData.teachingConsultation}
            products={siteData.teachingProducts || []}
            onOpenDetailModal={handleOpenTeachingDetail}
            onOpenRequestModal={handleOpenTeachingRequest}
            onOpenCustomRequest={handleOpenTeachingCustomRequest}
            onOpenConsultationModal={() => handleOpenTeachingRequest()}
          />
        )}

        {/* 6. FAQ Section: 5 questions with semantic <details> for SEO */}
        <FaqSection />

        {/* 4. Contact Section: FIND ME ONLINE (3 cards) + Simple Contact Form with WhatsApp/Mailto */}
        <ContactSection
          socials={siteData?.socials || []}
          onOpenProjectModal={() => handleOpenProjectModal()}
        />

      </main>

      {/* Floating WhatsApp Action Button (bottom-right on mobile & desktop) */}
      <FloatingWhatsApp />

      {/* Footer: Unified brand, mini social icons with aria-labels, copyright, Back-to-Top */}
      <Footer
        socials={siteData?.socials || []}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenProjectModal={() => handleOpenProjectModal()}
        onOpenTeachingServices={handleScrollToTeaching}
      />

      {/* Service Detail Modal */}
      {selectedDetailService && (
        <ServiceDetailModal
          service={selectedDetailService}
          allProjects={siteData?.projects || []}
          onClose={() => setSelectedDetailService(null)}
          onStartProject={(service) => {
            setSelectedDetailService(null);
            handleOpenProjectModal(service);
          }}
        />
      )}

      {/* Project Request Modal */}
      {siteData && (
        <ProjectRequestModal
          isOpen={isProjectModalOpen}
          onClose={() => setIsProjectModalOpen(false)}
          services={siteData.services}
          initialService={selectedServiceForModal}
          onLeadSubmitted={handleLeadSubmitted}
        />
      )}

      {/* Admin Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteData={siteData}
        onRefreshData={fetchSiteData}
      />

      {/* Demo Comparison Modal */}
      <DemoComparisonModal
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
        onRequestCustom={() => {
          setIsComparisonModalOpen(false);
          setIsCustomWebsiteModalOpen(true);
        }}
        premiumFeatures={siteData?.settings?.premiumFeatures}
      />

      {/* Custom Website Modal */}
      <CustomWebsiteModal
        isOpen={isCustomWebsiteModalOpen}
        onClose={() => setIsCustomWebsiteModalOpen(false)}
        onRequestSubmitted={() => fetchSiteData()}
      />

      {/* Teaching Service Detail Modal */}
      <TeachingServiceDetailModal
        service={selectedTeachingServiceForDetail}
        isOpen={isTeachingDetailModalOpen}
        onClose={() => setIsTeachingDetailModalOpen(false)}
        onRequestService={(service) => {
          setIsTeachingDetailModalOpen(false);
          handleOpenTeachingRequest(service);
        }}
      />

      {/* Teaching Service Request Modal */}
      <TeachingRequestModal
        isOpen={isTeachingRequestModalOpen}
        onClose={() => setIsTeachingRequestModalOpen(false)}
        preselectedService={selectedTeachingServiceForRequest}
        allServices={siteData?.teachingServices || []}
        isCustomMode={isTeachingCustomMode}
        onSuccess={() => fetchSiteData()}
      />

      {/* Official Verified CV / Technical Profile Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />

    </div>
  );
}
