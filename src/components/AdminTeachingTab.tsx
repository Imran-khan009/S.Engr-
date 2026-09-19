import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  DollarSign,
  Clock,
  Trash2,
  Edit2,
  CheckCircle2,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  Search,
  Filter,
  Plus,
  Save,
  X,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import {
  TeachingService,
  TeachingServiceRequest,
  TeachingRequestStatus,
  TeachingConsultationSettings
} from '../types';

interface AdminTeachingTabProps {
  requests: TeachingServiceRequest[];
  services: TeachingService[];
  consultation?: TeachingConsultationSettings;
  onUpdateTeachingRequestStatus: (id: string, status: TeachingRequestStatus, adminNotes?: string) => Promise<void>;
  onDeleteTeachingRequest: (id: string) => Promise<void>;
  onSaveTeachingService: (service: TeachingService) => Promise<void>;
  onDeleteTeachingService: (id: string) => Promise<void>;
  onSaveConsultationSettings: (settings: TeachingConsultationSettings) => Promise<void>;
}

export const AdminTeachingTab: React.FC<AdminTeachingTabProps> = ({
  requests,
  services,
  consultation,
  onUpdateTeachingRequestStatus,
  onDeleteTeachingRequest,
  onSaveTeachingService,
  onDeleteTeachingService,
  onSaveConsultationSettings
}) => {
  const [subTab, setSubTab] = useState<'requests' | 'services' | 'consultation'>('requests');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState<string>('');

  // Editable service state
  const [selectedServiceToEdit, setSelectedServiceToEdit] = useState<TeachingService | null>(null);
  const [editSuccessMsg, setEditSuccessMsg] = useState<string | null>(null);

  // Editable consultation state
  const [consultationState, setConsultationState] = useState<TeachingConsultationSettings>(
    consultation || {
      title: 'Teaching Consultation',
      headline: "Having a teaching or classroom challenge? Let's work through it together.",
      subtext: 'Personalized 1-on-1 pedagogical troubleshooting for teachers, instructors, and training leads.',
      price: '$35',
      duration: '45 min Session',
      topics: [
        'Lesson planning & pacing',
        'Student engagement & attention',
        'Practical & hands-on teaching',
        'Course & module structure'
      ],
      enabled: true
    }
  );

  const requestStatuses: TeachingRequestStatus[] = [
    'NEW',
    'REVIEWING',
    'QUOTED',
    'PAYMENT PENDING',
    'PAID',
    'IN PROGRESS',
    'DELIVERED',
    'COMPLETED',
    'CANCELLED'
  ];

  const filteredRequests = requests.filter(r => {
    const matchesFilter = statusFilter === 'ALL' || r.status === statusFilter;
    const matchesSearch = searchTerm === '' ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.requiredServiceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.topic && r.topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeClass = (status: TeachingRequestStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'REVIEWING':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'QUOTED':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'PAYMENT PENDING':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40';
      case 'PAID':
      case 'IN PROGRESS':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'DELIVERED':
      case 'COMPLETED':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'CANCELLED':
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceToEdit) return;
    await onSaveTeachingService(selectedServiceToEdit);
    setEditSuccessMsg(`Service "${selectedServiceToEdit.title}" saved successfully!`);
    setTimeout(() => setEditSuccessMsg(null), 3000);
  };

  const handleSaveConsultation = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSaveConsultationSettings(consultationState);
    setEditSuccessMsg('Consultation settings updated successfully!');
    setTimeout(() => setEditSuccessMsg(null), 3000);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Sub-navigation bar inside Teaching Management */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSubTab('requests')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 ${
              subTab === 'requests'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Educational Requests ({requests.length})</span>
          </button>

          <button
            onClick={() => setSubTab('services')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 ${
              subTab === 'services'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Services & Pricing ({services.length})</span>
          </button>

          <button
            onClick={() => setSubTab('consultation')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center space-x-2 ${
              subTab === 'consultation'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Consultation Fee</span>
          </button>
        </div>

        {editSuccessMsg && (
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800 px-3 py-1 rounded-lg">
            ✓ {editSuccessMsg}
          </span>
        )}
      </div>

      {/* SUB-TAB 1: EDUCATIONAL REQUESTS */}
      {subTab === 'requests' && (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Header & Search */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-mono flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>TEACHING & EDUCATION SERVICE INQUIRIES ({requests.length})</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Incoming student, teacher, instructor & institute curriculum requirements.
              </p>
            </div>

            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search applicant, subject, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="ALL">ALL STATUSES</option>
                {requestStatuses.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Requests List */}
          {filteredRequests.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-slate-800 rounded-2xl bg-slate-950/30">
              <GraduationCap className="w-8 h-8 text-slate-600 mx-auto mb-2" />
              <p className="text-xs font-mono text-slate-400">
                No teaching service inquiries match the selected criteria.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((req) => (
                <div
                  key={req.id}
                  id={`teaching-req-card-${req.id}`}
                  className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                >
                  {/* Top Bar: Applicant Info & Status Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-white text-sm">
                          {req.fullName}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-slate-800 text-slate-300">
                          {req.userRole}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {req.country}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono mt-1">
                        <a
                          href={`mailto:${req.email}`}
                          className="hover:text-cyan-400 flex items-center space-x-1"
                        >
                          <Mail className="w-3 h-3 text-cyan-400" />
                          <span>{req.email}</span>
                        </a>
                        {req.whatsapp && (
                          <a
                            href={`https://wa.me/${req.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-400 flex items-center space-x-1"
                          >
                            <Phone className="w-3 h-3 text-emerald-400" />
                            <span>{req.whatsapp}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider border ${getStatusBadgeClass(req.status)}`}>
                        {req.status}
                      </span>
                      <select
                        value={req.status}
                        onChange={(e) => onUpdateTeachingRequestStatus(req.id, e.target.value as TeachingRequestStatus, req.adminNotes)}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                      >
                        {requestStatuses.map((st) => (
                          <option key={st} value={st}>
                            Mark as {st}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => onDeleteTeachingRequest(req.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                        title="Delete Request Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Service & Curriculum Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3.5 rounded-lg bg-slate-950/70 border border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Service Requested</span>
                      <span className="font-bold text-cyan-300">{req.requiredServiceName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Subject & Topic</span>
                      <span className="text-white font-medium">{req.subject}</span>
                      {req.topic && <span className="text-slate-400 block text-[11px]">({req.topic})</span>}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Student Level</span>
                      <span className="text-slate-300">{req.studentLevel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 block">Lessons & Format</span>
                      <span className="text-slate-300">{req.numberOfLessons} • {req.requiredFormat}</span>
                    </div>
                  </div>

                  {/* Timeline, Budget & Challenge Notes */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 text-xs">
                    <div className="flex-1 space-y-1">
                      {req.additionalRequirements && (
                        <div>
                          <span className="text-[10px] font-mono uppercase text-slate-500">Applicant Challenge / Prompt:</span>
                          <p className="text-slate-300 italic bg-slate-950/40 p-2.5 rounded border border-slate-800/60 mt-0.5">
                            "{req.additionalRequirements}"
                          </p>
                        </div>
                      )}
                      {req.fileAttachment && (
                        <div className="flex items-center space-x-2 pt-1 text-emerald-400 font-mono text-[11px]">
                          <FileText className="w-3.5 h-3.5" />
                          <span>Attachment: {req.fileAttachment.fileName} {req.fileAttachment.fileSize && `(${req.fileAttachment.fileSize})`}</span>
                          {(req.fileAttachment.fileUrl || req.fileAttachment.dataUrl) && (
                            <a
                              href={req.fileAttachment.fileUrl || req.fileAttachment.dataUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download={req.fileAttachment.fileName}
                              className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-[10px] text-emerald-300 hover:text-white inline-flex items-center space-x-1"
                            >
                              <span>View / Download</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="sm:text-right shrink-0 font-mono text-[11px] text-slate-400">
                      <div>Deadline: <span className="text-white">{req.deadline}</span></div>
                      <div>Budget: <span className="text-cyan-400">{req.budget}</span></div>
                      <div className="text-[10px] text-slate-500 mt-1">
                        Logged: {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Admin Notes Section */}
                  <div className="pt-2 border-t border-slate-800/80">
                    {editingNotesId === req.id ? (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Add internal notes (e.g. Discussed outline on WhatsApp)..."
                          className="flex-1 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                        <button
                          onClick={async () => {
                            await onUpdateTeachingRequestStatus(req.id, req.status, notesText);
                            setEditingNotesId(null);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold font-mono"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                        <span className="flex items-center space-x-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Internal Notes: {req.adminNotes || 'None'}</span>
                        </span>
                        <button
                          onClick={() => {
                            setEditingNotesId(req.id);
                            setNotesText(req.adminNotes || '');
                          }}
                          className="text-[10px] text-cyan-400 hover:underline"
                        >
                          {req.adminNotes ? 'Edit Notes' : '+ Add Note'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: TEACHING SERVICES & PRICING EDITOR */}
      {subTab === 'services' && (
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white uppercase font-mono flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-cyan-400" />
                <span>DYNAMIC TEACHING SERVICES & PRICING</span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Update starting rates, turnaround times, and descriptions without modifying code.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Services List */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                Select Service to Edit:
              </span>
              {services.map((svc) => (
                <div
                  key={svc.id}
                  onClick={() => setSelectedServiceToEdit({ ...svc })}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedServiceToEdit?.id === svc.id
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-md shadow-cyan-950/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">
                      {svc.title}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {svc.startingPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>{svc.category}</span>
                    <span>{svc.deliveryTime}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Service Edit Form */}
            <div className="lg:col-span-2 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
              {selectedServiceToEdit ? (
                <form onSubmit={handleSaveService} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Edit2 className="w-4 h-4 text-cyan-400" />
                      Editing: {selectedServiceToEdit.title}
                    </h4>
                    <label className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                      <input
                        type="checkbox"
                        checked={selectedServiceToEdit.enabled}
                        onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, enabled: e.target.checked } : null)}
                        className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                      />
                      <span>Active on Website</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Service Title</label>
                      <input
                        type="text"
                        value={selectedServiceToEdit.title}
                        onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, title: e.target.value } : null)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Category Badge</label>
                      <input
                        type="text"
                        value={selectedServiceToEdit.category}
                        onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, category: e.target.value } : null)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {/* Pricing Settings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Starting Price</label>
                      <input
                        type="text"
                        value={selectedServiceToEdit.startingPrice}
                        onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, startingPrice: e.target.value } : null)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-cyan-400 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Premium Tier Price</label>
                      <input
                        type="text"
                        value={selectedServiceToEdit.premiumPrice || ''}
                        onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, premiumPrice: e.target.value } : null)}
                        placeholder="Optional, e.g. $85"
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-bold text-emerald-400 focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-slate-400 mb-1">Estimated Delivery Time</label>
                      <input
                        type="text"
                        value={selectedServiceToEdit.deliveryTime}
                        onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, deliveryTime: e.target.value } : null)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={selectedServiceToEdit.subtitle}
                      onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, subtitle: e.target.value } : null)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Short Description (Card)</label>
                    <textarea
                      rows={2}
                      value={selectedServiceToEdit.shortDescription}
                      onChange={(e) => setSelectedServiceToEdit(prev => prev ? { ...prev, shortDescription: e.target.value } : null)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 mb-1">Protected Sample Structure Preview Excerpt</label>
                    <textarea
                      rows={2}
                      value={selectedServiceToEdit.samplePreview.excerpt}
                      onChange={(e) => setSelectedServiceToEdit(prev => prev ? {
                        ...prev,
                        samplePreview: { ...prev.samplePreview, excerpt: e.target.value }
                      } : null)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setSelectedServiceToEdit(null)}
                      className="px-4 py-2 rounded-lg text-xs font-mono text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center space-x-2"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Service Changes</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="p-12 text-center text-slate-500 font-mono text-xs">
                  ← Select a teaching service from the left to edit its pricing, delivery timeline, and content.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TEACHING CONSULTATION SETTINGS */}
      {subTab === 'consultation' && (
        <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-3xl">
          <div>
            <h3 className="text-base font-bold text-white uppercase font-mono flex items-center space-x-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>TEACHING CONSULTATION SETTINGS & PRICING</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Adjust the 1-on-1 pedagogical consultation fee, session duration, and focus topics.
            </p>
          </div>

          <form onSubmit={handleSaveConsultation} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-cyan-400">
                Live Consultation Configuration
              </span>
              <label className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                <input
                  type="checkbox"
                  checked={consultationState.enabled}
                  onChange={(e) => setConsultationState(prev => ({ ...prev, enabled: e.target.checked }))}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-0"
                />
                <span>Enable Consultation Banner</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Session Price</label>
                <input
                  type="text"
                  value={consultationState.price}
                  onChange={(e) => setConsultationState(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="$35"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm font-bold text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1">Session Duration</label>
                <input
                  type="text"
                  value={consultationState.duration}
                  onChange={(e) => setConsultationState(prev => ({ ...prev, duration: e.target.value }))}
                  placeholder="45 min Session"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Headline</label>
              <input
                type="text"
                value={consultationState.headline}
                onChange={(e) => setConsultationState(prev => ({ ...prev, headline: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">Subtext / Value Proposition</label>
              <textarea
                rows={2}
                value={consultationState.subtext}
                onChange={(e) => setConsultationState(prev => ({ ...prev, subtext: e.target.value }))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Troubleshooting Topics (comma-separated)
              </label>
              <input
                type="text"
                value={consultationState.topics.join(', ')}
                onChange={(e) => setConsultationState(prev => ({
                  ...prev,
                  topics: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                }))}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-400 text-slate-950 font-bold font-mono text-xs uppercase tracking-wider flex items-center space-x-2"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Consultation Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
