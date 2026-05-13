import React from 'react';
import Section from '../../components/layout/Section';
import JobCard from '../../components/cards/JobCard';

export default function JobsPage() {
  const jobs = [
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
