import React, { useState, useEffect } from 'react';
import {
  FullSiteData,
  Lead,
  LeadStatus,
  Service,
  Project,
  SocialPlatform,
  CustomWebsiteRequest,
  CustomRequestStatus,
  SiteSettings
} from '../types';
import {
  X,
  Lock,
  Shield,
  Layers,
  Users,
  DollarSign,
  Clock,
  CheckCircle2,
  Trash2,
  Save,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  Rocket,
  Sliders
} from 'lucide-react';
import { AdminCustomRequestsTab } from './AdminCustomRequestsTab';
import { AdminDemoSettingsTab } from './AdminDemoSettingsTab';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  siteData: FullSiteData | null;
  onRefreshData: () => Promise<void>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  siteData,
  onRefreshData
}) => {
  if (!isOpen) return null;

  const [passkey, setPasskey] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('admin_token'));
  const [authError, setAuthError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'leads' | 'customRequests' | 'services' | 'socials' | 'demoSettings' | 'settings'
  >('leads');

  // Leads state
  const [leads, setLeads] = useState<Lead[]>(siteData?.leads || []);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Custom Website Requests state
  const [customRequests, setCustomRequests] = useState<CustomWebsiteRequest[]>(siteData?.customRequests || []);

  // Services editable copy
  const [services, setServices] = useState<Service[]>(siteData?.services || []);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Social links editable copy
  const [socials, setSocials] = useState<SocialPlatform[]>(siteData?.socials || []);

  // Settings state
  const [settings, setSettings] = useState<SiteSettings>(() => {
    if (siteData?.settings) return siteData.settings;
    return {
      brandName: 'S • ENGR',
      professionalName: 'Engr. Imran Khan',
      positioning: 'Technology • IoT • Creative Design • Digital Marketing • Construction & Design • Teaching',
      brandConcept: 'Learn • Create • Build • Teach • Hire',
      heroHeading: 'BUILD. DESIGN. TEACH. SOLVE.',
      heroSupporting: 'Technology, Creative Design & Real-World Solutions — Built with Purpose.',
      heroDescription: 'Computer systems engineer, technical instructor, IoT developer, and creative design strategist.',
      adminPasskey: 'engr-imran-2025',
      email: 'contact.engrimran@gmail.com',
      whatsapp: '03331244214',
      location: 'HUB Chowki Balochistan',
      demoMode: true,
      showPricing: true,
      showServices: true,
      showFeatures: true,
      ctaTitle: 'Need a Customized Website?',
      ctaSupportingText:
        'Explore the demo or request a fully customized version built around your brand, services and business goals.',
      upgradeMessage: 'Ready to build your bespoke digital platform?',
      premiumFeatures: {
        customBranding: true,
        customColors: true,
        customTypography: true,
        customSections: true,
        advancedAnimations: true,
        advancedPortfolioLayouts: true,
        customServicePages: true,
        advancedContactLeadSystem: true,
        customerDashboard: true,
        adminCMS: true,
        advancedAnalytics: true,
        customDomainSupport: true,
        advancedSEO: true,
        blogSystem: true,
        bookingSystem: true,
        clientPortal: true,
        paymentIntegration: true,
        customApiIntegrations: true
      }
    };
  });

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (siteData) {
      setLeads(siteData.leads || []);
      setCustomRequests(siteData.customRequests || []);
      setServices(siteData.services || []);
      setSocials(siteData.socials || []);
      if (siteData.settings) {
        setSettings(siteData.settings);
      }
      if (!selectedService && siteData.services?.[0]) {
        setSelectedService(siteData.services[0]);
      }
    }
  }, [siteData]);

  const showNotification = (msg: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchAdminData = async (authToken?: string) => {
    const currentToken = authToken || token;
    if (!currentToken) return;
    try {
      const res = await fetch('/api/admin/data', {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      if (!res.ok) {
        if (res.status === 401) {
          handleLogout();
        }
        return;
      }
      const data = await res.json();
      if (data.leads) setLeads(data.leads);
      if (data.customRequests) setCustomRequests(data.customRequests);
      if (data.services) setServices(data.services);
      if (data.socials) setSocials(data.socials);
      if (data.settings) setSettings(data.settings);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminData(token);
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passkey })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');
      setToken(data.token);
      localStorage.setItem('admin_token', data.token);
      showNotification('Admin login successful.');
      fetchAdminData(data.token);
    } catch (err: any) {
      setAuthError(err.message || 'Invalid passkey.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('admin_token');
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      const res = await fetch('/api/admin/leads/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: leadId, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      showNotification(`Lead status updated to ${newStatus}`);
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!window.confirm('Are you sure you want to delete this lead record?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete lead');
      setLeads(prev => prev.filter(l => l.id !== leadId));
      showNotification('Lead deleted successfully.');
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleSaveService = async () => {
    if (!selectedService) return;
    try {
      const res = await fetch('/api/admin/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(selectedService)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');
      setServices(prev => prev.map(s => s.id === selectedService.id ? selectedService : s));
      showNotification(`Service "${selectedService.name}" updated successfully.`);
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleSaveSocials = async () => {
    try {
      const res = await fetch('/api/admin/socials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ socials })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save social platforms');
      showNotification('Platform links & handles updated successfully.');
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleCustomRequestStatus = async (
    id: string,
    status: CustomRequestStatus,
    adminNotes?: string
  ) => {
    try {
      const res = await fetch('/api/admin/custom-requests/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id, status, adminNotes })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update custom request status');
      setCustomRequests(prev => prev.map(r => r.id === id ? data.request : r));
      showNotification(`Custom request updated to ${status}`);
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleDeleteCustomRequest = async (id: string) => {
    if (!window.confirm('Delete this custom website request record?')) return;
    try {
      const res = await fetch(`/api/admin/custom-requests/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete custom request');
      setCustomRequests(prev => prev.filter(r => r.id !== id));
      showNotification('Custom website request removed.');
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleSaveSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save settings');
      setSettings(data.settings);
      showNotification('Demo mode & Premium settings saved successfully!');
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const handleResetData = async () => {
    if (!window.confirm('Reset all CMS content and leads to verified default seed state?')) return;
    try {
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset data');
      showNotification('Database successfully reset to default seed!');
      await onRefreshData();
    } catch (err: any) {
      showNotification(err.message, 'error');
    }
  };

  const leadStatuses: LeadStatus[] = [
    'NEW',
    'CONTACTED',
    'DISCUSSION',
    'QUOTED',
    'IN PROGRESS',
    'COMPLETED',
    'CANCELLED'
  ];

  const filteredLeads = statusFilter === 'ALL'
    ? leads
    : leads.filter(l => l.status === statusFilter);

  return (
    <div
      id="admin-dashboard-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="relative w-full max-w-6xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80 sticky top-0 z-20">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm text-white font-mono">
                  S • ENGR ADMIN CMS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  Live Engine
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Engr. Imran Khan Project & Lead Management
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {token && (
              <button
                onClick={handleLogout}
                className="text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors"
              >
                Logout
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications */}
        {notification && (
          <div className={`px-6 py-2 text-xs font-mono flex items-center justify-between ${
            notification.type === 'error' ? 'bg-rose-950 text-rose-300' : 'bg-emerald-950 text-emerald-300'
          }`}>
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)}>×</button>
          </div>
        )}

        {/* Auth Barrier if not logged in */}
        {!token ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Administrator Authentication
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono leading-relaxed">
              Enter your master passkey to access project inquiries, lead statuses, service pricing, and site CMS.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              {authError && (
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-300">
                  {authError}
                </div>
              )}
              <input
                type="password"
                required
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                placeholder="Enter passkey (e.g. engr-imran-2025)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white text-center focus:outline-none focus:border-cyan-500 font-mono"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all shadow-md shadow-cyan-500/20"
              >
                UNLOCK ADMIN PANEL
              </button>
            </form>
            <p className="mt-4 text-[10px] font-mono text-slate-500">
              Default system passkey: <code className="text-cyan-400">engr-imran-2025</code>
            </p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Nav Tabs */}
            <div className="flex items-center px-6 border-b border-slate-800 bg-slate-950/40 overflow-x-auto gap-4 py-2">
              <button
                onClick={() => setActiveTab('leads')}
                className={`py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'leads' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Customer Leads ({leads.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('customRequests')}
                className={`py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'customRequests' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Rocket className="w-3.5 h-3.5" />
                <span>Custom Requests ({customRequests.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'services' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>Services & Pricing ({services.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('socials')}
                className={`py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'socials' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Freelance & Socials</span>
              </button>
              <button
                onClick={() => setActiveTab('demoSettings')}
                className={`py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'demoSettings' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Demo & Premium Controls</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-3 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center space-x-2 whitespace-nowrap ${
                  activeTab === 'settings' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset / Maintenance</span>
              </button>
            </div>

            {/* Tab 1: Customer Lead Management (Requirement #23) */}
            {activeTab === 'leads' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase font-mono">
                      NEW PROJECT REQUESTS & LEADS
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Update lead statuses from NEW to IN PROGRESS or COMPLETED.
                    </p>
                  </div>
                  {/* Status filter pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {['ALL', ...leadStatuses].map(st => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`text-[10px] font-mono px-2.5 py-1 rounded-md transition-colors ${
                          statusFilter === st
                            ? 'bg-cyan-500 text-slate-950 font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {filteredLeads.length === 0 ? (
                  <div className="text-center py-12 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <p className="text-xs font-mono text-slate-400">
                      No customer leads found matching filter: {statusFilter}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="bg-slate-950 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-base font-bold text-white">
                                {lead.fullName}
                              </h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                                {lead.platformPreference} Contract
                              </span>
                            </div>
                            <p className="text-xs font-mono text-slate-400">
                              {lead.email} • Phone: {lead.phone || 'N/A'} • WhatsApp: {lead.whatsapp || 'N/A'} • {lead.country}
                            </p>
                          </div>

                          {/* Status Dropdown */}
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">
                              Status:
                            </span>
                            <select
                              value={lead.status}
                              onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-500"
                            >
                              {leadStatuses.map(s => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleDeleteLead(lead.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800"
                              title="Delete record"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Project details */}
                        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800/80 text-xs space-y-2 mb-3">
                          <div>
                            <span className="font-mono text-cyan-400 font-semibold block">Service:</span>
                            <span className="text-white font-medium">{lead.serviceRequired}</span>
                          </div>
                          <div>
                            <span className="font-mono text-slate-400 block">Description:</span>
                            <p className="text-slate-300 leading-relaxed">{lead.projectDescription}</p>
                          </div>
                          {lead.referenceRequirements && (
                            <div>
                              <span className="font-mono text-slate-400 block">References / Requirements:</span>
                              <p className="text-slate-400">{lead.referenceRequirements}</p>
                            </div>
                          )}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-800 font-mono text-[11px]">
                            <div>
                              <span className="text-slate-500">Budget:</span> <span className="text-white">{lead.budget}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Deadline:</span> <span className="text-white">{lead.deadline}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Preferred Method:</span> <span className="text-white">{lead.preferredContactMethod}</span>
                            </div>
                            <div>
                              <span className="text-slate-500">Date Logged:</span> <span className="text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Services & Pricing CMS (Requirement #3) */}
            {activeTab === 'services' && (
              <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Services list (4 cols) */}
                <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto pr-1">
                  <span className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                    Select Service to Edit Starting Price & Delivery:
                  </span>
                  {services.map(srv => (
                    <button
                      key={srv.id}
                      onClick={() => setSelectedService(srv)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center justify-between ${
                        selectedService?.id === srv.id
                          ? 'bg-cyan-500/15 border-cyan-500 text-white font-bold'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="truncate">
                        <div className="truncate">{srv.name}</div>
                        <span className="text-[10px] font-mono text-cyan-400">{srv.startingPrice} • {srv.estimatedDelivery}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 shrink-0 text-slate-500" />
                    </button>
                  ))}
                </div>

                {/* Service Editor (8 cols) */}
                <div className="lg:col-span-8 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
                  {selectedService ? (
                    <>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="font-bold text-white text-sm">
                          Edit: {selectedService.name}
                        </h4>
                        <button
                          onClick={handleSaveService}
                          className="px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center space-x-1.5"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>SAVE CHANGES</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-cyan-400 mb-1">
                            Starting Price (Editable CMS) *
                          </label>
                          <input
                            type="text"
                            value={selectedService.startingPrice}
                            onChange={(e) => setSelectedService({ ...selectedService, startingPrice: e.target.value })}
                            placeholder="e.g. $120 or Custom Quote"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-mono text-cyan-400 mb-1">
                            Estimated Delivery (Editable CMS) *
                          </label>
                          <input
                            type="text"
                            value={selectedService.estimatedDelivery}
                            onChange={(e) => setSelectedService({ ...selectedService, estimatedDelivery: e.target.value })}
                            placeholder="e.g. 3-5 Days"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Short Description
                        </label>
                        <textarea
                          rows={2}
                          value={selectedService.shortDescription}
                          onChange={(e) => setSelectedService({ ...selectedService, shortDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            Problem Statement
                          </label>
                          <textarea
                            rows={3}
                            value={selectedService.problem}
                            onChange={(e) => setSelectedService({ ...selectedService, problem: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-slate-400 mb-1">
                            Solution Statement
                          </label>
                          <textarea
                            rows={3}
                            value={selectedService.solution}
                            onChange={(e) => setSelectedService({ ...selectedService, solution: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-400 mb-1">
                          Tools & Technologies (Comma-separated)
                        </label>
                        <input
                          type="text"
                          value={selectedService.tools.join(', ')}
                          onChange={(e) => setSelectedService({
                            ...selectedService,
                            tools: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-slate-500">Select a service to edit.</p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Freelance & Social Links (Requirement #16) */}
            {activeTab === 'socials' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white uppercase font-mono">
                      FREELANCE & SOCIAL PLATFORM URLS
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      All URLs and profile handles are CMS driven. Never fabricated.
                    </p>
                  </div>
                  <button
                    onClick={handleSaveSocials}
                    className="px-5 py-2.5 rounded-xl font-bold font-mono text-xs uppercase bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>SAVE ALL PLATFORM LINKS</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socials.map((soc, idx) => (
                    <div key={soc.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white font-mono">{soc.name}</span>
                        <label className="flex items-center space-x-1 text-[10px] text-slate-400">
                          <input
                            type="checkbox"
                            checked={soc.enabled}
                            onChange={(e) => {
                              const updated = [...socials];
                              updated[idx].enabled = e.target.checked;
                              setSocials(updated);
                            }}
                            className="rounded accent-cyan-400"
                          />
                          <span>Show on Site</span>
                        </label>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-mono block">Profile URL</label>
                        <input
                          type="text"
                          value={soc.url}
                          onChange={(e) => {
                            const updated = [...socials];
                            updated[idx].url = e.target.value;
                            setSocials(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-500 font-mono block">Handle / Display Text</label>
                        <input
                          type="text"
                          value={soc.handle}
                          onChange={(e) => {
                            const updated = [...socials];
                            updated[idx].handle = e.target.value;
                            setSocials(updated);
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500 font-mono"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Custom Website Upgrade Requests */}
            {activeTab === 'customRequests' && (
              <AdminCustomRequestsTab
                requests={customRequests}
                onUpdateStatus={handleCustomRequestStatus}
                onDeleteRequest={handleDeleteCustomRequest}
              />
            )}

            {/* Tab: Demo Mode & Premium Controls */}
            {activeTab === 'demoSettings' && (
              <AdminDemoSettingsTab
                settings={settings}
                onChangeSettings={setSettings}
                onSaveSettings={handleSaveSettings}
              />
            )}

            {/* Tab 4: Reset & Database Maintenance */}
            {activeTab === 'settings' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6 max-w-xl">
                <div>
                  <h3 className="text-base font-bold text-white uppercase font-mono mb-2">
                    System Maintenance & Reset
                  </h3>
                  <p className="text-xs text-slate-400 font-mono leading-relaxed mb-6">
                    Manage system database state and reset to default verified seed data if needed.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                  <h4 className="text-xs font-mono font-bold text-rose-400 uppercase">
                    Reset Database to Verified Defaults
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This will re-initialize all services, projects, experiences, education, and skills back to the initial verified state.
                  </p>
                  <button
                    onClick={handleResetData}
                    className="px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase bg-rose-500 hover:bg-rose-400 text-slate-950 transition-colors"
                  >
                    RESET TO DEFAULT DATA
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
