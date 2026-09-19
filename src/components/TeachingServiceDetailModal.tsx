import React from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Sparkles,
  BookOpen,
  Wrench,
  Layers,
  FileCheck,
  Users
} from 'lucide-react';
import { TeachingService } from '../types';

interface TeachingServiceDetailModalProps {
  service: TeachingService | null;
  isOpen: boolean;
  onClose: () => void;
  onRequestService: (service: TeachingService) => void;
}

export const TeachingServiceDetailModal: React.FC<TeachingServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onRequestService
}) => {
  if (!isOpen || !service) return null;

  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-cyan-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-cyan-400" />;
      case 'Users':
        return <Users className="w-5 h-5 text-cyan-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div
      id="teaching-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="teaching-detail-modal-content"
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center">
              {getIcon(service.icon)}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-950/80 border border-cyan-700/50 text-cyan-300">
                  {service.category}
                </span>
                <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {service.deliveryTime}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {service.title}
              </h2>
            </div>
          </div>
          <button
            id="close-teaching-detail-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-slate-200">
          {/* Subtitle & Full Description */}
          <div>
            <p className="text-sm sm:text-base font-medium text-cyan-300/90 mb-3">
              {service.subtitle}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Pricing & Delivery Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-slate-950/70 border border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Investment Tier</span>
              <p className="text-xl font-extrabold text-cyan-400 mt-0.5">
                {service.startingPrice}
              </p>
              <span className="text-[11px] text-slate-500 font-mono">
                {service.pricingType === 'custom_quote' ? 'Tailored to requirements' : 'Standard scope pricing'}
              </span>
            </div>
            {service.premiumPrice && (
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Comprehensive Package</span>
                <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
                  {service.premiumPrice}
                </p>
                <span className="text-[11px] text-slate-500 font-mono">Extended module & solution sets</span>
              </div>
            )}
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Typical Delivery</span>
              <p className="text-sm font-bold text-white mt-1.5 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                {service.deliveryTime}
              </p>
              <span className="text-[11px] text-slate-500 font-mono">Direct digital transfer</span>
            </div>
          </div>

          {/* Sub-Offerings Breakdown */}
          {service.subOfferings && service.subOfferings.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Specialized Service Formats Included
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {service.subOfferings.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {sub.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sub.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Who this service is for & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 font-semibold">
                Who This Service Is For
              </h3>
              <ul className="space-y-2">
                {service.whoIsThisFor.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-3 font-semibold">
                What You Receive (Deliverables)
              </h3>
              <ul className="space-y-2">
                {service.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                    <FileText className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Limited Sample / Structure Preview (Protected Content) */}
          <div className="p-5 rounded-xl bg-slate-950/90 border border-cyan-900/40 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                Structural Sample Excerpt
              </h3>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                Protected Preview
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-300 mb-2">
              {service.samplePreview.title}
            </p>
            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 font-mono text-[11px] text-slate-400 leading-relaxed">
              {service.samplePreview.excerpt}
            </div>
            <p className="mt-2 text-[10px] text-slate-500 italic">
              Notice: {service.samplePreview.notice}
            </p>
          </div>

          {/* Execution Process & Methodology */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4 font-semibold">
              Step-by-Step Delivery Process
            </h3>
            <div className="space-y-2.5">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-950/40 border border-slate-800/60">
                  <span className="w-6 h-6 rounded-md bg-cyan-500/10 text-cyan-400 font-mono text-xs flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Frequently Asked Questions */}
          {service.faqs && service.faqs.length > 0 && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 font-semibold flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-3">
                {service.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/70">
                    <p className="text-xs font-bold text-white mb-1.5">
                      {faq.question}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left">
            <span className="text-xs text-slate-400">Ready to initiate this educational project?</span>
            <p className="text-xs font-mono text-cyan-400">
              Submit your curriculum guidelines & receive a confirmed roadmap.
            </p>
          </div>
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              Back
            </button>
            <button
              id={`request-service-btn-${service.slug}`}
              onClick={() => {
                onClose();
                onRequestService(service);
              }}
              className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
            >
              <span>REQUEST THIS SERVICE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
