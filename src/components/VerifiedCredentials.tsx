import React, { useState } from 'react';
import { ShieldCheck, Award, GraduationCap, CheckCircle2, ExternalLink, FileCheck, Building2, BookOpen, X } from 'lucide-react';
import { CredentialBadge } from '../types';

interface VerifiedCredentialsProps {
  onOpenCvModal?: () => void;
}

export const VerifiedCredentials: React.FC<VerifiedCredentialsProps> = ({ onOpenCvModal }) => {
  const [activeModalBadge, setActiveModalBadge] = useState<CredentialBadge | null>(null);

  const badges: CredentialBadge[] = [
    {
      id: 'cred-1',
      title: 'Instructor – Internet of Things (IoT) (UNICEF ALP Centre)',
      type: 'Vocational / International Program',
      organization: 'ALP Centre (UNICEF), Hub, Balochistan',
      verificationScope: 'IoT instructor delivering hands-on technical training, microcontroller programming, and practical robotics.',
      verificationBadge: 'UNICEF Program Verified',
      credentialId: 'ALP-HUB-UNICEF-IOT-2025'
    },
    {
      id: 'cred-2',
      title: "Bachelor's Science in Computer Science (BS CS)",
      type: 'Academic Degree',
      organization: 'LUAWMS (Lasbela University of Agriculture, Water & Marine Sciences)',
      verificationScope: 'Academic degree (2020–2024) covering Software Engineering, C++, Algorithms, Web Design, and IoT Systems.',
      verificationBadge: 'University Degree Verified',
      credentialId: 'LUAWMS-BSCS-2024'
    },
    {
      id: 'cred-3',
      title: 'NAVTTC Advanced Internet of Things',
      type: 'Technical Certification',
      organization: 'NAVTTC (National Vocational & Technical Training Commission)',
      verificationScope: 'Advanced IoT systems, microcontrollers, sensor telemetry, and hardware-software interfacing.',
      verificationBadge: 'National Accreditation Verified',
      credentialId: 'NAVTTC-ADV-IOT'
    },
    {
      id: 'cred-4',
      title: 'Microsoft Learn Student Ambassador',
      type: 'Technical Certification',
      organization: 'Microsoft Learn Community',
      verificationScope: 'Technical community leadership, developer workshops, and cloud technologies.',
      verificationBadge: 'Microsoft Community Verified',
      credentialId: 'MS-STUDENT-AMBASSADOR'
    },
    {
      id: 'cred-5',
      title: 'Programming Essentials in Python',
      type: 'Technical Certification',
      organization: 'Python Institute / OpenEDG',
      verificationScope: 'Object-oriented programming, data structures, algorithm design, and Python development.',
      verificationBadge: 'Accredited Python Certification',
      credentialId: 'PYTHON-ESSENTIALS'
    },
    {
      id: 'cred-6',
      title: 'NFTP Creative Design Domain',
      type: 'Technical Certification',
      organization: 'National Freelance Training Program (NFTP)',
      verificationScope: 'Creative design, branding, vector layouts, visual media production, and digital communications.',
      verificationBadge: 'NFTP Certified Professional',
      credentialId: 'NFTP-CREATIVE-DESIGN'
    },
    {
      id: 'cred-7',
      title: 'Induction Training – Module 6 (Teaching Professionals)',
      type: 'Vocational / International Program',
      organization: 'vatt.gov.pk',
      verificationScope: 'Classroom pedagogy, professional induction, teaching ethics, and vocational instruction standards.',
      verificationBadge: 'Government Training Verified',
      credentialId: 'VATT-MODULE-6'
    }
  ];

  const getBadgeIcon = (type: string) => {
    switch (type) {
      case 'Vocational / International Program':
        return BookOpen;
      case 'Academic Degree':
        return GraduationCap;
      case 'Engineering Diploma':
        return Building2;
      default:
        return Award;
    }
  };

  return (
    <div id="verified-credentials-strip" className="mt-16 pt-12 border-t border-slate-800/80">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authenticated Credentials &amp; Accreditations</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
            VERIFIED INSTITUTIONAL BADGES
          </h3>
        </div>
        <p className="mt-2 md:mt-0 text-xs sm:text-sm text-slate-400 max-w-md font-mono">
          Each credential backed by official governmental, university, or international development agency documentation.
        </p>
      </div>

      {/* 4 Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {badges.map((badge) => {
          const IconComp = getBadgeIcon(badge.type);
          return (
            <div
              key={badge.id}
              className="bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group relative"
            >
              <div>
                {/* Type & Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 flex items-center space-x-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </span>
                </div>

                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {badge.type}
                </span>

                <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors mb-2 leading-snug">
                  {badge.title}
                </h4>

                <p className="text-xs font-mono text-slate-400 mb-3">
                  {badge.organization}
                </p>

                <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                  {badge.verificationScope}
                </p>
              </div>

              {/* Card Footer: Credential ID + Inspect */}
              <div className="pt-4 mt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500 truncate max-w-[120px]">
                  ID: {badge.credentialId}
                </span>

                <button
                  onClick={() => setActiveModalBadge(badge)}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 font-mono inline-flex items-center space-x-1 cursor-pointer"
                >
                  <span>Inspect</span>
                  <FileCheck className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Credential Inspection Modal */}
      {activeModalBadge && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Credential Record</span>
              </div>
              <button
                onClick={() => setActiveModalBadge(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                  {activeModalBadge.type}
                </span>
                <h4 className="text-lg font-bold text-white">
                  {activeModalBadge.title}
                </h4>
                <p className="text-xs font-mono text-orange-400 mt-1">
                  {activeModalBadge.organization}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div>
                  <strong className="text-slate-300 block mb-0.5">Verification Scope:</strong>
                  <p className="text-slate-400 leading-relaxed">
                    {activeModalBadge.verificationScope}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400 font-mono">Accreditation ID:</span>
                  <span className="text-emerald-400 font-mono font-bold">{activeModalBadge.credentialId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 font-mono">Status:</span>
                  <span className="text-slate-200 font-mono font-semibold">{activeModalBadge.verificationBadge}</span>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => {
                    setActiveModalBadge(null);
                    if (onOpenCvModal) onOpenCvModal();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-500 hover:bg-orange-400 transition-colors"
                >
                  View Full CV Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
