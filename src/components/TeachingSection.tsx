import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  Layers,
  FileCheck,
  Users,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  HelpCircle,
  FileText,
  ShieldCheck,
  Package,
  MessageSquare,
  Lock,
  ChevronRight
} from 'lucide-react';
import {
  TeachingService,
  TeachingConsultationSettings,
  TeachingDigitalProduct
} from '../types';

interface TeachingSectionProps {
  services: TeachingService[];
  consultation?: TeachingConsultationSettings;
  products?: TeachingDigitalProduct[];
  onOpenDetailModal: (service: TeachingService) => void;
  onOpenRequestModal: (service?: TeachingService) => void;
  onOpenCustomRequest: () => void;
  onOpenConsultationModal: () => void;
}

export const TeachingSection: React.FC<TeachingSectionProps> = ({
  services = [],
  consultation,
  products = [],
  onOpenDetailModal,
  onOpenRequestModal,
  onOpenCustomRequest,
  onOpenConsultationModal
}) => {
  const [selectedProductCategory, setSelectedProductCategory] = useState<string>('ALL');

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

  const customerJourneySteps = [
    { step: '01', title: 'DISCOVER SERVICE', desc: 'Browse lesson plans, pedagogy support, or course structures tailored to your level.' },
    { step: '02', title: 'VIEW DETAILS', desc: 'Inspect verified deliverables, methodological phases, and protected sample structures.' },
    { step: '03', title: 'SELECT SERVICE', desc: 'Pick standard service tiers or opt for custom classroom challenge problem-solving.' },
    { step: '04', title: 'SUBMIT REQUIREMENTS', desc: 'Share your syllabus, student grade baseline, lesson quantity, and deadline.' },
    { step: '05', title: 'QUOTE / CONFIRMATION', desc: 'Receive immediate scope confirmation, timeline, and agreed budget details.' },
    { step: '06', title: 'WORK STARTS', desc: 'Comprehensive pedagogical development and structured lesson crafting commences.' },
    { step: '07', title: 'DELIVERY', desc: 'Secure handoff of formatted print-ready PDFs and fully editable source documents.' },
    { step: '08', title: 'COMPLETION', desc: 'Classroom execution support and post-lesson instructional debrief.' }
  ];

  const verifiedTeachingExperience = [
    {
      role: 'IoT Instructor',
      trade: 'IoT',
      organization: 'ALP Centre / Jamia Hussainia Naimia',
      program: 'UNICEF-supported program',
      dates: '07-Jun-2024 – Present',
      status: 'Present',
      type: 'Professional Institutional Experience',
      focus: 'Microcontroller programming (ESP32/Arduino), sensor calibration, breadboard assembly & practical IoT automation.',
      outcomes: [
        'Delivered hands-on trade training on microcontrollers (Arduino Uno, ESP32) and circuit fundamentals',
        'Structured modular lesson sequences for adolescent students starting with zero prior programming knowledge',
        'Facilitated bench lab sessions turning abstract voltage/signal concepts into live hardware projects',
        'Emphasized practical problem-solving: connecting embedded hardware to solve local community challenges'
      ]
    },
    {
      role: 'Computer Operator Instructor',
      trade: 'Computer Operator',
      organization: 'GBHS Jam Yousaf Colony, District Hub',
      program: 'UNICEF / European Union supported program',
      dates: 'Apr-2025 – Present',
      status: 'Present',
      type: 'Professional Institutional Experience',
      focus: 'Foundational digital literacy, advanced MS Office productivity, operating system diagnostics & vocational typing.',
      outcomes: [
        'Conducted professional computing and digital literacy workshops for enrolled youth',
        'Created weekly practical task plans with real-world document formatting benchmarks',
        'Implemented timed speed drills and typing assessments with individual student milestone tracking',
        'Transitioned non-computer users into confident operators ready for professional workplace roles'
      ]
    }
  ];

  const studentSuccessHighlights = [
    {
      studentTag: 'Beginner Vocational Cohort (Hub)',
      context: 'Published with institutional and student permission',
      achievement: 'Zero-Code to Functional Breadboard Prototype',
      description: 'Students who had never touched a microcontroller constructed automated soil moisture indicator circuits within 3 weeks through structured, step-by-step practical lesson blueprints.'
    },
    {
      studentTag: 'Secondary School Computing Batch (Hub)',
      context: 'Published with institutional and student permission',
      achievement: '100% Practical Task Completion',
      description: 'By shifting from passive lecture delivery to the Dual-Track Theory-Lab methodology, every enrolled student successfully completed their hardware lab assignments without falling behind.'
    }
  ];

  const productCategories = [
    'ALL',
    'Lesson Plan Templates',
    'Teaching Templates',
    'Assessment Packs'
  ];

  const filteredProducts = selectedProductCategory === 'ALL'
    ? products
    : products.filter(p => p.category === selectedProductCategory);

  return (
    <section
      id="teaching-services"
      className="py-24 bg-slate-950 text-slate-100 border-t border-slate-900 relative"
    >
      {/* Anchor for backward compatibility with older #teach links */}
      <span id="teach" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Professional Educational Architecture & Pedagogy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Teaching & Education Services
          </h2>

          <p className="text-base sm:text-xl font-semibold text-cyan-400 mb-4 max-w-3xl mx-auto">
            Practical support for teachers, instructors, students and training programs.
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            I provide educational planning, lesson-plan development, teaching-method support, assessment design and instructor consultation. Not merely standard classroom lecturing, but a comprehensive, professional educational support service built to resolve instructional bottlenecks.
          </p>
        </div>

        {/* 5 Dynamic Service Cards */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                CORE TEACHING SERVICES
              </h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Structured instructional solutions engineered for measurable classroom success.
              </p>
            </div>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500">
              {services.length} Specialized Offerings
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                id={`teaching-card-${service.slug}`}
                className="bg-slate-900/70 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg shadow-black/20"
              >
                <div>
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/40 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getIcon(service.icon)}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-slate-950 border border-slate-800 text-cyan-300">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Short Description */}
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>

                  {/* Sub-Offerings Pills */}
                  {service.subOfferings && service.subOfferings.length > 0 && (
                    <div className="mb-5 space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                        Included Focus Areas:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.subOfferings.slice(0, 4).map((sub, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800/90 text-[10px] text-slate-300 font-mono"
                          >
                            {sub.title}
                          </span>
                        ))}
                        {service.subOfferings.length > 4 && (
                          <span className="px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-800/40 text-[10px] text-cyan-400 font-mono">
                            +{service.subOfferings.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {/* Pricing and Turnaround Bar */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-500 block">
                        Starting At
                      </span>
                      <span className="text-base font-extrabold text-cyan-400">
                        {service.startingPrice}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-slate-500 block flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        Turnaround
                      </span>
                      <span className="text-xs font-semibold text-slate-300 font-mono">
                        {service.deliveryTime}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`view-details-${service.slug}`}
                      onClick={() => onOpenDetailModal(service)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-800/80 border border-slate-800 transition-colors text-center"
                    >
                      View Details
                    </button>
                    <button
                      id={`request-service-${service.slug}`}
                      onClick={() => onOpenRequestModal(service)}
                      className="w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors text-center shadow-md shadow-cyan-500/10"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* "I NEED SOMETHING CUSTOM" Dedicated Service Card */}
            <div
              id="custom-teaching-request-card"
              className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-cyan-400 shadow-xl shadow-cyan-950/20"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-cyan-300" />
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
                    Bespoke Solution
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white mb-2">
                  I NEED SOMETHING CUSTOM
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Describe your teaching problem or tell us what educational material you need. Whether it's an unusual syllabus combination, cross-disciplinary project, or urgent competition prep.
                </p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-xs text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Non-standard grade levels or specialized technical exams</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Hardware kit compatibility analysis & lab structuring</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Full syllabus redesign & institutional teacher training</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="pt-4 border-t border-cyan-900/50 mb-4 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Custom Scope & Timeline</span>
                  <span className="text-xs font-bold text-cyan-300 font-mono">Direct Consultation</span>
                </div>
                <button
                  id="open-custom-teaching-request-btn"
                  onClick={onOpenCustomRequest}
                  className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>REQUEST CUSTOM SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Highlighted Teaching Consultation Feature */}
        {consultation && (
          <div
            id="teaching-consultation-highlight"
            className="mb-16 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/60 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl shadow-cyan-950/20"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              <div className="lg:col-span-2 space-y-3">
                <div className="inline-flex items-center space-x-2 px-3 py-0.5 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 font-mono text-[11px] font-bold uppercase tracking-wider">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span>1-on-1 Personalized Mentorship</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {consultation.title}
                </h3>

                <p className="text-base sm:text-lg font-medium text-cyan-300">
                  {consultation.headline}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {consultation.subtext}
                </p>

                {/* Consultation Topics Grid */}
                <div className="pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                    Key Challenges We Troubleshoot Together:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {consultation.topics.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-200 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Consultation Booking Action Box */}
              <div className="p-6 rounded-xl bg-slate-950/90 border border-slate-800 flex flex-col justify-between text-center space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Session Investment
                  </span>
                  <div className="text-3xl font-extrabold text-cyan-400 mt-1">
                    {consultation.price}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {consultation.duration} Private Diagnostic Call
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300 text-left space-y-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Google Meet, Zoom, or WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Includes written action plan</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Post-session follow-up review</span>
                  </div>
                </div>

                <button
                  id="book-consultation-btn"
                  onClick={onOpenConsultationModal}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>BOOK / REQUEST CONSULTATION</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Verified Teaching Experience & Student Success Stories (Teaching Portfolio) */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono text-xs uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Teaching Experience & Pedagogical Practice</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Professional Institutional Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Grounded in front-line technical training programs with verified institutional records.
            </p>
          </div>

          {/* Institutional Programs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {verifiedTeachingExperience.map((exp, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                        {exp.type}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300">
                        Trade: {exp.trade}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">
                      {exp.role}
                    </h4>
                    <p className="text-xs font-semibold text-slate-200 mt-0.5">
                      {exp.organization}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] font-mono text-cyan-400">
                      <span>{exp.program}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-emerald-400">{exp.dates}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {exp.focus}
                </p>

                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  {exp.outcomes.map((out, oIdx) => (
                    <div key={oIdx} className="flex items-start space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Student Success Stories (Strictly Factual & Verified) */}
          <div className="bg-slate-900/40 border border-slate-800/90 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-800/80 gap-2">
              <div>
                <h4 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Classroom Outcomes
                </h4>
                <p className="text-xs text-slate-400">
                  Real experiences from beginner technical learning environments.
                </p>
              </div>
              <span className="text-[10px] font-mono text-slate-500 italic">
                * Published strictly with appropriate institutional and student permission.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {studentSuccessHighlights.map((story, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">
                      {story.achievement}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400">
                      {story.studentTag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {story.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Journey / Workflow Timeline */}
        <div className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              PROCESS & COLLABORATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              How the Teaching Service Workflow Works
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              From requirement definition to classroom-tested delivery in 8 clear steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customerJourneySteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between relative group hover:border-cyan-500/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-800/40 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Step</span>
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 tracking-wide">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Products (Future Ready Structure) */}
        {products && products.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
              <div>
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    DIGITAL TEACHING PACKS & TEMPLATES
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Instant-access teaching toolkits, lesson plan starters, and standardized assessment rubrics.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedProductCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-mono font-semibold transition-colors ${
                      selectedProductCategory === cat
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                        {prod.category}
                      </span>
                      <span className="text-xs font-bold text-cyan-400 font-mono">
                        {prod.price}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-white mb-1.5">
                      {prod.title}
                    </h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      {prod.description}
                    </p>

                    <div className="space-y-1 mb-4">
                      {prod.previewPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start space-x-1.5 text-[11px] text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                      <Lock className="w-3 h-3 text-slate-500" />
                      {prod.deliverableFormat}
                    </span>
                    <button
                      onClick={() => onOpenCustomRequest()}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/50 hover:bg-cyan-950/70 transition-colors"
                    >
                      Inquire Pack
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px] text-slate-500 font-mono">
              🔒 Paid educational templates and resources are protected. Source files are delivered directly following verified requests.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
