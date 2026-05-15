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
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-slate-900">{title}</h2>
          {description && <p className="mt-1 text-[14px] text-muted">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div>{children}</div>
    </motion.section>
  );
}
