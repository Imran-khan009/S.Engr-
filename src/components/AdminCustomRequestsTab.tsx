import React, { useState } from 'react';
import { CustomWebsiteRequest, CustomRequestStatus } from '../types';
import { Rocket, Trash2, Clock, CheckCircle2, MessageSquare, AlertCircle, Phone, Mail, Building, Globe, Layers, Search, Filter } from 'lucide-react';

interface AdminCustomRequestsTabProps {
  requests: CustomWebsiteRequest[];
  onUpdateStatus: (id: string, status: CustomRequestStatus, adminNotes?: string) => Promise<void>;
  onDeleteRequest: (id: string) => Promise<void>;
}

export const AdminCustomRequestsTab: React.FC<AdminCustomRequestsTabProps> = ({
  requests,
  onUpdateStatus,
  onDeleteRequest
}) => {
  const [filter, setFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState<string>('');

  const statuses: CustomRequestStatus[] = [
    'NEW',
    'REVIEWING',
    'PROPOSAL_SENT',
    'ACCEPTED',
    'IN_DEVELOPMENT',
    'DELIVERED',
    'ARCHIVED'
  ];

  const filtered = requests.filter(r => {
    const matchesFilter = filter === 'ALL' || r.status === filter;
    const matchesSearch = searchTerm === '' ||
      r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.businessName && r.businessName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.websiteType.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusBadgeClass = (status: CustomRequestStatus) => {
    switch (status) {
      case 'NEW':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'REVIEWING':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'PROPOSAL_SENT':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'ACCEPTED':
      case 'IN_DEVELOPMENT':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'DELIVERED':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      case 'ARCHIVED':
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto space-y-6">
      {/* Top Header & Metrics */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white uppercase font-mono flex items-center space-x-2">
            <Rocket className="w-4 h-4 text-cyan-400" />
            <span>CUSTOM WEBSITE UPGRADE INQUIRIES ({requests.length})</span>
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Detailed 11-field custom website specifications submitted from the demo CTA.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search name, brand, type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Statuses ({requests.length})</option>
            {statuses.map(s => (
              <option key={s} value={s}>
                {s} ({requests.filter(r => r.status === s).length})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Requests List */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-slate-950/60 border border-slate-800 text-slate-500 text-xs font-mono">
          No custom website requests found matching the current criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((req) => (
            <div
              key={req.id}
              className="p-5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-all space-y-4"
            >
              {/* Row 1: Client & Status Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white font-mono">{req.fullName}</span>
                    {req.businessName && (
                      <span className="text-xs text-cyan-400 font-mono">({req.businessName})</span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] font-mono font-bold ${getStatusBadgeClass(req.status)}`}>
                      {req.status}
                    </span>
                    {req.supabaseSynced && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 text-[9px] font-mono" title="Synced to Supabase Cloud">
                        ⚡ Supabase Synced
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    ID: {req.id} • Received: {new Date(req.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Status Switcher & Delete Action */}
                <div className="flex items-center space-x-2">
                  <select
                    value={req.status}
                    onChange={(e) => onUpdateStatus(req.id, e.target.value as CustomRequestStatus, req.adminNotes)}
                    className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                  >
                    {statuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => onDeleteRequest(req.id)}
                    title="Delete Request"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Row 2: Contact & Project Parameters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Contact Info</span>
                  <div className="text-slate-200 mt-1 space-y-0.5 truncate">
                    <div className="truncate">✉️ {req.email}</div>
                    {req.whatsapp && <div>📱 {req.whatsapp}</div>}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Website Type & Style</span>
                  <div className="text-slate-200 mt-1 truncate">
                    <div className="text-cyan-300 font-bold truncate">{req.websiteType}</div>
                    <div className="text-[11px] text-slate-400 truncate">{req.designPreference}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Budget & Deadline</span>
                  <div className="text-slate-200 mt-1">
                    <div className="text-emerald-400 font-bold">{req.budget}</div>
                    <div className="text-[11px] text-slate-400">{req.deadline}</div>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800">
                  <span className="text-slate-500 text-[10px] block uppercase">Services Requested</span>
                  <div className="text-slate-300 mt-1 truncate">
                    {req.requiredServices.join(', ')}
                  </div>
                </div>
              </div>

              {/* Row 3: Modular Features Checked */}
              {req.requiredFeatures && req.requiredFeatures.length > 0 && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                    Modular Features Requested:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {req.requiredFeatures.map((feat, fi) => (
                      <span
                        key={fi}
                        className="px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 text-[10px] font-mono"
                      >
                        ✓ {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Row 4: Client Additional Requirements / Notes */}
              {req.additionalRequirements && (
                <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/80 text-xs">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                    Client Specifications / Notes:
                  </span>
                  <p className="text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                    {req.additionalRequirements}
                  </p>
                </div>
              )}

              {/* Row 5: Admin Private Notes */}
              <div className="pt-2 border-t border-slate-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                {editingNotesId === req.id ? (
                  <div className="w-full flex items-center space-x-2">
                    <input
                      type="text"
                      value={notesText}
                      onChange={(e) => setNotesText(e.target.value)}
                      placeholder="Add private admin follow-up notes..."
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                    <button
                      onClick={async () => {
                        await onUpdateStatus(req.id, req.status, notesText);
                        setEditingNotesId(null);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-mono font-bold text-xs"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingNotesId(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
                    <span>Admin Notes: {req.adminNotes || 'None'}</span>
                    <button
                      onClick={() => {
                        setEditingNotesId(req.id);
                        setNotesText(req.adminNotes || '');
                      }}
                      className="text-cyan-400 hover:underline text-[11px] ml-2"
                    >
                      Edit Notes
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
