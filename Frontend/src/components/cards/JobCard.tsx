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
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
          <div className="flex items-center gap-2 text-sm text-muted mb-3">
            <Building2 size={16} />
            <span>{company}</span>
            {location && (
              <>
                <span>•</span>
                <span>{location}</span>
              </>
            )}
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 bg-slate-100 text-slate-700 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-border">
            {salary && <span className="text-sm font-medium text-slate-900">{salary}</span>}
            <span className="text-xs text-muted">/month</span>
          </div>
        </div>

        {/* Match score and action */}
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-col items-center">
            <div className="text-2xl font-bold text-accent">{matchScore}%</div>
            <div className="text-xs text-muted">Match Score</div>
          </div>
          <motion.button
            whileHover={{ x: 4 }}
            onClick={onApply}
            className="p-2 rounded-lg border border-border text-muted hover:text-primary-dark hover:border-primary-dark transition-colors duration-200"
          >
            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
