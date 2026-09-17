import React, { useState } from 'react';
import { Service, ServiceCategory } from '../types';
import { IconHelper } from './IconHelper';
import { Clock, DollarSign, Check, ArrowRight, Sparkles, Filter } from 'lucide-react';

interface ServicesMarketplaceProps {
  services: Service[];
  onViewDetails: (service: Service) => void;
  onRequestService: (service: Service) => void;
  selectedCategoryFilter?: string;
  onClearCategoryFilter?: () => void;
  showPricing?: boolean;
  showFeatures?: boolean;
  showServices?: boolean;
}

export const ServicesMarketplace: React.FC<ServicesMarketplaceProps> = ({
  services,
  onViewDetails,
  onRequestService,
  selectedCategoryFilter,
  onClearCategoryFilter,
  showPricing = true,
  showFeatures = true,
  showServices = true
}) => {
  const [activeTab, setActiveTab] = useState<string>(selectedCategoryFilter || 'ALL');

  if (showServices === false) {
    return (
      <section id="services" className="py-16 bg-slate-950 text-slate-100 border-t border-slate-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Services Catalog</h3>
          <p className="text-sm text-slate-400">Services catalog is currently undergoing scheduled updates. Please contact directly for custom quotes and project availability.</p>
        </div>
      </section>
    );
  }

  // Categories list
  const categories = [
    'ALL',
    'Technology & Web',
    'Programming & Software',
    'IoT & Smart Technology',
    'Creative Design & Branding',
    'Digital Marketing & Ads',
    'Video Editing',
    'Excel & Data Services',
    'Construction & Design'
  ];

  const currentTab = selectedCategoryFilter || activeTab;

  const filteredServices = currentTab === 'ALL'
    ? services
    : services.filter(s => s.category.toLowerCase() === currentTab.toLowerCase());

  return (
    <section id="services" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Professional Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            SERVICES I PROVIDE
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Choose a service and start your project.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = currentTab.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => {
                  if (onClearCategoryFilter) onClearCategoryFilter();
                  setActiveTab(cat);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.slug}`}
              className="bg-slate-900/70 border border-slate-800/90 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/20 group"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700/80 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/10 group-hover:border-cyan-500/30 transition-colors">
                    <IconHelper name={service.iconName} className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60 max-w-[180px] truncate">
                    {service.category}
                  </span>
                </div>

                {/* Title & Short Description */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed line-clamp-3">
                  {service.shortDescription}
                </p>

                {/* Key Deliverables */}
                {showFeatures && (
                  <div className="mb-5 space-y-1.5 pt-3 border-t border-slate-800/80">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                      What is Included:
                    </span>
                    {service.includedFeatures.slice(0, 4).map((feat, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                    {service.includedFeatures.length > 4 && (
                      <span className="text-[11px] text-cyan-400/80 font-mono block pl-5 pt-0.5">
                        +{service.includedFeatures.length - 4} more deliverables
                      </span>
                    )}
                  </div>
                )}

                {/* Tools & Technologies */}
                <div className="mb-6 flex flex-wrap gap-1.5">
                  {service.tools.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CMS Pricing, Delivery & Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-between mb-5 bg-slate-950/60 px-3.5 py-2.5 rounded-xl border border-slate-800/60">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      {showPricing ? 'Starting Price' : 'Pricing Structure'}
                    </span>
                    <span className="text-sm font-bold text-white font-mono flex items-center text-cyan-300">
                      {showPricing ? service.startingPrice : 'Custom Quote'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">
                      Est. Delivery
                    </span>
                    <span className="text-xs font-semibold text-slate-200 font-mono flex items-center justify-end">
                      <Clock className="w-3 h-3 mr-1 text-slate-400" />
                      {service.estimatedDelivery}
                    </span>
                  </div>
                </div>

                {/* Dual Action Buttons */}
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    id={`view-details-${service.slug}`}
                    onClick={() => onViewDetails(service)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-200 bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 transition-colors text-center"
                  >
                    VIEW DETAILS
                  </button>
                  <button
                    id={`request-service-${service.slug}`}
                    onClick={() => onRequestService(service)}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/15 text-center truncate"
                  >
                    REQUEST THIS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
