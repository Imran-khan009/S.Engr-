import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, FileText, CheckCircle2, Eye, Rocket, Send } from 'lucide-react';

interface HireMeSectionProps {
  onViewDemo?: () => void;
  onRequestCustomWebsite?: () => void;
  onContactMe?: () => void;
  onStartProject?: () => void;
  onViewServices?: () => void;
  ctaTitle?: string;
  ctaSupportingText?: string;
  whatsappNumber?: string;
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({
  onViewDemo,
  onRequestCustomWebsite,
  onContactMe,
  onStartProject,
  onViewServices,
  ctaTitle = "Need a Customized Website?",
  ctaSupportingText = "Explore the demo or request a fully customized version built around your brand, services and business goals.",
  whatsappNumber = "03331244214"
}) => {
  const handleViewDemo = onViewDemo || onViewServices || (() => {
    const el = document.getElementById('services');
    el?.scrollIntoView({ behavior: 'smooth' });
  });

  const handleRequestCustom = onRequestCustomWebsite || onStartProject || (() => {});

  const handleContactMe = onContactMe || (() => {
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <section id="custom-website-cta" className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Engineering & Bespoke Builds</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-6 leading-tight">
          {ctaTitle}
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          {ctaSupportingText}
        </p>

        {/* 3 Explicit Buttons: VIEW DEMO | REQUEST CUSTOM WEBSITE | CONTACT ME */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {/* 1. VIEW DEMO */}
          <button
            id="cta-btn-view-demo"
            onClick={handleViewDemo}
            className="px-7 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>VIEW DEMO</span>
          </button>

          {/* 2. REQUEST CUSTOM WEBSITE */}
          <button
            id="cta-btn-request-custom-website"
            onClick={handleRequestCustom}
            className="px-8 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
          >
            <Rocket className="w-4 h-4" />
            <span>REQUEST CUSTOM WEBSITE</span>
          </button>

          {/* 3. CONTACT ME */}
          <button
            id="cta-btn-contact-me"
            onClick={handleContactMe}
            className="px-7 py-4 rounded-xl font-bold font-mono text-xs uppercase tracking-wider text-cyan-400 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/60 hover:border-cyan-700 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
          >
            <Send className="w-3.5 h-3.5" />
            <span>CONTACT ME</span>
          </button>
        </div>

        {/* Key Guarantees & Modular Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-800/80 text-left">
          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5 font-mono">100% Modular Architecture</h4>
              <p className="text-[11px] text-slate-400">Enable or disable client portals, booking, CMS or IoT modules on demand.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5 font-mono">Zero Fabricated Claims</h4>
              <p className="text-[11px] text-slate-400">Realistic scopes, clear milestones, and verified delivery timelines.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5 font-mono">Direct & Escrow Options</h4>
              <p className="text-[11px] text-slate-400">Collaborate directly with custom invoices or via Fiverr & Upwork escrow.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
