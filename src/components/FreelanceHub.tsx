import React from 'react';
import { SocialPlatform } from '../types';
import { IconHelper } from './IconHelper';
import { ExternalLink, Globe, Sparkles } from 'lucide-react';

interface FreelanceHubProps {
  socials: SocialPlatform[];
}

export const FreelanceHub: React.FC<FreelanceHubProps> = ({ socials }) => {
  return (
    <section className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Globe className="w-3.5 h-3.5" />
            <span>Official Digital Presence</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            FIND ME ONLINE
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Connect across official freelance marketplaces, social channels, and direct inquiry touchpoints.
          </p>
        </div>

        {/* 9 Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {socials.filter(s => s.enabled).map((item) => (
            <div
              key={item.id}
              id={`platform-card-${item.platform.toLowerCase()}`}
              className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-950/20 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 group-hover:bg-cyan-500/10 border border-slate-700/80 group-hover:border-cyan-500/30 text-cyan-400 flex items-center justify-center transition-colors">
                    <IconHelper name={item.icon || item.platform} className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    Official
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs font-mono text-cyan-400/90 mb-3 truncate">
                  {item.handle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 border border-slate-700 transition-all flex items-center justify-center space-x-2 text-center"
                >
                  <span>VISIT {item.platform}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
