import React from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const FaqSection: React.FC = () => {
  // 5 Canonical Questions requested for SEO using semantic <details> tags
  const faqs: FaqItem[] = [
    {
      id: 'faq-pricing',
      question: 'What is your pricing structure for services and projects?',
      answer: 'Pricing is clear and milestone-based starting from transparent baselines: Web & Software from $120, IoT Smart Hardware from $150, Brand Identity & Graphic Design from $75, Meta Ads Marketing from $110, Video Editing from $80, and Construction 2D CAD from $100. We agree on fixed milestones before kickoff so there are never unexpected costs.',
      category: 'Pricing'
    },
    {
      id: 'faq-delivery-time',
      question: 'What is your typical delivery and turnaround time?',
      answer: 'Turnaround depends on project scope: Brand design and video post-production typically take 2–4 days; responsive business landing pages take 3–6 days; and custom IoT hardware telemetry prototypes take 5–8 days. Fast-track delivery is available for urgent deadlines upon request.',
      category: 'Delivery Time'
    },
    {
      id: 'faq-custom-iot',
      question: 'Can you build custom IoT prototypes with full source code and schematics?',
      answer: 'Yes, absolutely. Every IoT prototype (using ESP32, Arduino Uno/Nano, sensor arrays, or relays) comes with complete, production-ready C/C++ firmware with line-by-line documentation, clean breadboard or pinout wiring schematics, a component bill of materials (BOM), and step-by-step setup guides.',
      category: 'Custom IoT'
    },
    {
      id: 'faq-custom-website',
      question: 'Can you design and build a custom website or web application from scratch?',
      answer: 'Yes. I engineer full-stack modern web solutions using React, TypeScript, Node.js, and Tailwind CSS. Whether you need a high-converting corporate portfolio, an e-commerce platform, or a responsive client dashboard, the code is optimized for lightning-fast speeds, SEO indexing, and mobile responsiveness.',
      category: 'Custom Website'
    },
    {
      id: 'faq-training-availability',
      question: 'Are training and teaching programs available for students and institutions?',
      answer: 'Yes! As an active instructor in UNICEF-supported programs (Trade: IoT and Trade: Computer Operator), I conduct structured workshops, individual 1-on-1 tutoring in programming (C++, JavaScript) and electronics, as well as institutional curriculum delivery for academic and vocational institutes.',
      category: 'Training Availability'
    }
  ];

  return (
    <section id="faq" className="py-24 bg-[#080d1a] text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-orange-950/40 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            COMMON INQUIRIES
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Clear, transparent answers regarding project pricing, delivery turnaround, IoT prototypes, websites, and instructional training.
          </p>
        </div>

        {/* Semantic <details> FAQ Items for Search Engine Optimization */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              id={faq.id}
              open={index === 0}
              className="group rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-orange-500/40 transition-all duration-200 open:bg-slate-900/95 open:border-orange-500/40 open:shadow-lg open:shadow-orange-950/20"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer list-none select-none">
                <div className="flex items-center space-x-3.5 pr-4">
                  <span className="w-2 h-2 rounded-full bg-orange-400 shrink-0 group-open:bg-amber-400" />
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-orange-300 transition-colors">
                    {faq.question}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-800 group-open:bg-orange-500/20 text-slate-400 group-open:text-orange-400 flex items-center justify-center shrink-0 transition-transform duration-200 group-open:rotate-180">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </summary>
              <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-800/60 text-slate-300 text-xs sm:text-sm leading-relaxed font-sans">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* Additional Questions Helper */}
        <div className="mt-12 text-center p-6 rounded-3xl bg-slate-900/50 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h3 className="text-sm font-bold text-white">
              Have a question that isn't answered here?
            </h3>
            <p className="text-xs text-slate-400">
              Message Engr. Imran Khan directly on WhatsApp for an immediate answer.
            </p>
          </div>
          <a
            href="https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20have%20a%20question%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 transition-all flex items-center space-x-2 shrink-0 shadow-md shadow-orange-500/20 cursor-pointer"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
