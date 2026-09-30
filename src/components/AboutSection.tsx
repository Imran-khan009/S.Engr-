import React, { useState, useEffect } from 'react';
import { UserCheck, ArrowRight, Terminal, Cpu, Palette, TrendingUp, Compass, GraduationCap, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { SkillCategory } from '../types';
import aboutPic from '../assets/images/regenerated_image_1790142270551.jpg';

interface AboutSectionProps {
  onHireMe: () => void;
  categories?: SkillCategory[];
  onSelectSkillForInquiry?: (skillName: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onHireMe,
  categories = [],
  onSelectSkillForInquiry
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  useEffect(() => {
    // Clear any previous temporary overrides so official photo is locked and cannot be changed
    try {
      localStorage.removeItem('s_engr_about_photo_custom');
      if (typeof window !== 'undefined' && window.indexedDB) {
        window.indexedDB.deleteDatabase('s_engr_media_cache');
      }
    } catch {
      // ignore
    }
  }, []);

  const defaultCategories: SkillCategory[] = [
    {
      category: 'Technology & Web',
      description: 'Full-stack software engineering, responsive web platforms, and API systems.',
      skills: [
        { name: 'JavaScript / ES6+', tag: 'Web' },
        { name: 'React & TypeScript', tag: 'Frontend' },
        { name: 'Node.js & Express', tag: 'Backend' },
        { name: 'Tailwind CSS', tag: 'UI' },
        { name: 'REST APIs & Webhooks', tag: 'APIs' },
        { name: 'C++ & C#', tag: 'Software' }
      ]
    },
    {
      category: 'IoT & Smart Systems',
      description: 'Microcontroller hardware, sensor instrumentation, and automated telemetry.',
      skills: [
        { name: 'Arduino Uno / Nano', tag: 'Hardware' },
        { name: 'ESP32 WiFi / BLE', tag: 'Wireless' },
        { name: 'Sensor Telemetry', tag: 'Sensors' },
        { name: 'Relay Actuator Control', tag: 'Automation' },
        { name: 'Blynk IoT Cloud', tag: 'Cloud' },
        { name: 'Circuit Schematics', tag: 'Electronics' }
      ]
    },
    {
      category: 'Creative & Media',
      description: 'Brand identity systems, vector logo design, and short-form video editing.',
      skills: [
        { name: 'Vector Logo Design', tag: 'Branding' },
        { name: 'Adobe Illustrator', tag: 'Design' },
        { name: 'Premiere Pro / CapCut', tag: 'Video' },
        { name: 'Social Media Assets', tag: 'Media' },
        { name: 'Typography & Layout', tag: 'Creative' }
      ]
    },
    {
      category: 'Digital Marketing',
      description: 'Data-driven audience segmentation, Meta ads setups, and copy architecture.',
      skills: [
        { name: 'Meta Ads Manager', tag: 'Ads' },
        { name: 'Audience Targeting', tag: 'Marketing' },
        { name: 'Creative Angle Testing', tag: 'Copy' },
        { name: 'Conversion Optimization', tag: 'Growth' }
      ]
    },
    {
      category: 'Construction & CAD',
      description: '2D technical drafting, ground cross-checks, and field coordination.',
      skills: [
        { name: '2D AutoCAD Drafting', tag: 'CAD' },
        { name: 'Dimension Verification', tag: 'Site' },
        { name: 'DAE Civil Engineering', tag: 'Civil' },
        { name: 'Structural Coordination', tag: 'Field' }
      ]
    }
  ];

  const displayCategories = categories && categories.length > 0 ? categories : defaultCategories;

  const filteredCategories = activeCategory === 'ALL'
    ? displayCategories
    : displayCategories.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const categoryIcons: Record<string, any> = {
    'Technology & Web': Terminal,
    'Technology & Software': Terminal,
    'IoT & Smart Systems': Cpu,
    'Creative & Media': Palette,
    'Creative Design & Branding': Palette,
    'Digital Marketing': TrendingUp,
    'Construction & CAD': Compass,
    'Construction & Site Engineering': Compass,
    'Teaching & Training': GraduationCap
  };

  const steps = [
    { name: 'IDEA', detail: 'Deconstructing technical challenges from first principles.' },
    { name: 'DESIGN', detail: 'Visual wireframes, 2D architectural CAD, or circuit drafts.' },
    { name: 'BUILD', detail: 'Clean TypeScript frontend, C++ embedded firmware, or site plans.' },
    { name: 'TEST', detail: 'Bench telemetry testing, responsive QA & dimension cross-checks.' },
    { name: 'TEACH', detail: 'Demystifying technology through structured student workshops.' }
  ];

  return (
    <section id="about" className="py-24 bg-[#080d1a] text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story & Execution Methodology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading font-bold text-[36px] sm:text-[42px] lg:text-[48px] text-white tracking-tight uppercase leading-tight">
              I DON’T BELONG TO JUST ONE FIELD.
            </h2>

            <p className="font-sans text-[16px] sm:text-[18px] text-slate-200 leading-relaxed font-normal">
              My practice seamlessly bridges <strong className="text-white">Computer Science</strong>, <strong className="text-orange-400">IoT Smart Hardware</strong>, <strong className="text-white">Brand &amp; Creative Design</strong>, <strong className="text-orange-400">Digital Marketing</strong>, and <strong className="text-white">Civil Site Coordination</strong>.
            </p>

            <p className="font-sans text-[16px] text-slate-300 leading-relaxed font-normal">
              Rather than viewing these fields as isolated silos, I treat them as interconnected tools in a unified problem-solving arsenal. When developing an IoT prototype, having a civil engineering foundation gives critical insight into physical conduits and enclosure constraints; having computer science rigor ensures modular, bug-free C++ firmware; and visual design skills deliver intuitive cloud dashboards and polished presentations.
            </p>

            <p className="font-sans text-[16px] text-slate-400 leading-relaxed font-normal">
              As an instructor with UNICEF-supported programs, I believe authentic technical mastery is proven when you can teach complex technology to a beginner and empower them to build production-grade prototypes.
            </p>

            <div className="pt-2">
              <button
                onClick={onHireMe}
                className="px-6 py-3 rounded-xl font-sans font-semibold text-[14px] sm:text-[16px] uppercase tracking-wider text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 transition-all shadow-md shadow-orange-500/20 flex items-center space-x-2 cursor-pointer"
              >
                <span>COLLABORATE ON A PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Portrait & Execution Methodology Loop */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Explainer Spheres Cinematic Showcase Video - Pinned & Hardware Accelerated */}
            <div className="relative group rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl">
              <div className="relative w-full aspect-video bg-slate-950 overflow-hidden rounded-t-3xl select-none">
                <video
                  src="/assets/videos/explainer_spheres__copy_.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover rounded-t-3xl select-none pointer-events-none"
                />

                {/* Tech Badge */}
                <div className="absolute top-3 left-3 pointer-events-none">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[10px] font-mono font-bold text-cyan-400 flex items-center space-x-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>EXPLAINER SPHERES • 4 DOMAINS</span>
                  </span>
                </div>
              </div>
              <div className="p-4 sm:p-5 flex items-center justify-between bg-slate-950/90 border-t border-slate-800">
                <div>
                  <div className="flex items-center space-x-1.5 text-cyan-400 text-xs font-mono mb-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-semibold">Interactive Tech Architecture</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    Engr. Imran Khan
                  </h3>
                </div>
              </div>
            </div>

            {/* Execution Methodology */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                <span className="text-xs font-mono font-bold text-orange-400 uppercase tracking-wider">
                  Execution Methodology
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  End-to-End Loop
                </span>
              </div>

              <div className="space-y-3">
                {steps.map((st, i) => (
                  <div key={st.name} className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <div className="w-6 h-6 rounded-lg bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white mb-0.5">
                        {st.name}
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        {st.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 p-3.5 rounded-2xl bg-orange-950/30 border border-orange-900/40 text-center">
                <span className="text-[11px] font-mono text-orange-300 font-bold block mb-0.5">
                  DISCOVER → EXPLORE → TRUST → REQUEST → DELIVER
                </span>
                <span className="text-[10px] text-slate-400">
                  Transparent milestones with verified escrow security.
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Skills Ecosystem Strip (Embedded inside ABOUT as requested) */}
        <div id="skills-ecosystem" className="pt-12 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-orange-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Skills Ecosystem</span>
            </div>
            <h3 className="font-heading font-semibold text-[24px] sm:text-[28px] lg:text-[30px] text-white tracking-tight uppercase">
              TECHNICAL COMPETENCIES &amp; TOOLCHAINS
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Practical capabilities grounded in university computer science training and hands-on field experience.
            </p>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-8 gap-2 no-scrollbar">
            {['ALL', 'Technology', 'IoT', 'Creative', 'Marketing', 'Construction'].map((tab) => {
              const isSelected = activeCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => {
              const IconComp = categoryIcons[cat.category] || Terminal;
              return (
                <div
                  key={cat.category}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-orange-500/30 transition-all group"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">
                        {cat.category}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill.name}
                        onClick={() => onSelectSkillForInquiry?.(skill.name)}
                        className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-slate-300 hover:border-orange-500/40 hover:text-orange-300 transition-colors cursor-pointer"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
