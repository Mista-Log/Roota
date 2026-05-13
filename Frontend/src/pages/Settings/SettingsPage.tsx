import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Save, Loader2, Lock, Bell, CreditCard, Link as LinkIcon, Trash2, Check } from 'lucide-react';
import Section from '../../components/layout/Section';

const mockFormData = {
  fullName: 'Alexander Roota',
  email: 'alexander@roota.ai',
  phone: '+234 (0) 8123456789',
  location: 'Lagos, Nigeria',
  bio: 'AI Specialist | Freelancer',
};

export default function SettingsPage() {
  const [formData, setFormData] = useState(mockFormData);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'billing' | 'connected'>('profile');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/settings/profile/`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
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
        setTimeout(() => setSavedMessage(false), 2000);
      }
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const settingsGroups = [
    {
      title: 'Account Settings',
      items: [
        { label: 'Email Preferences', description: 'Manage notifications', icon: Bell, action: 'Configure' },
        { label: 'Two-Factor Authentication', description: 'Add extra security layer', icon: Lock, action: 'Enable' },
        { label: 'Privacy Settings', description: 'Control profile visibility', icon: '👁️', action: 'Edit' },
      ],
    },
    {
      title: 'Billing',
      items: [
        { label: 'Payment Methods', description: 'Add or update payment cards', status: '2 cards added', icon: CreditCard, action: 'Manage' },
        { label: 'Subscription Plan', description: 'Current: Premium Annual', status: '$99/year', icon: CreditCard, action: 'View' },
        { label: 'Invoices', description: 'Download receipts and invoices', status: '5 invoices', icon: CreditCard, action: 'Download' },
      ],
    },
    {
      title: 'Connected Accounts',
      items: [
        { label: 'GitHub', description: 'Connect your GitHub account', connected: true },
        { label: 'LinkedIn', description: 'Link your LinkedIn profile', connected: false },
        { label: 'Google', description: 'Sync with Google account', connected: true },
        { label: 'Stripe', description: 'Connect Stripe wallet', connected: false },
      ],
    },
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'account', label: 'Account', icon: '🔐' },
    { id: 'billing', label: 'Billing', icon: '💳' },
    { id: 'connected', label: 'Connected', icon: '🔗' },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            whileHover={{ y: -1 }}
            className={`px-4 py-3 font-medium text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary-dark'
                : 'border-transparent text-muted hover:text-slate-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* PROFILE TAB */}
      {activeTab === 'profile' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <Section title="Profile Information" description="Update your personal details">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border border-border p-8 shadow-sm space-y-6"
            >
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl font-bold">
                  {formData.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Profile Picture</p>
                  <p className="text-sm text-muted mt-1">PNG or JPG, max 5MB</p>
                  <motion.button
                    whileHover={{ y: -1 }}
                    className="mt-3 px-4 py-2 rounded-lg border border-border bg-slate-50 text-sm font-medium hover:bg-slate-100 transition-colors"
                  >
                    Upload Photo
                  </motion.button>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                {/* Form Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="input w-full"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="input w-full resize-none"
                      placeholder="Tell us about yourself"
                    />
                  </div>

                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 w-full py-3 bg-primary-dark text-white rounded-xl font-semibold transition-all duration-200 hover:bg-primary-dark/90 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : savedMessage ? (
                      <>
                        <Check size={18} />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </Section>
        </motion.div>
      )}

      {/* ACCOUNT TAB */}
      {activeTab === 'account' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {settingsGroups[0].items.map((setting, idx) => {
            const Icon = setting.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 flex items-center justify-between hover:border-primary-dark/30 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                    {typeof Icon === 'string' ? <span>{Icon}</span> : <Icon size={20} className="text-primary-dark" />}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{setting.label}</p>
                    <p className="text-sm text-muted mt-0.5">{setting.description}</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ x: 2 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-slate-50 text-sm font-medium hover:bg-slate-100 transition-colors flex-shrink-0"
                >
                  {setting.action}
                  <ChevronRight size={16} />
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* BILLING TAB */}
      {activeTab === 'billing' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {settingsGroups[1].items.map((setting, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl border border-border bg-card p-5 flex items-center justify-between hover:border-primary-dark/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg">
                  💳
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{setting.label}</p>
                  <p className="text-sm text-muted mt-0.5">{setting.description}</p>
                  <p className="text-xs font-medium text-primary-dark mt-2">{setting.status}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ x: 2 }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-slate-50 text-sm font-medium hover:bg-slate-100 transition-colors flex-shrink-0"
              >
                {setting.action}
                <ChevronRight size={16} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* CONNECTED ACCOUNTS TAB */}
      {activeTab === 'connected' && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {settingsGroups[2].items.map((account, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl border border-border bg-card p-5 flex items-center justify-between hover:border-primary-dark/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg">
                  🔗
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{account.label}</p>
                  <p className="text-sm text-muted mt-0.5">{account.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    account.connected ? 'bg-[#DDF6E9] text-primary' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {account.connected ? '✓ Connected' : 'Not Connected'}
                </span>
                <motion.button
                  whileHover={{ x: 2 }}
                  className="p-2 rounded-lg border border-border bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  {account.connected ? <Trash2 size={16} className="text-error" /> : <LinkIcon size={16} className="text-primary-dark" />}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Danger Zone */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="mt-12 pt-8 border-t border-error/20">
        <Section title="Danger Zone" description="Irreversible actions">
          <motion.button
            whileHover={{ x: 4 }}
            className="w-full p-4 rounded-xl border border-red-300 bg-red-50 text-red-600 font-semibold transition-all duration-200 hover:bg-red-100"
          >
            🗑️ Delete Account
          </motion.button>
        </Section>
      </motion.div>
    </div>
  );
}
