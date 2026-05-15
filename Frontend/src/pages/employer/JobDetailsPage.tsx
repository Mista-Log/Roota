import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGet } from '../../utils/api';

export default function EmployerJobDetailsPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState<any | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await apiGet(`/api/jobs/${jobId}/`);
        setJob(data);
      } catch (e) {
        console.warn('Failed to fetch job, using fallback:', e);
        setJob({ id: jobId, title: 'Candidate Profile', company: 'Acme Corp', location: 'Remote', salary: '$8,000 - $12,000', description: 'Employer view of job/candidate details.' });
      }
    };
    fetchJob();
  }, [jobId]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
        <p className="text-sm text-muted">{job.company} • {job.location}</p>
        <div className="mt-4 flex items-center gap-3">
          <button className="rounded-full bg-primary-dark px-3 py-1 text-sm font-semibold text-white">View Applicants</button>
          <button className="rounded-full bg-slate-100 px-3 py-1 text-sm">Edit Listing</button>
        </div>
        <div className="mt-6 text-sm text-slate-700">{job.description}</div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Applicants</h2>
        <p className="text-sm text-muted mt-2">See candidate submissions and shortlist directly from this page.</p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Listing Details</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li><strong>Location:</strong> {job.location}</li>
          <li><strong>Salary:</strong> {job.salary}</li>
          <li><strong>Posted:</strong> {job.posted || '2 days ago'}</li>
        </ul>
      </section>
    </div>
  );
}
