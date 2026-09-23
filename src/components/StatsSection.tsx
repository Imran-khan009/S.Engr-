import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Briefcase, FolderCheck, Users, ShieldCheck, Clock } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 'stat-instructor-roles',
      value: '2',
      label: 'Present Instructor Roles',
      subtext: 'UNICEF-supported Trade: IoT & Trade: Computer Operator',
      icon: GraduationCap,
      color: 'from-orange-400 to-amber-500'
    },
    {
      id: 'stat-active-services',
      value: '6',
      label: 'Active Services',
      subtext: 'End-to-end software, IoT, branding & engineering',
      icon: Briefcase,
      color: 'from-amber-400 to-orange-500'
    },
    {
      id: 'stat-projects',
      value: '50+',
      label: 'Projects Completed',
      subtext: 'Microcontroller prototypes, web apps & brand assets',
      icon: FolderCheck,
      color: 'from-orange-400 to-amber-400'
    },
    {
      id: 'stat-students',
      value: '500+',
      label: 'Students Trained',
      subtext: 'Hands-on hardware assembly & digital literacy',
      icon: Users,
      color: 'from-amber-400 to-yellow-500'
    },
    {
      id: 'stat-delivery',
      value: '100%',
      label: 'Milestone Delivery',
      subtext: 'Direct contract precision & verified escrow safety',
      icon: ShieldCheck,
      color: 'from-emerald-400 to-teal-400'
    },
    {
      id: 'stat-response',
      value: '< 2h',
      label: 'Fast Response',
      subtext: 'Direct communication on WhatsApp & official email',
      icon: Clock,
      color: 'from-orange-400 to-rose-400'
    }
  ];

  return (
    <section id="stats" className="py-14 bg-[#080d1a] border-y border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strip Header */}
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-widest block mb-1">
            Results in Numbers
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
            VERIFIED TRACK RECORD &amp; IMPACT
          </h3>
        </div>

        {/* 6 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                id={stat.id}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-2xl p-4 sm:p-5 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 group-hover:text-orange-300 group-hover:bg-orange-500/20 flex items-center justify-center transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400/40 group-hover:bg-orange-400 transition-colors" />
                </div>
                <div>
                  <div className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-white tracking-wide uppercase font-sans mb-1">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-tight">
                    {stat.subtext}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
