import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { apiGet, apiPost } from '../../utils/api';

export default function WorkerJobDetailsPage() {
  const { jobId } = useParams();
  const location = useLocation();
  const [job, setJob] = useState<any | null>((location.state as any)?.job || null);
  const [applying, setApplying] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      if ((location.state as any)?.job) {
        return;
      }

      try {
        const data = await apiGet(`/api/jobs/${jobId}/`);
        setJob(data);
      } catch (e) {
        console.warn('Failed to fetch job, using fallback:', e);
        setJob({
          id: jobId,
          title: 'Sample Job',
          company: 'Acme Corp',
          location: 'Remote',
          salary: '$8,000 - $12,000',
          description: 'This is a sample job description tailored for workers.',
        });
      }
    };
    fetchJob();
  }, [jobId, location.state]);

  const handleApply = async () => {
    if (!jobId) return;

    setApplying(true);
    setApplicationStatus(null);

    try {
      await apiPost(`/api/jobs/${jobId}/apply/`, { job_id: jobId });
      setApplicationStatus(`Applied to ${job?.title || 'this job'} successfully.`);
    } catch (error) {
      console.warn('Failed to apply for job:', error);
      setApplicationStatus(`Your application for ${job?.title || 'this job'} could not be submitted right now.`);
    } finally {
      setApplying(false);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
        <p className="text-sm text-muted">{job.company} • {job.location}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-[#DDF6E9] px-3 py-1 text-sm font-semibold text-primary">Apply</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{job.salary}</span>
        </div>
        <div className="mt-6 text-sm text-slate-700">{job.description}</div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">How to Apply</h2>
        <p className="text-sm text-muted mt-2">Click the Apply button to submit your profile and a cover note. Your trust score and recent work history will be included.</p>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleApply}
            disabled={applying}
            className="rounded-lg bg-primary-dark px-4 py-2 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-60"
          >
            {applying ? 'Applying...' : 'Apply to this job'}
          </button>
          {applicationStatus && <p className="mt-3 text-sm text-slate-700">{applicationStatus}</p>}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Job Details</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li><strong>Location:</strong> {job.location}</li>
          <li><strong>Salary:</strong> {job.salary}</li>
          <li><strong>Posted:</strong> {job.posted || '2 days ago'}</li>
          <li><strong>Match Score:</strong> <span className="inline-flex items-center gap-1"><Star size={14} /> 92%</span></li>
        </ul>
      </section>
    </div>
  );
}
