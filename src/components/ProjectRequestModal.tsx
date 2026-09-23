import React, { useState, useEffect } from 'react';
import { Service, Lead } from '../types';
import { X, Send, CheckCircle2, AlertCircle, Upload, ShieldCheck, Clock, DollarSign, FileText, Calendar, Video, ExternalLink, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';
import { uploadToStorageOrFallback, validateAttachmentFile } from '../lib/storage';

interface ProjectRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: Service[];
  initialService?: Service | null;
  onLeadSubmitted?: (lead: Lead) => void;
}

export const ProjectRequestModal: React.FC<ProjectRequestModalProps> = ({
  isOpen,
  onClose,
  services,
  initialService,
  onLeadSubmitted
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'INQUIRY' | 'CONSULTATION'>('INQUIRY');
  const [selectedMeetingType, setSelectedMeetingType] = useState<'Google Meet' | 'WhatsApp Call' | 'Zoom'>('Google Meet');
  const [selectedTopic, setSelectedTopic] = useState<string>('Custom Software Architecture & Web App');
  const [consultationSubmitted, setConsultationSubmitted] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: '',
    serviceRequired: initialService?.name || (services[0]?.name ?? 'Modern Web & UI Development'),
    projectDescription: '',
    referenceRequirements: '',
    budget: '$150 - $300',
    deadline: '1-2 Weeks',
    preferredContactMethod: 'WhatsApp',
    platformPreference: 'Direct' as 'Direct' | 'Fiverr' | 'Upwork',
    fileName: '',
    fileUrl: '',
    fileSize: '',
    fileType: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({
        ...prev,
        serviceRequired: initialService.name
      }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validation = validateAttachmentFile(file);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Invalid file');
      return;
    }

    setErrorMessage(null);
    setIsUploadingFile(true);
    try {
      const uploadRes = await uploadToStorageOrFallback(file, 'leads');
      setFormData(prev => ({
        ...prev,
        fileName: uploadRes.fileName,
        fileUrl: uploadRes.fileUrl || '',
        fileSize: uploadRes.fileSize,
        fileType: uploadRes.fileType
      }));
    } catch (err: any) {
      setErrorMessage(err.message || 'File upload failed');
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.projectDescription.trim()) {
      setErrorMessage('Please fill in your name, email, and project description.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project request.');
      }
      setSubmittedLead(data.lead);
      if (onLeadSubmitted) {
        onLeadSubmitted(data.lead);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error sending request. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedLead(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      whatsapp: '',
      country: '',
      serviceRequired: services[0]?.name || '',
      projectDescription: '',
      referenceRequirements: '',
      budget: '$150 - $300',
      deadline: '1-2 Weeks',
      preferredContactMethod: 'WhatsApp',
      platformPreference: 'Direct',
      fileName: '',
      fileUrl: '',
      fileSize: '',
      fileType: ''
    });
    onClose();
  };

  return (
    <div
      id="project-request-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <div
        id="project-request-modal-content"
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 sticky top-0 z-20">
          <div>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
              Direct Engagement &amp; Consultation
            </span>
            <h2 className="text-lg font-bold text-white">
              Engage Engr. Imran Khan
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-3 bg-slate-950/40 border-b border-slate-800 flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setActiveTab('INQUIRY')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 border-b-2 cursor-pointer ${
              activeTab === 'INQUIRY'
                ? 'border-orange-500 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-orange-400" />
            <span>Submit Project Scope</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CONSULTATION')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold tracking-wider transition-all flex items-center space-x-2 border-b-2 cursor-pointer ${
              activeTab === 'CONSULTATION'
                ? 'border-cyan-400 text-white bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Book 1-on-1 Consultation</span>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {activeTab === 'CONSULTATION' ? (
            <div className="space-y-6">
              {/* Consultation Intro Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-orange-950/30 border border-cyan-800/40">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Direct 1-on-1 Video / Audio Consultation
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Available via Google Meet, WhatsApp Audio/Video, or Zoom
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Schedule a focused session with Engr. Imran Khan to audit your software architecture, review IoT microcontroller schematics, map ad marketing funnels, or design vocational training programs.
                </p>
              </div>

              {/* Instant Cal.com / Calendly Direct Booking Hub */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Interactive Appointment Scheduler
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Live Slots Available
                  </span>
                </div>

                <p className="text-xs text-slate-300">
                  Select your preferred meeting platform and topic, or launch the automated booking calendar directly:
                </p>

                {/* Preferred Platform Selection */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-2">
                    Preferred Meeting Platform:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['Google Meet', 'WhatsApp Call', 'Zoom'] as const).map((platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setSelectedMeetingType(platform)}
                        className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all flex flex-col items-center justify-center space-y-1 ${
                          selectedMeetingType === platform
                            ? 'bg-cyan-950/70 border-cyan-500 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Video className="w-4 h-4" />
                        <span>{platform}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Consultation Topic */}
                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-2">
                    Discussion Focus:
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Custom Software Architecture & Web App">Custom Software Architecture & Web App</option>
                    <option value="IoT Circuit Prototyping & Sensor Telemetry">IoT Circuit Prototyping & Sensor Telemetry</option>
                    <option value="Meta Ads Conversion Funnel & ROAS Audit">Meta Ads Conversion Funnel & ROAS Audit</option>
                    <option value="Vocational Teaching / Corporate IoT Training">Vocational Teaching / Corporate IoT Training</option>
                    <option value="Civil Engineering & 2D AutoCAD Consultation">Civil Engineering & 2D AutoCAD Consultation</option>
                  </select>
                </div>

                {/* Direct Action Booking Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    id="cal-booking-link"
                    href="https://cal.com/engr-imran-khan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20 flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Open Cal.com Scheduler</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    id="whatsapp-consultation-link"
                    href={`https://wa.me/923331244214?text=Assalam-o-Alaikum%20Engr.%20Imran,%20I%20would%20like%20to%20schedule%20a%201-on-1%20consultation%20via%20${encodeURIComponent(selectedMeetingType)}%20regarding%20${encodeURIComponent(selectedTopic)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-500 transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>Confirm Slot on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Consultation Features Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-cyan-400 font-mono font-bold mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>30–60 Min Deep Dive</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Structured agenda with actionable takeaways and technical notes.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-emerald-400 font-mono font-bold mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified NDA Security</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Confidential discussion of proprietary IP and system blueprints.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="flex items-center space-x-2 text-orange-400 font-mono font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Milestone Credit</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">Consultation fee is credited toward full project execution if hired.</p>
                </div>
              </div>
            </div>
          ) : submittedLead ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Project Request Received!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{submittedLead.fullName}</strong>. Your project inquiry for{' '}
                <span className="text-cyan-400 font-semibold">{submittedLead.serviceRequired}</span> has been logged securely.
              </p>

              <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 max-w-md mx-auto text-left font-mono text-xs text-slate-300 space-y-2 mb-8">
                <div className="flex justify-between">
                  <span className="text-slate-500">Inquiry ID:</span>
                  <span className="text-cyan-400 font-bold">{submittedLead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="text-slate-200 truncate">{submittedLead.serviceRequired}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Platform Choice:</span>
                  <span className="text-slate-200">{submittedLead.platformPreference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Target Budget:</span>
                  <span className="text-slate-200">{submittedLead.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Status:</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-bold">
                    {submittedLead.status}
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-md shadow-cyan-500/20"
              >
                Close & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/60 text-xs text-rose-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Personal Information */}
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                  1. Contact Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Tariq Mahmood"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. client@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      WhatsApp Number (for fast replies)
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+92 300 1234567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Country / City
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="e.g. Pakistan, UAE, USA..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              {/* Service & Scope */}
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                  2. Project Scope & Requirements
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Required *
                    </label>
                    <select
                      name="serviceRequired"
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    >
                      {services.map(s => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      rows={3}
                      required
                      value={formData.projectDescription}
                      onChange={handleChange}
                      placeholder="Briefly describe what you want to build, solve, or design..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Reference Links or Specific Deliverables
                    </label>
                    <input
                      type="text"
                      name="referenceRequirements"
                      value={formData.referenceRequirements}
                      onChange={handleChange}
                      placeholder="e.g. Similar website URL, circuit sensors required, dimension notes..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Budget & Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Estimated Budget
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="e.g. $100 - $300 or PKRs"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Expected Deadline
                      </label>
                      <input
                        type="text"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                        placeholder="e.g. 5 Days, 2 Weeks, Flexible"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Platform Preference */}
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                  3. Engagement & Platform Preference
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {(['Direct', 'Fiverr', 'Upwork'] as const).map((platform) => (
                    <label
                      key={platform}
                      className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer transition-all ${
                        formData.platformPreference === platform
                          ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="platformPreference"
                        value={platform}
                        checked={formData.platformPreference === platform}
                        onChange={() => setFormData(prev => ({ ...prev, platformPreference: platform }))}
                        className="sr-only"
                      />
                      <span className="text-xs">{platform} Contract</span>
                    </label>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContactMethod"
                      value={formData.preferredContactMethod}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                      <option value="Phone">Phone Call</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Specification File (Optional, max 10MB)
                    </label>
                    <label className="flex items-center justify-center px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-dashed border-slate-700 hover:border-cyan-500 cursor-pointer text-xs text-slate-400 truncate">
                      {isUploadingFile ? (
                        <span className="text-cyan-400 animate-pulse font-mono">Uploading to secure storage...</span>
                      ) : formData.fileName ? (
                        <div className="flex items-center space-x-1.5 text-cyan-300 truncate">
                          <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="truncate">{formData.fileName}</span>
                          {formData.fileSize && (
                            <span className="text-[10px] text-slate-400 font-mono">({formData.fileSize})</span>
                          )}
                        </div>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2 text-cyan-400" />
                          <span>Attach PDF, Word, PPT or Image</span>
                        </>
                      )}
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.png,.jpg,.jpeg,.webp"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={isUploadingFile}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                  Direct response from Engr. Imran Khan
                </span>
                <button
                  id="submit-project-request-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>SEND PROJECT REQUEST</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
