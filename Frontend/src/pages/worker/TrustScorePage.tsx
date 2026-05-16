import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section';
import TrustScoreCard from '../../components/cards/TrustScoreCard';
import SkillProgressCard from '../../components/cards/SkillProgressCard';
import StatCard from '../../components/cards/StatCard';
import AnimatedNumber from '../../components/common/AnimatedNumber';
import { apiGet } from '../../utils/api';

const mockTrustData = {
  score: 850,
  completedProjects: 24,
  successRate: '99.2%',
  averageRating: '4.9',
  verificationTasks: [
    { skill: 'Python Mastery', level: 'Lv 4', progress: 80, status: 'in-progress' },
    { skill: 'Model Benchmarking', level: 'Lv 5', progress: 100, status: 'completed' },
    { skill: 'Arabic Data Labeling', level: 'In Progress', progress: 45, status: 'in-progress' },
    { skill: 'Node.js Expert', level: 'Lv 3', progress: 0, status: 'not-started' },
  ],
  evaluation: [
    { label: 'Work Quality', value: '95%', description: 'Based on project ratings' },
    { label: 'Reliability', value: '98%', description: 'On-time delivery rate' },
    { label: 'Responsiveness', value: '92%', description: 'Average response time' },
    { label: 'Professionalism', value: '90%', description: 'Communication & conduct' },
  ],
};

export default function WorkerTrustScorePage() {
  const [trustData, setTrustData] = useState(mockTrustData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/worker/trust-score/metrics/');
        setTrustData(data);
      } catch (error) {
        console.warn('Error fetching worker trust score, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <Section title="Worker Trust Score" description="Your verified trust metrics as a worker">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-6">
          <div className="lg:col-span-1">
            <TrustScoreCard score={trustData.score} />
          </div>
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6">
              <StatCard label="Completed Projects" value={<AnimatedNumber value={trustData.completedProjects} duration={1500} />} change="All verified" />
              <StatCard label="Success Rate" value={<AnimatedNumber value={trustData.successRate.replace('%', '')} duration={1500} />} change="Above average" />
              <StatCard label="Average Rating" value={<AnimatedNumber value={trustData.averageRating} duration={1500} decimals={1} />} change="Out of 5.0" tone="gold" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Verification Tasks" description="Complete these to increase your score">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          {trustData.verificationTasks.map((task, idx) => (
            <SkillProgressCard key={idx} skill={task.skill} level={task.level} progress={task.progress} status={task.status as any} />
          ))}
        </div>
      </Section>

      <Section title="Trust Evaluation" description="How we calculate your score">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
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
