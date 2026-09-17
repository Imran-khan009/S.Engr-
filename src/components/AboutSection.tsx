import React from 'react';
import { UserCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  onHireMe: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onHireMe }) => {
  const steps = [
    { name: 'IDEA', detail: 'Deconstructing challenges from first principles.' },
    { name: 'DESIGN', detail: 'Visual wireframes, 2D architectural CAD, or circuit drafts.' },
    { name: 'BUILD', detail: 'Clean TypeScript frontend, C++ embedded firmware, or site plans.' },
    { name: 'TEST', detail: 'Bench telemetry testing, responsive QA & dimension cross-checks.' },
    { name: 'TEACH', detail: 'Demystifying technology through structured student workshops.' }
  ];

  return (
    <section className="py-24 bg-slate-900/40 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Professional Story & Stance</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
              I DON’T BELONG TO JUST ONE FIELD.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              My work spans across <strong className="text-white">Computer Science</strong>, <strong className="text-white">IoT Hardware</strong>, <strong className="text-white">Creative Design</strong>, <strong className="text-white">Digital Marketing</strong>, and <strong className="text-white">Civil Site Engineering</strong>.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              Rather than viewing these fields as isolated silos, I treat them as interconnected tools in a unified problem-solving arsenal. When developing an IoT prototype, having a background in civil construction provides insight into physical conduit placement and enclosure constraints; having computer science fundamentals ensures tight, leak-free firmware; and having visual design capabilities ensures clear dashboards and polished client presentation.
            </p>

            <p className="text-sm text-slate-400 leading-relaxed">
              As an instructor with UNICEF-supported programs, I believe that true mastery of engineering is proven only when you can teach it to a complete beginner and guide them to build something real.
            </p>

            <div className="pt-2">
              <button
                onClick={onHireMe}
                className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 flex items-center space-x-2"
              >
                <span>COLLABORATE ON A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Execution Methodology Loop */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                Execution Methodology
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                End-to-End Loop
              </span>
            </div>

            <div className="space-y-4">
              {steps.map((st, i) => (
                <div key={st.name} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-0.5">
                      {st.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {st.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-900/40 text-center">
              <span className="text-xs font-mono text-cyan-300 font-bold block mb-1">
                DISCOVER → EXPLORE → TRUST → REQUEST → HIRE
              </span>
              <span className="text-[11px] text-slate-400">
                Structured delivery with regular client milestones.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
