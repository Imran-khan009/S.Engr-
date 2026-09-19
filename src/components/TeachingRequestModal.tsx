import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  GraduationCap,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { TeachingService, TeachingServiceRequest } from '../types';
import { uploadToStorageOrFallback, validateAttachmentFile } from '../lib/storage';

interface TeachingRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: TeachingService | null;
  allServices?: TeachingService[];
  isCustomMode?: boolean;
  onSuccess?: () => void;
}

export const TeachingRequestModal: React.FC<TeachingRequestModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  allServices = [],
  isCustomMode = false,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    country: 'Pakistan',
    userRole: 'Teacher' as TeachingServiceRequest['userRole'],
    subject: '',
    studentLevel: 'Beginners (Grades 8-10)',
    topic: '',
    courseOrModule: '',
    requiredServiceId: preselectedService?.id || (allServices[0]?.id ?? 'ts-lesson-plans'),
    numberOfLessons: '1 - 3 Lessons',
    requiredFormat: 'Editable Word / Google Docs + PDF',
    deadline: 'Within 1 Week',
    budget: '$35 - $60',
    additionalRequirements: '',
    isCustomRequest: isCustomMode
  });

  const [fileAttachment, setFileAttachment] = useState<{
    fileName: string;
    fileSize?: string;
    fileType?: string;
    fileUrl?: string;
    storagePath?: string;
    dataUrl?: string;
  } | null>(null);

  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setFormData(prev => ({
        ...prev,
        requiredServiceId: preselectedService.id,
        isCustomRequest: false
      }));
    } else if (isCustomMode) {
      setFormData(prev => ({
        ...prev,
        isCustomRequest: true,
        requiredServiceId: 'ts-custom'
      }));
    }
  }, [preselectedService, isCustomMode]);

  if (!isOpen) return null;

  const currentServiceName = isCustomMode || formData.isCustomRequest
    ? 'Custom Educational Material & Support'
    : (allServices.find(s => s.id === formData.requiredServiceId)?.title || preselectedService?.title || 'Educational Planning Service');

  const handleFileChange = async (file: File) => {
    const validation = validateAttachmentFile(file);
    if (!validation.valid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setError(null);
    setIsUploadingFile(true);
    try {
      const result = await uploadToStorageOrFallback(file, 'teaching-materials');
      setFileAttachment({
        fileName: result.fileName,
        fileSize: result.fileSize,
        fileType: result.fileType,
        fileUrl: result.fileUrl,
        storagePath: result.storagePath
      });
    } catch (err: any) {
      setError(err.message || 'File upload failed');
    } finally {
      setIsUploadingFile(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        requiredServiceName: currentServiceName,
        fileAttachment: fileAttachment || undefined
      };

      const res = await fetch('/api/teaching-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit teaching request');
      }

      setSubmitted(true);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="teaching-request-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="teaching-request-modal-content"
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl shadow-cyan-950/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-cyan-950 border border-cyan-700/50 text-cyan-300">
                  {formData.isCustomRequest ? 'Custom Inquiry' : 'Service Request'}
                </span>
                <span className="text-xs text-slate-400 font-mono">Teaching & Education</span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                {formData.isCustomRequest ? 'Request Custom Educational Material' : 'Request Teaching Service'}
              </h2>
            </div>
          </div>
          <button
            id="close-teaching-request-modal"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 text-slate-200">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Educational Request Received!
              </h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-cyan-400">{formData.fullName}</span>. Your requirements have been logged into our project system. Engr. Imran Khan will review your syllabus guidelines and contact you via WhatsApp or Email within 24 hours.
              </p>
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 max-w-sm mx-auto text-left text-xs text-slate-400 space-y-1 font-mono">
                <div><span className="text-slate-500">Service:</span> {currentServiceName}</div>
                <div><span className="text-slate-500">Target Role:</span> {formData.userRole}</div>
                <div><span className="text-slate-500">Contact:</span> {formData.whatsapp || formData.email}</div>
              </div>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form id="teaching-service-request-form" onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-xs text-rose-300 flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Service Selection / Notice */}
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <label className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 font-semibold">
                  Selected Teaching Service
                </label>
                {formData.isCustomRequest ? (
                  <div className="flex items-center justify-between text-xs text-cyan-300 font-semibold">
                    <span>✨ Custom Educational Material & Problem Solving</span>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, isCustomRequest: false }))}
                      className="text-[10px] text-slate-400 hover:text-white underline"
                    >
                      Choose standard service
                    </button>
                  </div>
                ) : (
                  <select
                    id="teaching-service-select"
                    value={formData.requiredServiceId}
                    onChange={(e) => setFormData(prev => ({ ...prev, requiredServiceId: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                  >
                    {allServices.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.title} ({s.startingPrice})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Full Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="e.g. Prof. Ahmed Raza"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Email Address <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="e.g. ahmed.educator@gmail.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    WhatsApp / Phone Number <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.whatsapp}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
                    placeholder="e.g. +92 300 1234567"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Country / City
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="e.g. Pakistan, Hub / Karachi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Educational Context & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Your Role / Capacity <span className="text-cyan-400">*</span>
                  </label>
                  <select
                    value={formData.userRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, userRole: e.target.value as any }))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Teacher">School / College Teacher</option>
                    <option value="Instructor">Technical / Vocational Instructor</option>
                    <option value="Student">Student (Seeking Guidance)</option>
                    <option value="Institute">Training Institute / NGO Program</option>
                    <option value="Other">Independent Educator / Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Class / Student Level
                  </label>
                  <input
                    type="text"
                    value={formData.studentLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, studentLevel: e.target.value }))}
                    placeholder="e.g. Beginners (Grades 6-8), Matric, Vocational"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Subject / Domain <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g. Computer Science, IoT, Physics, Electronics"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Specific Topic / Chapter
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="e.g. Microcontrollers, Sensor Interfacing, MS Excel"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Quantity, Format & Scope */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Number of Lessons
                  </label>
                  <select
                    value={formData.numberOfLessons}
                    onChange={(e) => setFormData(prev => ({ ...prev, numberOfLessons: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="1 Single Lesson Plan">1 Single Lesson</option>
                    <option value="1 - 3 Lessons">1 - 3 Lessons</option>
                    <option value="5 Lessons (Weekly Sequence)">5 Lessons (Weekly Pack)</option>
                    <option value="Full Module (10-15 Lessons)">Full Module (10-15 Lessons)</option>
                    <option value="Complete Course Blueprint">Complete Course Blueprint</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Required Format
                  </label>
                  <select
                    value={formData.requiredFormat}
                    onChange={(e) => setFormData(prev => ({ ...prev, requiredFormat: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Editable Word / Google Docs + PDF">Editable Word & PDF</option>
                    <option value="PowerPoint Presentation Slides">PowerPoint Slides</option>
                    <option value="Print-Ready Worksheets (A4)">Print-Ready Worksheets</option>
                    <option value="Notion / Markdown Digital Package">Notion / Markdown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Timeline / Deadline
                  </label>
                  <select
                    value={formData.deadline}
                    onChange={(e) => setFormData(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Urgent (24 - 48 Hours)">Urgent (24 - 48 Hours)</option>
                    <option value="Within 1 Week">Within 1 Week</option>
                    <option value="Within 2 Weeks">Within 2 Weeks</option>
                    <option value="Flexible / Ongoing Term">Flexible / Ongoing</option>
                  </select>
                </div>
              </div>

              {/* Additional Requirements or Classroom Problem Description */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Describe Your Classroom Challenge or Exact Material Needed
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalRequirements}
                  onChange={(e) => setFormData(prev => ({ ...prev, additionalRequirements: e.target.value }))}
                  placeholder="e.g. My students are complete beginners and struggle with circuit diagrams. I need practical, step-by-step instructions with everyday analogies and a 10-minute lab task..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {/* File Attachment / Syllabus Upload */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Upload Syllabus / Textbook Chapter / Reference Outline (Optional)
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                    dragActive
                      ? 'border-cyan-400 bg-cyan-950/20'
                      : fileAttachment
                      ? 'border-emerald-500/50 bg-emerald-950/10'
                      : 'border-slate-800 hover:border-slate-700 bg-slate-950/40'
                  }`}
                  onClick={() => document.getElementById('teaching-file-input')?.click()}
                >
                  <input
                    id="teaching-file-input"
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.png,.jpg"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0]);
                      }
                    }}
                  />
                  {isUploadingFile ? (
                    <div className="py-2 flex items-center justify-center space-x-2 text-xs text-cyan-400 font-mono">
                      <span className="animate-spin text-base">⏳</span>
                      <span>Uploading to secure cloud storage...</span>
                    </div>
                  ) : fileAttachment ? (
                    <div className="flex items-center justify-center space-x-2 text-xs text-emerald-300">
                      <FileText className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold truncate max-w-xs">{fileAttachment.fileName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({fileAttachment.fileSize})</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFileAttachment(null);
                        }}
                        className="ml-2 text-slate-400 hover:text-white"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-5 h-5 text-slate-400 mx-auto" />
                      <p className="text-xs text-slate-300 font-medium">
                        Drag & drop your syllabus or <span className="text-cyan-400 underline">browse files</span>
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono">
                        Supports PDF, Word, PowerPoint, Text (Max 10MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <span>REQUEST SERVICE</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
                <p className="mt-2 text-center text-[10px] text-slate-500">
                  🔒 Strictly protected educational exchange. No spam, no unauthorized disclosures.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
