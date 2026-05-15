import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CreditCard, Link as LinkIcon, Trash2, Bell, Lock, Eye } from 'lucide-react';
import Section from '../../components/layout/Section';
import { apiGet, apiPost, apiDelete } from '../../utils/api';

type TabId = 'profile' | 'account' | 'billing' | 'connected';

const mockFormData = { fullName: 'Roota Employer Team', email: 'team@roota.ai', phone: '+234 (0) 8098765432', location: 'Lagos, Nigeria', bio: 'Hiring Team | Operations' };
const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'profile', label: 'Profile', icon: 'P' },
  { id: 'account', label: 'Account', icon: 'A' },
  { id: 'billing', label: 'Billing', icon: 'B' },
  { id: 'connected', label: 'Connected', icon: 'C' },
];

export default function EmployerSettingsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState(mockFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('profile');
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const [accountSettings, setAccountSettings] = useState([
    { key: 'emailPreferences', label: 'Email Preferences', description: 'Receive team and activity emails', icon: Bell, enabled: true },
    { key: 'twoFactor', label: 'Two-Factor Authentication', description: 'Extra login protection', icon: Lock, enabled: true },
    { key: 'profileVisibility', label: 'Profile Visibility', description: 'Show company profile to workers', icon: Eye, enabled: true },
  ]);

  const [billingSettings, setBillingSettings] = useState([
    { key: 'paymentMethods', label: 'Payment Methods', description: 'Manage corporate cards', status: '3 cards added' },
    { key: 'subscription', label: 'Subscription Plan', description: 'Current: Enterprise Annual', status: '$299/year' },
    { key: 'invoices', label: 'Invoices', description: 'Download receipts and invoices', status: '11 invoices available' },
  ]);

  const [connectedAccounts, setConnectedAccounts] = useState([
    { key: 'github', label: 'GitHub', description: 'Connect your GitHub account', connected: true },
    { key: 'linkedin', label: 'LinkedIn', description: 'Link your LinkedIn profile', connected: true },
    { key: 'google', label: 'Google', description: 'Sync with Google account', connected: true },
    { key: 'stripe', label: 'Stripe', description: 'Connect Stripe wallet', connected: true },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/employer/settings/profile/');
        setFormData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.warn('Error fetching employer settings, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await apiPost('/api/employer/settings/profile/update/', formData);
      setSavedMessage(true);
      setStatusMessage('Profile updated successfully.');
      setTimeout(() => { setSavedMessage(false); setStatusMessage(null); }, 1800);
    } catch (error) {
      console.warn('Error saving employer settings:', error);
      setStatusMessage('Unable to save profile right now.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAccountSetting = async (key: string) => {
    const updated = accountSettings.map((setting) => setting.key === key ? { ...setting, enabled: !setting.enabled } : setting);
    setAccountSettings(updated);
    try {
      await apiPost('/api/employer/settings/preferences/update/', { preferences: updated });
      setStatusMessage('Account preferences updated.');
    } catch (error) {
      console.error('Failed to update preference:', error);
      setStatusMessage('Preference update failed.');
    }
  };

  const handleBillingAction = (key: string) => {
    if (key === 'paymentMethods') {
      setBillingSettings((prev) => prev.map((item) => item.key === 'paymentMethods' ? { ...item, status: `${Math.min(9, parseInt(item.status[0], 10) + 1)} cards added` } : item));
      setStatusMessage('New payment method added.');
      return;
    }
    if (key === 'subscription') {
      setBillingSettings((prev) => prev.map((item) => item.key === 'subscription' ? { ...item, status: 'Switched to Pro Monthly' } : item));
      setStatusMessage('Subscription updated.');
      return;
    }
    const csvData = 'invoice_id,amount,status\nINV-001,99,paid\nINV-002,99,paid\n';
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roota-employer-invoices.csv';
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Invoice export downloaded.');
  };

  const handleToggleConnectedAccount = async (key: string) => {
    const updated = connectedAccounts.map((account) => account.key === key ? { ...account, connected: !account.connected } : account);
    setConnectedAccounts(updated);
    try {
      await apiPost('/api/employer/settings/connections/update/', { connections: updated });
      setStatusMessage('Connected accounts updated.');
    } catch (error) {
      console.error('Failed to update connected account:', error);
      setStatusMessage('Failed to update connected account.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await apiDelete('/api/employer/settings/account/delete/');
      setConfirmDeleteOpen(false);
      setStatusMessage('Delete request submitted. Contact support to complete this action.');
    } catch (error) {
      console.error('Delete account failed:', error);
      setStatusMessage('Unable to delete account right now.');
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && <div className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">{statusMessage}</div>}
      <div className="flex gap-2 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (<motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} whileHover={{ y: -1 }} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id ? 'border-primary text-primary-dark' : 'border-transparent text-muted hover:text-slate-900'}`}><span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">{tab.icon}</span>{tab.label}</motion.button>))}
      </div>

      {activeTab === 'profile' && (<Section title="Company Profile" description="Update your hiring team details"><motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm"><div className="flex items-center gap-6"><div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-2xl font-bold text-white">{formData.fullName.split(' ').map((n) => n[0]).join('')}</div><div><p className="font-semibold text-slate-900">Company Logo</p><p className="mt-1 text-sm text-muted">PNG or JPG, max 5MB</p><motion.button whileHover={{ y: -1 }} onClick={() => fileInputRef.current?.click()} className="mt-3 rounded-lg border border-border bg-slate-50 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100">Upload Logo</motion.button><input ref={fileInputRef} type="file" accept=".png,.jpg,.jpeg" className="hidden" onChange={(e) => setUploadedPhotoName(e.target.files?.[0]?.name ?? null)} />{uploadedPhotoName && <p className="mt-1 text-xs text-primary-dark">Selected: {uploadedPhotoName}</p>}</div></div><div className="grid grid-cols-1 gap-5 sm:grid-cols-2"><div className="sm:col-span-2"><label className="mb-2 block text-sm font-semibold text-slate-900">Company Name</label><input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark" /></div><div><label className="mb-2 block text-sm font-semibold text-slate-900">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark" /></div><div><label className="mb-2 block text-sm font-semibold text-slate-900">Phone</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark" /></div><div><label className="mb-2 block text-sm font-semibold text-slate-900">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark" /></div><div><label className="mb-2 block text-sm font-semibold text-slate-900">Bio</label><input type="text" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark" /></div></div><motion.button whileHover={{ y: -2 }} onClick={handleSave} className="inline-flex items-center gap-2 rounded-xl bg-primary-dark px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark/90"><Save size={16} />{saving ? 'Saving...' : 'Save changes'}</motion.button></motion.div></Section>)}
      {activeTab === 'account' && (<Section title="Account Settings" description="Manage security and visibility"><div className="space-y-3">{accountSettings.map((setting) => { const Icon = setting.icon; return (<div key={setting.key} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between shadow-sm"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-primary-dark"><Icon size={18} /></div><div><p className="font-semibold text-slate-900">{setting.label}</p><p className="text-sm text-muted">{setting.description}</p></div></div><button onClick={() => handleToggleAccountSetting(setting.key)} className={`rounded-full px-4 py-2 text-xs font-semibold ${setting.enabled ? 'bg-[#DDF6E9] text-primary-dark' : 'bg-slate-100 text-slate-700'}`}>{setting.enabled ? 'Enabled' : 'Disabled'}</button></div>); })}</div></Section>)}
      {activeTab === 'billing' && (<Section title="Billing" description="Manage cards, subscriptions and invoices"><div className="grid grid-cols-1 gap-4">{billingSettings.map((item) => (<div key={item.key} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between shadow-sm"><div><p className="font-semibold text-slate-900">{item.label}</p><p className="text-sm text-muted">{item.description}</p></div><div className="flex items-center gap-2"><span className="text-sm text-slate-700">{item.status}</span><button onClick={() => handleBillingAction(item.key)} className="rounded-full border border-border px-3 py-2 text-xs font-semibold text-primary-dark">Action</button></div></div>))}</div></Section>)}
      {activeTab === 'connected' && (<Section title="Connected Accounts" description="Manage your linked services"><div className="grid grid-cols-1 gap-4">{connectedAccounts.map((account) => (<div key={account.key} className="rounded-xl border border-border bg-card p-4 flex items-center justify-between shadow-sm"><div><p className="font-semibold text-slate-900">{account.label}</p><p className="text-sm text-muted">{account.description}</p></div><button onClick={() => handleToggleConnectedAccount(account.key)} className={`rounded-full px-4 py-2 text-xs font-semibold ${account.connected ? 'bg-[#DDF6E9] text-primary-dark' : 'bg-slate-100 text-slate-700'}`}>{account.connected ? 'Connected' : 'Connect'}</button></div>))}</div><div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-5"><p className="font-semibold text-red-800">Danger Zone</p><p className="mt-1 text-sm text-red-700">Delete your employer account and all related company data.</p><motion.button whileHover={{ y: -1 }} onClick={() => setConfirmDeleteOpen(true)} className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">Delete Account</motion.button>{confirmDeleteOpen && (<div className="mt-4 rounded-xl border border-red-200 bg-white p-4"><p className="text-sm text-slate-700">Are you sure you want to delete your employer account?</p><div className="mt-3 flex gap-2"><button onClick={handleDeleteAccount} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">Yes, delete</button><button onClick={() => setConfirmDeleteOpen(false)} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-slate-700">Cancel</button></div></div>)}</div></Section>)}
    </div>
  );
}
