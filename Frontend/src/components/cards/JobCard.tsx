import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Building2 } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location?: string;
  matchScore: number;
  skills?: string[];
  salary?: string;
  onApply?: () => void;
}

export default function JobCard({
  title,
  company,
  location,
  matchScore,
  skills = [],
  salary,
  onApply,
}: JobCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.24 }}
      className="rounded-[16px] border border-border bg-card px-5 py-4 shadow-sm transition-shadow duration-200 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[17px] font-semibold leading-6 tracking-[-0.02em] text-slate-900">{title}</h3>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
            <Building2 size={14} />
            <span>{company}</span>
            <span>•</span>
            <span>{location}</span>
          </div>

          {skills.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {skills.slice(0, 3).map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-[12px] font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-end justify-between border-t border-border pt-3">
            <div>
              {salary && <div className="text-[15px] font-medium text-slate-900">{salary}</div>}
              <div className="text-[12px] text-muted">/month</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 pl-2 text-right">
          <div className="text-[18px] font-semibold leading-none text-accent">{matchScore}%</div>
          <div className="text-[12px] leading-none text-muted">Match Score</div>
          <motion.button
            whileHover={{ x: 3 }}
            onClick={onApply}
            className="grid h-8 w-8 place-items-center rounded-[10px] border border-border text-slate-700 transition-colors duration-200 hover:border-primary-dark hover:text-primary-dark"
          >
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
