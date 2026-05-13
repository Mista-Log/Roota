'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Circle, Home, Send, Sparkles, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Transaction {
  id: string;
  desc: string;
  amount: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', desc: 'Payroll - Project X', amount: '+$4,200.00', status: 'success', date: 'Oct 24, 2023' },
  { id: '2', desc: 'Bank Withdrawal', amount: '-$1,500.00', status: 'pending', date: 'Oct 22, 2023' },
  { id: '3', desc: 'Bonus Reward', amount: '+$550.00', status: 'success', date: 'Oct 20, 2023' },
  { id: '4', desc: 'Subscription Fee', amount: '-$29.00', status: 'failed', date: 'Oct 18, 2023' },
];

const earningsData = [
  { month: 'JAN', value: 4800 },
  { month: 'FEB', value: 5200 },
  { month: 'MAR', value: 6100 },
  { month: 'APR', value: 7300 },
  { month: 'MAY', value: 8200 },
  { month: 'JUN', value: 9100 },
];

export default function WalletPage() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Wallet page loaded');
      } catch (error) {
        console.log('Using mock data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const targetScore = 850;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const nextScore = Math.round(targetScore * progress);
      setAnimatedScore(nextScore);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  const handleClaimReward = () => {
    setRewardClaimed(true);
  };

  const trustProgress = useMemo(() => animatedScore / 10, [animatedScore]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle size={16} className="text-success" />;
      case 'pending':
        return <Circle size={16} className="text-warning" />;
      case 'failed':
        return <AlertCircle size={16} className="text-error" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[28px] bg-gradient-to-br from-[#F5A623] to-[#E89617] px-8 py-8 text-white shadow-lg"
        >
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-md">
              <p className="text-sm font-medium text-white/90">Available Balance</p>
              <h1 className="mt-2 text-[3.65rem] font-bold leading-none tracking-tight">$24,580.45</h1>

              <div className="mt-8 grid max-w-[370px] grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/16 px-4 py-3 backdrop-blur-[1px]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">Monthly Yield</p>
                  <p className="mt-1 text-xl font-bold">+4.2%</p>
                </div>
                <div className="rounded-2xl bg-white/16 px-4 py-3 backdrop-blur-[1px]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">Locked Rewards</p>
                  <p className="mt-1 text-xl font-bold">$1,200.00</p>
                </div>
              </div>

              <div className="mt-10 text-sm font-semibold tracking-wide text-white/90">Account Holder: ALEXANDER ROOTA!</div>
            </div>

            <div className="rounded-xl bg-white/16 p-3 text-white/90">
              <Wallet size={22} />
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-rows-2 gap-4">
          <motion.button
            whileHover={{ y: -2 }}
            className="rounded-[22px] border border-border bg-primary-dark px-6 py-5 text-left shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex h-full flex-col justify-center gap-3 text-center text-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/12">
                <Send size={20} className="text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold">Send Money</p>
                <p className="mt-1 text-xs text-white/75">Instant transfers to any global account</p>
              </div>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ y: -2 }}
            className="rounded-[22px] border border-border bg-white px-6 py-5 text-left shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <div className="flex h-full flex-col justify-center gap-3 text-center text-slate-900">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary-dark">
                <ArrowUpRight size={20} />
              </div>
              <div>
                <p className="text-lg font-semibold">Withdraw</p>
                <p className="mt-1 text-xs text-muted">Transfer funds to your local bank</p>
              </div>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        {/* Monthly Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Monthly Earnings</h3>
            <p className="text-sm text-muted">Payroll history for the last 6 months</p>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }}
                  cursor={{ fill: 'rgba(11, 93, 75, 0.05)' }}
                />
                <Bar dataKey="value" fill="#032F2A" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
            </div>
            <a href="#" className="text-xs font-semibold text-primary-dark hover:text-primary">View All</a>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-slate-50 transition-colors">
                <div className="mt-1">{getStatusIcon(tx.status)}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">{tx.desc}</p>
                  <p className="text-xs text-muted">{tx.date}</p>
                </div>
                <p className={`text-sm font-semibold whitespace-nowrap ${
                  tx.amount.startsWith('+') ? 'text-success' : tx.status === 'failed' ? 'text-error' : 'text-slate-900'
                }`}>
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Wealth Optimizer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-slate-100 px-8 py-8 shadow-sm"
      >
        <div className="flex flex-col gap-8 xl:flex-row xl:items-center">
          <div className="relative h-40 w-40 flex-shrink-0">
            <svg className="h-40 w-40 -rotate-90" viewBox="0 0 120 120" aria-hidden>
              <circle cx="60" cy="60" r="48" fill="none" stroke="#E5E7EB" strokeWidth="8" />
              <circle
                cx="60"
                cy="60"
                r="48"
                fill="none"
                stroke="#F5A623"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={Math.PI * 2 * 48}
                strokeDashoffset={Math.PI * 2 * 48 * (1 - trustProgress / 100)}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <p className="text-4xl font-bold text-slate-900">{animatedScore}</p>
              <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">Trust Score</p>
            </div>
          </div>

          <div className="max-w-2xl">
            <h3 className="mb-3 text-xl font-bold text-slate-900">AI Wealth Optimizer</h3>
            <p className="text-sm leading-6 text-muted">
              Based on your consistent payroll history and low failure rate, your trust score has increased. You are now eligible for +0.5% lower transaction fees** and early payout features.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
                ✓ Verified Earner
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
                ⚡ High Stability
              </span>
            </div>
          </div>

          <div className="xl:ml-auto xl:self-center">
            <button
              type="button"
              onClick={handleClaimReward}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 ${rewardClaimed ? 'bg-[#3f6d5d]' : 'bg-primary-dark hover:bg-primary'}`}
            >
              <Sparkles size={16} />
              {rewardClaimed ? 'Reward Claimed' : 'Claim Reward'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
