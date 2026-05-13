'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, DollarSign, Briefcase, Users, CheckCircle, Send, Loader2, X } from 'lucide-react';
import Section from '../../components/layout/Section';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  description: string;
  skills: string[];
  employment_type: string;
  company_description?: string;
  responsibilities?: string[];
  requirements?: string[];
}

const mockJobDetails: { [key: string]: Job } = {
  '1': {
    id: '1',
    title: 'Senior FinTech Lead',
    company: 'Acme Corp',
    location: 'San Francisco, CA',
    salary: '$12,500 - $18,000',
    matchScore: 98,
    employment_type: 'Full-time Contract',
    description: 'We are looking for an experienced FinTech Lead to drive our financial technology initiatives.',
    company_description: 'Acme Corp is a leading financial technology company transforming how businesses handle payments and financial operations.',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'PostgreSQL'],
    responsibilities: [
      'Lead the development of our core fintech platform',
      'Architect scalable solutions for payment processing',
      'Mentor junior developers and conduct code reviews',
      'Collaborate with product and design teams',
      'Optimize system performance and security',
    ],
    requirements: [
      '5+ years of software development experience',
      'Strong expertise in React and Node.js',
      'Experience with payment systems or fintech',
      'AWS or cloud platform knowledge',
      'Strong communication skills',
    ],
  },
  '2': {
    id: '2',
    title: 'Product Strategist',
    company: 'Tech Startup',
    location: 'Remote',
    salary: '$8,000 - $12,000',
    matchScore: 85,
    employment_type: 'Full-time Contract',
    description: 'Join our team as a Product Strategist to shape the future of our innovative platform.',
    company_description: 'Tech Startup is a fast-growing company focused on building products for emerging markets.',
    skills: ['Product', 'Analytics', 'Strategy', 'Communication'],
    responsibilities: [
      'Define product vision and strategy',
      'Conduct market research and competitive analysis',
      'Work closely with engineering and design teams',
      'Track product metrics and analytics',
      'Present findings to stakeholders',
    ],
    requirements: [
      '3+ years in product management or strategy',
      'Strong analytical skills',
      'Experience with data analytics tools',
      'Portfolio of successful product launches',
      'Remote work experience',
    ],
  },
};

export default function JobDetailsPage() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: '',
    email: '',
    phone: '',
    portfolio: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      // Try to fetch from API first
      fetch(`${apiUrl}/api/jobs/${jobId}/`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          // Fall back to mock data
          return mockJobDetails[jobId || '1'];
        })
        .then((data) => {
          setJob(data);
        })
        .catch(() => {
          // Use mock data as fallback
          setJob(mockJobDetails[jobId || '1']);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Error fetching job details:', error);
      setJob(mockJobDetails[jobId || '1']);
      setLoading(false);
    }
  }, [jobId]);

  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplicationSubmit = async () => {
    setSubmitting(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/jobs/${jobId}/apply/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...applicationData, resumeFileName: resumeFile?.name ?? null }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowApplicationForm(false);
          setSubmitted(false);
          setApplicationData({ fullName: '', email: '', phone: '', portfolio: '', coverLetter: '' });
          setResumeFile(null);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 size={32} className="animate-spin text-primary-dark" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="space-y-6">
        <button onClick={() => navigate('/jobs')} className="flex items-center gap-2 text-primary-dark hover:text-primary font-medium">
          <ArrowLeft size={18} />
          Back to Jobs
        </button>
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-slate-600">Job not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <motion.button
        whileHover={{ x: -4 }}
        onClick={() => navigate('/jobs')}
        className="flex items-center gap-2 text-primary-dark hover:text-primary font-medium transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Jobs
      </motion.button>

      {/* Job Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="mb-2 inline-block px-3 py-1 rounded-full bg-[#E7F2FE] text-xs font-semibold text-primary-dark">
              {job.matchScore}% Match
            </div>
            <h1 className="mt-3 text-4xl font-bold text-slate-900">{job.title}</h1>

            <div className="mt-4 flex flex-wrap gap-4 text-slate-600">
              <div className="flex items-center gap-2">
                <Briefcase size={18} className="text-primary-dark" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-primary-dark" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={18} className="text-primary-dark" />
                <span>{job.salary}/month</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} className="text-primary-dark" />
                <span>{job.employment_type}</span>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2 }}
              onClick={() => setShowApplicationForm(true)}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-primary-dark text-white rounded-xl font-semibold hover:bg-primary-dark/90 transition-colors"
            >
              <Send size={18} />
              Apply Now
            </motion.button>
          </div>

          <div className="text-right">
            <p className="text-5xl font-bold text-accent">{job.matchScore}%</p>
            <p className="text-sm text-muted mt-1">Match Score</p>
          </div>
        </div>
      </motion.div>

      {/* Job Description */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
        <Section title="About This Role" description="Job overview and details">
          <div className="rounded-2xl border border-border bg-card p-8 space-y-6">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Description</h3>
              <p className="text-slate-600 leading-relaxed">{job.description}</p>
            </div>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Key Responsibilities</h3>
                <ul className="space-y-2">
                  {job.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600">
                      <CheckCircle size={18} className="text-primary-dark flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job.requirements.map((req, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-600">
                      <CheckCircle size={18} className="text-primary-dark flex-shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Required Skills" description="Technical and soft skills needed">
          <div className="flex flex-wrap gap-3">
            {job.skills.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 rounded-full bg-primary-dark/10 text-primary-dark font-medium border border-primary-dark/20"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Section>

        {/* Company Info */}
        {job.company_description && (
          <Section title="About the Company" description={job.company}>
            <div className="rounded-2xl border border-border bg-card p-8">
              <p className="text-slate-600 leading-relaxed">{job.company_description}</p>
            </div>
          </Section>
        )}
      </motion.div>

      {/* Application Form Modal */}
      {showApplicationForm && (
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
              <h2 className="text-2xl font-bold text-slate-900">Apply to {job.title}</h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setShowApplicationForm(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-slate-600" />
              </motion.button>
            </div>

            {submitted ? (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-center py-12">
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }} className="inline-block mb-4">
                  <CheckCircle size={64} className="text-success" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Application Sent!</h3>
                <p className="text-slate-600">The employer will review your application shortly.</p>
              </motion.div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={applicationData.fullName}
                    onChange={handleApplicationChange}
                    placeholder="Your full name"
                    className="input w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={applicationData.email}
                      onChange={handleApplicationChange}
                      placeholder="your@email.com"
                      className="input w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={applicationData.phone}
                      onChange={handleApplicationChange}
                      placeholder="+234..."
                      className="input w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Portfolio / Website (Optional)</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={applicationData.portfolio}
                    onChange={handleApplicationChange}
                    placeholder="https://yourportfolio.com"
                    className="input w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    value={applicationData.coverLetter}
                    onChange={handleApplicationChange}
                    placeholder="Tell us why you're interested in this role..."
                    rows={6}
                    className="w-full resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-primary-dark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Upload CV / Resume</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
                    className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                  />
                  <p className="mt-1 text-xs text-muted">Accepted formats: PDF, DOC, DOCX</p>
                  {resumeFile && <p className="mt-1 text-xs font-medium text-primary-dark">Selected: {resumeFile.name}</p>}
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ y: -2 }}
                    onClick={handleApplicationSubmit}
                    disabled={submitting || !applicationData.fullName || !applicationData.email}
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
                    onClick={() => setShowApplicationForm(false)}
                    className="flex-1 py-3 border border-border rounded-xl font-semibold hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
