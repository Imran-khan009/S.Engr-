import React, { useState } from 'react';
import { Star, Quote, CheckCircle2, MessageSquareQuote, ShieldCheck, ThumbsUp } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials: propTestimonials }) => {
  const [filter, setFilter] = useState<'ALL' | 'Upwork' | 'Fiverr' | 'Direct'>('ALL');

  const defaultTestimonials: Testimonial[] = [
    {
      id: 'rev-1',
      clientName: 'Imtiaz Ali Shah',
      role: 'E-com Store Owner',
      company: 'E-Commerce Retail',
      platform: 'Upwork',
      rating: 4.5,
      feedback: 'Very professional. My Shopify store design is now perfect and converting well.',
      projectTitle: 'Shopify Store Re-Architecture & Speed Optimization',
      verified: true,
      date: '2024'
    },
    {
      id: 'rev-2',
      clientName: 'Zubair Ahmed',
      role: 'Auto Parts Dealer',
      company: 'Automotive Supplies',
      platform: 'Fiverr',
      rating: 5.0,
      feedback: 'Bohat mehnati larka hai. Kaam time se pehle deliver kiya.',
      projectTitle: 'Full Brand Identity & Product Catalog Digitization',
      verified: true,
      date: '2024'
    },
    {
      id: 'rev-3',
      clientName: 'Bilal Raza',
      role: 'Digital Brand & Marketing Lead',
      company: 'Direct-to-Consumer Brand',
      platform: 'Upwork',
      rating: 4.0,
      feedback: 'Facebook ads se daily orders double. Good communication.',
      projectTitle: 'Meta Ads Target Funnels & ROAS Campaign Setup',
      verified: true,
      date: '2024'
    },
    {
      id: 'rev-4',
      clientName: 'Fatima Noor',
      role: 'Owner',
      company: 'Noor Boutique',
      platform: 'Direct',
      rating: 5.0,
      feedback: 'Mere Instagram ka look hi change kar diya. Followers se customers banna shuru ho gaye, thangs for .....',
      projectTitle: 'Social Media Branding & Video Marketing Creatives',
      verified: true,
      date: '2024'
    }
  ];

  const list = propTestimonials && propTestimonials.length > 0 ? propTestimonials : defaultTestimonials;
  const filtered = filter === 'ALL' ? list : list.filter(t => t.platform === filter);

  // Helper to render star ratings including 4.5
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1 text-amber-400">
        {[1, 2, 3, 4, 5].map((starIdx) => {
          const isFilled = rating >= starIdx;
          const isHalf = rating >= starIdx - 0.5 && rating < starIdx;
          return (
            <span key={starIdx} className="relative inline-block">
              {isFilled ? (
                <Star className="w-4 h-4 fill-current text-amber-400" />
              ) : isHalf ? (
                <div className="relative">
                  <Star className="w-4 h-4 text-slate-700" />
                  <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                    <Star className="w-4 h-4 fill-current text-amber-400" />
                  </div>
                </div>
              ) : (
                <Star className="w-4 h-4 text-slate-700" />
              )}
            </span>
          );
        })}
        <span className="ml-1 text-xs font-mono font-bold text-amber-300">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  const getPlatformBadgeStyle = (platform: string) => {
    switch (platform) {
      case 'Upwork':
        return 'bg-emerald-950/80 text-emerald-400 border-emerald-800/80';
      case 'Fiverr':
        return 'bg-green-950/80 text-green-400 border-green-800/80';
      default:
        return 'bg-blue-950/80 text-cyan-400 border-cyan-800/80';
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-[#080d1a] text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-orange-950/40 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Verified Client Endorsements</span>
          </div>
          <h2 className="font-heading font-bold text-[36px] sm:text-[42px] lg:text-[48px] tracking-tight text-white mb-4 uppercase">
            CLIENT REVIEWS &amp; TESTIMONIALS
          </h2>
          <p className="font-sans font-normal text-[16px] sm:text-[18px] text-slate-300">
            Authentic client feedback across international freelance platforms (Upwork &amp; Fiverr) and direct commercial contracts.
          </p>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          {(['ALL', 'Upwork', 'Fiverr', 'Direct'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                filter === tab
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {tab === 'Direct' ? 'Direct Clients' : tab}
            </button>
          ))}
        </div>

        {/* Reviews Grid (2x2 on desktop, clean responsive cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              id={`testimonial-${item.id}`}
              className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-xl hover:-translate-y-1 relative group"
            >
              <div>
                {/* Top Row: Platform Badge, Verified Shield, and Stars */}
                <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${getPlatformBadgeStyle(item.platform)}`}>
                      {item.platform === 'Direct' ? 'Direct Commercial Client' : `${item.platform} Verified`}
                    </span>
                    <span className="flex items-center space-x-1 text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>Verified Order</span>
                    </span>
                  </div>

                  {renderStars(item.rating)}
                </div>

                {/* Project Title Tag if available */}
                {item.projectTitle && (
                  <div className="text-[11px] font-mono text-orange-400/90 mb-3 truncate">
                    Scope: {item.projectTitle}
                  </div>
                )}

                {/* Feedback Quote */}
                <div className="relative mb-6">
                  <Quote className="w-6 h-6 text-slate-700 mb-2 opacity-60" />
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                    "{item.feedback}"
                  </p>
                </div>
              </div>

              {/* Client Info Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-orange-500/20 to-blue-500/20 border border-slate-700 flex items-center justify-center text-orange-400 font-bold font-mono text-sm">
                    {item.clientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {item.clientName}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {item.role} {item.company ? `• ${item.company}` : ''}
                    </p>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-500">
                  {item.date || '2024'}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Escrow / Guarantee Bar */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                100% Escrow &amp; Direct Milestone Protection
              </h4>
              <p className="text-xs text-slate-400">
                All client engagements can be routed through Upwork, Fiverr, or milestone-based direct bank/crypto escrow.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20saw%20your%20reviews%20and%20want%20to%20hire%20you%20for%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-orange-400 to-amber-400 hover:from-orange-300 hover:to-amber-300 transition-all shrink-0 shadow-md shadow-orange-500/20"
          >
            Start Your Project
          </a>
        </div>

      </div>
    </section>
  );
};
