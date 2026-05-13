import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Save, Loader2 } from 'lucide-react';
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
        { label: 'Email Preferences', description: 'Manage notifications' },
        { label: 'Privacy Settings', description: 'Control who sees your profile' },
        { label: 'Two-Factor Authentication', description: 'Enhanced security' },
      ],
    },
    {
      title: 'Billing',
      items: [
        { label: 'Payment Methods', description: 'Add or update payment info' },
        { label: 'Subscription Plan', description: 'View your current plan' },
        { label: 'Invoices', description: 'Download receipts' },
      ],
    },
    {
      title: 'Connected Accounts',
      items: [
        { label: 'GitHub', description: 'Connected', connected: true },
        { label: 'LinkedIn', description: 'Not connected', connected: false },
        { label: 'Google', description: 'Connected', connected: true },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Profile settings */}
      <Section title="Profile Information" description="Update your personal details">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-card rounded-lg border border-border p-6 shadow-sm space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              className="input w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="input w-full"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="input w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-900 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={3}
              className="input w-full"
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 w-full py-3 bg-primary-dark text-white rounded-lg font-semibold transition-all duration-200 hover:bg-primary-dark/90 justify-center disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : savedMessage ? 'Saved!' : 'Save Changes'}
          </motion.button>
        </motion.div>
      </Section>

      {/* Settings groups */}
      {settingsGroups.map((group, groupIdx) => (
        <Section key={groupIdx} title={group.title}>
          <div className="space-y-2">
            {group.items.map((item, itemIdx) => (
              <motion.button
                key={itemIdx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: itemIdx * 0.05 }}
                className="w-full flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary-dark hover:shadow-md transition-all duration-200"
              >
                <div className="text-left">
                  <p className="font-medium text-slate-900">{item.label}</p>
                  <p className="text-sm text-muted mt-0.5">{item.description}</p>
                </div>
                {item.connected !== undefined && (
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      item.connected
                        ? 'bg-green-100 text-green-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.connected ? 'Connected' : 'Not Connected'}
                  </span>
                )}
                <ChevronRight size={18} className="text-muted flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </Section>
      ))}

      {/* Danger zone */}
      <Section title="Danger Zone">
        <motion.button
          whileHover={{ x: 4 }}
          className="w-full p-4 bg-red-50 rounded-lg border border-red-200 text-red-600 font-medium transition-all duration-200 hover:bg-red-100"
        >
          Delete Account
        </motion.button>
      </Section>
    </div>
  );
}
