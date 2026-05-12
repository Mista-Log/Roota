import React from 'react';

interface MiniBarChartProps {
  bars?: number[];
  labels?: string[];
  activeIndex: number;
  compact?: boolean;
}

export function MiniBarChart({ bars, labels, activeIndex, compact = false }: MiniBarChartProps) {
  const values = bars ?? [35, 52, 28, 72, 40];
  const chartLabels = labels ?? ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  
  return (
    <div className={`mini-chart ${compact ? 'mini-chart--compact' : ''}`}>
      <div className="mini-chart__bars">
        {values.map((value, index) => (
          <span key={`${value}-${index}`} className={index === activeIndex ? 'active' : ''} style={{ height: `${value}%` }} />
        ))}
      </div>
      <div className="mini-chart__labels">
        {chartLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}
