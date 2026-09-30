import React, { useEffect } from 'react';
import { ArrowRight, ArrowUpRight, ShieldCheck } from 'lucide-react';
import heroPic from '../assets/images/regenerated_image_1790142159836.jpg';

interface HeroProps {
  onHireMe?: () => void;
  onExploreWork?: () => void;
  onOpenCvModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onHireMe, onExploreWork, onOpenCvModal }) => {
  useEffect(() => {
    // Clear any previous temporary overrides so official photo is locked
    try {
      localStorage.removeItem('s_engr_hero_photo_custom');
    } catch {
      // ignore
    }
  }, []);

  const handleScrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onExploreWork) {
      onExploreWork();
    } else {
      const el = document.getElementById('work');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartProject = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onHireMe) {
      onHireMe();
    } else {
      const el = document.getElementById('contact');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#08090E] border-b border-slate-900/90 text-slate-100"
    >
      {/* Precision Technology Grid & Ambient Lighting Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle engineering coordinate grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* Sophisticated dual ambient radial glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-orange-500/12 via-blue-600/10 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[450px] bg-gradient-to-bl from-cyan-500/10 via-slate-600/5 to-transparent blur-[130px] rounded-full" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Brand, Headline, Supporting Text, Description, CTAs, Social Dock (7 cols) */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left">
            
            {/* Main Headline */}
            <h1 className="font-heading font-bold text-[56px] sm:text-[64px] lg:text-[72px] leading-[1.08] tracking-tight text-white mb-5">
              I Build Digital Systems That Move Ideas Forward.
            </h1>

            {/* Supporting Text (Zero-Pill Discipline: Clean Unboxed Text with Separators) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-xs sm:text-sm font-mono font-medium text-orange-400 mb-6 tracking-wide">
              <span>Full-Stack Development</span>
              <span className="text-slate-600 select-none">·</span>
              <span>IoT</span>
              <span className="text-slate-600 select-none">·</span>
              <span>AI</span>
              <span className="text-slate-600 select-none">·</span>
              <span>Digital</span>
              <span className="text-slate-600 select-none">·</span>
              <span>Creative</span>
            </div>

            {/* Description */}
            <p className="font-sans font-normal text-[16px] sm:text-[18px] text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              I build websites, software, connected systems and digital experiences — while helping businesses, creators and learners turn ideas into practical solutions.
            </p>

            {/* Action CTAs: Primary "Start a Project" & Secondary "Explore My Work" */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              
              {/* Primary CTA: Start a Project */}
              <button
                id="hero-cta-start-project"
                onClick={handleStartProject}
                className="group relative px-7 py-3.5 rounded-xl font-sans font-semibold text-[14px] sm:text-[16px] text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 flex items-center gap-2.5 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: Explore My Work */}
              <a
                id="hero-cta-explore-work"
                href="#work"
                onClick={handleScrollToWork}
                className="group px-6 py-3.5 rounded-xl font-sans font-semibold text-[14px] sm:text-[16px] text-slate-200 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/80 hover:border-slate-500 hover:text-white transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
              </a>

              {/* Secondary Technical CV action */}
              {onOpenCvModal && (
                <button
                  id="hero-cta-view-cv"
                  onClick={onOpenCvModal}
                  className="px-4 py-3.5 rounded-xl text-xs font-mono font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 transition-colors"
                >
                  [ View CV / Tech Stack ]
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Original Authentic Profile Photo (5 cols) - UNALTERED & LOCKED */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Architectural Profile Card */}
            <div className="relative group w-full max-w-md lg:max-w-xl select-none">
              {/* Subtle ambient rim glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-orange-500/20 via-blue-500/20 to-amber-500/25 rounded-[2rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Pristine squircle framing */}
              <div className="relative rounded-[1.85rem] overflow-hidden bg-slate-900 border border-slate-800/90 shadow-2xl shadow-black/80">
                
                {/* Photo Container - Original 16:9 framing with rounded corners, no zoom, no face crop, no filter */}
                <div className="relative w-full aspect-video bg-slate-950 overflow-hidden rounded-2xl select-none">
                  <img
                    src={heroPic}
                    alt="Engr. Imran Khan"
                    className="w-full h-full object-contain rounded-2xl select-none pointer-events-none"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                  />
                </div>

                {/* Identity Information Strip - Positioned Cleanly Below the Photo (No overlay obscuring the image) */}
                <div className="px-5 py-4 bg-slate-950/95 border-t border-slate-800/90 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base sm:text-lg font-bold text-white tracking-wide">
                        Engr. Imran Khan
                      </h2>
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Verified
                      </span>
                    </div>
                    <p className="text-xs font-mono text-orange-400 mt-0.5">
                      Founder, S • ENGR
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium text-slate-300 block">
                      Hub, Balochistan
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      IoT · Full-Stack · AI
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
