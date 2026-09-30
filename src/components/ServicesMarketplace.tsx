import React from 'react';
import { Service } from '../types';
import { Code2, Cpu, Palette, TrendingUp, Video, Compass, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface ServicesMarketplaceProps {
  services?: Service[];
  onViewDetails: (service: Service) => void;
  onRequestService?: (service: Service) => void;
  showPricing?: boolean;
  showFeatures?: boolean;
  showServices?: boolean;
}

export const ServicesMarketplace: React.FC<ServicesMarketplaceProps> = ({
  services = [],
  onViewDetails,
  showPricing = true,
  showServices = true
}) => {
  if (showServices === false) {
    return null;
  }

  // Exact 6 consolidated services requested by user
  const sixCanonicalServices: Service[] = [
    {
      id: 'srv-web-software',
      slug: 'web-software-development',
      name: 'Web & Software Development',
      category: 'Technology & Web',
      shortDescription: 'High-performance business websites, web applications, custom APIs, and responsive frontend user interfaces.',
      problem: 'Slow, bloated websites and disjointed codebases that hurt conversions and user trust.',
      solution: 'Clean semantic React and Node code, sub-second load times, and structured, high-converting responsive interfaces.',
      includedFeatures: [
        'Custom Responsive Web Design (Mobile, Tablet, Desktop)',
        'React, TypeScript & Tailwind Component Architecture',
        'Business Portfolios & High-Converting Landing Pages',
        'Speed Optimization, Clean Semantics & SEO Essentials',
        'API Endpoints, Authentication & Database Connections'
      ],
      tools: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS', 'Vite', 'REST APIs'],
      startingPrice: '$120',
      estimatedDelivery: '3-6 Days',
      portfolioExamples: ['NOORBAL E-Commerce Hub', 'Corporate Digital Experience'],
      process: ['Scope Discovery', 'Component Architecture', 'API Integration', 'Device QA & Launch'],
      faqs: [{ question: 'Is the site mobile-friendly?', answer: 'Yes, fully tested across all screen resolutions.' }],
      iconName: 'Code2',
      featured: true
    },
    {
      id: 'srv-iot-smart',
      slug: 'iot-smart-hardware',
      name: 'IoT & Smart Hardware',
      category: 'IoT & Smart Technology',
      shortDescription: 'Arduino & ESP32 microcontroller firmware, sensor telemetry, cloud dashboards, and automated hardware control.',
      problem: 'Unreliable circuit breadboarding, sensor calibration drift, and missing hardware documentation.',
      solution: 'Precision C++ firmware, calibrated sensor triggers, complete pinout schematics, and mobile/cloud dashboard connectivity.',
      includedFeatures: [
        'Arduino & ESP32 Microcontroller Programming (C++)',
        'Ultrasonic, Soil Moisture, DHT & Motion Sensors',
        'Relay Switching & Automation Circuitry',
        'WiFi & Cloud Dashboards (Blynk / MQTT Telemetry)',
        'Complete Pinout Wiring Schematics & BOM'
      ],
      tools: ['ESP32', 'Arduino IDE', 'C/C++ Embedded', 'Blynk IoT', 'Relays', 'Sensors'],
      startingPrice: '$150',
      estimatedDelivery: '5-8 Days',
      portfolioExamples: ['Smart Irrigation System', 'Water Tank Telemetry'],
      process: ['Hardware Specification', 'Breadboard Prototyping', 'Firmware Coding', 'Bench Calibration & Pinout Guide'],
      faqs: [{ question: 'Do you provide full wiring schematics?', answer: 'Yes, complete pinout schematics and commented source code are included.' }],
      iconName: 'Cpu',
      featured: true
    },
    {
      id: 'srv-brand-identity',
      slug: 'brand-identity-graphic-design',
      name: 'Brand Identity & Graphic Design',
      category: 'Creative Design & Branding',
      shortDescription: 'Scalable vector logo designs, complete visual stylebooks, commercial promotional assets, and marketing creatives.',
      problem: 'Generic templates and inconsistent visual styles that dilute brand credibility.',
      solution: 'Distinctive vector visual systems following the Design → Brand → Content → Marketing pipeline.',
      includedFeatures: [
        'Scalable Vector Logo Design & Favicon Package',
        'Comprehensive Typography & Brand Color Guides',
        'High-Impact Social Media Post Templates',
        'Commercial Advertising Posters & Marketing Collateral',
        'Full Vector Source Files (AI, SVG, PDF, High-Res PNG)'
      ],
      tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Vector Assets'],
      startingPrice: '$75',
      estimatedDelivery: '2-4 Days',
      portfolioExamples: ['NOORBAL Brand Suite', 'Engineering Identity'],
      process: ['Visual Discovery', 'Vector Concept Drafting', 'Typography Selection', 'Exporting Production Files'],
      faqs: [{ question: 'What file formats are provided?', answer: 'Full vector source files (AI/SVG/PDF) plus WebP and high-res PNG.' }],
      iconName: 'Palette',
      featured: true
    },
    {
      id: 'srv-meta-ads',
      slug: 'meta-ads-digital-marketing',
      name: 'Meta Ads & Digital Marketing',
      category: 'Digital Marketing & Ads',
      shortDescription: 'Data-driven Meta Ads campaign setup, targeted audience segmentation, competitor research, and conversion copy.',
      problem: 'Wasted advertising budget due to incorrect targeting, unconfigured pixels, and weak creative hooks.',
      solution: 'Pragmatic audience research, competitor benchmarking, verified pixel setup, and high-CTR ad angles.',
      includedFeatures: [
        'Meta Ads Manager Setup & Pixel Audit',
        'Audience Demographic & Interest Stacking',
        'Competitor Ad Angle & Product Research',
        'Conversion-Focused Copywriting & Creative Hooks',
        'Budget Optimization & Tracking Recommendations'
      ],
      tools: ['Meta Ads Manager', 'Audience Insights', 'Ad Library', 'Google Trends'],
      startingPrice: '$110',
      estimatedDelivery: '4-7 Days',
      portfolioExamples: ['Retail E-Commerce Funnel', 'Regional Lead Generation'],
      process: ['Audience Research', 'Targeting Setup', 'Creative Alignment', 'Campaign Launch & Monitoring'],
      faqs: [{ question: 'Do you make exaggerated ROAS claims?', answer: 'No fake claims—only realistic, data-grounded audience targeting and testing.' }],
      iconName: 'TrendingUp',
      featured: true
    },
    {
      id: 'srv-video-editing',
      slug: 'video-editing-media',
      name: 'Video Editing',
      category: 'Video Editing',
      shortDescription: 'Engaging social reels, YouTube video cuts, commercial promotional ads, sound mastering, and subtitle sequencing.',
      problem: 'Low viewer retention caused by sluggish pacing, bad audio balancing, and generic captioning.',
      solution: 'High-energy pacing, sound design, color correction, and dynamic on-screen subtitles optimized for engagement.',
      includedFeatures: [
        'Short-form Reels & TikTok Post-Production',
        'YouTube Long-Form Video Cutting & Pacing',
        'Dynamic Animated Subtitles & B-Roll Overlays',
        'Audio Noise Reduction & Sound Mastering',
        'Color Grading & High-Definition Export'
      ],
      tools: ['Premiere Pro', 'CapCut Pro', 'Audition', 'Motion Graphics'],
      startingPrice: '$80',
      estimatedDelivery: '2-4 Days',
      portfolioExamples: ['Educational Tech Shorts', 'Brand Commercials'],
      process: ['Footage Ingestion', 'Rough Cut & Pacing', 'Sound & Subtitles', 'Final Color & High-Bitrate Export'],
      faqs: [{ question: 'What video formats do you support?', answer: 'Vertical 9:16 reels/shorts and widescreen 16:9 1080p/4K.' }],
      iconName: 'Video',
      featured: true
    },
    {
      id: 'srv-construction-cad',
      slug: 'construction-cad-site',
      name: 'Construction 2D CAD & Site Coordination',
      category: 'Construction & Design',
      shortDescription: 'Precise 2D architectural AutoCAD drafting, ground dimension cross-checks, and professional site coordination.',
      problem: 'Costly structural errors resulting from inaccurate blueprint dimensions or poor on-site coordination.',
      solution: 'Rigorous 2D drafting grounded in DAE Civil Engineering training, dimension verification, and site oversight.',
      includedFeatures: [
        '2D Architectural & Floor Plan AutoCAD Drafting',
        'Ground Dimension Cross-Checks & As-Built Updates',
        'Structural Clash Identification & Resolution',
        'Material Quantity Calculations & Work Schedules',
        'Site Labor Coordination & Daily Inspection Logs'
      ],
      tools: ['AutoCAD 2D', 'Dimension Verification', 'DAE Civil Standards', 'Site Coordination'],
      startingPrice: '$100',
      estimatedDelivery: '3-6 Days',
      portfolioExamples: ['Residential Floor Plans', 'Civil Infrastructure Work'],
      process: ['Field Measurements', 'Drafting & Layer Organization', 'Clash Cross-Check', 'Final DWG/PDF Delivery'],
      faqs: [{ question: 'Are drawings delivered in editable format?', answer: 'Yes, full editable AutoCAD DWG files along with scale-printable PDFs.' }],
      iconName: 'Compass',
      featured: true
    }
  ];

  // Match existing or default items
  const displayServices: Service[] = sixCanonicalServices.map(def => {
    const matched = services.find(s =>
      s.id === def.id ||
      s.name.toLowerCase().includes(def.name.toLowerCase().substring(0, 8))
    );
    return matched ? { ...def, ...matched } : def;
  });

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Web & Software Development':
        return <Code2 className="w-5 h-5 text-orange-400" />;
      case 'IoT & Smart Hardware':
        return <Cpu className="w-5 h-5 text-orange-400" />;
      case 'Brand Identity & Graphic Design':
        return <Palette className="w-5 h-5 text-orange-400" />;
      case 'Meta Ads & Digital Marketing':
        return <TrendingUp className="w-5 h-5 text-orange-400" />;
      case 'Video Editing':
        return <Video className="w-5 h-5 text-orange-400" />;
      case 'Construction 2D CAD & Site Coordination':
        return <Compass className="w-5 h-5 text-orange-400" />;
      default:
        return <Code2 className="w-5 h-5 text-orange-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#080d1a] text-slate-100 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading font-bold text-[36px] sm:text-[42px] lg:text-[48px] tracking-tight text-white mb-4 uppercase">
            SERVICES
          </h2>
          <p className="font-sans font-normal text-[16px] sm:text-[18px] text-slate-300">
            A single, comprehensive service catalog spanning engineering, digital execution, and creative media with transparent pricing.
          </p>
        </div>

        {/* 6-Card Services Layout: 3 cols desktop, horizontal slider 2 cols on mobile */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 lg:grid lg:grid-cols-3 lg:gap-8 lg:overflow-visible no-scrollbar">
          {displayServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="w-[85%] sm:w-[48%] shrink-0 snap-start lg:w-auto bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-orange-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-950/20 group"
            >
              <div>
                {/* Header Badge & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 group-hover:bg-orange-500/20 border border-orange-500/20 group-hover:border-orange-500/40 flex items-center justify-center transition-colors">
                    {getServiceIcon(service.name)}
                  </div>
                  <span className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                    {service.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading font-semibold text-[24px] sm:text-[26px] lg:text-[30px] text-white mb-2 group-hover:text-orange-400 transition-colors">
                  {service.name}
                </h3>

                {/* 1-Line Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Price Starting From */}
                {showPricing && (
                  <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Starting From
                      </span>
                      <span className="text-lg font-bold font-mono text-orange-400">
                        {service.startingPrice}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">
                        Estimated Delivery
                      </span>
                      <div className="flex items-center space-x-1 font-mono text-xs text-slate-300">
                        <Clock className="w-3 h-3 text-orange-400" />
                        <span>{service.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Single "View Details" Button opening existing ServiceDetailModal */}
              <div className="pt-2 border-t border-slate-800/80">
                <button
                  id={`btn-view-details-${service.id}`}
                  onClick={() => onViewDetails(service)}
                  className="w-full py-3 px-4 rounded-xl font-sans font-semibold text-[14px] uppercase tracking-wider text-slate-100 bg-slate-800 hover:bg-orange-500 hover:text-white border border-slate-700 hover:border-orange-500 transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
