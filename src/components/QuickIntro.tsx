import React from 'react';
import { Terminal, Cpu, Code2, Palette, TrendingUp, Compass, ArrowRight } from 'lucide-react';

interface QuickIntroProps {
  onExploreCategory: (category: string) => void;
}

export const QuickIntro: React.FC<QuickIntroProps> = ({ onExploreCategory }) => {
  const cards = [
    {
      id: 'tech',
      title: 'Technology',
      icon: Terminal,
      desc: 'Computer science principles, algorithms, C++, C#, JavaScript and foundational software architecture.',
      categoryFilter: 'Technology & Web'
    },
    {
      id: 'iot',
      title: 'IoT & Automation',
      icon: Cpu,
      desc: 'Microcontroller engineering with Arduino and ESP32, sensor telemetry, automated irrigation, and water monitoring.',
      categoryFilter: 'IoT & Smart Technology'
    },
    {
      id: 'web',
      title: 'Web Development',
      icon: Code2,
      desc: 'High-speed modern business websites, responsive UI design, interactive portfolios, and maintainable frontend code.',
      categoryFilter: 'Technology & Web'
    },
    {
      id: 'creative',
      title: 'Creative Design',
      icon: Palette,
      desc: 'Vector logo design, comprehensive brand identities, social media creatives, and high-retention video editing.',
      categoryFilter: 'Creative Design & Branding'
    },
    {
      id: 'marketing',
      title: 'Digital Marketing',
      icon: TrendingUp,
      desc: 'Structured Meta advertising campaigns, audience demographic research, competitor audits, and pragmatic strategy.',
      categoryFilter: 'Digital Marketing & Ads'
    },
    {
      id: 'construction',
      title: 'Construction & Design',
      icon: Compass,
      desc: '2D architectural CAD layouts, structural measurement verification, site coordination, and technical documentation.',
      categoryFilter: 'Construction & Design'
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Core Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What I Do
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-slate-400 max-w-md font-mono">
            Bridging software code, physical hardware, visual creativity, and civil site engineering with disciplined execution.
          </p>
        </div>

        {/* 6 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={card.id}
                id={`card-what-i-do-${card.id}`}
                className="group relative bg-slate-900/60 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 group-hover:bg-cyan-500/20 border border-slate-700/60 group-hover:border-cyan-500/40 text-cyan-400 flex items-center justify-center mb-5 transition-colors">
                    <IconComp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-slate-100 group-hover:text-white">
                      {card.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {card.desc}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => onExploreCategory(card.categoryFilter)}
                    className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-cyan-400 group-hover:text-cyan-300 transition-colors"
                  >
                    <span>EXPLORE SERVICES</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
