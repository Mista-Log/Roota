import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function Section({
  title,
  description,
  action,
  children,
  className = '',
}: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {description && <p className="text-sm text-muted mt-1">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      {/* Content */}
      <div>{children}</div>
    </motion.section>
  );
}
