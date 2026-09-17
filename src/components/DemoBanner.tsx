import React from 'react';
import { Sparkles, ArrowRight, Eye, Layers, ShieldCheck } from 'lucide-react';

interface DemoBannerProps {
  onOpenComparison: () => void;
  onRequestCustom: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  onOpenComparison,
  onRequestCustom
}) => {
  return (
    <div
      id="demo-mode-top-banner"
      className="bg-slate-900/90 border-b border-cyan-500/30 backdrop-blur-md px-3 sm:px-6 py-2.5 text-xs text-slate-300 sticky top-0 z-40 shadow-lg shadow-cyan-950/20"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5">
        {/* Left: Indicator & Description */}
        <div className="flex items-center space-x-2.5 text-center sm:text-left flex-wrap justify-center sm:justify-start">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-[11px] font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>DEMO VERSION</span>
          </span>
          <span className="text-slate-300 text-[11px] sm:text-xs font-medium">
            Exploring live S • ENGR portfolio & services showcase. Advanced custom branding & business portals available in custom builds.
          </span>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            id="demo-banner-btn-compare"
            onClick={onOpenComparison}
            className="px-3 py-1 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 text-[11px] font-mono transition-colors flex items-center space-x-1.5"
          >
            <Layers className="w-3 h-3 text-cyan-400" />
            <span>Demo vs Paid</span>
          </button>

          <button
            id="demo-banner-btn-request-custom"
            onClick={onRequestCustom}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 text-slate-950 text-[11px] font-mono font-bold transition-all shadow-sm shadow-cyan-500/20 flex items-center space-x-1"
          >
            <span>Request Custom Website</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
