import React from 'react';
import { ExperienceItem, EducationItem } from '../types';
import { Briefcase, GraduationCap, MapPin, CheckCircle2, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { VerifiedCredentials } from './VerifiedCredentials';

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
  education: EducationItem[];
  onOpenTeachingServices?: () => void;
  onOpenCvModal?: () => void;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences,
  education,
  onOpenTeachingServices,
  onOpenCvModal
}) => {
  // Verified records enforced
  const verifiedExperiences: ExperienceItem[] = [
    {
      id: 'exp-iot-unicef',
      role: 'Instructor – Internet of Things (IoT)',
      organization: 'ALP Centre (UNICEF)',
      supportingProgram: 'UNICEF-supported program',
      location: 'Hub, Balochistan',
      dates: 'Jan 2025 – Present',
      responsibilities: [
        'Delivered specialized hands-on IoT training on microcontrollers, circuit fundamentals, and practical sensor wiring in the UNICEF-supported ALP program.',
        'Guided students through hands-on projects including RC Robo Car with Remote Control and Agriculture Water Maintain Systems.',
        'Demonstrated strong classroom management, student engagement, and teaching ethics verified through vatt.gov.pk professional induction.'
      ],
      skills: ['IoT Systems', 'Trade: IoT', 'UNICEF ALP', 'Microcontrollers', 'Sensors', 'Pedagogical Ethics'],
      verified: true
    },
    {
      id: 'exp-iot-systems',
      role: '(IOT) Information Technology & Embedded Systems',
      organization: 'Engineering Systems Development',
      location: 'Hub, Balochistan',
      dates: '2020 – Present',
      responsibilities: [
        'Developed RC Robo Car With Remote Control utilizing wireless telemetry and motor driver circuits.',
        'Built Agriculture Water Maintain System ensuring automated soil hydration and reservoir monitoring.',
        'Engineered full-stack and front-end user interfaces using HTML, CSS, JavaScript, and algorithmic C++ solutions.',
        'Handled technical documentation with discretion and maintained structured engineering records.'
      ],
      skills: ['RC Robo Car', 'Smart Agriculture System', 'C++', 'JavaScript', 'HTML/CSS', 'Hardware Integration'],
      verified: true
    },
    {
      id: 'exp-civil-engr',
      role: 'Assistant Civil Engineer (Private Practice)',
      organization: 'M. Rahim & Sons',
      location: 'Hub, Balochistan, Pakistan',
      dates: '2017 – 2020',
      responsibilities: [
        'Assisted in preparing structural layouts, site plans, and engineering drawings.',
        'Supervised construction sites, ensuring quality control, accurate measurements, and timely completion of tasks.',
        'Conducted material inspections and verified work compliance with engineering standards.',
        'Supported senior engineer in design modifications, structural planning, and contractor/client coordination.',
        'Maintained construction documentation and official project records.'
      ],
      skills: ['Site Supervision', 'Structural Layouts', 'Material Inspection', 'AutoCAD Drafting', 'Client Coordination'],
      verified: true
    }
  ];

  const verifiedEducation: EducationItem[] = [
    {
      id: 'edu-bscs',
      degree: "Bachelor's Science in Computer Science",
      institution: 'LUAWMS (Lasbela University of Agriculture, Water and Marine Sciences)',
      dates: '2020 – 2024',
      location: 'Balochistan, Pakistan',
      details: 'Comprehensive study of computer science, C++, algorithms, data structures, front-end web design, embedded hardware interfaces, and software engineering.'
    },
    {
      id: 'edu-intermediate',
      degree: 'Intermediate (FSc / HSSC)',
      institution: 'GOVT: DEGREE COLLEGE (HUB)',
      dates: '09-AUG-2019',
      location: 'Hub, Balochistan',
      details: 'Higher secondary science education with focus on mathematics, physics, and analytical fundamentals.'
    },
    {
      id: 'edu-matric',
      degree: 'Matric',
      institution: 'Noor Public High School (HUB)',
      dates: '21-08-2017',
      location: 'Hub, Balochistan',
      details: 'Secondary school certificate with high distinction in core sciences.'
    }
  ];

  const displayExperiences = experiences && experiences.length >= 2 ? experiences : verifiedExperiences;
  const displayEducation = education && education.length >= 2 ? education : verifiedEducation;

  const handleTeachingClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTeachingServices) {
      onOpenTeachingServices();
    } else {
      const el = document.getElementById('teaching-services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="experience" className="py-24 bg-[#080d1a] text-slate-100 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-orange-950/40 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Career Record</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4 uppercase">
            EXPERIENCE &amp; EDUCATION
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Ground-level youth vocational instruction under international programs, technical site engineering, and formal academic degrees.
          </p>
        </div>

        {/* Teaching Services Banner for Students/Institutes */}
        <div className="mb-14 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-orange-950/40 via-slate-900 to-slate-900 border border-orange-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 font-bold block">
                Educational Mentorship
              </span>
              <h3 className="text-lg font-bold text-white">
                For Students / Institutes → View Teaching Services
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                IoT hardware workshops, computer programming courses, and academic capstone guidance.
              </p>
            </div>
          </div>

          <a
            href="#teaching-services"
            onClick={handleTeachingClick}
            className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 transition-all flex items-center justify-center space-x-2 shrink-0 cursor-pointer shadow-md shadow-orange-500/20"
          >
            <span>View Teaching Modules</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Work Experience Timeline (7 cols) */}
          <div className="lg:col-span-7">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Professional Experience
              </h3>
            </div>

            <div className="relative pl-6 sm:pl-8 border-l-2 border-slate-800 space-y-10">
              {displayExperiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#080d1a] border-2 border-orange-400 group-hover:scale-125 transition-transform" />

                  <div className="bg-slate-900/70 border border-slate-800/80 hover:border-orange-500/40 rounded-2xl p-6 transition-all shadow-md">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-mono font-bold text-orange-400 px-2.5 py-0.5 rounded bg-orange-950/60 border border-orange-800/50">
                          {exp.dates}
                        </span>
                        {exp.trade && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800/80 text-emerald-300 font-semibold">
                            Trade: {exp.trade}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-mono text-slate-400 flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                        {exp.location}
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white mb-0.5">
                      {exp.role}
                    </h4>
                    <p className="text-xs font-medium text-slate-300">
                      {exp.organization}
                    </p>
                    {exp.supportingProgram && (
                      <p className="text-[11px] font-mono text-orange-400/90 mb-4 mt-0.5 font-semibold">
                        {exp.supportingProgram}
                      </p>
                    )}
                    {!exp.supportingProgram && <div className="mb-4" />}

                    <div className="space-y-2 mb-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800/80">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Qualifications (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {displayEducation.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-slate-900/70 border border-slate-800/80 hover:border-orange-500/40 rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-orange-400 font-semibold px-2 py-0.5 rounded bg-orange-950/60 border border-orange-800/40">
                      {edu.dates}
                    </span>
                    <span className="text-xs font-mono text-slate-400 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-slate-500" />
                      {edu.location}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1">
                    {edu.degree}
                  </h4>
                  <p className="text-xs font-medium text-slate-300 mb-3">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              ))}

              {/* Verified Qualifications Note */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-2">
                <div className="flex items-center space-x-2 text-orange-400 font-mono font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Professional Integrity Statement</span>
                </div>
                <p className="leading-relaxed">
                  Engineering drafting, site coordination, and technical services are delivered strictly in accordance with authentic qualifications: BS Computer Science and Diploma of Associate Engineering in Civil Engineering.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Verified Credentials & Badges Showcase Strip */}
        <VerifiedCredentials onOpenCvModal={onOpenCvModal} />
      </div>
    </section>
  );
};
