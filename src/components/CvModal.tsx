import React, { useState } from 'react';
import {
  X,
  Download,
  Printer,
  ShieldCheck,
  Award,
  GraduationCap,
  Briefcase,
  Code2,
  Cpu,
  CheckCircle2,
  MapPin,
  Mail,
  Phone,
  Layers,
  Sparkles,
  Palette,
  FileCheck
} from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'document' | 'interactive'>('document');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="cv-technical-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
    >
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-2 max-h-[96vh] flex flex-col">
        
        {/* Modal Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 bg-slate-950/90 sticky top-0 z-30 gap-2">
          
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Engr. Imran Khan — Official CV
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                IT Professional • IoT Instructor • BS Computer Science
              </p>
            </div>
          </div>

          {/* Tab Switcher & Quick Actions */}
          <div className="flex items-center gap-2">
            
            {/* View Switcher */}
            <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-0.5 text-xs font-mono">
              <button
                onClick={() => setActiveTab('document')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'document'
                    ? 'bg-orange-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Document CV
              </button>
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'interactive'
                    ? 'bg-orange-500 text-white font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Interactive
              </button>
            </div>

            {/* Print Button */}
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Viewport */}
        <div className="p-3 sm:p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-[#080d1a] text-slate-100 print:bg-white print:text-black print:p-0">
          
          {/* TAB 1: EXACT DOCUMENT CV (Faithful to uploaded PDF) */}
          {activeTab === 'document' && (
            <div className="bg-[#fcfcfc] text-[#1c1c1c] rounded-2xl shadow-xl border border-slate-300 p-6 sm:p-8 md:p-10 font-sans print:shadow-none print:border-none print:p-0 max-w-3xl mx-auto">
              
              {/* Header: Name on left, Contact on right */}
              <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 border-b border-[#2b2b2b]">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-[#111827]">
                    IMRAN KHAN
                  </h1>
                </div>

                <div className="text-right flex flex-col items-start sm:items-end gap-1.5 text-xs text-[#222]">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">03130267697</span>
                    <Phone className="w-3.5 h-3.5 text-[#333]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">03331244214</span>
                    <Phone className="w-3.5 h-3.5 text-[#333]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="mailto:engrimrantareen@gmail.com"
                      className="font-mono text-[#0066cc] hover:underline"
                    >
                      engrimrantareen@gmail.com
                    </a>
                    <Mail className="w-3.5 h-3.5 text-[#333]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#444]">
                      Jam Yousaf Colony Hub Chowki Balochistan
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#333]" />
                  </div>
                </div>
              </div>

              {/* SUMMARY */}
              <div className="mt-5 mb-6 text-center">
                <h2 className="text-sm font-serif font-bold tracking-widest text-[#222] uppercase mb-2">
                  SUMMARY
                </h2>
                <div className="w-full h-px bg-slate-300 mb-3" />
                <p className="text-[12px] leading-relaxed text-[#333] text-justify">
                  A highly motivated IT professional and instructor with over 4 years of experience in Information Technology, IoT, and technical training. Holds a strong academic background in Computer Science with hands-on expertise in IoT systems, programming languages, graphic designing, and hardware-based projects. Experienced in delivering effective classroom and practical training, managing technical documentation, and supporting engineering-related projects. Skilled in classroom management, student engagement, and maintaining a positive learning environment. Successfully completed professional induction training from vatt.gov.pk, demonstrating strong pedagogical understanding and teaching ethics. Recognized for excellent communication, teamwork, creativity, and problem-solving skills, with a passion for guiding students toward technical and professional growth.
                </p>
              </div>

              {/* Two Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-t border-slate-300 pt-6">
                
                {/* LEFT COLUMN: Education, Skills, Certifications (5 cols) */}
                <div className="md:col-span-5 space-y-6 md:border-r md:border-slate-300 md:pr-6">
                  
                  {/* EDUCATION */}
                  <div>
                    <h3 className="text-xs font-serif font-bold tracking-widest text-[#222] uppercase pb-1 border-b border-slate-400 mb-3">
                      EDUCATION
                    </h3>
                    
                    <div className="space-y-3.5 text-xs text-[#222]">
                      <div>
                        <div className="font-bold text-[#111]">Matric</div>
                        <div className="text-[11px] text-[#444]">Noor Public High School (HUB)</div>
                        <div className="text-[11px] font-mono text-[#666]">21-08-2017</div>
                      </div>

                      <div>
                        <div className="font-bold text-[#111]">Intermediate</div>
                        <div className="text-[11px] text-[#444]">GOVT: DEGREE COLLEGE (HUB)</div>
                        <div className="text-[11px] font-mono text-[#666]">09-AUG-2019</div>
                      </div>

                      <div>
                        <div className="font-bold text-[#111]">LUAWMS</div>
                        <div className="text-[11px] text-[#333]">Bachelor&apos;s Science in Computer Science</div>
                        <div className="text-[11px] font-mono text-[#666]">2020–2024</div>
                      </div>

                      <div>
                        <div className="font-bold text-[#111]">Assistant Civil Engineer (Private Practice)</div>
                        <div className="text-[11px] text-[#444]">M. Rahim &amp; Sons — [HUB], Balochistan, Pakistan</div>
                        <div className="text-[11px] font-mono text-[#666]">2017–2020</div>
                      </div>
                    </div>
                  </div>

                  {/* SKILLS */}
                  <div>
                    <h3 className="text-xs font-serif font-bold tracking-widest text-[#222] uppercase pb-1 border-b border-slate-400 mb-3">
                      SKILLS
                    </h3>
                    <ul className="text-[11px] text-[#333] space-y-1.5 list-disc list-outside ml-4">
                      <li>Internet of Things (IoT) – Instructor &amp; hands-on project experience</li>
                      <li>Graphic Designing – 2D/3D layouts, image &amp; video editing</li>
                      <li>Programming Languages – HTML, CSS, JavaScript, C++</li>
                      <li>Front-End Web Designing &amp; User Interface Development</li>
                      <li>Arduino &amp; Hardware-Based Projects</li>
                      <li>Classroom Management &amp; Student Engagement</li>
                      <li>Strong Communication Skills</li>
                      <li>Teamwork &amp; Collaboration</li>
                      <li>Ability to Work Independently</li>
                      <li>Time Management &amp; Multi-Tasking</li>
                      <li>Problem-Solving &amp; Analytical Thinking</li>
                      <li>Detail-Oriented &amp; Documentation Handling</li>
                      <li>Budget Management &amp; Financial Documentation</li>
                      <li>Civil Engineering – Site supervision, structural layouts, measurements, material inspection, design modifications, coordination with contractors/clients</li>
                    </ul>
                  </div>

                  {/* CERTIFICATIONS */}
                  <div>
                    <h3 className="text-xs font-serif font-bold tracking-widest text-[#222] uppercase pb-1 border-b border-slate-400 mb-3">
                      CERTIFICATIONS
                    </h3>
                    <ul className="text-[11px] text-[#333] space-y-1.5 list-disc list-outside ml-4">
                      <li>Institute of Graphic Design Expert</li>
                      <li>Microsoft Learn Student Ambassador</li>
                      <li>Programming Essentials in Python</li>
                      <li>NFTP Creative Design Domain</li>
                      <li>Induction Training – Module 6 (Teaching Professionals)</li>
                      <li>6-Day Training for Skills Education Instructor in Basic Computer Applications / DIT / Graphic Design / Internet of Things</li>
                      <li>NAVTTC Advanced Internet of Things</li>
                    </ul>
                  </div>

                </div>

                {/* RIGHT COLUMN: Professional Experience & Soft Skills (7 cols) */}
                <div className="md:col-span-7 space-y-6">
                  
                  {/* PROFESSIONAL EXPERIENCE HEADER */}
                  <div>
                    <h3 className="text-xs font-serif font-bold tracking-widest text-[#222] uppercase pb-1 border-b border-slate-400 mb-4">
                      PROFESSIONAL EXPERIENCE
                    </h3>

                    {/* SOFT SKILLS */}
                    <div className="mb-4">
                      <div className="font-bold text-xs uppercase tracking-wide text-[#222] mb-1.5">
                        SOFT SKILLS
                      </div>
                      <ul className="text-[11px] text-[#333] space-y-1 list-disc list-outside ml-4">
                        <li>Strong communication skills</li>
                        <li>Teamwork and collaboration</li>
                        <li>Ability to work independently</li>
                        <li>Time management</li>
                        <li>Problem solving</li>
                        <li>Documentation handling</li>
                      </ul>
                    </div>

                    {/* (IOT) Information Technology */}
                    <div className="mb-4 pt-3 border-t border-slate-200">
                      <div className="font-bold text-xs text-[#111] mb-1.5">
                        (IOT) Information Technology
                      </div>
                      <ul className="text-[11px] text-[#333] space-y-1 list-disc list-outside ml-4">
                        <li>RC Robo Car With Remote Control</li>
                        <li>Agriculture Water Maintain System</li>
                        <li>Connecting To Hardware Parts</li>
                        <li>Handle confidential information and documents with discretion and maintain their proper organization</li>
                      </ul>
                    </div>

                    {/* Programming Languages */}
                    <div className="mb-4 pt-3 border-t border-slate-200">
                      <div className="font-bold text-xs text-[#111] mb-1.5">
                        Programming Languages (HTML) (CSS) (JAVASCRIPT) (C++)
                      </div>
                      <ul className="text-[11px] text-[#333] space-y-1 list-disc list-outside ml-4">
                        <li>HTML Creating Structure on Web Design</li>
                        <li>CSS Different Styles And Colours Design</li>
                        <li>Java Script Easy To Way Work Website And Special Cookies Easy User Interface</li>
                        <li>C++ Data Structure And Algorithm Full Stack Designer</li>
                      </ul>
                    </div>

                    {/* Graphic Designing */}
                    <div className="mb-4 pt-3 border-t border-slate-200">
                      <div className="font-bold text-xs text-[#111] mb-1.5">
                        Graphic Designing
                      </div>
                      <ul className="text-[11px] text-[#333] space-y-1 list-disc list-outside ml-4">
                        <li>Content Creator Videos &amp; Image Editing on many Different Templates</li>
                        <li>Voice Over And 3D Editing</li>
                        <li>Utilized graphic designing tools for preparing 2D/3D layouts, visual presentations, and photo-based project reports to support civil engineering tasks.</li>
                      </ul>
                    </div>

                    {/* Assistant Civil Engineer */}
                    <div className="mb-4 pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-xs text-[#111]">
                          Assistant Civil Engineer
                        </div>
                        <span className="text-[11px] font-mono text-[#666]">
                          2017–2020
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555] italic mb-1.5">
                        M. Rahim &amp; Sons — [HUB], Balochistan, Pakistan
                      </p>
                      <ul className="text-[11px] text-[#333] space-y-1 list-disc list-outside ml-4">
                        <li>Assisted in preparing structural layouts, site plans, and engineering drawings.</li>
                        <li>Supervised construction sites, ensuring quality control, accurate measurements, and timely completion of tasks.</li>
                        <li>Conducted material inspections and verified work compliance with engineering standards.</li>
                        <li>Supported senior engineer in design modifications and structural planning.</li>
                        <li>Coordinated with clients, contractors, and suppliers for smooth execution of projects.</li>
                        <li>Maintained construction documentation and project records.</li>
                      </ul>
                    </div>

                    {/* Instructor – Internet of Things (IoT) */}
                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-xs text-[#111]">
                          Instructor – Internet of Things (IoT)
                        </div>
                        <span className="text-[11px] font-mono text-emerald-700 font-bold">
                          Jan 2025 – Present
                        </span>
                      </div>
                      <p className="text-[11px] text-[#555] font-semibold mb-1">
                        ALP Centre (UNICEF), Hub, Balochistan
                      </p>
                      <ul className="text-[11px] text-[#333] space-y-1 list-disc list-outside ml-4">
                        <li>Delivered specialized IoT curricula, circuit design, sensor instrumentation, and microcontroller programming.</li>
                        <li>Fostered student engagement, practical project construction, and vocational technology training.</li>
                      </ul>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: INTERACTIVE TECH PROFILE VIEW */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              
              {/* Header profile banner */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-950 text-orange-400 border border-orange-800">
                      S • ENGR Founder
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      Hub, Balochistan
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">
                    Engr. Imran Khan
                  </h2>
                  <p className="text-xs font-mono text-orange-400 mt-1">
                    BS Computer Science (LUAWMS 2020–2024) • IoT Instructor (UNICEF ALP)
                  </p>
                </div>

                <div className="text-xs font-mono space-y-1 text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>03331244214 / 03130267697</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-cyan-400" />
                    <a href="mailto:engrimrantareen@gmail.com" className="text-slate-200 hover:underline">
                      engrimrantareen@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* 7 Official Certifications Cards */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-3 flex items-center gap-2">
                  <FileCheck className="w-4 h-4" />
                  <span>7 Official Accreditations &amp; Certifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {[
                    { title: 'NAVTTC Advanced Internet of Things', desc: 'National Vocational & Technical Training Commission' },
                    { title: 'Microsoft Learn Student Ambassador', desc: 'Global Technical Community & Cloud Leadership' },
                    { title: 'Programming Essentials in Python', desc: 'Python Institute / Object-Oriented Fundamentals' },
                    { title: 'NFTP Creative Design Domain', desc: 'National Freelance Training Program' },
                    { title: 'Institute of Graphic Design Expert', desc: 'Professional 2D/3D Layout & Multimedia Systems' },
                    { title: 'Induction Training – Module 6', desc: 'Teaching Professionals (vatt.gov.pk)' },
                    { title: '6-Day Skills Education Instructor', desc: 'Basic Computer Applications / DIT / Graphic Design / IoT' },
                  ].map((cert, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="w-5 h-5 rounded-md bg-orange-500/10 text-orange-400 text-[10px] font-mono font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-white line-clamp-1">
                          {cert.title}
                        </h5>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {cert.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Hardware & Software Projects */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-orange-400 font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4" />
                  <span>Featured IoT &amp; Software Work</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block mb-1">RC Robo Car</strong>
                    <p className="text-slate-400">Remote control telemetry, motor drivers, wireless microcontrollers, and real-time responsiveness.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block mb-1">Agriculture Water Maintain System</strong>
                    <p className="text-slate-400">Automated irrigation and water management system using sensors, solenoid valves, and relays.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <strong className="text-white block mb-1">Civil Engineering Layouts</strong>
                    <p className="text-slate-400">Structural layouts, site supervision, material inspection, and 2D/3D graphical visual presentations.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Bottom Sticky Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-400 font-mono text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Engr. Imran Khan • Contact: 03331244214 • 03130267697</span>
          </div>

          <div className="flex items-center space-x-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl font-bold text-xs text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <a
              href="https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20reviewed%20your%20CV%20and%20would%20like%20to%20discuss%20an%20opportunity%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#25D366] hover:bg-[#20bd5a] transition-all flex items-center space-x-1.5 shadow-md shadow-[#25D366]/20 cursor-pointer"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
