import React from 'react';
import { GraduationCap, BookOpen, Wrench, Users, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface TeachingSectionProps {
  onContactForTeaching: () => void;
}

export const TeachingSection: React.FC<TeachingSectionProps> = ({ onContactForTeaching }) => {
  const steps = [
    { title: 'LEARN', desc: 'Core programming fundamentals & electronic theory made intuitive.', icon: BookOpen },
    { title: 'PRACTICE', desc: 'Hands-on breadboard wiring, syntax exercises & sensor probing.', icon: Wrench },
    { title: 'BUILD', desc: 'Constructing physical prototypes & deploying functional web apps.', icon: Sparkles },
    { title: 'SOLVE', desc: 'Addressing community challenges (water tanks, irrigation, automation).', icon: CheckCircle2 },
    { title: 'TEACH', desc: 'Empowering students to mentor peers and share knowledge.', icon: Users }
  ];

  const highlights = [
    {
      title: 'IoT Instructor',
      subtitle: 'UNICEF-Supported Program — Hub',
      desc: 'Trained underprivileged youth in microcontrollers (Arduino & ESP32), sensor calibration, and embedded code logic to build local automated hardware solutions.'
    },
    {
      title: 'Computer Operator Instructor',
      subtitle: 'UNICEF-Supported Program — GBHS Jam Yousaf Colony, Hub',
      desc: 'Equipped students with essential digital literacy, advanced MS Office productivity, system diagnostics, and workplace computing workflows.'
    },
    {
      title: 'Project-Based Pedagogy',
      subtitle: 'Theory Grounded in Tangible Hardware',
      desc: 'Eliminating rote memorization. Students build actual circuits and applications from Day 1 to foster genuine engineering intuition.'
    },
    {
      title: 'Beginner-Friendly Mentorship',
      subtitle: 'Accessible Tech for All Backgrounds',
      desc: 'Breaking down intimidating computer science and engineering concepts into digestible, encouraging steps for students of all skill levels.'
    }
  ];

  return (
    <section id="teach" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Community Empowerment & Mentorship</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            TEACH WITH IMRAN
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Connecting professional engineering practice with accessible digital skills education.
          </p>
        </div>

        {/* 5-Step Concept: LEARN → PRACTICE → BUILD → SOLVE → TEACH */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 mb-12 shadow-lg">
          <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-6 font-semibold text-center">
            Educational Philosophy Loop
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {steps.map((s, idx) => {
              const IconComp = s.icon;
              return (
                <div
                  key={s.title}
                  className="bg-slate-950/80 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between text-left relative group hover:border-cyan-500/40 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                        <IconComp className="w-3.5 h-3.5" />
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">0{idx + 1}</span>
                    </div>
                    <h4 className="font-bold text-sm text-white mb-1 tracking-wide">
                      {s.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      {s.desc}
                    </p>
                  </div>
                  {idx < 4 && (
                    <div className="hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-cyan-500 text-xs">
                      →
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Highlights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 transition-all"
            >
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                {h.subtitle}
              </span>
              <h4 className="text-lg font-bold text-white mb-2">
                {h.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Workshop Collaboration CTA Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-800/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold text-white mb-1">
              Invite Engr. Imran Khan for Workshops or Tech Mentorship
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Available for institutional seminars, NGO boot camps, and hands-on microcontroller courses.
            </p>
          </div>
          <button
            onClick={onContactForTeaching}
            className="whitespace-nowrap px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
          >
            DISCUSS TEACHING COLLABORATION
          </button>
        </div>
      </div>
    </section>
  );
};
