import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  meta?: string;
  tone?: 'compact' | 'default';
  accent?: 'positive' | 'neutral' | 'warning';
}

export function MetricCard({ title, value, meta, tone = 'default', accent = 'neutral' }: MetricCardProps) {
  return (
    <div className={`metric-card metric-card--${tone} metric-card--${accent}`}>
      <span className="metric-card__title">{title}</span>
      <strong className="metric-card__value">{value}</strong>
      {meta ? <span className="metric-card__meta">{meta}</span> : null}
    </div>
  );
}
