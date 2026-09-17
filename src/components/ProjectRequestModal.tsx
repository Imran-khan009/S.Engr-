import React, { useState, useEffect } from 'react';
import { Service, Lead } from '../types';
import { X, Send, CheckCircle2, AlertCircle, Upload, ShieldCheck, Clock, DollarSign } from 'lucide-react';

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
    fileName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, fileName: file.name }));
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
      fileName: ''
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
              Direct Project Submission
            </span>
            <h2 className="text-lg font-bold text-white">
              Request a Service or Consultation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {submittedLead ? (
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
                      Project Specification File (Optional)
                    </label>
                    <label className="flex items-center justify-center px-3.5 py-2 rounded-xl bg-slate-950/80 border border-dashed border-slate-700 hover:border-cyan-500 cursor-pointer text-xs text-slate-400 truncate">
                      <Upload className="w-4 h-4 mr-2 text-cyan-400" />
                      <span>{formData.fileName || 'Attach Brief / Requirements'}</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" />
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
