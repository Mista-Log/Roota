import React from 'react';

interface BrandBlockProps {
  compact?: boolean;
}

export function BrandBlock({ compact = false }: BrandBlockProps) {
  return (
    <div className={`brand-block ${compact ? 'brand-block--compact' : ''}`}>
      <div className="brand-mark">✦</div>
      <div>
        <div className="brand-name">Roota AI</div>
        <div className="brand-subtitle">Premium Workforce</div>
      </div>
    </div>
  );
}
