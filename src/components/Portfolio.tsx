import React, { useState } from 'react';
import { Project } from '../types';
import { TechnicalDiagram } from './TechnicalDiagrams';
import { ExternalLink, Github, Eye, Layers, Sparkles, X, CheckCircle2, Cpu } from 'lucide-react';

interface PortfolioProps {
  projects: Project[];
  onRequestSimilarService?: (category: string) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ projects, onRequestSimilarService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    'ALL',
    'Web Development + E-Commerce + Branding',
    'IoT & Automation',
    'IoT & Smart Technology',
    'Creative Design',
    'Video Editing',
    'Digital Marketing',
    'Construction & Design'
  ];

  const filteredProjects = activeCategory === 'ALL'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="work" className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Real-World Proof of Work</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              Featured Projects
            </h2>
          </div>
          <p className="mt-3 md:mt-0 text-sm text-slate-400 max-w-md font-mono">
            Every project documented with practical hardware schematics, system architecture, and real-world execution narratives.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex items-center justify-start overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {['ALL', 'Web Dev', 'IoT & Hardware', 'Creative', 'Video', 'Marketing', 'Construction'].map((label, idx) => {
            const rawCat = categories[idx] || 'ALL';
            const isSelected = activeCategory === rawCat;
            return (
              <button
                key={label}
                onClick={() => setActiveCategory(rawCat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              <div>
                {/* Visual Header / Diagram Banner */}
                <div className="relative h-48 w-full bg-slate-950 overflow-hidden border-b border-slate-800">
                  {project.images?.[0] ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900 text-slate-600 font-mono text-xs">
                      [Engineering Artifact]
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                      {project.projectType}
                    </span>
                    {project.diagramType && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 flex items-center space-x-1">
                        <Cpu className="w-3 h-3" />
                        <span>Interactive Circuit</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-0.5 truncate">
                      {project.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <p className="text-xs sm:text-sm text-slate-300 mb-4 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Problem & Solution Mini Highlight */}
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px] mb-4 space-y-1">
                    <div className="text-slate-400 line-clamp-1">
                      <strong className="text-rose-400 font-mono">Problem:</strong> {project.problem}
                    </div>
                    <div className="text-slate-300 line-clamp-1">
                      <strong className="text-cyan-400 font-mono">Solution:</strong> {project.solution}
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-500">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-5 sm:p-6 pt-0 border-t border-slate-800/60 mt-2">
                <div className="flex items-center justify-between pt-3">
                  <span className="text-[11px] font-mono text-slate-500">
                    Role: <strong className="text-slate-300">{project.role}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider"
                  >
                    <span>VIEW DETAILS</span>
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          id="project-detail-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  {selectedProject.category}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable details */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              {/* If project has an interactive circuit/diagram, render it prominently! */}
              {selectedProject.diagramType && (
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2 font-semibold">
                    Interactive Engineering & Circuit Schematic
                  </h4>
                  <TechnicalDiagram type={selectedProject.diagramType} />
                </div>
              )}

              {/* Problem vs Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/30">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-2">
                    Core Problem
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                    Engineered Solution
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {selectedProject.solution}
                  </p>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                  Project Overview
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Technologies & Tools */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Technologies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map(t => (
                      <span key={t} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                    Instruments & Software
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tools.map(tool => (
                      <span key={tool} className="text-xs font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-200 border border-slate-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Case Study Note */}
              {selectedProject.verifiedNotes && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center space-x-2 text-xs text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    <strong className="text-slate-300">Project Case Study:</strong> {selectedProject.verifiedNotes}
                  </span>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Need similar engineering or development for your business?
              </span>
              <button
                onClick={() => {
                  const cat = selectedProject.category;
                  setSelectedProject(null);
                  if (onRequestSimilarService) onRequestSimilarService(cat);
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20"
              >
                REQUEST SIMILAR PROJECT
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
