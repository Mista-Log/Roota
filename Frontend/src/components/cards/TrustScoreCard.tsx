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
      className="bg-card rounded-lg border border-border p-8 shadow-sm"
    >
      <div className="flex flex-col items-center">
        {/* Circle progress */}
        <div className="relative w-32 h-32 mb-6">
          <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="4"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#F5A623"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              strokeLinecap="round"
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary-dark">{displayScore}</div>
              <div className="text-xs text-muted mt-0.5">/ {maxScore}</div>
            </motion.div>
          </div>
        </div>

        {/* Tier badge */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-1 mb-3 px-3 py-1 bg-yellow-100 rounded-full"
        >
          <TrendingUp size={14} className="text-yellow-600" />
          <span className="text-xs font-semibold text-yellow-700">{tier}</span>
        </motion.div>

        {/* Subtitle */}
        <p className="text-sm text-muted text-center">{subtitle}</p>
      </div>
    </motion.div>
  );
}
