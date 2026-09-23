import React from 'react';
import { SocialPlatform } from '../types';
import { IconHelper } from './IconHelper';
import { ShieldCheck, Lock, ArrowUp, BookOpen } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

interface FooterProps {
  socials?: SocialPlatform[];
  onOpenAdmin: () => void;
  onOpenProjectModal?: () => void;
  onOpenTeachingServices?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  socials = [],
  onOpenAdmin,
  onOpenProjectModal,
  onOpenTeachingServices
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Full set of verified social & professional networks with required aria-labels
  const defaultSocials: SocialPlatform[] = [
    {
      id: 'soc-whatsapp',
      platform: 'WhatsApp',
      name: 'Direct WhatsApp',
      url: 'https://wa.me/923331244214',
      handle: '03331244214',
      description: 'Instant direct chat for urgent project requirements.',
      icon: 'whatsapp',
      enabled: true
    },
    {
      id: 'soc-fiverr',
      platform: 'Fiverr',
      name: 'Fiverr Marketplace',
      url: 'https://www.fiverr.com/imran_khan1327',
      handle: '@imran_khan1327',
      description: 'Verified freelance services with escrow buyer protection.',
      icon: 'fiverr',
      enabled: true
    },
    {
      id: 'soc-upwork',
      platform: 'Upwork',
      name: 'Upwork Freelancer',
      url: 'https://www.upwork.com',
      handle: 'Engr. Imran Khan',
      description: 'Professional freelance engineering contracts.',
      icon: 'upwork',
      enabled: true
    },
    {
      id: 'soc-linkedin',
      platform: 'LinkedIn',
      name: 'LinkedIn Profile',
      url: 'https://www.linkedin.com/in/imran-khan-b7299833a/',
      handle: 'imran-khan-b7299833a',
      description: 'Professional engineering network and publications.',
      icon: 'linkedin',
      enabled: true
    },
    {
      id: 'soc-youtube',
      platform: 'YouTube',
      name: 'YouTube Channel',
      url: 'https://www.youtube.com/@TeachWithImran1',
      handle: '@TeachWithImran1',
      description: 'IoT, programming & STEM video tutorials.',
      icon: 'youtube',
      enabled: true
    },
    {
      id: 'soc-facebook',
      platform: 'Facebook',
      name: 'Facebook Page',
      url: 'https://www.facebook.com/profile.php?id=61586602392197',
      handle: 'Engr. Imran Khan Official',
      description: 'Community projects and engineering workshops.',
      icon: 'facebook',
      enabled: true
    },
    {
      id: 'soc-instagram',
      platform: 'Instagram',
      name: 'Instagram Account',
      url: 'https://www.instagram.com/teachwithimran/',
      handle: '@teachwithimran',
      description: 'Circuit prototyping reels and design prototypes.',
      icon: 'instagram',
      enabled: true
    },
    {
      id: 'soc-tiktok',
      platform: 'TikTok',
      name: 'TikTok Account',
      url: 'https://www.tiktok.com/@teachwithimran',
      handle: '@teachwithimran',
      description: 'Bite-sized technology demos and coding experiments.',
      icon: 'tiktok',
      enabled: true
    }
  ];

  const displaySocials = socials && socials.length > 0 ? socials : defaultSocials;

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services (6 Core)', href: '#services' },
    { label: 'Work & Projects', href: '#work' },
    { label: 'Experience & Education', href: '#experience' },
    { label: 'Teaching Services (Students / Institutes)', href: '#teaching-services' },
    { label: 'Contact & Quotes', href: '#contact' },
  ];

  return (
    <footer className="bg-[#050913] border-t border-slate-900 text-slate-400 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* Brand Info & Mini Social Icons Row (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center font-mono font-extrabold text-white shadow-md shadow-orange-500/20">
                S
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block">
                  S • ENGR - Engr. Imran Khan
                </span>
                <span className="text-[10px] font-mono text-orange-400">
                  Official Engineering &amp; Technology Hub
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Computer Science • IoT Hardware Prototyping • Brand &amp; Creative Design • Meta Ads • Civil Site Construction • UNICEF Program Instruction.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-[11px] text-orange-300 font-mono">
              <strong className="text-white block mb-0.5 font-sans">Core Philosophy:</strong>
              Learn • Create • Build • Teach • Deliver
            </div>

            {/* Small Footer Icon Row with aria-labels */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-2 font-mono">
                Social &amp; Professional Networks:
              </span>
              <div className="flex flex-wrap gap-2">
                {displaySocials.map((soc) => (
                  <a
                    key={soc.id}
                    id={`footer-social-${soc.platform.toLowerCase()}`}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-orange-500/20 border border-slate-800 hover:border-orange-500/50 text-slate-300 hover:text-orange-400 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                    title={`${soc.platform}: ${soc.handle}`}
                    aria-label={`${soc.platform}: ${soc.handle}`}
                  >
                    <IconHelper name={soc.icon || soc.platform} className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.href === '#teaching-services' && onOpenTeachingServices) {
                        e.preventDefault();
                        onOpenTeachingServices();
                      }
                    }}
                    className="hover:text-orange-400 transition-colors flex items-center space-x-1.5"
                  >
                    <span className="text-slate-600">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Collaboration Inquiry (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Work With Engr. Imran Khan
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Available for direct contracts, IoT hardware prototyping, responsive web applications, or verified escrow on Fiverr.
            </p>

            <div className="space-y-2">
              <a
                href="https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 transition-all shadow-md shadow-orange-500/20 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              {onOpenTeachingServices && (
                <button
                  onClick={onOpenTeachingServices}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                  <span>Teaching &amp; Student Inquiries</span>
                </button>
              )}
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
              <span>Milestone escrow protection &amp; authentic capability guarantee.</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Copyright & Back-to-Top */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-400 text-center sm:text-left">
            © 2020-2026 S • ENGR Hub (S • ENGR - Engr. Imran Khan). All rights reserved.
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenAdmin}
              className="text-[11px] text-slate-400 hover:text-orange-400 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Access</span>
            </button>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-orange-400 border border-slate-800 transition-all cursor-pointer flex items-center space-x-1"
              title="Scroll to top"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="text-[10px] uppercase font-mono font-bold hidden sm:inline">Top</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
