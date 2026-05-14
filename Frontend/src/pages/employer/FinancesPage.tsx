import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Banknote, CreditCard, ReceiptText, ShieldCheck } from 'lucide-react';
import AnimatedNumber from '../../components/common/AnimatedNumber';
import FundsActionModal from '../../components/common/FundsActionModal';

const mockFinancialSummary = [
  { label: 'Payroll Budget', value: 28420.5, meta: 'Reserved for active contracts', icon: Banknote },
  { label: 'Open Invoices', value: 12800.0, meta: 'Pending approvals: 4', icon: ReceiptText },
  { label: 'Compliance Spend', value: 2240.0, meta: 'YTD operations coverage', icon: ShieldCheck },
];

const mockRecentTransactions = [
  { id: '1', description: 'Team payroll cycle', amount: '-$14,200.00', status: 'SUCCESS', date: 'Oct 24, 2023', reference: 'PAY-8821', method: 'Bank transfer' },
  { id: '2', description: 'Hiring bonus payout', amount: '-$3,000.00', status: 'PENDING', date: 'Oct 22, 2023', reference: 'BON-1104', method: 'Wallet debit' },
  { id: '3', description: 'Refund from vendor', amount: '+$550.00', status: 'SUCCESS', date: 'Oct 20, 2023', reference: 'RFD-1002', method: 'Bank credit' },
  { id: '4', description: 'Platform subscription', amount: '-$199.00', status: 'FAILED', date: 'Oct 18, 2023', reference: 'SUB-2810', method: 'Card charge' },
];

export default function EmployerFinancesPage() {
  const navigate = useNavigate();
  const [financialSummary, setFinancialSummary] = useState(mockFinancialSummary);
  const [recentTransactions, setRecentTransactions] = useState(mockRecentTransactions);
  const [loading, setLoading] = useState(false);
  const [expandedTransactionId, setExpandedTransactionId] = useState<string | null>(null);
  const [activeFundsModal, setActiveFundsModal] = useState<'send' | 'withdraw' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        const metricsRes = await fetch(`${apiUrl}/api/employer/finances/metrics/`);
        if (metricsRes.ok) {
          const metricsData = await metricsRes.json();
          setFinancialSummary(Array.isArray(metricsData.results) ? metricsData.results : metricsData);
        }

        const transRes = await fetch(`${apiUrl}/api/employer/finances/transactions/`);
        if (transRes.ok) {
          const transData = await transRes.json();
          setRecentTransactions(Array.isArray(transData.results) ? transData.results : transData);
        }
      } catch (error) {
        console.error('Error fetching employer finances data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFundsSubmit = async (payload: {
    amount: string;
    recipientName: string;
    accountNumber: string;
    bankName: string;
    note: string;
  }) => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
    const endpoint = activeFundsModal === 'send' ? '/api/employer/wallet/send/' : '/api/employer/wallet/withdraw/';

    try {
      await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (error) {
      console.error('Employer funds action failed:', error);
    }
  };

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
            <motion.div key={item.label} variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: index * 0.08 }} className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    <AnimatedNumber value={item.value} duration={1500} currency="USD" />
                  </p>
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
        <motion.section variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Employer payroll control</h3>
              <p className="text-sm text-muted">Track spend across hiring and contracts</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setActiveFundsModal('send')} className="rounded-lg border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-slate-50">Send</button>
              <button onClick={() => setActiveFundsModal('withdraw')} className="rounded-lg bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-primary-dark/90">Withdraw</button>
            </div>
          </div>

          <div className="rounded-[24px] bg-gradient-to-br from-primary-dark to-[#12493d] p-8 text-white shadow-sm">
            <div className="mb-10 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/75">Roota Employer Finance</p>
                <h4 className="mt-2 text-4xl font-bold">$28,420.50</h4>
              </div>
              <div className="rounded-xl bg-white/12 p-3 text-white/90">
                <CreditCard size={22} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Payroll Reserve</p>
                <p className="mt-1 text-lg font-semibold">$18,000.00</p>
              </div>
              <div className="rounded-2xl bg-white/10 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-white/70">Open Invoices</p>
                <p className="mt-1 text-lg font-semibold">$12,800.00</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.28 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Recent transactions</h3>
              <p className="text-sm text-muted">Payroll and hiring spend</p>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/employer/transactions')} className="text-xs font-semibold text-primary-dark hover:text-primary">View All Transactions</button>
              <button className="text-xs font-semibold text-primary-dark hover:text-primary">Export CSV</button>
            </div>
          </div>

          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="rounded-xl border border-border/60 px-4 py-3">
                <button onClick={() => setExpandedTransactionId((current) => (current === transaction.id ? null : transaction.id))} className="flex w-full items-center justify-between">
                  <div className="text-left">
                    <p className="text-sm font-semibold text-slate-900">{transaction.description}</p>
                    <p className="text-xs text-muted">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${transaction.amount.startsWith('+') ? 'text-success' : transaction.status === 'FAILED' ? 'text-error' : 'text-slate-900'}`}>
                      {transaction.amount}
                    </p>
                    <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${transaction.status === 'SUCCESS' ? 'bg-[#DDF6E9] text-primary' : transaction.status === 'PENDING' ? 'bg-[#FFF1D9] text-[#B7791F]' : 'bg-[#FDECEC] text-error'}`}>
                      {transaction.status}
                    </span>
                  </div>
                </button>

                {expandedTransactionId === transaction.id && (
                  <div className="mt-3 rounded-lg border border-border bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    <p><strong>Reference:</strong> {transaction.reference}</p>
                    <p className="mt-1"><strong>Method:</strong> {transaction.method}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <FundsActionModal isOpen={activeFundsModal !== null} mode={activeFundsModal ?? 'send'} onClose={() => setActiveFundsModal(null)} onSubmit={handleFundsSubmit} />
    </div>
  );
}
