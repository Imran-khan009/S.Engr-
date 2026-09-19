import React from 'react';
import { X, Check, ArrowRight, Sparkles, Shield, Rocket, Settings, Laptop, Cpu, Code2, Globe } from 'lucide-react';
import { PremiumFeaturesConfig } from '../types';

interface DemoComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCustom: () => void;
  premiumFeatures?: PremiumFeaturesConfig;
}

export const DemoComparisonModal: React.FC<DemoComparisonModalProps> = ({
  isOpen,
  onClose,
  onRequestCustom,
  premiumFeatures
}) => {
  if (!isOpen) return null;

  const demoFeatures = [
    { title: "Homepage & Hero Narrative", desc: "Interactive identity pipeline, headline showcase and quick actions." },
    { title: "About Section & Professional Story", desc: "Background in CS, Civil Engineering, and tech execution." },
    { title: "Services Marketplace (11 Services)", desc: "Transparent problem/solution statements and CMS starting prices." },
    { title: "Portfolio & Live Circuit Simulators", desc: "Interactive soil moisture & ultrasonic water tank telemetry widgets." },
    { title: "Professional Skills Matrix", desc: "Categorized competencies across Tech, IoT, Creative, Ads & Civil." },
    { title: "Career & Education Timeline", desc: "Lasbela University BSCS & civil diploma academic milestones." },
    { title: "UNICEF Tech Pedagogy Highlight", desc: "Youth training program overview and 5-step learning pedagogy." },
    { title: "Direct Project Submission System", desc: "Multi-step client inquiry form with platform routing (Direct/Fiverr/Upwork)." },
    { title: "Social & Freelance Links Hub", desc: "9 official online profiles with CMS-managed destinations." },
    { title: "Responsive Layout & Motion", desc: "Mobile-first navigation, fluid desktop layout and dark tech styling." }
  ];

  const paidModules = [
    { key: 'customBranding', title: "Full Custom Branding", desc: "Custom logo identity, typography pairing, and bespoke color system built for your brand." },
    { key: 'customColors', title: "Custom Color & Theme Switcher", desc: "Light/Dark/Custom brand palette with fluid design token synchronization." },
    { key: 'customTypography', title: "Custom Typography System", desc: "Curated display and mono font pairings tailored to your brand voice." },
    { key: 'customSections', title: "Custom Sections & Dynamic Layouts", desc: "Add or reorder custom blocks, pricing tables, testimonials, or product showreels." },
    { key: 'advancedAnimations', title: "Advanced Interactive Animations", desc: "Micro-interactions, 3D/canvas effects, interactive telemetry, and scroll motion." },
    { key: 'advancedPortfolioLayouts', title: "Advanced Portfolio & Case Studies", desc: "Multi-view bento grids, filterable categories, and deep-dive technical reports." },
    { key: 'customServicePages', title: "Custom Service Landing Pages", desc: "Standalone SEO-optimized pages for individual services with dedicated booking." },
    { key: 'advancedContactLeadSystem', title: "Advanced Client Intake & Lead Funnel", desc: "Custom questionnaires, multi-file uploads, and automated client notifications." },
    { key: 'customerDashboard', title: "Customer / Project Status Dashboard", desc: "Client milestone tracker with live stage progression, deliverables, and invoices." },
    { key: 'adminCMS', title: "Admin CMS Dashboard", desc: "Secure dashboard to manage services, leads, pricing, URLs, and inquiries." },
    { key: 'advancedAnalytics', title: "Advanced Analytics & Tracking", desc: "Custom visitor telemetry, conversion funnels, and Meta/Google Pixel integrations." },
    { key: 'customDomainSupport', title: "Custom Domain & SSL Setup", desc: "Full custom domain mapping with CDN edge caching and SSL certificates." },
    { key: 'advancedSEO', title: "Advanced Technical SEO & Schema", desc: "Rich snippets, OpenGraph cards, JSON-LD structured data, and sitemap generation." },
    { key: 'blogSystem', title: "Technical Blog / Case Insights", desc: "Markdown-powered article publishing system with tags and search." },
    { key: 'bookingSystem', title: "Direct Consultation Booking", desc: "Integrated appointment scheduling with Google Calendar sync." },
    { key: 'clientPortal', title: "Secure Client Portal", desc: "Private workspace for clients with file delivery and contract signing." },
    { key: 'paymentIntegration', title: "Payment & Escrow Integrations", desc: "Direct Stripe, PayPal, or Upwork/Fiverr escrow milestone billing." },
    { key: 'customApiIntegrations', title: "Custom API & IoT Hardware Hooks", desc: "Custom webhooks, database syncing (Supabase/PostgreSQL), and IoT APIs." }
  ];

  return (
    <div
      id="demo-comparison-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="demo-comparison-modal-content"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-20">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Demo Version vs. Paid Custom Build
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Explore the free demo or upgrade to a customized platform tailored to your goals.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Top Banner Explainer */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-slate-300 flex items-start space-x-3 leading-relaxed">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block mb-0.5 font-mono uppercase">
                Ethical Demonstration Policy
              </span>
              This free demo is 100% complete and fully functional so you can inspect code quality, responsiveness, and user experience. The paid version unlocks custom branding, your business domain, client portals, custom integrations, and dedicated CMS management.
            </div>
          </div>

          {/* Side-by-side comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Free Demo Version */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                    Free / Showcase Tier
                  </span>
                  <h3 className="text-lg font-extrabold text-white">Demo Version</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
                  Included Free
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Full-featured showcase to evaluate engineering capabilities, professional qualifications, and interactive systems.
              </p>

              <div className="space-y-2.5 pt-2">
                {demoFeatures.map((f, i) => (
                  <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-slate-200 block">{f.title}</span>
                      <span className="text-[11px] text-slate-400">{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Paid / Custom Version */}
            <div className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border border-cyan-500/40 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-slate-800 relative z-10">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                    Bespoke Commercial Tier
                  </span>
                  <h3 className="text-lg font-extrabold text-white">Paid / Custom Build</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-bold">
                  Modular Upgrades
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed relative z-10">
                Built specifically around your brand, services, products, and operational workflows with full source code ownership.
              </p>

              <div className="space-y-2.5 pt-2 max-h-[380px] overflow-y-auto pr-1 relative z-10">
                {paidModules.map((m, i) => {
                  const isEnabledInConfig = !premiumFeatures || premiumFeatures[m.key as keyof PremiumFeaturesConfig] !== false;
                  return (
                    <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-300 p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-white">{m.title}</span>
                          {isEnabledInConfig && (
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60">
                              Active
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 leading-tight block mt-0.5">
                          {m.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-950/80 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
          >
            Continue Exploring Demo
          </button>

          <button
            onClick={() => {
              onClose();
              onRequestCustom();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold font-mono uppercase bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-1.5"
          >
            <span>Request Customized Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
