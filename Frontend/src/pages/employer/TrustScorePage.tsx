import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section';
import TrustScoreCard from '../../components/cards/TrustScoreCard';
import SkillProgressCard from '../../components/cards/SkillProgressCard';
import StatCard from '../../components/cards/StatCard';
import AnimatedNumber from '../../components/common/AnimatedNumber';
import { apiGet } from '../../utils/api';

const mockTrustData = {
  score: 910,
  completedProjects: 16,
  successRate: '97.8%',
  averageRating: '4.8',
  verificationTasks: [
    { skill: 'Hiring Compliance', level: 'Lv 4', progress: 85, status: 'in-progress' },
    { skill: 'Payroll Reliability', level: 'Lv 5', progress: 100, status: 'completed' },
    { skill: 'Team Verification', level: 'In Progress', progress: 55, status: 'in-progress' },
    { skill: 'Vendor Review', level: 'Lv 3', progress: 25, status: 'in-progress' },
  ],
  evaluation: [
    { label: 'Payroll Accuracy', value: '98%', description: 'Based on payroll consistency' },
    { label: 'Dispute Resolution', value: '94%', description: 'Resolved on time' },
    { label: 'Hiring Quality', value: '96%', description: 'Based on worker success rates' },
    { label: 'Compliance', value: '99%', description: 'KYC and tax standards' },
  ],
};

export default function EmployerTrustScorePage() {
  const [trustData, setTrustData] = useState(mockTrustData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/employer/trust-score/metrics/');
        setTrustData(data);
      } catch (error) {
        console.warn('Error fetching employer trust score, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <Section title="Employer Trust Score" description="Your verified trust metrics as an employer">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <TrustScoreCard score={trustData.score} />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-6">
              <StatCard label="Completed Hires" value={<AnimatedNumber value={trustData.completedProjects} duration={1500} />} change="All verified" />
              <StatCard label="Success Rate" value={<AnimatedNumber value={trustData.successRate.replace('%', '')} duration={1500} />} change="Above average" />
              <StatCard label="Average Rating" value={<AnimatedNumber value={trustData.averageRating} duration={1500} decimals={1} />} change="Out of 5.0" tone="gold" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Verification Tasks" description="Complete these to increase your score">
        <div className="grid grid-cols-2 gap-6">
          {trustData.verificationTasks.map((task, idx) => (
            <SkillProgressCard key={idx} skill={task.skill} level={task.level} progress={task.progress} status={task.status as any} />
          ))}
        </div>
      </Section>

      <Section title="Trust Evaluation" description="How we calculate your score">
        <div className="grid grid-cols-2 gap-6">
          {trustData.evaluation.map((item, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-card rounded-lg border border-border p-6 shadow-sm">
              <p className="metric-label mb-2">{item.label}</p>
              <p className="metric-value">{item.value}</p>
              <p className="text-sm text-muted mt-2">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </div>
  );
}
