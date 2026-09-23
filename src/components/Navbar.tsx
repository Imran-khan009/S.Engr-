import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowRight, FileText } from 'lucide-react';
import { SEngrLogo } from './SEngrLogo';

interface NavbarProps {
  onOpenHireModal: (preselectedService?: string) => void;
  onOpenAdmin: () => void;
  onOpenCustomModal?: () => void;
  onOpenCvModal?: () => void;
  demoMode?: boolean;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHireModal,
  onOpenAdmin,
  onOpenCvModal,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exactly 5 nav links + HIRE ME button = 6 items
  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'SERVICES', href: '#services' },
    { label: 'WORK', href: '#work' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 inset-x-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080d1a]/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/50 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Unified Brand Logo: S • ENGR */}
          <a
            id="brand-logo-link"
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center text-left focus:outline-none"
          >
            <SEngrLogo variant="navbar" />
          </a>

          {/* Desktop Navigation: 5 links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-4 py-1.5 text-xs font-semibold tracking-wider transition-all duration-200 rounded-full ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Area: CV Profile + Admin Switcher + HIRE ME Button */}
          <div className="hidden sm:flex items-center space-x-2.5">
            {/* Download CV / Technical Profile Button */}
            <button
              id="nav-cv-btn"
              onClick={() => {
                if (onOpenCvModal) onOpenCvModal();
                else window.open('/assets/Cv_IK.pdf', '_blank');
              }}
              title="Download Technical Profile / CV"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-orange-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/40 transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-orange-400" />
              <span>CV Profile</span>
            </button>

            {/* Admin Access Icon */}
            <button
              id="admin-dashboard-btn"
              onClick={onOpenAdmin}
              title="Admin CMS"
              className="p-2.5 rounded-xl text-slate-400 hover:text-orange-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors"
              aria-label="Admin CMS"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* HIRE ME Button */}
            <button
              id="nav-hire-me-btn"
              onClick={() => onOpenHireModal()}
              className="px-5 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-400 hover:to-amber-500 transition-all shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2 cursor-pointer"
            >
              <span>HIRE ME</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onOpenHireModal()}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase text-white bg-orange-500 shadow-sm"
            >
              Hire Me
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080d1a]/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-3 rounded-xl text-xs font-bold tracking-wider text-slate-200 hover:bg-slate-800 hover:text-orange-400 border border-transparent hover:border-slate-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenHireModal();
                }}
                className="flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-600 text-center shadow-md shadow-orange-500/20"
              >
                Hire Me Now
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-orange-400"
                aria-label="Admin Dashboard"
              >
                <Shield className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCvModal) onOpenCvModal();
                else window.open('/assets/Cv_IK.pdf', '_blank');
              }}
              className="w-full py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-orange-400 bg-orange-950/30 border border-orange-500/40 flex items-center justify-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download CV / Technical Profile</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
