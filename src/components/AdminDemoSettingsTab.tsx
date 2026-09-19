import React from 'react';
import { SiteSettings, PremiumFeaturesConfig } from '../types';
import { Save, Sliders, Sparkles, CheckCircle2, Shield, Eye, DollarSign, Layers, Mail, Phone, MapPin } from 'lucide-react';

interface AdminDemoSettingsTabProps {
  settings: SiteSettings;
  onChangeSettings: (newSettings: SiteSettings) => void;
  onSaveSettings: () => Promise<void>;
}

export const AdminDemoSettingsTab: React.FC<AdminDemoSettingsTabProps> = ({
  settings,
  onChangeSettings,
  onSaveSettings
}) => {
  const premiumKeys: { key: keyof PremiumFeaturesConfig; label: string; desc: string }[] = [
    { key: 'customBranding', label: 'Full Custom Branding', desc: 'Bespoke logos, identity guidelines, and graphic assets.' },
    { key: 'customColors', label: 'Custom Color Themes', desc: 'Light/Dark mode & custom brand palette switcher.' },
    { key: 'customTypography', label: 'Custom Typography System', desc: 'Curated display and mono font pairings.' },
    { key: 'customSections', label: 'Custom Sections & Blocks', desc: 'Bespoke layouts, pricing matrices, and dynamic blocks.' },
    { key: 'advancedAnimations', label: 'Advanced Interactive Animations', desc: 'Interactive physics, canvas shaders, and scroll-linked motion.' },
    { key: 'advancedPortfolioLayouts', label: 'Advanced Portfolio Layouts', desc: 'Bento grids, category filter drawers, and case study pages.' },
    { key: 'customServicePages', label: 'Custom Service Deep-Dives', desc: 'Standalone SEO service landing pages.' },
    { key: 'advancedContactLeadSystem', label: 'Advanced Client Intake Funnel', desc: 'Custom inquiry questionnaires and multi-file uploads.' },
    { key: 'customerDashboard', label: 'Client / Project Dashboard', desc: 'Milestone tracker and live stage progression view.' },
    { key: 'adminCMS', label: 'Admin CMS Management Panel', desc: 'Complete content and inquiry control panel.' },
    { key: 'advancedAnalytics', label: 'Advanced Analytics & Pixel Tracking', desc: 'Conversion telemetry and visitor behavioral analytics.' },
    { key: 'customDomainSupport', label: 'Custom Domain & Edge SSL', desc: 'Bespoke domain mapping and CDN configuration.' },
    { key: 'advancedSEO', label: 'Advanced Technical SEO & Schema', desc: 'JSON-LD rich snippets and meta tag management.' },
    { key: 'blogSystem', label: 'Technical Insights Blog Engine', desc: 'Markdown article publishing and tag search.' },
    { key: 'bookingSystem', label: 'Consultation Calendar Booking', desc: 'Direct appointment and Google Calendar synchronization.' },
    { key: 'clientPortal', label: 'Secure Client Document Portal', desc: 'Private file deliverables and contract management.' },
    { key: 'paymentIntegration', label: 'Payment & Escrow Integrations', desc: 'Stripe, PayPal, or Upwork/Fiverr milestone checkout.' },
    { key: 'customApiIntegrations', label: 'Custom API & Hardware Webhooks', desc: 'Supabase/Postgres syncing and IoT hardware hooks.' }
  ];

  const handleTogglePremium = (key: keyof PremiumFeaturesConfig) => {
    const current = settings.premiumFeatures || {};
    const updated = {
      ...current,
      [key]: !current[key]
    };
    onChangeSettings({
      ...settings,
      premiumFeatures: updated
    });
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-8 max-w-4xl">
      {/* Header & Save Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-base font-bold text-white uppercase font-mono flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>DEMO & PREMIUM VERSION CONTROLS</span>
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Control demo mode visibility, modular premium feature offerings, pricing display, and CTA copy.
          </p>
        </div>

        <button
          onClick={onSaveSettings}
          className="px-6 py-2.5 rounded-xl font-bold font-mono text-xs uppercase bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 transition-all shrink-0"
        >
          <Save className="w-3.5 h-3.5" />
          <span>SAVE CONFIGURATION</span>
        </button>
      </div>

      {/* Section 1: Core Visibility & Mode Toggles */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          1. Global Visibility & Showcase Toggles
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Demo Mode Toggle */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block font-mono">Demo Mode Banner & Badges</span>
              <span className="text-[11px] text-slate-400">Displays demo indicator and comparison modal CTA.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(settings.demoMode)}
                onChange={(e) => onChangeSettings({ ...settings, demoMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Pricing Visibility Toggle */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block font-mono">Service Pricing Display</span>
              <span className="text-[11px] text-slate-400">Show starting prices (ON) or "Custom Quote" (OFF).</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showPricing ?? true}
                onChange={(e) => onChangeSettings({ ...settings, showPricing: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Services Visibility Toggle */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block font-mono">Services Catalog Section</span>
              <span className="text-[11px] text-slate-400">Display services marketplace on public site.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showServices ?? true}
                onChange={(e) => onChangeSettings({ ...settings, showServices: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>

          {/* Features Visibility Toggle */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-white block font-mono">Service Deliverables List</span>
              <span className="text-[11px] text-slate-400">Show included deliverables inside service cards.</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showFeatures ?? true}
                onChange={(e) => onChangeSettings({ ...settings, showFeatures: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Section 2: CTA & Upgrade Messaging */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          2. Upgrade CTA Wording & Supporting Texts
        </h4>

        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
              CTA Main Heading (Default: "Need a Customized Website?")
            </label>
            <input
              type="text"
              value={settings.ctaTitle || 'Need a Customized Website?'}
              onChange={(e) => onChangeSettings({ ...settings, ctaTitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
              CTA Supporting Text
            </label>
            <textarea
              rows={2}
              value={settings.ctaSupportingText || 'Explore the demo or request a fully customized version built around your brand, services and business goals.'}
              onChange={(e) => onChangeSettings({ ...settings, ctaSupportingText: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-300 mb-1 font-bold">
              Upgrade Prompt Message
            </label>
            <input
              type="text"
              value={settings.upgradeMessage || 'Explore the demo or request a custom build tailored for your enterprise.'}
              onChange={(e) => onChangeSettings({ ...settings, upgradeMessage: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Contact Details */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
          3. Public Contact Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={settings.email || ''}
              onChange={(e) => onChangeSettings({ ...settings, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              WhatsApp / Phone
            </label>
            <input
              type="text"
              value={settings.whatsapp || ''}
              onChange={(e) => onChangeSettings({ ...settings, whatsapp: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              Location / Region
            </label>
            <input
              type="text"
              value={settings.location || ''}
              onChange={(e) => onChangeSettings({ ...settings, location: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Section 4: Modular Premium Features Toggles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
            4. Modular Premium Features Offering (18 Features)
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
            Select features active in custom build offerings
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {premiumKeys.map((item) => {
            const isEnabled = settings.premiumFeatures?.[item.key] !== false;
            return (
              <div
                key={item.key}
                onClick={() => handleTogglePremium(item.key)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  isEnabled
                    ? 'bg-cyan-950/30 border-cyan-700/50 text-slate-200'
                    : 'bg-slate-950 border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="pr-3">
                  <span className={`text-xs font-mono font-bold block ${isEnabled ? 'text-white' : 'text-slate-400'}`}>
                    {item.label}
                  </span>
                  <span className="text-[10px] text-slate-400 leading-tight block mt-0.5">
                    {item.desc}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={isEnabled}
                  onChange={() => {}}
                  className="rounded accent-cyan-400 shrink-0 mt-1 pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
