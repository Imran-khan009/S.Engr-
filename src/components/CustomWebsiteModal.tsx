import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Sparkles, Shield, Rocket, ArrowRight, Layers, Phone, Mail, Building, Globe } from 'lucide-react';
import { CustomWebsiteRequest } from '../types';

interface CustomWebsiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted?: (req: CustomWebsiteRequest) => void;
}

export const CustomWebsiteModal: React.FC<CustomWebsiteModalProps> = ({
  isOpen,
  onClose,
  onRequestSubmitted
}) => {
  if (!isOpen) return null;

  const websiteTypes = [
    'Business / Corporate Website',
    'Personal Portfolio & Brand Hub',
    'E-Commerce & Digital Storefront',
    'SaaS / Tech Startup Landing Page',
    'Booking & Service Appointment Platform',
    'Creative Studio / Agency Showcase',
    'Technical / Educational Training Hub',
    'Custom Web Application & Architecture'
  ];

  const availableServices = [
    'Modern Web & UI Development',
    'Creative Brand Identity & Graphics',
    'IoT / Hardware Dashboard Integration',
    'Digital Marketing & Meta Ad Campaigns',
    'Video Editing & Motion Assets',
    'Custom Database & API Integration',
    'SEO & Content Optimization'
  ];

  const designPreferences = [
    'Modern Tech & Minimalist (Dark Cyber-Clean)',
    'Executive Corporate Clean (Professional Light/Dark)',
    'Creative & Vibrant (Bold Brand Accent)',
    'Industrial & High-Contrast (Utility & Precision)',
    'Custom Brand Guidelines (Follow Existing Assets)'
  ];

  const modularFeaturesList = [
    'Full Custom Branding & Typography',
    'Custom Domain & SSL Mapping',
    'Admin CMS & Content Control Panel',
    'Client Portal & Milestone Tracker',
    'Direct Consultation Booking System',
    'Technical Blog & Publishing Engine',
    'Payment & Escrow Integration (Stripe/PayPal)',
    'Advanced Technical SEO & Schema Markup',
    'Advanced Analytics & Tracking Pixels',
    'Custom API & IoT Telemetry Endpoints'
  ];

  const budgetOptions = [
    '$250 - $500 (Essential Customized Build)',
    '$500 - $1,000 (Full-Featured Business Hub)',
    '$1,000 - $2,500 (Enterprise / Portal / Custom CMS)',
    '$2,500+ (Comprehensive Multi-System Platform)',
    'Negotiable / Need Consultation'
  ];

  const deadlineOptions = [
    'Urgent (< 1 Week)',
    '1 - 2 Weeks',
    '2 - 4 Weeks',
    '1 - 2 Months',
    'Flexible Schedule'
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    businessName: '',
    websiteType: websiteTypes[0],
    requiredServices: ['Modern Web & UI Development'],
    designPreference: designPreferences[0],
    requiredFeatures: ['Full Custom Branding & Typography', 'Admin CMS & Content Control Panel', 'Advanced Technical SEO & Schema Markup'],
    budget: budgetOptions[1],
    deadline: deadlineOptions[1],
    additionalRequirements: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRequest, setSubmittedRequest] = useState<CustomWebsiteRequest | null>(null);

  const handleServiceToggle = (service: string) => {
    setFormData(prev => {
      const exists = prev.requiredServices.includes(service);
      const updated = exists
        ? prev.requiredServices.filter(s => s !== service)
        : [...prev.requiredServices, service];
      return { ...prev, requiredServices: updated.length ? updated : [service] };
    });
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => {
      const exists = prev.requiredFeatures.includes(feature);
      const updated = exists
        ? prev.requiredFeatures.filter(f => f !== feature)
        : [...prev.requiredFeatures, feature];
      return { ...prev, requiredFeatures: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim()) {
      setErrorMessage('Please provide your name and email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/custom-website-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit custom website requirements.');
      }
      setSubmittedRequest(data.request);
      if (onRequestSubmitted) {
        onRequestSubmitted(data.request);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    onClose();
  };

  return (
    <div
      id="custom-website-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="custom-website-modal-content"
        className="relative w-full max-w-3xl bg-slate-900 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-20">
          <div className="flex items-center space-x-2.5">
            <Rocket className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block font-bold">
                Tailored Premium Build
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white">
                Request a Customized Website
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success View */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {submittedRequest ? (
            /* Success confirmation screen */
            <div className="text-center py-10 space-y-6 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Custom Website Requirements Received!
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-mono">
                  Thank you, <span className="text-cyan-400 font-bold">{submittedRequest.fullName}</span>. Your project requirements have been recorded and saved. Engr. Imran Khan will review your technical specifications and prepare a comprehensive proposal.
                </p>
              </div>

              {/* Summary badge */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left text-xs space-y-2 font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Request Tracking ID:</span>
                  <span className="text-cyan-400 font-bold">{submittedRequest.id}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Website Type:</span>
                  <span className="text-white">{submittedRequest.websiteType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-500">Budget Estimate:</span>
                  <span className="text-white">{submittedRequest.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Timeline:</span>
                  <span className="text-white">{submittedRequest.deadline}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono font-bold text-xs uppercase transition-colors"
                >
                  RETURN TO WEBSITE
                </button>
              </div>
            </div>
          ) : (
            /* 11-field Project Requirements Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Field 1, 2, 3, 4: Contact & Business Identification */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. John Doe / Engr. Tariq"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 2. Email */}
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. yourname@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 3. WhatsApp */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    WhatsApp / Direct Contact (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* 4. Business/Brand Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Business / Brand Name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    placeholder="e.g. Nexus Tech, Alpha Studio, Personal"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Field 5: Website Type */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                  5. Website Type *
                </label>
                <select
                  value={formData.websiteType}
                  onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {websiteTypes.map((type, i) => (
                    <option key={i} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {/* Field 6: Required Services */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-2 font-bold">
                  6. Required Services (Select all that apply)
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableServices.map((service, i) => {
                    const isSelected = formData.requiredServices.includes(service);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => handleServiceToggle(service)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          isSelected
                            ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-slate-950 border border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}{service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Field 7: Design Preference */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                  7. Design Preference *
                </label>
                <select
                  value={formData.designPreference}
                  onChange={(e) => setFormData({ ...formData, designPreference: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {designPreferences.map((pref, i) => (
                    <option key={i} value={pref}>{pref}</option>
                  ))}
                </select>
              </div>

              {/* Field 8: Required Features (Checkboxes for modular features) */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-2 font-bold">
                  8. Required Modular Features (Select features for your build)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-950 p-4 rounded-2xl border border-slate-800/90 max-h-52 overflow-y-auto">
                  {modularFeaturesList.map((feat, i) => {
                    const isChecked = formData.requiredFeatures.includes(feat);
                    return (
                      <label
                        key={i}
                        className={`flex items-center space-x-2 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                          isChecked
                            ? 'bg-cyan-950/40 border-cyan-600/50 text-slate-100'
                            : 'bg-slate-900/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleFeatureToggle(feat)}
                          className="rounded accent-cyan-400 shrink-0"
                        />
                        <span className="font-mono text-[11px] leading-tight">{feat}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Field 9 & 10: Budget & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 9. Budget */}
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                    9. Budget Range *
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {budgetOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* 10. Deadline */}
                <div>
                  <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                    10. Desired Timeline *
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  >
                    {deadlineOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Field 11: Additional Requirements */}
              <div>
                <label className="block text-xs font-mono text-cyan-400 mb-1.5 font-bold">
                  11. Additional Requirements & Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                  placeholder="Share details about your audience, existing URLs, branding preferences, or integrations required..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none font-sans"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  Direct submission to Engr. Imran Khan
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl font-bold font-mono text-xs uppercase tracking-wider bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING...</span>
                  ) : (
                    <>
                      <span>SUBMIT CUSTOM REQUIREMENTS</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
