import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, AlertCircle, ExternalLink, Globe } from 'lucide-react';
import { SocialPlatform } from '../types';
import { IconHelper } from './IconHelper';

interface ContactSectionProps {
  email?: string;
  whatsapp?: string;
  location?: string;
  socials?: SocialPlatform[];
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  email = "contact.engrimran@gmail.com",
  whatsapp = "03331244214",
  location = "HUB Chowki Balochistan",
  socials
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Normalize WhatsApp number for wa.me URL
  const cleanPhone = whatsapp.replace(/\D/g, '');
  const waUrl = cleanPhone.startsWith('0') 
    ? `https://wa.me/92${cleanPhone.substring(1)}`
    : cleanPhone.startsWith('92') 
      ? `https://wa.me/${cleanPhone}`
      : `https://wa.me/923331244214`;

  // Default accounts if socials prop is not provided or incomplete
  const defaultSocials: SocialPlatform[] = [
    {
      id: "soc-whatsapp",
      platform: "WhatsApp",
      name: "Direct WhatsApp",
      url: waUrl,
      handle: "03331244214",
      description: "Instant direct chat for urgent project requirements and timelines.",
      icon: "whatsapp",
      enabled: true
    },
    {
      id: "soc-fiverr",
      platform: "Fiverr",
      name: "Fiverr Marketplace",
      url: "https://www.fiverr.com/imran_khan1327",
      handle: "@imran_khan1327",
      description: "Book professional web development, IoT solutions, and design services.",
      icon: "fiverr",
      enabled: true
    },
    {
      id: "soc-facebook",
      platform: "Facebook",
      name: "Facebook Page",
      url: "https://www.facebook.com/profile.php?id=61586602392197",
      handle: "Engr. Imran Khan Official",
      description: "Community updates, training workshops, and project showcases.",
      icon: "facebook",
      enabled: true
    },
    {
      id: "soc-instagram",
      platform: "Instagram",
      name: "Instagram Account",
      url: "https://www.instagram.com/teachwithimran/?fbclid=IwY2xjawUY3OtwZG9mAWV4dG4DYWVtAjEwAGJyaWQRMWViR1pwaVBSZFk5TzFRcUdzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeAv9ABRKX-4RSnDZM4U6yVvGtXYP4IB6gWrxdbxPx_DWJOZh9qc9OuMAln-4_aem_DA-2uqN7atJgb2zdqpJRAQ",
      handle: "@teachwithimran",
      description: "Behind-the-scenes engineering builds, design prototypes, and reels.",
      icon: "instagram",
      enabled: true
    },
    {
      id: "soc-linkedin",
      platform: "LinkedIn",
      name: "LinkedIn ID",
      url: "https://www.linkedin.com/in/imran-khan-b7299833a/",
      handle: "imran-khan-b7299833a",
      description: "Professional profile, engineering publications, and career updates.",
      icon: "linkedin",
      enabled: true
    },
    {
      id: "soc-tiktok",
      platform: "TikTok",
      name: "TikTok Account",
      url: "https://www.tiktok.com/@teachwithimran?_r=1&_t=ZS-97yZged8h9B&fbclid=IwY2xjawUY3FVwZG9mAWV4dG4DYWVtAjEwAGJyaWQRMWViR1pwaVBSZFk5TzFRcUdzcnRjBmFwcF9pZBAyMjIwMzkxNzg4MjAwODkyAAEeB8UmAeVy_CWK7c5CUpW_o6Z77mkL-4RREzh8MRt1V16tH4u7fjpzvPxALto_aem_dXXpmci886GN_KWqPbqf7A",
      handle: "@teachwithimran",
      description: "Bite-sized technology demonstrations and smart circuit experiments.",
      icon: "tiktok",
      enabled: true
    },
    {
      id: "soc-youtube",
      platform: "YouTube",
      name: "YouTube Channel",
      url: "https://www.youtube.com/@TeachWithImran1",
      handle: "@TeachWithImran1",
      description: "Tutorials on IoT, programming, and tech education.",
      icon: "youtube",
      enabled: true
    }
  ];

