import React from 'react';
import { ArrowRight, Sparkles, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';

interface HireMeSectionProps {
  onStartProject: () => void;
  onViewServices: () => void;
  whatsappNumber?: string;
}

export const HireMeSection: React.FC<HireMeSectionProps> = ({
  onStartProject,
  onViewServices,
  whatsappNumber = "+92 300 0000000"
}) => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Collaboration</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase mb-6 leading-tight">
          NEED A PROFESSIONAL <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
            SOLUTION?
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tell me what you need. I'll help you turn the idea into a practical project.
        </p>

        {/* 3 Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          <button
            id="hireme-btn-start-project"
            onClick={onStartProject}
            className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center space-x-2"
          >
            <span>START A PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="hireme-btn-hire-me"
            onClick={onStartProject}
            className="px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider text-cyan-400 bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-800/60 hover:border-cyan-700 transition-all hover:-translate-y-0.5"
          >
            HIRE ME
          </button>

          <button
            id="hireme-btn-view-services"
            onClick={onViewServices}
            className="px-8 py-4 rounded-xl font-semibold text-xs uppercase tracking-wider text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all hover:-translate-y-0.5"
          >
            VIEW SERVICES
          </button>
        </div>

        {/* Key Guarantees */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-800/80 text-left">
          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Strict Privacy & NDA</h4>
              <p className="text-[11px] text-slate-400">Your proprietary ideas and specs are protected.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Zero Fabricated Claims</h4>
              <p className="text-[11px] text-slate-400">Realistic scopes, accurate pricing & verified timelines.</p>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-white mb-0.5">Multi-Platform Flex</h4>
              <p className="text-[11px] text-slate-400">Work directly or through Fiverr & Upwork escrow.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
