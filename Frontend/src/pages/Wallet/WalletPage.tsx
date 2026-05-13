'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Home, TrendingUp, CheckCircle, AlertCircle, Circle } from 'lucide-react';
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
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#E8941E] px-8 py-8 text-white shadow-lg"
      >
        <div className="flex items-start justify-between mb-12">
          <div>
            <p className="text-sm font-medium opacity-90">Available Balance</p>
            <h1 className="text-5xl font-bold mt-2">$24,580.45</h1>
          </div>
          <div className="h-12 w-12 rounded-lg bg-white/20 flex items-center justify-center">
            <Home size={24} className="opacity-80" />
          </div>
        </div>

        <div className="mb-8 flex gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-75">Monthly Yield</p>
            <p className="mt-2 text-2xl font-bold">+4.2%</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-75">Account Balance</p>
            <p className="mt-2 text-2xl font-bold">$1,200.00</p>
          </div>
        </div>

        <div className="text-sm font-semibold">Account Holder: ALEXANDER ROOTA!</div>
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary-dark/10 flex items-center justify-center mb-3">
              <Send size={20} className="text-primary-dark" />
            </div>
            <p className="text-sm font-semibold text-slate-900">Send Money</p>
            <p className="text-xs text-muted mt-1">Instant transfers to any global account</p>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-border bg-primary-dark px-6 py-5 shadow-sm transition-all duration-200 hover:shadow-md"
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <Home size={20} className="text-white" />
            </div>
            <p className="text-sm font-semibold text-white">Withdraw</p>
            <p className="text-xs text-white/80 mt-1">Transfer funds to your local bank</p>
          </div>
        </motion.button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Monthly Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-1 xl:col-span-2 rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
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
          className="col-span-1 rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <div className="relative h-32 w-32 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E8941E] flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-bold text-white">850</p>
                <p className="text-xs font-semibold text-white/80 mt-1 uppercase">Trust Score</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">AI Wealth Optimizer</h3>
            <p className="text-sm text-muted mb-4">
              Based on your consistent payroll history and low failure rate, your trust score has increased. You are now eligible for +0.5% lower transaction fees** and early payout features.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
                ✓ Verified Earner
              </span>
              <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-sm">
                ⚡ High Stability
              </span>
            </div>

            <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary hover:-translate-y-0.5">
              Claim Reward
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
