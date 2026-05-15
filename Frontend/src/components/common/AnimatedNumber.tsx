import React, { useEffect, useState } from 'react';

interface Props {
  value: number | string;
  duration?: number; // ms
  decimals?: number;
  currency?: string; // e.g. 'USD'
  compact?: boolean;
  className?: string;
}

function parseNumber(input: number | string) {
  if (typeof input === 'number') return input;
  const cleaned = String(input).replace(/[^0-9.-]/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

export default function AnimatedNumber({ value, duration = 1200, decimals = 0, currency, compact, className }: Props) {
  const target = parseNumber(value);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let raf: number | null = null;
    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = t; // linear easing — keep simple and fast
      const next = from + (to - from) * eased;
      setCurrent(Number(next.toFixed(decimals)));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => { if (raf) cancelAnimationFrame(raf); };
  }, [target, duration, decimals]);

  const formatter = (v: number) => {
    if (currency) {
      try {
        return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(v);
      } catch {
        return `${v.toFixed(decimals)}`;
      }
    }

    if (compact) {
      return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: decimals }).format(v);
    }

    return new Intl.NumberFormat(undefined, { maximumFractionDigits: decimals }).format(v);
  };

  return <span className={className}>{formatter(current)}</span>;
}
