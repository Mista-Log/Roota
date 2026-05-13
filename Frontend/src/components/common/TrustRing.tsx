import React from 'react';
import { motion } from 'framer-motion';
import { CountUpValue } from './CountUpValue';

interface TrustRingProps {
  value: string;
  label: string;
  compact?: boolean;
  pill?: string;
  corner?: string;
}

export function TrustRing({
  value,
  label,
  compact = false,
  pill,
  corner,
}: TrustRingProps) {
  return (
    <motion.div
      className={`trust-ring ${compact ? 'trust-ring--compact' : ''}`}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.55 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      {corner ? <span className="trust-ring__corner">{corner}</span> : null}
      <div className="trust-ring__circle">
        <strong className="trust-ring__value">
          <CountUpValue value={value} />
        </strong>
        <span>{label}</span>
      </div>
      {pill ? <div className="trust-ring__pill">{pill}</div> : null}
    </motion.div>
  );
}
