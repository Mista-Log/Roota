import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, ChevronLeft, ChevronRight, Globe, MapPin, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { apiFetch, apiGet } from '../../utils/api';

type EmployerForm = {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  industry: string;
  website: string;
  location: string;
  bio: string;
};

const stepMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export default function EmployerOnboardingPage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<EmployerForm>({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    companyName: '',
    industry: '',
    website: '',
    location: '',
    bio: '',
  });

  useEffect(() => {
    const loadCurrentProfile = async () => {
      try {
        const [employerData, meData] = await Promise.all([
          apiGet('/api/auth/employer/profile/'),
          apiGet('/api/auth/me/'),
        ]);

        const data = employerData?.data ?? employerData;

        setForm((prev) => ({
          ...prev,
          fullName: data?.full_name || meData?.full_name || prev.fullName,
          email: data?.email || meData?.email || prev.email,
          phone: data?.phone || meData?.phone || prev.phone,
          companyName: data?.company_name || prev.companyName,
          industry: data?.industry || prev.industry,
          website: data?.website || prev.website,
          location: data?.location || prev.location,
          bio: data?.bio || prev.bio,
        }));
      } catch {
        // Keep empty/default onboarding state.
      }
    };

    loadCurrentProfile();
  }, []);

  const nextStep = () => setStep((value) => Math.min(4, value + 1));
  const prevStep = () => setStep((value) => Math.max(1, value - 1));

  const submit = async () => {
    setSaving(true);
    try {
      const payload = {
        full_name: form.fullName.trim(),
        phone: form.phone.trim(),
        company_name: form.companyName.trim(),
        industry: form.industry.trim(),
        website: form.website.trim(),
        location: form.location.trim(),
        bio: form.bio.trim(),
      };

      const response = await apiFetch('/api/auth/employer/profile/update/', {
        method: 'PATCH',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const raw = await response.text();
        throw new Error(raw || 'Failed to complete onboarding');
      }

      await refreshUser();

      toast.success('Onboarding complete. Welcome to your dashboard.');
      navigate('/employer/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save onboarding data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#f7f9fb_0%,#eef3fb_45%,#f7f9fb_100%)] px-4 py-6 sm:px-6 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1.15fr]">
        <aside className="hidden overflow-hidden rounded-3xl border border-[#dce2ea] bg-[#0c3e67] text-white lg:block">
          <div className="relative h-full min-h-[620px] p-8">
            <img
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&auto=format&fit=crop"
              alt="Employer onboarding"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#f8d08a]">Employer Onboarding</p>
                <h1 className="mt-4 text-4xl font-black leading-tight">Create a complete hiring profile in minutes.</h1>
                <p className="mt-4 max-w-md text-base text-white/80">
                  Fill your company details to improve trust and attract high quality workers across the marketplace.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-white/80">Progress</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-[#f8d08a]" style={{ width: `${(step / 4) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="rounded-3xl border border-[#dce2ea] bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5d6772]">Step {step} of 4</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Employer onboarding</h2>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((value) => (
                <span
                  key={value}
                  className={`h-2.5 w-8 rounded-full ${value <= step ? 'bg-[#0c3e67]' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="employer-step-1" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Primary contact</h3>
                <p className="text-sm text-slate-600">Who manages hiring from your organization?</p>
                <label className="block text-sm font-medium text-slate-700">Contact full name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0c3e67]"
                  />
                </div>
                <label className="block text-sm font-medium text-slate-700">Email</label>
                <input value={form.email} disabled className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500" />
                <label className="block text-sm font-medium text-slate-700">Phone number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.phone}
                    onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0c3e67]"
                    placeholder="+234..."
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="employer-step-2" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Company details</h3>
                <p className="text-sm text-slate-600">Add your company identity for better trust and conversion.</p>
                <label className="block text-sm font-medium text-slate-700">Company name</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.companyName}
                    onChange={(e) => setForm((prev) => ({ ...prev, companyName: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0c3e67]"
                  />
                </div>
                <label className="block text-sm font-medium text-slate-700">Industry</label>
                <input
                  value={form.industry}
                  onChange={(e) => setForm((prev) => ({ ...prev, industry: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c3e67]"
                  placeholder="Fintech, Healthtech, AI..."
                />
                <label className="block text-sm font-medium text-slate-700">Website</label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.website}
                    onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0c3e67]"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="employer-step-3" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Company profile</h3>
                <p className="text-sm text-slate-600">Complete your location and employer bio.</p>
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0c3e67]"
                    placeholder="Lagos, Nigeria"
                  />
                </div>
                <label className="block text-sm font-medium text-slate-700">Company bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0c3e67]"
                  placeholder="Tell workers about your company and hiring culture"
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="employer-step-4" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-5">
                <h3 className="text-lg font-semibold text-slate-900">Review and finish</h3>
                <p className="text-sm text-slate-600">Confirm your employer profile details.</p>
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Contact</span><span className="font-medium text-slate-900">{form.fullName || '-'}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Email</span><span className="font-medium text-slate-900">{form.email || '-'}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Company</span><span className="font-medium text-slate-900">{form.companyName || '-'}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Industry</span><span className="font-medium text-slate-900">{form.industry || '-'}</span></div>
                  <div className="text-sm"><p className="mb-1 text-slate-500">Bio</p><p className="text-slate-900">{form.bio || '-'}</p></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0c3e67]">
                  <CheckCircle2 size={16} /> Your details will be saved to your employer profile.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1 || saving}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Back
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0c3e67] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0a3457]"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={saving}
                className="rounded-xl bg-[#0c3e67] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Finish onboarding'}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
