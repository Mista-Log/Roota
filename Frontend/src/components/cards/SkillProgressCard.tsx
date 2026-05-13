import React from 'react';
import { motion } from 'framer-motion';

interface SkillProgressCardProps {
  skill: string;
  level: string;
  progress: number;
  status?: 'completed' | 'in-progress' | 'not-started';
  onVerify?: () => void;
}

export default function SkillProgressCard({
  skill,
  level,
  progress,
  status = 'in-progress',
  onVerify,
}: SkillProgressCardProps) {
  const statusColors = {
    completed: { bg: 'bg-green-100', text: 'text-green-700', progress: 'bg-green-500' },
    'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', progress: 'bg-blue-500' },
    'not-started': { bg: 'bg-slate-100', text: 'text-slate-600', progress: 'bg-slate-300' },
  };

  const colors = statusColors[status];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-4 shadow-sm"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-900">{skill}</h4>
          <p className="text-sm text-muted mt-0.5">{level}</p>
        </div>
        <span className={`${colors.bg} ${colors.text} text-xs font-semibold px-2.5 py-1 rounded-full capitalize`}>
          {status === 'in-progress' ? 'In Progress' : status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`${colors.progress} h-full rounded-full`}
          />
        </div>
        <p className="text-xs text-muted mt-2">{progress}% Complete</p>
      </div>

      {/* Action button */}
      {onVerify && (
        <button
          onClick={onVerify}
          className="w-full mt-3 py-2 px-3 border border-border rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-50"
        >
          Verify Skill
        </button>
      )}
    </motion.div>
  );
}
