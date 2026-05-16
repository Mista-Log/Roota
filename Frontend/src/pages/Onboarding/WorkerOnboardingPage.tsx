import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Camera, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Phone, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { apiFetch, apiGet } from '../../utils/api';

type WorkerForm = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
};

const stepMotion = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
};

export default function WorkerOnboardingPage() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string>('');
  const [form, setForm] = useState<WorkerForm>({
    fullName: user?.full_name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
  });

  const imagePreview = useMemo(() => {
    if (imageFile) return URL.createObjectURL(imageFile);
    return existingImage;
  }, [existingImage, imageFile]);

  useEffect(() => {
    const loadCurrentProfile = async () => {
      try {
        const [workerData, meData] = await Promise.all([
          apiGet('/api/auth/workers/me/'),
          apiGet('/api/auth/me/'),
        ]);

        setForm((prev) => ({
          ...prev,
          fullName: workerData?.name || meData?.full_name || prev.fullName,
          email: meData?.email || prev.email,
          phone: meData?.phone || prev.phone,
          location: workerData?.location || prev.location,
          bio: workerData?.bio || prev.bio,
        }));

        setExistingImage(workerData?.image || meData?.profile_picture || '');
      } catch {
        // Keep empty/default onboarding state.
      }
    };

    loadCurrentProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (imageFile) URL.revokeObjectURL(imagePreview);
    };
  }, [imageFile, imagePreview]);

  const nextStep = () => setStep((value) => Math.min(4, value + 1));
  const prevStep = () => setStep((value) => Math.max(1, value - 1));

  const submit = async () => {
    setSaving(true);
    try {
      const payload = new FormData();
      payload.append('full_name', form.fullName.trim());
      payload.append('phone', form.phone.trim());
      payload.append('location', form.location.trim());
      payload.append('bio', form.bio.trim());

      if (imageFile) {
        payload.append('profile_picture', imageFile);
      }

      const response = await apiFetch('/api/auth/workers/me/update/', {
        method: 'PATCH',
        body: payload,
      });

      if (!response.ok) {
        const raw = await response.text();
        throw new Error(raw || 'Failed to complete onboarding');
      }

      await refreshUser();

      toast.success('Onboarding complete. Welcome to your dashboard.');
      navigate('/worker/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save onboarding data');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(160deg,#f7f9fb_0%,#eef6f2_45%,#f7f9fb_100%)] px-4 py-6 sm:px-6 md:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1.15fr]">
        <aside className="hidden overflow-hidden rounded-3xl border border-[#dce8e2] bg-[#053f33] text-white lg:block">
          <div className="relative h-full min-h-[620px] p-8">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop"
              alt="Worker onboarding"
              className="absolute inset-0 h-full w-full object-cover opacity-30"
            />
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[#f4c56f]">Worker Onboarding</p>
                <h1 className="mt-4 text-4xl font-black leading-tight">Set up your profile to unlock better job matches.</h1>
                <p className="mt-4 max-w-md text-base text-white/80">
                  Complete your details in a few quick steps. Your trust signals and profile quality directly improve visibility.
                </p>
              </div>
              <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-sm text-white/80">Progress</p>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-[#f4c56f]" style={{ width: `${(step / 4) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>
        </aside>

        <section className="rounded-3xl border border-[#dce8e2] bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#5d6c65]">Step {step} of 4</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Worker onboarding</h2>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((value) => (
                <span
                  key={value}
                  className={`h-2.5 w-8 rounded-full ${value <= step ? 'bg-[#0b5d4b]' : 'bg-slate-200'}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="worker-step-1" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Basic information</h3>
                <p className="text-sm text-slate-600">Tell us who you are so employers can identify you quickly.</p>
                <label className="block text-sm font-medium text-slate-700">Full name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.fullName}
                    onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0b5d4b]"
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
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0b5d4b]"
                    placeholder="+234..."
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="worker-step-2" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Location and bio</h3>
                <p className="text-sm text-slate-600">Help employers understand your context and expertise.</p>
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3 top-3.5 text-slate-400" />
                  <input
                    value={form.location}
                    onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                    className="w-full rounded-xl border border-slate-200 px-10 py-3 outline-none focus:border-[#0b5d4b]"
                    placeholder="Lagos, Nigeria"
                  />
                </div>
                <label className="block text-sm font-medium text-slate-700">Professional bio</label>
                <textarea
                  value={form.bio}
                  onChange={(e) => setForm((prev) => ({ ...prev, bio: e.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#0b5d4b]"
                  placeholder="Briefly describe your specialization and work style"
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="worker-step-3" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Profile image</h3>
                <p className="text-sm text-slate-600">Upload a clear profile photo. This syncs to your account.</p>
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-28 w-28 rounded-full object-cover" />
                  ) : (
                    <div className="grid h-28 w-28 place-items-center rounded-full bg-slate-200 text-slate-500">
                      <Camera size={28} />
                    </div>
                  )}
                  <label className="cursor-pointer rounded-xl bg-[#0b5d4b] px-4 py-2 text-sm font-semibold text-white hover:bg-[#094b3d]">
                    Choose image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  <p className="text-xs text-slate-500">JPG/PNG up to 5MB</p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="worker-step-4" {...stepMotion} transition={{ duration: 0.28 }} className="space-y-5">
                <h3 className="text-lg font-semibold text-slate-900">Review and finish</h3>
                <p className="text-sm text-slate-600">Confirm your details before finishing onboarding.</p>
                <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Name</span><span className="font-medium text-slate-900">{form.fullName || '-'}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Email</span><span className="font-medium text-slate-900">{form.email || '-'}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Phone</span><span className="font-medium text-slate-900">{form.phone || '-'}</span></div>
                  <div className="flex items-center justify-between text-sm"><span className="text-slate-500">Location</span><span className="font-medium text-slate-900">{form.location || '-'}</span></div>
                  <div className="text-sm"><p className="mb-1 text-slate-500">Bio</p><p className="text-slate-900">{form.bio || '-'}</p></div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#0b5d4b]">
                  <CheckCircle2 size={16} /> Your details will be saved to your worker profile.
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
                className="inline-flex items-center gap-2 rounded-xl bg-[#0b5d4b] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#094b3d]"
              >
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={submit}
                disabled={saving}
                className="rounded-xl bg-[#0b5d4b] px-5 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
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