  const displaySocials: SocialPlatform[] = socials && socials.length > 0 ? socials : defaultSocials;

  const getBrandDesign = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'whatsapp':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#25D366]/60 hover:shadow-lg hover:shadow-[#25D366]/10',
          iconBox: 'bg-[#25D366]/15 text-[#25D366] border-[#25D366]/30 group-hover:bg-[#25D366] group-hover:text-white',
          badge: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/30',
          hoverText: 'group-hover:text-[#25D366]',
          accentText: 'text-[#25D366]'
        };
      case 'fiverr':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#1DBF73]/60 hover:shadow-lg hover:shadow-[#1DBF73]/10',
          iconBox: 'bg-[#1DBF73]/15 text-[#1DBF73] border-[#1DBF73]/30 group-hover:bg-[#1DBF73] group-hover:text-white',
          badge: 'bg-[#1DBF73]/10 text-[#1DBF73] border-[#1DBF73]/30',
          hoverText: 'group-hover:text-[#1DBF73]',
          accentText: 'text-[#1DBF73]'
        };
      case 'facebook':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#1877F2]/60 hover:shadow-lg hover:shadow-[#1877F2]/10',
          iconBox: 'bg-[#1877F2]/15 text-[#1877F2] border-[#1877F2]/30 group-hover:bg-[#1877F2] group-hover:text-white',
          badge: 'bg-[#1877F2]/10 text-[#1877F2] border-[#1877F2]/30',
          hoverText: 'group-hover:text-[#1877F2]',
          accentText: 'text-[#1877F2]'
        };
      case 'instagram':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#E1306C]/60 hover:shadow-lg hover:shadow-[#E1306C]/10',
          iconBox: 'bg-gradient-to-tr from-[#FD1D1D]/20 via-[#E1306C]/20 to-[#833AB4]/20 text-[#E1306C] border-[#E1306C]/30 group-hover:from-[#F56040] group-hover:to-[#833AB4] group-hover:text-white',
          badge: 'bg-[#E1306C]/10 text-[#E1306C] border-[#E1306C]/30',
          hoverText: 'group-hover:text-[#E1306C]',
          accentText: 'text-[#E1306C]'
        };
      case 'linkedin':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#0A66C2]/60 hover:shadow-lg hover:shadow-[#0A66C2]/10',
          iconBox: 'bg-[#0A66C2]/15 text-[#0A66C2] border-[#0A66C2]/30 group-hover:bg-[#0A66C2] group-hover:text-white',
          badge: 'bg-[#0A66C2]/10 text-[#0A66C2] border-[#0A66C2]/30',
          hoverText: 'group-hover:text-[#0A66C2]',
          accentText: 'text-[#0A66C2]'
        };
      case 'tiktok':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#25F4EE]/60 hover:shadow-lg hover:shadow-[#FE2C55]/10',
          iconBox: 'bg-slate-900 text-white border-slate-700/80 group-hover:border-[#25F4EE] group-hover:text-[#25F4EE] group-hover:shadow-[0_0_12px_rgba(37,244,238,0.3)]',
          badge: 'bg-slate-800 text-slate-200 border-slate-700',
          hoverText: 'group-hover:text-[#25F4EE]',
          accentText: 'text-[#25F4EE]'
        };
      case 'youtube':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#FF0000]/60 hover:shadow-lg hover:shadow-[#FF0000]/10',
          iconBox: 'bg-[#FF0000]/15 text-[#FF0000] border-[#FF0000]/30 group-hover:bg-[#FF0000] group-hover:text-white',
          badge: 'bg-[#FF0000]/10 text-[#FF0000] border-[#FF0000]/30',
          hoverText: 'group-hover:text-[#FF0000]',
          accentText: 'text-[#FF0000]'
        };
      case 'upwork':
        return {
          cardBorder: 'border-slate-800/80 hover:border-[#14A800]/60 hover:shadow-lg hover:shadow-[#14A800]/10',
          iconBox: 'bg-[#14A800]/15 text-[#14A800] border-[#14A800]/30 group-hover:bg-[#14A800] group-hover:text-white',
          badge: 'bg-[#14A800]/10 text-[#14A800] border-[#14A800]/30',
          hoverText: 'group-hover:text-[#14A800]',
          accentText: 'text-[#14A800]'
        };
      default:
        return {
          cardBorder: 'border-slate-800/80 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/10',
          iconBox: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950',
          badge: 'bg-cyan-950/60 text-cyan-400 border-cyan-800',
          hoverText: 'group-hover:text-cyan-300',
          accentText: 'text-cyan-400'
        };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please provide your name, email, and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message.');
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Error sending message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span>Get in Touch</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
                LET'S TALK SOLUTIONS
              </h2>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Whether you have an upcoming web development project, an IoT prototype inquiry, or need technical site coordination, I respond promptly.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {/* WhatsApp Direct Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-[#25D366]/50 transition-all flex items-start justify-between group">
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 border border-[#25D366]/30 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <IconHelper name="whatsapp" className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-[#25D366] uppercase tracking-wider block">WhatsApp Direct</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                    </div>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-[#25D366] transition-colors font-mono block mt-0.5"
                    >
                      {whatsapp}
                    </a>
                    <span className="text-[11px] text-slate-400 block mt-0.5">Quick consultation & file sharing</span>
                  </div>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-slate-950 border border-[#25D366]/30 text-xs font-mono font-bold transition-all flex items-center space-x-1 shrink-0"
                >
                  <span>Chat</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Location Card */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Location</span>
                  <span className="text-base font-bold text-white block mt-0.5">
                    {location}
                  </span>
                  <span className="text-[11px] text-slate-400">Available locally & for global remote contracts</span>
                </div>
              </div>

              {/* Official Email Card */}
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all">
                <div className="w-11 h-11 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Official Email</span>
                  <a href={`mailto:${email}`} className="text-sm font-bold text-white hover:text-cyan-400 transition-colors block mt-0.5 break-all">
                    {email}
                  </a>
                  <span className="text-[11px] text-slate-400">Formal RFP & project specifications</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Message Form */}
          <div className="lg:col-span-7 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Have a general inquiry or invitation? Fill out the form below.
            </p>

            {success ? (
              <div className="text-center py-10 bg-slate-950/60 rounded-2xl border border-emerald-500/30 p-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto mb-4">
                  Thank you for reaching out. Engr. Imran Khan will review your message and reply promptly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-cyan-400 bg-cyan-950/60 border border-cyan-800 hover:bg-cyan-900 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Asad Ullah"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. asad@domain.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Web Project / IoT Solution / Teaching Workshop"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can I assist you with web development, IoT solutions, creative design, or training?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? <span>Sending...</span> : (
                    <>
                      <span>SUBMIT INQUIRY</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Dedicated Social & Online Presence Block inside Contact Section */}
        <div className="pt-10 border-t border-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
                <Globe className="w-3.5 h-3.5" />
                <span>Official Accounts & Marketplaces</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                Connect on My Social & Professional Networks
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md sm:text-right font-mono">
              Direct official touchpoints for Engr. Imran Khan across YouTube, Facebook, Instagram, LinkedIn, TikTok & Fiverr.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displaySocials.filter(s => s.enabled).map((item) => {
              const brand = getBrandDesign(item.platform);
              return (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border transition-all duration-200 group flex flex-col justify-between ${brand.cardBorder}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${brand.iconBox}`}>
                        <IconHelper name={item.icon || item.platform} className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${brand.badge}`}>
                        {item.platform}
                      </span>
                    </div>

                    <h4 className={`text-sm font-bold text-white transition-colors ${brand.hoverText}`}>
                      {item.name}
                    </h4>
                    <p className={`text-xs font-mono mb-2 truncate ${brand.accentText}`}>
                      {item.handle}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className={`pt-2 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono font-semibold text-slate-300 transition-colors ${brand.hoverText}`}>
                    <span>Connect Official</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

