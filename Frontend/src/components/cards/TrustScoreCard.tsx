import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp } from 'lucide-react';

interface TrustScoreCardProps {
  score: number;
  maxScore?: number;
  tier?: string;
  subtitle?: string;
}

export default function TrustScoreCard({
  score,
  maxScore = 1000,
  tier = 'Elite Tier (Top 2%)',
  subtitle = 'Your trust score',
}: TrustScoreCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const duration = 1400;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayScore(Math.round(score * progress));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [isInView, score]);

  const percentage = (displayScore / maxScore) * 100;
  const circumference = 2 * Math.PI * 45; // radius 45
  const strokeDashoffset = circumference - (circumference * percentage) / 100;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
    >
      <div className="flex h-full flex-col items-center justify-center text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-700">AI Trust Score</p>

        <div className="relative mt-5 grid h-[136px] w-[136px] place-items-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E9EDF0" strokeWidth="6" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#F5A623"
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-center">
            <div className="text-[34px] font-semibold leading-none tracking-[-0.05em] text-slate-900">
              {displayScore}
            </div>
            <div className="mt-1 text-[13px] text-muted">/ {maxScore}</div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#E8F6EF] px-4 py-2 text-[13px] font-medium text-[#0B5D4B]"
        >
          <TrendingUp size={14} />
          <span>{tier}</span>
        </motion.div>

        <p className="mt-3 text-[14px] text-muted">{subtitle}</p>
      </div>
    </motion.div>
  );
}
