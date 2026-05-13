import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EarningsChartProps {
  data: Array<{
    month: string;
    amount: number;
  }>;
  title?: string;
  subtitle?: string;
  activeMonth?: string;
}

export default function EarningsChart({
  data,
  title = 'Monthly Earnings',
  subtitle = 'Payroll history for the last 6 months',
  activeMonth,
}: EarningsChartProps) {
  // Find the active month index
  const activeIndex = activeMonth
    ? data.findIndex((d) => d.month === activeMonth)
    : data.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-muted mt-1">{subtitle}</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis
            dataKey="month"
            stroke="#9CA3AF"
            style={{ fontSize: '12px', fontWeight: 500 }}
          />
          <YAxis
            stroke="#9CA3AF"
            style={{ fontSize: '12px', fontWeight: 500 }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            }}
            formatter={(value) => [`$${(value as number).toLocaleString()}`, 'Amount']}
            labelStyle={{ color: '#374151' }}
          />
          <Bar
            dataKey="amount"
            radius={[8, 8, 0, 0]}
            fill="#E5E7EB"
            isAnimationActive={true}
            animationDuration={600}
          >
            {data.map((entry, index) => (
              <motion.g key={`bar-${index}`}>
                {index === activeIndex ? (
                  <Bar dataKey="amount" fill="#032F2A" />
                ) : (
                  <Bar dataKey="amount" fill="#E5E7EB" />
                )}
              </motion.g>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Month labels at bottom */}
      <div className="mt-4 flex justify-between text-xs text-muted font-medium">
        {data.map((item, idx) => (
          <span
            key={idx}
            className={`${
              idx === activeIndex ? 'text-primary-dark font-semibold' : ''
            }`}
          >
            {item.month.toUpperCase()}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
