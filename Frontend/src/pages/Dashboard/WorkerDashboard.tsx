import React from 'react';
import { motion, easeOut } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      id: '1',
      title: 'Senior RLHF Fine-Tuning Specialist',
      company: 'Anthropic',
      location: 'Via Roota Direct',
      matchScore: 98,
      skills: ['Python', 'RLHF', 'ML'],
      salary: '$5,500 - $7,500',
    },
    {
      id: '2',
      title: 'Dataset Optimization Lead',
      company: 'Scale AI',
      location: 'Remote',
      matchScore: 94,
      skills: ['Data', 'Python', 'ML Ops'],
      salary: '$4,500 - $6,500',
    },
    {
      id: '3',
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
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.78fr)]">
        <ProfileHero
          name="Marcus Chen"
          title="Senior AI Data Strategist"
          location="Lagos, Nigeria"
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
          verified={true}
          skills={['PyTorch', 'Prompt Engineering', 'LLM Tuning', '+4 More']}
          verificationBadge="Verified Economic Identity"
        />

        <Section title="AI Trust Score" className="h-full">
          <TrustScoreCard score={845} tier="Elite Tier (Top 2%)" subtitle="Your trust score" />
        </Section>
      </div>

      {/* Stats Strip */}
      <Section title="Performance Metrics" description="Your current earnings and activity">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
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

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <Section
          title="Recommended Jobs"
          description="See All"
          action={
            <button
                onClick={() => navigate('/worker/jobs')}
              className="text-sm font-medium text-accent transition-colors hover:text-accent/90"
            >
              See All →
            </button>
          }
          className="h-full"
        >
          <div className="space-y-4">
            {recommendedJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </Section>

        <Section title="Earnings Velocity" className="h-full">
          <EarningsChart
            data={chartData}
            title="Recent Earnings"
            subtitle="Payroll history for the last 6 months"
            activeMonth="Thu"
            onViewAll={() => navigate('/worker/wallet')}
          />
        </Section>
      </div>

      {/* Skills and Insights */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Section title="Skill Verification" description="Keep your skills current">
          <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={skill.skill} className="space-y-2 rounded-[12px] border border-border/0 bg-transparent">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">{skill.skill}</div>
                      <div className="mt-0.5 text-[13px] text-muted">{skill.level}</div>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                        skill.status === 'completed'
                          ? 'bg-[#DDF7E8] text-[#0B5D4B]'
                          : skill.status === 'in-progress'
                            ? 'bg-[#E8F0FF] text-[#2F63D8]'
                            : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {skill.status === 'in-progress' ? 'In Progress' : 'Completed'}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, ease: easeOut }}
                      className={`h-full rounded-full ${skill.status === 'in-progress' ? 'bg-[#2F63D8]' : 'bg-[#0B5D4B]'}`}
                    />
                  </div>

                  <div className="text-[12px] text-muted">{skill.progress}% Complete</div>

                  <button className="w-full rounded-[10px] border border-border px-3 py-2 text-[13px] font-medium transition-colors duration-200 hover:bg-slate-50">
                    Verify Skill
                  </button>
                </div>
              ))}
            </div>

            <button
              className="mt-4 w-full rounded-[10px] border border-border px-3 py-2.5 text-[14px] font-medium text-slate-900 transition-colors duration-200 hover:bg-slate-50"
            >
              Verify New Skill
            </button>
          </div>
        </Section>

        <Section title="AI Opportunity Insights" description="Smart recommendations">
          <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div className="rounded-[14px] border border-[#F2DCA6] bg-[#FFF9E8] p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-white/70 text-[#C98600]">
                    <span className="text-[18px]">!</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">High Demand Alert</div>
                    <p className="mt-1 text-[13px] leading-6 text-slate-700">
                      Search NLP specialists are earning 15% more. Update your profile to increase your visibility.
                    </p>
                    <button className="mt-3 rounded-full bg-[#F9E79D] px-3 py-1.5 text-[12px] font-semibold text-[#A86A00]">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-[14px] border border-[#CDE0FF] bg-[#F4F8FF] p-4 shadow-sm">
                <div className="flex gap-3">
                  <div className="grid h-10 w-10 flex-none place-items-center rounded-[10px] bg-white/70 text-[#2F63D8]">
                    <span className="text-[18px]">?</span>
                  </div>
                  <div>
                    <div className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">Trust Score Tip</div>
                    <p className="mt-1 text-[13px] leading-6 text-slate-700">
                      Complete the 'Advanced Testing' skill to increase your trust score by 40 pts.
                    </p>
                    <button className="mt-3 rounded-full bg-[#DCE8FF] px-3 py-1.5 text-[12px] font-semibold text-[#2F63D8]">
                      Complete It
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
