import React, { useState } from 'react';
import { Mail, ExternalLink, Send, ShieldCheck, CheckCircle2, Clock, MapPin, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { SocialPlatform } from '../types';

interface ContactSectionProps {
  socials?: SocialPlatform[];
  onOpenProjectModal?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    serviceNeeded: 'Web & Software Development',
    budget: '$100 - $300',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [mailtoUrl, setMailtoUrl] = useState('');

  const servicesList = [
    'Web & Software Development',
    'IoT & Smart Hardware',
    'Brand Identity & Graphic Design',
    'Meta Ads & Digital Marketing',
    'Video Editing',
    'Construction 2D CAD & Site Coordination'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      return;
    }

    const waText = `Assalam-o-Alaikum Engr. Imran,\n\n*Name:* ${formData.name}\n*Service Needed:* ${formData.serviceNeeded}\n*Budget:* ${formData.budget}\n*Message:* ${formData.message}\n\n(Sent via S • ENGR Hub Official Contact Form)`;
    const waUrl = `https://wa.me/923331244214?text=${encodeURIComponent(waText)}`;
    
    const mailSubject = `Project Inquiry: ${formData.serviceNeeded} - ${formData.name}`;
    const mailBody = `Name: ${formData.name}\nService Needed: ${formData.serviceNeeded}\nBudget: ${formData.budget}\n\nMessage:\n${formData.message}`;
    const mailUrl = `mailto:s.engrimran@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

    setMailtoUrl(mailUrl);
    setSubmitted(true);

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    // Also attempt background sync if backend is active
    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: 'Direct-WhatsApp-Submission',
        category: formData.serviceNeeded,
        message: `Budget: ${formData.budget} | Message: ${formData.message}`
      })
    }).catch(() => {
      // Graceful fallback
    });
  };

  return (
    <section id="contact" className="py-24 bg-[#080d1a] text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-orange-950/40 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Client Communications</span>
          </div>
          <h2 className="font-heading font-bold text-[36px] sm:text-[42px] lg:text-[48px] tracking-tight text-white mb-4 uppercase">
            FIND ME ONLINE &amp; GET IN TOUCH
          </h2>
          <p className="font-sans font-normal text-[16px] sm:text-[18px] text-slate-300">
            Reach out directly for custom engineering scopes, website developments, microcontroller prototypes, or verified escrow orders.
          </p>
        </div>

        {/* 1. FIND ME ONLINE: Exactly 3 Highlighted Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Card 1: Direct WhatsApp */}
          <a
            id="contact-card-whatsapp"
            href="https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20would%20like%20to%20discuss%20a%20project%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-emerald-950/20 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                  Instant Response
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                Direct WhatsApp
              </h3>
              <p className="font-mono text-sm text-emerald-400 font-semibold mb-3">
                03331244214
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct chat for urgent requirements, real-time code discussions, and swift project kickoffs.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span>Message on WhatsApp</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* Card 2: Official Email */}
          <a
            id="contact-card-email"
            href="mailto:s.engrimran@gmail.com"
            className="p-7 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-orange-950/20 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-orange-950 text-orange-400 border border-orange-800">
                  Official Inquiries
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-300 transition-colors">
                Official Email
              </h3>
              <p className="font-mono text-sm text-orange-400 font-semibold mb-3">
                s.engrimran@gmail.com
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Send technical documentation, architectural briefs, RFP specifications, or institutional teaching invitations.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-orange-400">
              <span>Send Email</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

          {/* Card 3: Fiverr Marketplace */}
          <a
            id="contact-card-fiverr"
            href="https://www.fiverr.com/imran_khan1327"
            target="_blank"
            rel="noopener noreferrer"
            className="p-7 rounded-3xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-blue-950/20 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform font-mono font-extrabold text-lg">
                  fi
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800">
                  Escrow Protected
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                Fiverr Marketplace
              </h3>
              <p className="font-mono text-sm text-blue-400 font-semibold mb-3">
                @imran_khan1327
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                Order directly with guaranteed milestone escrow buyer protection and international platform guarantees.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400">
              <span>Visit Fiverr Profile</span>
              <ExternalLink className="w-4 h-4" />
            </div>
          </a>

        </div>

        {/* 2. Simple Contact Form (Name, Service Needed dropdown, Budget, Message) */}
        <div className="max-w-3xl mx-auto bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">
                Project Inquiry &amp; Direct Quote
              </h3>
              <p className="text-xs text-slate-400">
                Submit this form to launch an instant prefilled WhatsApp message with email fallback.
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-slate-950 border border-orange-500/40 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">
                Inquiry Prepared &amp; WhatsApp Opened!
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Your prefilled project details have opened in WhatsApp. If WhatsApp didn't open automatically, you can also send via your email client below:
              </p>
              <div className="pt-2 flex flex-wrap justify-center gap-3">
                <a
                  href={mailtoUrl}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 flex items-center space-x-2 border border-slate-700"
                >
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span>Send via Mailto Fallback</span>
                </a>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs font-bold text-white cursor-pointer"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Name Field */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Your Full Name <span className="text-orange-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Tariq Ahmed / Sarah Jenkins"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none text-white text-sm"
                />
              </div>

              {/* Service Needed Dropdown (6 services) */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Service Needed <span className="text-orange-400">*</span>
                </label>
                <select
                  value={formData.serviceNeeded}
                  onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none text-white text-sm cursor-pointer"
                >
                  {servicesList.map((srv) => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Field */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Estimated Budget
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none text-white text-sm cursor-pointer"
                >
                  <option value="$75 - $150">$75 - $150 (Basic / Asset / Ad Setup)</option>
                  <option value="$150 - $350">$150 - $350 (Full Website / Custom Prototype)</option>
                  <option value="$350 - $700">$350 - $700 (Full-Stack App / Multi-Sensor IoT)</option>
                  <option value="$700+">$700+ (Comprehensive Turnkey Project)</option>
                  <option value="Flexible / To Discuss">Flexible / To Discuss</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Project Scope &amp; Details <span className="text-orange-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your goals, technical specifications, deadlines, or questions..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-orange-500 focus:outline-none text-white text-sm resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-400 hover:to-amber-500 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Submit &amp; Chat on WhatsApp (+ Mailto Fallback)</span>
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                <span>Strict privacy guarantee. No spam, unsolicited calls, or data sharing.</span>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
