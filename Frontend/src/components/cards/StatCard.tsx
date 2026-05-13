import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: React.ReactNode;
  tone?: 'default' | 'gold' | 'success';
}

export default function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon,
  tone = 'default',
}: StatCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Parse the value
    const isPercentage = value.toString().includes('%');
    const isCurrency = value.toString().includes('$');
    const numValue = parseFloat(value.toString().replace(/[^0-9.-]/g, '')) || 0;

    // Animate the value
    const startTime = Date.now();
    const duration = 1400;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = numValue * progress;

      if (isCurrency) {
        setDisplayValue(`$${currentValue.toLocaleString('en-US', { maximumFractionDigits: 0 })}`);
      } else if (isPercentage) {
        setDisplayValue(`${Math.round(currentValue)}%`);
      } else {
        setDisplayValue(Math.round(currentValue).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isInView, value]);

  const bgColor = {
    default: 'bg-card',
    gold: 'bg-yellow-50',
    success: 'bg-green-50',
  }[tone];

  const textColor = {
    default: 'text-slate-900',
    gold: 'text-yellow-900',
    success: 'text-green-900',
  }[tone];

  const changeColor = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-slate-600',
  }[changeType];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${bgColor} rounded-lg border border-border p-6 shadow-sm`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="metric-label mb-2">{label}</p>
          <p className={`metric-value ${textColor}`}>{displayValue}</p>
          {change && (
            <p className={`metric-meta mt-1 ${changeColor}`}>{change}</p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0 text-muted">
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
