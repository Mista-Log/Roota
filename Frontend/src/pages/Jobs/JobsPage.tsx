import { useState, useEffect } from 'react';
import Section from '../../components/layout/Section';
import JobCard from '../../components/cards/JobCard';

const mockJobs = [
  {
    title: 'Senior FinTech Lead',
    company: 'Acme Corp',
    location: 'San Francisco, CA',
    matchScore: 98,
    skills: ['React', 'Node.js', 'Python'],
    salary: '$12,500 - $18,000',
  },
  {
    title: 'Product Strategist',
    company: 'Tech Startup',
    location: 'Remote',
    matchScore: 85,
    skills: ['Product', 'Analytics', 'Strategy'],
    salary: '$8,000 - $12,000',
  },
];

export default function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/jobs/recommended/`);
        if (response.ok) {
          const data = await response.json();
          setJobs(Array.isArray(data.results) ? data.results : data);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <Section
        title="Recommended Jobs"
        description="AI-suggested roles based on your profile"
      >
        <div className="space-y-4">
          {jobs.map((job, idx) => (
            <JobCard
              key={idx}
              {...job}
              onApply={() => console.log('Apply for', job.title)}
            />
          ))}
        </div>
      </Section>
    </div>
  );
}
