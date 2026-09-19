import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Sparkles, Terminal, Cpu, Palette, TrendingUp, Compass, GraduationCap, Check } from 'lucide-react';

interface SkillsEcosystemProps {
  categories: SkillCategory[];
  onSelectSkillForInquiry?: (skillName: string) => void;
}

export const SkillsEcosystem: React.FC<SkillsEcosystemProps> = ({
  categories,
  onSelectSkillForInquiry
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const filteredCategories = activeCategory === 'ALL'
    ? categories
    : categories.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const categoryIcons: Record<string, any> = {
    'Technology & Software': Terminal,
    'IoT & Smart Systems': Cpu,
    'Creative & Media': Palette,
    'Digital Marketing': TrendingUp,
    'Construction & Site Engineering': Compass,
    'Teaching & Training': GraduationCap
  };

  return (
    <section id="skills" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Competency Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            SKILLS ECOSYSTEM
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            A comprehensive matrix of core technical competencies, software toolchains, and field capabilities without arbitrary percentage meters.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {['ALL', 'Technology', 'IoT', 'Creative', 'Marketing', 'Construction', 'Teaching'].map((tab) => {
            const isSelected = activeCategory === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((catGroup) => {
            const IconComp = categoryIcons[catGroup.category] || Terminal;
            return (
              <div
                key={catGroup.category}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 transition-all hover:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-white">
                        {catGroup.category}
                      </h3>
                      <span className="text-[10px] font-mono text-cyan-400/80">
                        {catGroup.skills.length} Competencies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                    {catGroup.description}
                  </p>

                  {/* Competency Badges List */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {catGroup.skills.map((skill) => (
                      <button
                        key={skill.name}
                        onClick={() => onSelectSkillForInquiry && onSelectSkillForInquiry(skill.name)}
                        className="group flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-cyan-500/15 border border-slate-800 hover:border-cyan-500/40 text-xs font-mono text-slate-200 hover:text-cyan-300 transition-colors"
                        title="Click to inquire about this skill"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70 group-hover:bg-cyan-400" />
                        <span>{skill.name}</span>
                        <span className="text-[9px] text-slate-500 group-hover:text-cyan-400/70 pl-1">
                          [{skill.tag}]
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Standard: Production / Field Tested</span>
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
