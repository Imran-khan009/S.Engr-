/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FullSiteData, Service, Lead } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QuickIntro } from './components/QuickIntro';
import { ServicesMarketplace } from './components/ServicesMarketplace';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { Portfolio } from './components/Portfolio';
import { HireMeSection } from './components/HireMeSection';
import { FreelanceHub } from './components/FreelanceHub';
import { TeachingSection } from './components/TeachingSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { SkillsEcosystem } from './components/SkillsEcosystem';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectRequestModal } from './components/ProjectRequestModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Loader2 } from 'lucide-react';

export default function App() {
  const [siteData, setSiteData] = useState<FullSiteData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [selectedDetailService, setSelectedDetailService] = useState<Service | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | undefined>(undefined);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

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

  // Track active section for Navbar highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'work', 'experience', 'skills', 'teach', 'contact'];
      const scrollPosition = window.scrollY + 100;
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

  const handleSelectSkillForInquiry = (skillName: string) => {
    handleOpenProjectModal();
  };

  const handleExploreCategory = (category: string) => {
    setSelectedCategoryFilter(category);
    const el = document.getElementById('services');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading && !siteData) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-300 font-mono">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin mb-4" />
        <span className="text-sm font-bold text-white tracking-widest uppercase">
          Initializing S • ENGR Hub...
        </span>
        <span className="text-xs text-slate-500 mt-2">
          Engr. Imran Khan Portfolio & Service Marketplace
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Navigation */}
      <Navbar
        onOpenHireModal={handleOpenHireModal}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-1">
        {/* Section 1: Hero */}
        <Hero
          onExploreWork={() => {
            const el = document.getElementById('work');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onHireMe={() => handleOpenProjectModal()}
          onMyServices={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 2: Quick Introduction & Identity Pillars */}
        <QuickIntro
          onExploreCategory={handleExploreCategory}
        />

        {/* Sections 3 - 14: Services Marketplace */}
        {siteData?.services && (
          <ServicesMarketplace
            services={siteData.services}
            onViewDetails={(service) => setSelectedDetailService(service)}
            onRequestService={(service) => handleOpenProjectModal(service)}
            selectedCategoryFilter={selectedCategoryFilter}
            onClearCategoryFilter={() => setSelectedCategoryFilter(undefined)}
          />
        )}

        {/* Featured Projects & Technical Diagrams */}
        {siteData?.projects && (
          <Portfolio
            projects={siteData.projects}
            onRequestSimilarService={handleRequestSimilar}
          />
        )}

        {/* Section 15: Need a Professional Solution? Hire Me */}
        <HireMeSection
          onStartProject={() => handleOpenProjectModal()}
          onViewServices={() => {
            const el = document.getElementById('services');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          whatsappNumber={siteData?.settings?.whatsapp}
        />

        {/* Section 16: Find Me Online (Freelance & Social Hub) */}
        {siteData?.socials && (
          <FreelanceHub socials={siteData.socials} />
        )}

        {/* Section 17: Teach With Imran (Pedagogy & UNICEF Highlights) */}
        <TeachingSection
          onContactForTeaching={() => {
            const el = document.getElementById('contact');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 18 & 19: Experience & Education Timeline */}
        {siteData?.experiences && siteData?.education && (
          <ExperienceTimeline
            experiences={siteData.experiences}
            education={siteData.education}
          />
        )}

        {/* Section 20: Skills Ecosystem (Matrix without fake % bars) */}
        {siteData?.skillCategories && (
          <SkillsEcosystem
            categories={siteData.skillCategories}
            onSelectSkillForInquiry={handleSelectSkillForInquiry}
          />
        )}

        {/* Section 21: About Section (Professional Story) */}
        <AboutSection
          onHireMe={() => handleOpenProjectModal()}
        />

        {/* Contact Section */}
        <ContactSection
          email={siteData?.settings?.email}
          whatsapp={siteData?.settings?.whatsapp}
          location={siteData?.settings?.location}
        />
      </main>

      {/* Section 24: Footer */}
      <Footer
        socials={siteData?.socials || []}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenProjectModal={() => handleOpenProjectModal()}
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

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteData={siteData}
        onRefreshData={fetchSiteData}
      />
    </div>
  );
}
