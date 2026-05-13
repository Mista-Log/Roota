import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2, CreditCard, Link as LinkIcon, Trash2, Check, Bell, Lock, Eye } from 'lucide-react';
import Section from '../../components/layout/Section';

type TabId = 'profile' | 'account' | 'billing' | 'connected';

const mockFormData = {
  fullName: 'Alexander Roota',
  email: 'alexander@roota.ai',
  phone: '+234 (0) 8123456789',
  location: 'Lagos, Nigeria',
  bio: 'AI Specialist | Freelancer',
};

const tabs: Array<{ id: TabId; label: string; icon: string }> = [
  { id: 'profile', label: 'Profile', icon: 'P' },
  { id: 'account', label: 'Account', icon: 'A' },
  { id: 'billing', label: 'Billing', icon: 'B' },
  { id: 'connected', label: 'Connected', icon: 'C' },
];

export default function SettingsPage() {
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
    { key: 'emailPreferences', label: 'Email Preferences', description: 'Receive product and activity emails', icon: Bell, enabled: true },
    { key: 'twoFactor', label: 'Two-Factor Authentication', description: 'Extra login protection', icon: Lock, enabled: false },
    { key: 'profileVisibility', label: 'Profile Visibility', description: 'Show profile to employers', icon: Eye, enabled: true },
  ]);

  const [billingSettings, setBillingSettings] = useState([
    { key: 'paymentMethods', label: 'Payment Methods', description: 'Manage saved cards', status: '2 cards added' },
    { key: 'subscription', label: 'Subscription Plan', description: 'Current: Premium Annual', status: '$99/year' },
    { key: 'invoices', label: 'Invoices', description: 'Download receipts and invoices', status: '5 invoices available' },
  ]);

  const [connectedAccounts, setConnectedAccounts] = useState([
    { key: 'github', label: 'GitHub', description: 'Connect your GitHub account', connected: true },
    { key: 'linkedin', label: 'LinkedIn', description: 'Link your LinkedIn profile', connected: false },
    { key: 'google', label: 'Google', description: 'Sync with Google account', connected: true },
    { key: 'stripe', label: 'Stripe', description: 'Connect Stripe wallet', connected: false },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/settings/profile/`);
        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/settings/profile/update/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSavedMessage(true);
        setStatusMessage('Profile updated successfully.');
        setTimeout(() => {
          setSavedMessage(false);
          setStatusMessage(null);
        }, 1800);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      setStatusMessage('Unable to save profile right now.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAccountSetting = async (key: string) => {
    const updated = accountSettings.map((setting) =>
      setting.key === key ? { ...setting, enabled: !setting.enabled } : setting
    );
    setAccountSettings(updated);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/api/settings/preferences/update/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences: updated }),
      });
      setStatusMessage('Account preferences updated.');
    } catch (error) {
      console.error('Failed to update preference:', error);
      setStatusMessage('Preference update failed.');
    }
  };

  const handleBillingAction = (key: string) => {
    if (key === 'paymentMethods') {
      setBillingSettings((prev) =>
        prev.map((item) =>
          item.key === 'paymentMethods' ? { ...item, status: `${Math.min(9, parseInt(item.status[0], 10) + 1)} cards added` } : item
        )
      );
      setStatusMessage('New payment method added.');
      return;
    }

    if (key === 'subscription') {
      setBillingSettings((prev) =>
        prev.map((item) => (item.key === 'subscription' ? { ...item, status: 'Switched to Pro Monthly' } : item))
      );
      setStatusMessage('Subscription updated.');
      return;
    }

    const csvData = 'invoice_id,amount,status\nINV-001,99,paid\nINV-002,99,paid\n';
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roota-invoices.csv';
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Invoice export downloaded.');
  };

  const handleToggleConnectedAccount = async (key: string) => {
    const updated = connectedAccounts.map((account) =>
      account.key === key ? { ...account, connected: !account.connected } : account
    );
    setConnectedAccounts(updated);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/api/settings/connections/update/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connections: updated }),
      });
      setStatusMessage('Connected accounts updated.');
    } catch (error) {
      console.error('Failed to update connected account:', error);
      setStatusMessage('Failed to update connected account.');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      await fetch(`${apiUrl}/api/settings/account/delete/`, { method: 'DELETE' });
      setConfirmDeleteOpen(false);
      setStatusMessage('Delete request submitted. Contact support to complete this action.');
    } catch (error) {
      console.error('Delete account failed:', error);
      setStatusMessage('Unable to delete account right now.');
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div className="rounded-xl border border-border bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">{statusMessage}</div>
      )}

      <div className="flex gap-2 overflow-x-auto border-b border-border">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ y: -1 }}
            className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? 'border-primary text-primary-dark' : 'border-transparent text-muted hover:text-slate-900'
            }`}
          >
            <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <Section title="Profile Information" description="Update your personal details">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-2xl font-bold text-white">
                {formData.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <p className="font-semibold text-slate-900">Profile Picture</p>
                <p className="mt-1 text-sm text-muted">PNG or JPG, max 5MB</p>
                <motion.button
                  whileHover={{ y: -1 }}
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 rounded-lg border border-border bg-slate-50 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
                >
                  Upload Photo
                </motion.button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  className="hidden"
                  onChange={(e) => setUploadedPhotoName(e.target.files?.[0]?.name ?? null)}
                />
                {uploadedPhotoName && <p className="mt-1 text-xs text-primary-dark">Selected: {uploadedPhotoName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-900">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-900">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-900">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-900">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
                  placeholder="Tell us about yourself"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              onClick={handleSave}
              disabled={saving || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-dark py-3 font-semibold text-white transition-all duration-200 hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : savedMessage ? <Check size={18} /> : <Save size={18} />}
              {saving ? 'Saving...' : savedMessage ? 'Saved!' : 'Save Changes'}
            </motion.button>
          </motion.div>
        </Section>
      )}

      {activeTab === 'account' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {accountSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div key={setting.key} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary-dark/30">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    <Icon size={18} className="text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{setting.label}</p>
                    <p className="mt-0.5 text-sm text-muted">{setting.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleToggleAccountSetting(setting.key)}
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${setting.enabled ? 'bg-primary-dark' : 'bg-slate-300'}`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                      setting.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </motion.div>
      )}

      {activeTab === 'billing' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {billingSettings.map((setting) => (
            <div key={setting.key} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary-dark/30">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-primary-dark">
                  <CreditCard size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{setting.label}</p>
                  <p className="mt-0.5 text-sm text-muted">{setting.description}</p>
                  <p className="mt-2 text-xs font-medium text-primary-dark">{setting.status}</p>
                </div>
              </div>
              <button
                onClick={() => handleBillingAction(setting.key)}
                className="rounded-lg border border-border bg-slate-50 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100"
              >
                {setting.key === 'invoices' ? 'Download' : 'Update'}
              </button>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'connected' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {connectedAccounts.map((account) => (
            <div key={account.key} className="flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary-dark/30">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-primary-dark">
                  <LinkIcon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{account.label}</p>
                  <p className="mt-0.5 text-sm text-muted">{account.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${account.connected ? 'bg-[#DDF6E9] text-primary' : 'bg-slate-100 text-slate-600'}`}>
                  {account.connected ? 'Connected' : 'Not Connected'}
                </span>
                <button
                  onClick={() => handleToggleConnectedAccount(account.key)}
                  className="rounded-lg border border-border bg-slate-50 p-2 transition-colors hover:bg-slate-100"
                >
                  {account.connected ? <Trash2 size={16} className="text-error" /> : <LinkIcon size={16} className="text-primary-dark" />}
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-12 border-t border-error/20 pt-8">
        <Section title="Danger Zone" description="Irreversible actions">
          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => setConfirmDeleteOpen(true)}
            className="w-full rounded-xl border border-red-300 bg-red-50 p-4 font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
          >
            Delete Account
          </motion.button>
        </Section>
      </motion.div>

      {confirmDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-slate-900">Delete account?</h3>
            <p className="mt-2 text-sm text-muted">This action is irreversible. Your profile and transaction history may be removed permanently.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={handleDeleteAccount} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
                Confirm Delete
              </button>
              <button onClick={() => setConfirmDeleteOpen(false)} className="flex-1 rounded-xl border border-border bg-white py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
