import React from 'react';
import { motion } from 'framer-motion';
import Section from '../../components/layout/Section';
import TrustScoreCard from '../../components/cards/TrustScoreCard';
import SkillProgressCard from '../../components/cards/SkillProgressCard';
import StatCard from '../../components/cards/StatCard';

export default function TrustScorePage() {
  return (
    <div className="space-y-8">
      <Section title="AI Trust Score" description="Your verified trust metrics">
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <TrustScoreCard score={850} />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-3 gap-6">
              <StatCard label="Completed Projects" value="24" change="All verified" />
              <StatCard label="Success Rate" value="99.2%" change="Above average" />
              <StatCard label="Average Rating" value="4.9" change="Out of 5.0" tone="gold" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Verification Tasks" description="Complete these to increase your score">
        <div className="grid grid-cols-2 gap-6">
          <SkillProgressCard
            skill="Python Mastery"
            level="Lv 4"
            progress={80}
            status="in-progress"
          />
          <SkillProgressCard
            skill="Model Benchmarking"
            level="Lv 5"
            progress={100}
            status="completed"
          />
          <SkillProgressCard
            skill="Arabic Data Labeling"
            level="In Progress"
            progress={45}
            status="in-progress"
          />
          <SkillProgressCard
            skill="Node.js Expert"
            level="Lv 3"
            progress={0}
            status="not-started"
          />
        </div>
      </Section>

      <Section title="Trust Evaluation" description="How we calculate your score">
        <div className="grid grid-cols-2 gap-6">
          {[
            { label: 'Work Quality', value: '95%', description: 'Based on project ratings' },
            { label: 'Reliability', value: '98%', description: 'On-time delivery rate' },
            { label: 'Responsiveness', value: '92%', description: 'Average response time' },
            { label: 'Professionalism', value: '90%', description: 'Communication & conduct' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-card rounded-lg border border-border p-6 shadow-sm"
            >
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
