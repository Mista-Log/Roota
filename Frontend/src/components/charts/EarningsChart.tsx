import React from 'react';
import { motion } from 'framer-motion';

interface EarningsChartProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
  title?: string;
  subtitle?: string;
  activeMonth?: string;
  onViewAll?: () => void;
}

export default function EarningsChart({
  data,
  title = 'Monthly Earnings',
  subtitle = 'Payroll history for the last 6 months',
  activeMonth,
  onViewAll,
}: EarningsChartProps) {
  const activeIndex = activeMonth
    ? data.findIndex((d) => d.month === activeMonth)
    : data.length - 1;

  const maxAmount = Math.max(...data.map((item) => item.amount), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-slate-900">{title}</h3>
          <p className="mt-1 text-[14px] text-muted">{subtitle}</p>
        </div>
        <button
          onClick={onViewAll}
          className="rounded-full border border-border px-3 py-1.5 text-[12px] text-slate-700 transition-colors hover:bg-slate-50"
        >
          View all
        </button>
      </div>

      <div className="mt-5">
        <div className="flex h-[172px] items-end gap-2 rounded-[14px] border border-dashed border-slate-200 bg-[#FAFBFB] px-4 pb-4 pt-5">
          {data.map((item, index) => {
            const height = Math.max(36, Math.round((item.amount / maxAmount) * 128));
            const isActive = index === activeIndex;

            return (
              <div key={item.month} className="flex flex-1 flex-col items-center gap-2">
                <div className={`w-full max-w-[34px] rounded-t-[6px] ${isActive ? 'bg-primary-dark' : 'bg-slate-200'}`} style={{ height: `${height}px` }} />
                <span className={`text-[11px] font-medium tracking-[0.08em] ${isActive ? 'text-slate-900' : 'text-muted'}`}>
                  {item.month.toUpperCase()}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-[12px] border border-[#F2D9AC] bg-[#FFF8E8] px-4 py-3 text-[13px]">
          <div className="text-[#A86A00]">Next payout</div>
          <div className="font-medium text-slate-900">In 48 Hours</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between text-[12px] text-muted">
        <span>Payroll history for the last 6 months</span>
        <span className="text-slate-900">{activeMonth ?? data[activeIndex]?.month}</span>
      </div>
    </motion.div>
  );
}
