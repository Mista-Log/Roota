import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

interface JobApplicationModalProps {
  isOpen: boolean;
  jobTitle?: string;
  onClose: () => void;
  onSubmit: (applicationData: any) => Promise<void>;
}

export default function JobApplicationModal({ isOpen, jobTitle = 'this job', onClose, onSubmit }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    coverLetter: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          portfolio: '',
          coverLetter: '',
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-2xl rounded-2xl bg-card p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Apply for {jobTitle}</h2>
          <motion.button
            whileHover={{ rotate: 90 }}
            onClick={onClose}
            disabled={submitting}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
          >
            <X size={20} className="text-slate-600" />
          </motion.button>
        </div>

        {submitted ? (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-12">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }} className="inline-block mb-4">
              <CheckCircle size={64} className="text-success" />
            </motion.div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Application Submitted!</h3>
            <p className="text-slate-600">Your application has been sent. The employer will review and get back to you soon.</p>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+234 (0) 8123456789"
                  className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Portfolio Link</label>
              <input
                type="url"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                placeholder="https://yourportfolio.com"
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Cover Letter *</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Tell us why you're a great fit for this role..."
                rows={5}
                className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={handleSubmit}
                disabled={
                  submitting || !formData.fullName || !formData.email || !formData.phone || !formData.coverLetter
                }
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-dark text-white rounded-xl font-semibold hover:bg-primary-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Application
                  </>
                )}
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                onClick={onClose}
                disabled={submitting}
                className="flex-1 py-3 border border-border rounded-xl font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </motion.button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
