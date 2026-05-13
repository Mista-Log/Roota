import React from 'react';

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
    <div className={`trust-ring ${compact ? 'trust-ring--compact' : ''}`}>
      {corner ? <span className="trust-ring__corner">{corner}</span> : null}
      <div className="trust-ring__circle">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      {pill ? <div className="trust-ring__pill">{pill}</div> : null}
    </div>
  );
}
