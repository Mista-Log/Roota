import React from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section';
import StatCard from '../../components/cards/StatCard';
import TrustScoreCard from '../../components/cards/TrustScoreCard';
import ProfileHero from '../../components/cards/ProfileHero';
import JobCard from '../../components/cards/JobCard';
import SkillProgressCard from '../../components/cards/SkillProgressCard';
import InsightCard from '../../components/cards/InsightCard';
import EarningsChart from '../../components/charts/EarningsChart';
import { Briefcase, TrendingUp } from 'lucide-react';

export default function WorkerDashboardPage() {
  const chartData = [
    { month: 'Mon', amount: 2400 },
    { month: 'Tue', amount: 1398 },
    { month: 'Wed', amount: 3200 },
    { month: 'Thu', amount: 2780 },
    { month: 'Fri', amount: 1890 },
    { month: 'Sat', amount: 2390 },
  ];

  const recommendedJobs = [
    {
      title: 'Senior RLHF Fine-Tuning Specialist',
      company: 'Anthropic',
      location: 'Via Roota Direct',
      matchScore: 98,
      skills: ['Python', 'RLHF', 'ML'],
      salary: '$5,500 - $7,500',
    },
    {
      title: 'Dataset Optimization Lead',
      company: 'Scale AI',
      location: 'Remote',
      matchScore: 94,
      skills: ['Data', 'Python', 'ML Ops'],
      salary: '$4,500 - $6,500',
    },
    {
      title: 'AI Ethics Auditor - African Dialects',
      company: 'Meta Platforms',
      location: 'Hybrid',
      matchScore: 89,
      skills: ['Linguistics', 'AI', 'Data Labeling'],
      salary: '$3,500 - $5,000',
    },
  ];

  const skills = [
    { skill: 'Python Mastery', level: 'Lv 4', progress: 82, status: 'completed' as const },
    { skill: 'Model Benchmarking', level: 'Lv 5', progress: 91, status: 'completed' as const },
    { skill: 'Arabic Data Labeling', level: 'In Progress', progress: 54, status: 'in-progress' as const },
  ];

  return (
    <div className="space-y-8">
      {/* Profile Hero */}
      <ProfileHero
        name="Marcus Chen"
        title="Senior AI Data Strategist"
        location="Lagos, Nigeria"
        image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
        verified={true}
        skills={['PyTorch', 'Prompt Engineering', 'LLM Tuning', '+4 More']}
        verificationBadge="Verified Economic Identity"
      />

      {/* Stats Strip */}
      <Section title="Performance Metrics" description="Your current earnings and activity">
        <div className="grid grid-cols-3 gap-6">
          <StatCard
            label="Total Earnings"
            value="$12,450.00"
            change="↑ $1,200 this month"
            changeType="positive"
            icon={<TrendingUp size={24} />}
          />
          <StatCard
            label="Active Projects"
            value="04"
            change="2 due this week"
            icon={<Briefcase size={24} />}
          />
          <StatCard
            label="Avg. Hourly Rate"
            value="$85.00"
            change="Top 5% in region"
            changeType="positive"
            tone="gold"
          />
        </div>
      </Section>

      {/* Trust Score and Earnings */}
      <div className="grid grid-cols-4 gap-6">
        <div>
          <Section title="AI Trust Score">
            <TrustScoreCard
              score={845}
              tier="Elite Tier (Top 2%)"
              subtitle="Your trust score"
            />
          </Section>
        </div>
        <div className="col-span-3">
          <Section title="Earnings Velocity">
            <EarningsChart
              data={chartData}
              title="Weekly Earnings"
              subtitle="Your income over the past week"
              activeMonth="Thu"
            />
          </Section>
        </div>
      </div>

      {/* Recommended Jobs */}
      <Section
        title="Recommended Jobs"
        description="See All"
        action={
          <button className="text-accent hover:text-accent/90 font-medium text-sm transition-colors">
            See All →
          </button>
        }
      >
        <div className="space-y-4">
          {recommendedJobs.map((job, idx) => (
            <JobCard key={idx} {...job} onApply={() => console.log('Applied')} />
          ))}
        </div>
      </Section>

      {/* Skills and Insights */}
      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        <Section title="Skill Verification" description="Keep your skills current">
          <div className="space-y-3">
            {skills.map((skill, idx) => (
              <SkillProgressCard
                key={idx}
                {...skill}
                onVerify={() => console.log('Verify', skill.skill)}
              />
            ))}
          </div>
          <motion.button
            whileHover={{ y: -2 }}
            className="w-full mt-4 py-2.5 border border-border text-slate-900 rounded-lg font-medium transition-all duration-200 hover:bg-slate-50"
          >
            Verify New Skill
          </motion.button>
        </Section>

        {/* AI Insights */}
        <Section title="AI Opportunity Insights" description="Smart recommendations">
          <div className="space-y-3">
            <InsightCard
              title="High Demand Alert"
              description="Search NLP specialists are earning 15% more. Update your profile to increase your visibility."
              icon="alert"
              tone="warning"
              action={{ label: 'Update Profile', onClick: () => {} }}
            />
            <InsightCard
              title="Trust Score Tip"
              description="Cost-disable the 'Advanced Testing' skill to increase your trust score by 40 pts."
              icon="tip"
              tone="info"
              action={{ label: 'Complete It', onClick: () => {} }}
            />
          </div>
        </Section>
      </div>
    </div>
  );
}
