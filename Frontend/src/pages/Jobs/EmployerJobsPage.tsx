import React, { useState, useEffect } from 'react';
import Section from '../../components/layout/Section';
import JobCard from '../../components/cards/JobCard';
import { apiGet } from '../../utils/api';

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await apiGet('/api/employer/jobs/');
        setJobs(Array.isArray(data.results) ? data.results : data);
      } catch (err) {
        console.warn('Failed to fetch employer jobs, using fallback:', err);
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
