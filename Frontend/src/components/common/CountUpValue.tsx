import { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type CountUpValueProps = {
  value: string;
  className?: string;
  duration?: number;
};

function parseValue(rawValue: string) {
  const trimmed = rawValue.trim();
  const match = trimmed.match(/^([^0-9+-]*)([+-]?\d[\d,]*\.?\d*)([^0-9]*)$/);

  if (!match) {
    return {
      prefix: '',
      suffix: '',
      target: 0,
      decimals: 0,
      padWidth: 0,
    };
  }

  const [, prefix, numericPart, suffix] = match;
  const normalized = numericPart.replace(/,/g, '');
  const target = Number(normalized);
  const decimals = normalized.includes('.') ? normalized.split('.')[1].length : 0;
  const integerPart = normalized.replace(/^[+-]/, '').split('.')[0];
  const padWidth = decimals === 0 && integerPart.length > 1 && integerPart.startsWith('0') ? integerPart.length : 0;

  return {
    prefix: prefix ?? '',
    suffix: suffix ?? '',
    target: Number.isFinite(target) ? target : 0,
    decimals,
    padWidth,
  };
}

function formatValue(value: number, decimals: number, padWidth: number) {
  if (decimals > 0) {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  const rounded = Math.round(value);

  if (padWidth > 0) {
    return String(rounded).padStart(padWidth, '0');
  }

  return rounded.toLocaleString();
}

export function CountUpValue({ value, className, duration = 1400 }: CountUpValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const { prefix, suffix, target, decimals, padWidth } = useMemo(() => parseValue(value), [value]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) {
      return;
    }

    let frameId = 0;
    let startTime = 0;

    const tick = (time: number) => {
      if (!startTime) {
        startTime = time;
      }

      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(target * eased);

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      } else {
        setCurrent(target);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameId);
  }, [duration, isInView, target]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatValue(current, decimals, padWidth)}
      {suffix}
    </span>
  );
}