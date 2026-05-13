import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Banknote, CreditCard, ReceiptText, ShieldCheck } from 'lucide-react';

const mockFinancialSummary = [
  { label: 'Wallet Balance', value: '$8,420.50', meta: 'Available for withdrawal', icon: Banknote },
  { label: 'Pending Payouts', value: '$3,200.00', meta: 'Processing: 2', icon: ReceiptText },
  { label: 'Total Tax Paid', value: '$1,120.00', meta: 'YTD compliance active', icon: ShieldCheck },
];

const mockRecentTransactions = [
  { description: 'Payroll - Project X', amount: '+$4,200.00', status: 'SUCCESS', date: 'Oct 24, 2023' },
  { description: 'Bank Withdrawal', amount: '-$1,500.00', status: 'PENDING', date: 'Oct 22, 2023' },
  { description: 'Bonus Reward', amount: '+$550.00', status: 'SUCCESS', date: 'Oct 20, 2023' },
  { description: 'Subscription Fee', amount: '-$29.00', status: 'FAILED', date: 'Oct 18, 2023' },
];

export default function FinancesPage() {
  const [financialSummary, setFinancialSummary] = useState(mockFinancialSummary);
  const [recentTransactions, setRecentTransactions] = useState(mockRecentTransactions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        
        // Fetch financial metrics
        const metricsRes = await fetch(`${apiUrl}/api/finances/metrics/`);
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          setFinancialSummary(Array.isArray(metricsData.results) ? metricsData.results : metricsData);
        }

        // Fetch transactions
        const transRes = await fetch(`${apiUrl}/api/finances/transactions/`);
        if (transRes.ok) {
          const transData = await transRes.json();
          setRecentTransactions(Array.isArray(transData.results) ? transData.results : transData);
        }
      } catch (error) {
        console.error('Error fetching finances data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {financialSummary.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">{item.value}</p>
                  <p className="mt-2 text-sm text-muted">{item.meta}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-primary-dark">
                  <Icon size={20} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.3fr_1fr]">
        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Global Wallet</h3>
              <p className="text-sm text-muted">Withdraw funds and manage compliance</p>
            </div>
            <button className="rounded-lg bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark/90">
              Withdraw
            </button>
          </div>

          <div className="rounded-[24px] bg-gradient-to-br from-primary-dark to-[#12493d] p-8 text-white shadow-sm">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/75">Roota Finance</p>
                <h4 className="mt-2 text-4xl font-bold">$8,420.50</h4>
              </div>
              <div className="rounded-xl bg-white/12 p-3 text-white/90">
                <CreditCard size={22} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Next Payout</p>
                <p className="mt-1 text-lg font-semibold">$1,200.00</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Tax Reserved</p>
                <p className="mt-1 text-lg font-semibold">$1,120.00</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.28 }}
          className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
              <p className="text-sm text-muted">Latest wallet activity</p>
            </div>
            <button className="text-xs font-semibold text-primary-dark hover:text-primary">Export CSV</button>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.description} className="flex items-center justify-between rounded-xl border border-border/60 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{transaction.description}</p>
                  <p className="text-xs text-muted">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${transaction.amount.startsWith('+') ? 'text-success' : transaction.status === 'FAILED' ? 'text-error' : 'text-slate-900'}`}>
                    {transaction.amount}
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                      transaction.status === 'SUCCESS'
                        ? 'bg-[#DDF6E9] text-primary'
                        : transaction.status === 'PENDING'
                          ? 'bg-[#FFF1D9] text-[#B7791F]'
                          : 'bg-[#FDECEC] text-error'
                    }`}
                  >
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
