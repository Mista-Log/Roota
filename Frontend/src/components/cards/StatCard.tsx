import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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

  const toneStyles = {
    default: 'bg-card border-border',
    gold: 'bg-[#FFF8DF] border-[#F2DCA6]',
    success: 'bg-[#F2FBF8] border-[#D9EEE6]',
  }[tone];

  const valueColor = {
    default: 'text-slate-900',
    gold: 'text-[#A86A00]',
    success: 'text-[#0B5D4B]',
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
      className={`${toneStyles} rounded-[14px] border px-6 py-5 shadow-sm`}
    >
      <div className="flex min-h-[114px] flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-muted">{label}</p>
            <p className={`mt-2 text-[34px] font-semibold leading-none tracking-[-0.05em] ${valueColor}`}>
              {displayValue}
            </p>
          </div>
          {icon && <div className="flex-shrink-0 text-slate-500">{icon}</div>}
        </div>

        {change && (
          <p className={`text-[15px] font-medium ${changeColor}`}>
            {change}
          </p>
        )}
      </div>
    </motion.div>
  );
}
