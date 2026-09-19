import React from 'react';
import { ExperienceItem, EducationItem } from '../types';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  education
}) => {
  return (
    <section id="experience" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Professional Career Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            EXPERIENCE & EDUCATION
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Ground-level youth instructional programs, field site engineering coordination, and rigorous academic study.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Work Experience Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Professional Experience
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-cyan-400 group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-900/70 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 transition-all shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/50">
                          {exp.dates}
                        </span>
                        {exp.trade && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
                            Trade: {exp.trade}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-400 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-0.5">
                      {exp.role}
                    </h4>
                    <p className="text-xs font-medium text-slate-300">
                      {exp.organization}
                    </p>
                    {exp.supportingProgram && (
                      <p className="text-[11px] font-mono text-cyan-400/90 mb-4 mt-0.5">
                        {exp.supportingProgram}
                      </p>
                    )}
                    {!exp.supportingProgram && <div className="mb-4" />}

                    <div className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-slate-900/70 border border-slate-800/80 hover:border-blue-500/40 rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/40">
                      {edu.dates}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      {edu.location}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-medium text-slate-300 mb-3">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}

              {/* Professional Credentials & Ethics Note */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Professional Integrity Statement</span>
                </div>
                <p className="leading-relaxed">
                  Engineering drafting, site coordination, and technical services are delivered strictly in accordance with authentic qualifications: BS Computer Science and Diploma of Associate Engineering in Civil Engineering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
