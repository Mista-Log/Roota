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
      transition={{ duration: 0.24 }}
      className="rounded-[14px] border border-border bg-card px-4 py-3.5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-[15px] font-semibold leading-6 tracking-[-0.02em] text-slate-900">{skill}</h4>
          <p className="mt-0.5 text-[13px] text-muted">{level}</p>
        </div>
        <span className={`${colors.bg} ${colors.text} rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize`}>
          {status === 'in-progress' ? 'In Progress' : status}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`${colors.progress} h-full rounded-full`}
          />
        </div>
        <p className="mt-2 text-[12px] text-muted">{progress}% Complete</p>
      </div>

      {/* Action button */}
      {onVerify && (
        <button
          onClick={onVerify}
          className="mt-3 w-full rounded-[10px] border border-border px-3 py-2 text-[13px] font-medium transition-colors duration-200 hover:bg-slate-50"
        >
          Verify Skill
        </button>
      )}
    </motion.div>
  );
}
