import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface MiniBarChartProps {
  bars?: number[];
  labels?: string[];
  activeIndex: number;
  compact?: boolean;
}

export function MiniBarChart({ bars, labels, activeIndex, compact = false }: MiniBarChartProps) {
  const values = bars ?? [35, 52, 28, 72, 40];
  const chartLabels = labels ?? ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  
  return (
    <motion.div
      ref={ref}
      className={`mini-chart ${compact ? 'mini-chart--compact' : ''}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <div className="mini-chart__bars">
        {values.map((value, index) => (
          <motion.span
            key={`${value}-${index}`}
            className={index === activeIndex ? 'active' : ''}
            initial={{ height: 0 }}
            animate={{ height: isInView ? `${value}%` : 0 }}
            transition={{ duration: 0.9, delay: index * 0.08, ease: 'easeOut' }}
          />
        ))}
      </div>
      <div className="mini-chart__labels">
        {chartLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </motion.div>
  );
}
