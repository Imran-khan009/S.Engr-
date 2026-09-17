import React, { useState } from 'react';
import { Service, Project } from '../types';
import { IconHelper } from './IconHelper';
import { X, Check, Clock, DollarSign, ArrowRight, HelpCircle, ChevronDown, ChevronUp, Layers } from 'lucide-react';

interface ServiceDetailModalProps {
  service: Service | null;
  allProjects: Project[];
  onClose: () => void;
  onStartProject: (service: Service) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  allProjects,
  onClose,
  onStartProject
}) => {
  if (!service) return null;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Find related projects
  const relatedProjects = allProjects.filter(p =>
    p.category.toLowerCase().includes(service.category.toLowerCase()) ||
    service.portfolioExamples.some(ex => p.title.toLowerCase().includes(ex.toLowerCase()))
  );

  return (
    <div
      id="service-detail-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="service-detail-modal-content"
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <IconHelper name={service.iconName} className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                {service.category}
              </span>
              <h2 className="text-lg font-bold text-white leading-tight">
                {service.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          {/* Quick Summary Pill Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Starting At</span>
              <span className="text-base font-bold text-cyan-300 font-mono">{service.startingPrice}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Est. Delivery</span>
              <span className="text-sm font-semibold text-slate-200 font-mono">{service.estimatedDelivery}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Execution Mode</span>
              <span className="text-sm font-semibold text-slate-200">Direct / Escrow</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Support</span>
              <span className="text-sm font-semibold text-emerald-400">Post-Delivery QA</span>
            </div>
          </div>

          {/* Problem vs Solution Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-950/15 border border-rose-900/30">
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-2">
                The Problem
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {service.problem}
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-900/40">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">
                My Practical Solution
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {service.solution}
              </p>
            </div>
          </div>

          {/* What I Provide */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              What I Provide
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.includedFeatures.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Step Process */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Work Process & Delivery Flow
            </h3>
            <div className="space-y-2.5">
              {service.process.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Tech */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
              Tools & Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <span key={tool} className="px-3 py-1 rounded-lg bg-slate-800 text-xs font-mono text-cyan-300 border border-slate-700">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                Related Portfolio Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedProjects.map((p) => (
                  <div key={p.id} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">{p.title}</h4>
                      <p className="text-[11px] font-mono text-slate-400">{p.projectType}</p>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                Frequently Asked Questions
              </h3>
              <div className="space-y-2">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/50">
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200 hover:text-white"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp className="w-4 h-4 text-cyan-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                      </button>
                      {isOpen && (
                        <div className="px-3.5 pb-3.5 text-xs text-slate-400 border-t border-slate-800/80 pt-2 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div className="p-4 sm:p-6 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-slate-400 block font-mono">
              Ready to collaborate with Engr. Imran Khan?
            </span>
            <span className="text-xs text-slate-300">
              Clear scope, transparent timelines & direct communication.
            </span>
          </div>
          <button
            onClick={() => onStartProject(service)}
            className="w-full sm:w-auto px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center space-x-2"
          >
            <span>START THIS PROJECT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
