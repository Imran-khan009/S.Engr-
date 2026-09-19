import React, { useState } from 'react';
import { ArrowRight, Terminal, Cpu, Palette, Compass, GraduationCap, Sparkles, Layers, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onHireMe: () => void;
  onExploreWork: () => void;
  onMyServices: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onHireMe,
  onExploreWork,
  onMyServices,
  onSelectCategory
}) => {
  const [activePathway, setActivePathway] = useState<number>(0);

  const servicePathways = [
    {
      id: 0,
      title: 'Technology & IoT',
      category: 'IoT & Smart Technology',
      icon: Cpu,
      accent: 'from-cyan-400 to-blue-500',
      badge: 'Sensors & Automation',
      desc: 'Arduino, ESP32 telemetry, microcontroller programming & custom hardware systems.',
      features: ['ESP32 & Arduino C++', 'Sensor Interfacing', 'Smart Water & Agriculture']
    },
    {
      id: 1,
      title: 'Web & Software',
      category: 'Technology & Web',
      icon: Terminal,
      accent: 'from-blue-400 to-indigo-500',
      badge: 'Full-Stack Architecture',
      desc: 'High-speed modern websites, custom web apps, API integrations & admin CMS systems.',
      features: ['React & Node Architecture', 'Business Web Portals', 'Performance & SEO']
    },
    {
      id: 2,
      title: 'Creative & Digital',
      category: 'Creative Design & Branding',
      icon: Palette,
      accent: 'from-indigo-400 to-purple-500',
      badge: 'Visual Identity & Reach',
      desc: 'High-impact logo systems, marketing collateral, social strategy & video post-production.',
      features: ['Branding & Vector Design', 'Targeted Ad Campaigns', 'Reels & Video Cuts']
    },
    {
      id: 3,
      title: 'Training & Education',
      category: 'Teaching',
      icon: GraduationCap,
      accent: 'from-emerald-400 to-teal-500',
      badge: 'Vocational Mentorship',
      desc: 'Hands-on STEM and digital literacy courses with practical lab blueprints for institutions.',
      features: ['IoT & Embedded STEM', 'Vocational Computer Literacy', 'Structured Course Modules']
    },
    {
      id: 4,
      title: 'Construction & 2D CAD',
      category: 'Construction & Design',
      icon: Compass,
      accent: 'from-amber-400 to-orange-500',
      badge: 'Active Service',
      desc: 'Accurate 2D AutoCAD drafting, ground dimension checks & on-site technical coordination.',
      features: ['2D Blueprint Drafting', 'Clash Detection', 'Measurement Verification']
    }
  ];

  const handlePathwayClick = (idx: number, category: string) => {
    setActivePathway(idx);
    if (category === 'Teaching') {
      const el = document.getElementById('teaching');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      if (onSelectCategory) {
        onSelectCategory(category);
      } else {
        onMyServices();
      }
    }
  };

  return (
    <section
      id="home"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-950"
    >
      {/* Subtle animated abstract background mesh (GPU-accelerated, lightweight) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 25, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-gradient-to-tr from-cyan-600/10 via-blue-600/10 to-indigo-600/5 blur-[120px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
            y: [0, 25, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-16 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl"
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand & Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-cyan-400 mb-6 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-extrabold tracking-wider">S • ENGR</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">Available for Select Projects & Training</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]"
          >
            Technology, Digital &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Engineering Solutions
            </span>
          </motion.h1>

          {/* Sub-Headline / Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-medium text-slate-200 mb-4 max-w-3xl mx-auto leading-snug"
          >
            Websites, IoT systems, digital services, creative design and practical technology training.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs sm:text-sm text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Delivering production-grade software architectures, microcontroller hardware telemetry, creative brand collateral, and real-world vocational curriculum.
          </motion.p>

          {/* Magnetic Primary CTA & Secondary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            {/* Magnetic Hover Button */}
            <motion.button
              id="hero-cta-hire-me"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={onHireMe}
              className="px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-shadow shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center space-x-2.5 cursor-pointer"
            >
              <span>HIRE ME</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <button
              id="hero-cta-explore-services"
              onClick={onMyServices}
              className="px-8 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/40 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              EXPLORE SERVICES
            </button>

            <button
              id="hero-cta-explore-work"
              onClick={onExploreWork}
              className="px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-cyan-400/90 hover:text-cyan-300 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-800/40 hover:border-cyan-700/60 transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              PORTFOLIO CASES
            </button>
          </motion.div>
        </div>

        {/* Clear Service Pathways Grid */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-5xl mx-auto bg-slate-900/70 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 pb-3 border-b border-slate-800/80 gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold">
                Clear Service Pathways
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Select a pathway to explore active offerings
            </span>
          </div>

          {/* Pathways Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {servicePathways.map((pathway, idx) => {
              const IconComp = pathway.icon;
              const isSelected = activePathway === idx;
              return (
                <button
                  key={pathway.id}
                  id={`pathway-card-${pathway.id}`}
                  onClick={() => handlePathwayClick(idx, pathway.category)}
                  className={`text-left p-4 rounded-xl transition-all duration-200 border relative flex flex-col justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500/60 shadow-md shadow-cyan-500/10'
                      : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 shadow-sm font-bold'
                            : 'bg-slate-800 text-slate-300 group-hover:text-cyan-400 group-hover:bg-slate-800/80'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {pathway.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {pathway.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 leading-snug mb-3">
                      {pathway.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-cyan-400 group-hover:text-cyan-300">
                    <span>Explore</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>

                  {isSelected && (
                    <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Clean Flow Bar */}
          <div className="hidden sm:flex items-center justify-center space-x-3 mt-5 pt-3 border-t border-slate-800/60 text-[11px] font-mono text-slate-400">
            <span className="text-slate-300">Technology & IoT</span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="text-slate-300">Web & Software</span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="text-slate-300">Creative & Digital</span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="text-slate-300">Training & Education</span>
            <span className="text-cyan-400 font-bold">→</span>
            <span className="text-slate-400">Construction (CAD)</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
