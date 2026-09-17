import React, { useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Cpu, Palette, Compass, GraduationCap, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onHireMe: () => void;
  onExploreWork: () => void;
  onMyServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onHireMe, onExploreWork, onMyServices }) => {
  const [activeStage, setActiveStage] = useState<number>(0);

  const pipelineStages = [
    {
      id: 0,
      title: 'Technology',
      icon: Terminal,
      color: 'from-cyan-500 to-blue-500',
      tag: 'Computer Science',
      desc: 'Clean code, full-stack web architectures & algorithmic systems.'
    },
    {
      id: 1,
      title: 'IoT',
      icon: Cpu,
      color: 'from-blue-500 to-indigo-500',
      tag: 'Embedded & Sensors',
      desc: 'Arduino, ESP32 telemetry, automated irrigation & smart tanks.'
    },
    {
      id: 2,
      title: 'Creative',
      icon: Palette,
      color: 'from-indigo-500 to-purple-500',
      tag: 'Brand & Media',
      desc: 'Logo systems, marketing collateral & high-retention video edits.'
    },
    {
      id: 3,
      title: 'Construction',
      icon: Compass,
      color: 'from-purple-500 to-amber-500',
      tag: '2D Layout & Sites',
      desc: 'AutoCAD drafts, dimensional verification & site coordination.'
    },
    {
      id: 4,
      title: 'Teaching',
      icon: GraduationCap,
      color: 'from-emerald-500 to-teal-500',
      tag: 'Youth Mentorship',
      desc: 'UNICEF-supported IoT & Computer training: Learn → Build → Solve.'
    }
  ];

  return (
    <section
      id="home"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
    >
      {/* Subtle ambient lighting grids (pure CSS) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-indigo-600/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Status Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-400 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-medium">S • ENGR</span>
            <span className="text-slate-600">•</span>
            <span>Available for Select Projects & Consultation</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase mb-6 leading-[1.1]">
            BUILD. DESIGN. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              TEACH. SOLVE.
            </span>
          </h1>

          {/* Supporting Headline */}
          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-200 mb-4 max-w-3xl mx-auto">
            Technology, Creative Design & Real-World Solutions — Built with Purpose.
          </p>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            I combine Computer Science, IoT, creative design, digital marketing, and construction project experience to create practical solutions for people, businesses and organizations.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
            <button
              id="hero-cta-hire-me"
              onClick={onHireMe}
              className="px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
            >
              <span>HIRE ME</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-explore-work"
              onClick={onExploreWork}
              className="px-7 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-0.5"
            >
              EXPLORE MY WORK
            </button>

            <button
              id="hero-cta-my-services"
              onClick={onMyServices}
              className="px-7 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-cyan-400 bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-800/50 hover:border-cyan-700 transition-all hover:-translate-y-0.5"
            >
              MY SERVICES
            </button>
          </div>
        </div>

        {/* Animated Visual: Technology → IoT → Creative → Construction → Teaching */}
        <div className="mt-4 max-w-5xl mx-auto bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-semibold">
                Multidisciplinary Engineering Pipeline
              </h2>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 hidden sm:inline">
              Learn • Create • Build • Teach • Hire
            </span>
          </div>

          {/* Visual Interactive Pipeline */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {pipelineStages.map((stage, idx) => {
              const IconComp = stage.icon;
              const isSelected = activeStage === idx;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-3.5 rounded-xl transition-all duration-200 border relative ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isSelected
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-100 mb-0.5">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] text-cyan-400 font-mono mb-1.5 truncate">
                    {stage.tag}
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {stage.desc}
                  </p>
                  {/* Subtle active indicator bar */}
                  {isSelected && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pipeline flow arrows for visual continuity */}
          <div className="hidden sm:flex items-center justify-center space-x-2 mt-4 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
            <span>Technology</span>
            <span className="text-cyan-400">→</span>
            <span>IoT</span>
            <span className="text-cyan-400">→</span>
            <span>Creative</span>
            <span className="text-cyan-400">→</span>
            <span>Construction</span>
            <span className="text-cyan-400">→</span>
            <span>Teaching</span>
          </div>
        </div>
      </div>
    </section>
  );
};
