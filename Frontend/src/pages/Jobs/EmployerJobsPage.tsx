import React, { useState, useEffect } from 'react';
import Section from '../../components/layout/Section';
import JobCard from '../../components/cards/JobCard';

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const res = await fetch(`${apiUrl}/api/employer/jobs/`);
        if (res.ok) {
          const data = await res.json();
          setJobs(Array.isArray(data.results) ? data.results : data);
        }
      } catch (err) {
        console.error('Failed to fetch employer jobs', err);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="space-y-8">
      <Section title="Your Jobs" description="Jobs you've posted and their status">
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </Section>
    </div>
  );
}
