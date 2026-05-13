import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, Loader2, CheckCircle } from 'lucide-react';

interface JobCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (jobData: any) => void;
}

export default function JobCreationModal({ isOpen, onClose, onSubmit }: JobCreationModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary_min: '',
    salary_max: '',
    location: '',
    employment_type: 'Full-time Contract',
    skills: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        skills: formData.skills.split(',').map((s) => s.trim()),
      });
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          salary_min: '',
          salary_max: '',
          location: '',
          employment_type: 'Full-time Contract',
          skills: '',
        });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting job:', error);
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
          <h2 className="text-2xl font-bold text-slate-900">Create New Job</h2>
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">Job Posted!</h3>
            <p className="text-slate-600">Your job is now live and workers can start applying.</p>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Senior Frontend Developer"
                className="input w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and ideal candidate..."
                rows={5}
                className="input w-full resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Min Salary ($)</label>
                <input
                  type="number"
                  name="salary_min"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="e.g., 5000"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Max Salary ($)</label>
                <input
                  type="number"
                  name="salary_max"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="e.g., 12000"
                  className="input w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Lagos, Nigeria"
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Employment Type</label>
                <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="input w-full">
                  <option>Full-time Contract</option>
                  <option>Part-time Contract</option>
                  <option>Project-based</option>
                  <option>Freelance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Required Skills (comma-separated) *</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g., React, TypeScript, Node.js, AWS"
                className="input w-full"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={handleSubmit}
                disabled={
                  submitting || !formData.title || !formData.description || !formData.location || !formData.skills
                }
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-dark text-white rounded-xl font-semibold hover:bg-primary-dark/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Post Job
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
