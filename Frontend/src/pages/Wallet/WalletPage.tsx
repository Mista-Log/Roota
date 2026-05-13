import React from 'react';
import { motion } from 'framer-motion';
import { Send, Wallet, ArrowUpRight } from 'lucide-react';
import Section from '../../components/layout/Section';
import StatCard from '../../components/cards/StatCard';
import EarningsChart from '../../components/charts/EarningsChart';

export default function WalletPage() {
  const earnings = [
    { month: 'Jan', amount: 4800 },
    { month: 'Feb', amount: 5200 },
    { month: 'Mar', amount: 6100 },
    { month: 'Apr', amount: 7300 },
    { month: 'May', amount: 8200 },
    { month: 'Jun', amount: 9100 },
  ];

  const transactions = [
    { desc: 'Payroll - Project X', amount: '+$4,200.00', status: 'success', date: 'Oct 24, 2023' },
    { desc: 'Bank Withdrawal', amount: '-$1,500.00', status: 'pending', date: 'Oct 22, 2023' },
    { desc: 'Bonus Reward', amount: '+$550.00', status: 'success', date: 'Oct 20, 2023' },
    { desc: 'Subscription Fee', amount: '-$29.00', status: 'failed', date: 'Oct 18, 2023' },
  ];

  return (
    <div className="space-y-8">
      {/* Balance card */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-accent to-accent/80 rounded-lg p-8 text-white shadow-lg"
      >
        <div className="flex items-start justify-between mb-16">
          <div>
            <p className="text-sm opacity-90 font-medium">Available Balance</p>
            <h2 className="text-5xl font-bold mt-2">$24,580.45</h2>
          </div>
          <Wallet size={32} className="opacity-80" />
        </div>

        <div className="flex gap-8 mb-8">
          <div>
            <p className="text-xs opacity-75 font-medium">MONTHLY YIELD</p>
            <p className="text-xl font-semibold mt-1">+4.2%</p>
          </div>
          <div>
            <p className="text-xs opacity-75 font-medium">NEXT PAYABLE</p>
            <p className="text-xl font-semibold mt-1">$1,200.00</p>
          </div>
        </div>

        <p className="text-xs opacity-75 font-medium">Account Number: ALEXANDER ROOTA1</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-6">
        <StatCard label="Total Earnings" value="$142,450" change="↑ 12.5% vs last month" />
        <StatCard label="Available" value="$24,580.45" change="Ready to withdraw" />
        <StatCard label="Next Payout" value="in 48 hours" change="Automatic transfer" />
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ y: -2 }}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-dark text-white rounded-lg font-semibold transition-all duration-200 hover:bg-primary-dark/90"
        >
          <Send size={18} />
          Send Money
        </motion.button>
        <motion.button
          whileHover={{ y: -2 }}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-dark/20 text-primary-dark rounded-lg font-semibold border border-primary-dark/30 transition-all duration-200 hover:bg-primary-dark/30"
        >
          <ArrowUpRight size={18} />
          Withdraw
        </motion.button>
      </div>

      {/* Charts and transactions */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <EarningsChart data={earnings} />
        </div>
        <Section title="Recent Transactions" description="View all">
          <div className="space-y-3">
            {transactions.map((tx, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm text-slate-900">{tx.desc}</p>
                  <p className="text-xs text-muted">{tx.date}</p>
                </div>
                <span className={`text-sm font-semibold ${
                  tx.amount.startsWith('+') ? 'text-green-600' : 'text-slate-900'
                }`}>
                  {tx.amount}
                </span>
              </motion.div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
