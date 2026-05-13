import React from 'react';
import { motion } from 'framer-motion';
import { WorkspaceShell } from '../../layouts/WorkspaceShell';
import { MetricCard } from '../../components/common/MetricCard';
import { MiniBarChart } from '../../components/common/MiniBarChart';
import { TrustRing } from '../../components/common/TrustRing';
import { ShieldAlert, TrendingUp } from 'lucide-react';

export default function InsightsPage() {
  const panelVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <WorkspaceShell activeTab="insights" mode="insights" title="" subtitle="">
      <div className="insights-grid">
        <motion.section className="metric-strip" variants={panelVariants} initial="hidden" animate="visible">
          <MetricCard title="Market Value" value="$125/hr" meta="+12.4% vs LY" tone="compact" />
          <section className="panel growth-card">
            <div className="growth-card__header">
              <h3>Hiring Velocity</h3>
              <span className="real-time-chip">Real-time</span>
            </div>
            <MiniBarChart bars={[34, 46, 38, 56, 52, 72, 86]} labels={['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV']} activeIndex={6} compact />
          </section>
          <section className="panel placement-card">
            <TrustRing value="88%" label="Placement Rate" compact pill="Goal: 90%" />
          </section>
        </motion.section>

        <motion.section className="panel insights-panel-stack panel--wide" variants={panelVariants} initial="hidden" animate="visible">
          <div className="insight-card-stack__header">
            <span className="panel-icon">◌</span>
            <h3>AI Growth Insights</h3>
          </div>
          
          <div className="insight-block">
            <div className="insight-block__icon">
              <TrendingUp size={20} />
            </div>
            <div>
              <strong>Growth Forecast</strong>
              <p>Active users in West Africa are projected to increase by 18.5% next quarter based on current hiring velocity.</p>
            </div>
          </div>

          <div className="insight-block insight-block--alert">
            <div className="insight-block__icon">
              <ShieldAlert size={20} />
            </div>
            <div>
              <strong>Risk Alert</strong>
              <p>Flagged profiles have increased in the Creative sector. Verification wait times have risen to 4.2 hours.</p>
            </div>
          </div>

          <div className="insight-block insight-block--dark">
            <strong>Professional Recommendation</strong>
            <p>Developing proficiency in RLHF and Model Benchmarking will increase your match rate by an estimated 24%.</p>
          </div>
        </motion.section>
      </div>
    </WorkspaceShell>
  );
}
