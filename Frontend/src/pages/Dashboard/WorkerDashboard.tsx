import React from 'react';
import { WorkspaceShell } from '../../layouts/WorkspaceShell';
import { MetricCard } from '../../components/common/MetricCard';
import { MiniBarChart } from '../../components/common/MiniBarChart';
import { TrustRing } from '../../components/common/TrustRing';
import { SkillRow } from '../../components/common/SkillRow';
import { RecommendationRow } from '../../components/dashboard/RecommendationRow';
import { Tag } from '../../components/common/Tag';

const workerJobs = [
  ['Senior RLHF Fine-Tuning Specialist', 'Anthropic (Via Roota Direct)', '98%'],
  ['Dataset Optimization Lead', 'Scale AI • Remote', '94%'],
  ['AI Ethics Auditor - African Dialects', 'Meta Platforms • Hybrid', '89%'],
] as const;

const workerSkills = [
  ['Python Mastery', 'Lvl 4', 82],
  ['Model Benchmarking', 'Lvl 5', 91],
  ['Arabic Data Labeling', 'In Progress', 54],
] as const;

export default function WorkerDashboardPage() {
  return (
    <WorkspaceShell activeTab="dashboard" mode="worker" title="Welcome back, James" subtitle="You have 3 new high-value matches today.">
      <div className="worker-grid">
        <section className="metric-strip">
          <MetricCard title="Total Earnings" value="$12,450.00" meta="+$1,200 this month" accent="positive" />
          <MetricCard title="Active Projects" value="04" meta="2 due this week" accent="neutral" />
          <MetricCard title="Avg. Hourly" value="$85.00" meta="Top 5% in region" accent="neutral" />
        </section>

        <section className="panel activity-panel">
          <div className="panel-header">
            <h3>Earnings Velocity</h3>
            <span className="menu-dot">⋮</span>
          </div>
          <MiniBarChart activeIndex={3} />
        </section>

        <section className="panel trust-panel">
          <TrustRing value="845" label="TRUST SCORE" pill="Top 1%" />
          <div className="trust-meta">
            <p>Your score increased by <strong>+12pts</strong> this week.</p>
            <button type="button" className="text-button">View Breakdown</button>
          </div>
        </section>

        <section className="panel recommendations-panel">
          <div className="panel-header">
            <h3>Top Recommendations</h3>
            <button type="button" className="text-button">View All</button>
          </div>
          <div className="recommendation-stack">
            {workerJobs.map(([title, company, score], idx) => (
              <RecommendationRow key={title} title={title} company={company} score={score} active={idx === 0} />
            ))}
          </div>
        </section>

        <section className="panel skills-panel">
          <div className="panel-header">
            <h3>Skill Proficiency</h3>
            <button type="button" className="text-button">Add Skill</button>
          </div>
          <div className="skill-stack">
            {workerSkills.map(([name, level, value]) => (
              <SkillRow key={name} name={name} level={level} value={value} />
            ))}
          </div>
        </section>

        <section className="panel optimizer-panel panel--wide">
          <div className="optimizer-ring-wrap">
            <TrustRing value="850" label="TRUST SCORE" compact />
          </div>
          <div className="optimizer-copy">
            <h3>AI Wealth Optimizer</h3>
            <p>
              Based on your consistent payroll history and low failure rate, your trust score has increased. You are now eligible
              for 0.5% lower transaction fees and early payout features.
            </p>
            <div className="chip-row">
              <Tag>Verified Earner</Tag>
              <Tag>High Stability</Tag>
            </div>
          </div>
          <button type="button" className="pill-button pill-button--solid pill-button--compact">
            Claim Reward
          </button>
        </section>
      </div>
    </WorkspaceShell>
  );
}
