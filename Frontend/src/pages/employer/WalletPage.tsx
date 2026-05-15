import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, AlertCircle, CheckCircle, Circle, Send, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import AnimatedNumber from '../../components/common/AnimatedNumber';
import FundsActionModal from '../../components/common/FundsActionModal';
import { Banknote, ReceiptText, ShieldCheck } from 'lucide-react';
import { apiGet, apiPost } from '../../utils/api';

interface Transaction {
  id: string;
  desc: string;
  amount: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', desc: 'Team payroll cycle', amount: '-$14,200.00', status: 'success', date: 'Oct 24, 2023' },
  { id: '2', desc: 'Hiring bonus payout', amount: '-$3,000.00', status: 'pending', date: 'Oct 22, 2023' },
  { id: '3', desc: 'Refund from vendor', amount: '+$550.00', status: 'success', date: 'Oct 20, 2023' },
  { id: '4', desc: 'Platform subscription', amount: '-$199.00', status: 'failed', date: 'Oct 18, 2023' },
];

const payrollData = [
  { month: 'JAN', value: 18000 },
  { month: 'FEB', value: 21000 },
  { month: 'MAR', value: 24000 },
  { month: 'APR', value: 26000 },
  { month: 'MAY', value: 28420 },
  { month: 'JUN', value: 30100 },
];

export default function EmployerWalletPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [financialSummary, setFinancialSummary] = useState<any[]>([]);
  const [animatedScore, setAnimatedScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeFundsModal, setActiveFundsModal] = useState<'send' | 'withdraw' | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/employer/wallet/transactions/');
        setTransactions(Array.isArray(data.results) ? data.results : data);
        
        // finance metrics
        try {
          const metricsData = await apiGet('/api/employer/finances/metrics/');
          setFinancialSummary(Array.isArray(metricsData.results) ? metricsData.results : metricsData);
        } catch (err) {
          // ignore metrics fetch failure
        }
      } catch (error) {
        console.warn('Error fetching employer wallet data, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const targetScore = 910;
    const duration = 1200;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setAnimatedScore(Math.round(targetScore * progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  const handleFundsSubmit = async (payload: { amount: string; recipientName: string; accountNumber: string; bankName: string; note: string }) => {
    const endpoint = activeFundsModal === 'send' ? '/api/employer/wallet/send/' : '/api/employer/wallet/withdraw/';
    try {
      await apiPost(endpoint, payload);
    } catch (error) {
      console.warn('Funds action failed:', error);
    }
  };

  const trustProgress = useMemo(() => animatedScore / 10, [animatedScore]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle size={16} className="text-success" />;
      case 'pending': return <Circle size={16} className="text-warning" />;
      case 'failed': return <AlertCircle size={16} className="text-error" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {(financialSummary && financialSummary.length > 0 ? financialSummary : [
          { label: 'Available Budget', value: 28420.5, meta: 'Available for payroll', icon: Banknote },
          { label: 'Payroll Reserve', value: 18000.0, meta: 'Reserved for next cycle', icon: ReceiptText },
          { label: 'Open Invoices', value: 12800.0, meta: 'Awaiting payment', icon: ShieldCheck },
        ]).map((item: any, index: number) => {
          const Icon = item.icon || Banknote;
          return (
            <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }} className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">{item.label}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900"><AnimatedNumber value={item.value} duration={1200} currency="USD" /></p>
                  <p className="mt-2 text-sm text-muted">{item.meta}</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-primary-dark"><Icon size={20} /></div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] bg-gradient-to-br from-[#0b5d4b] to-[#12493d] px-8 py-8 text-white shadow-lg">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-md">
              <p className="text-sm font-medium text-white/90">Available Budget</p>
              <h1 className="mt-2 text-[3.65rem] font-bold leading-none tracking-tight">
                <AnimatedNumber value={28420.5} duration={1500} currency="USD" />
              </h1>
              <div className="mt-8 grid max-w-[370px] grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/16 px-4 py-3 backdrop-blur-[1px]"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">Payroll Reserve</p><p className="mt-1 text-xl font-bold">$18,000.00</p></div>
                <div className="rounded-2xl bg-white/16 px-4 py-3 backdrop-blur-[1px]"><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/75">Open Invoices</p><p className="mt-1 text-xl font-bold">$12,800.00</p></div>
              </div>
              <div className="mt-10 text-sm font-semibold tracking-wide text-white/90">Account Holder: Employer</div>
            </div>
            <div className="rounded-xl bg-white/16 p-3 text-white/90"><Wallet size={22} /></div>
          </div>
        </motion.div>

        <div className="grid grid-rows-2 gap-4">
          <motion.button whileHover={{ y: -2 }} onClick={() => setActiveFundsModal('send')} className="rounded-[22px] border border-border bg-primary-dark px-6 py-5 text-left shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex h-full flex-col justify-center gap-3 text-center text-white"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/12"><Send size={20} className="text-white" /></div><div><p className="text-lg font-semibold">Pay Team</p><p className="mt-1 text-xs text-white/75">Instant transfers to workers or vendors</p></div></div>
          </motion.button>
          <motion.button whileHover={{ y: -2 }} onClick={() => setActiveFundsModal('withdraw')} className="rounded-[22px] border border-border bg-white px-6 py-5 text-left shadow-sm transition-all duration-200 hover:shadow-md">
            <div className="flex h-full flex-col justify-center gap-3 text-center text-slate-900"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-primary-dark"><ArrowUpRight size={20} /></div><div><p className="text-lg font-semibold">Withdraw</p><p className="mt-1 text-xs text-muted">Transfer funds back to company bank</p></div></div>
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6"><h3 className="text-lg font-semibold text-slate-900">Payroll Spend</h3><p className="text-sm text-muted">Budget history for the last 6 months</p></div>
          <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={payrollData}><CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} /><XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: '12px' }} /><YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} /><Tooltip contentStyle={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px' }} cursor={{ fill: 'rgba(11, 93, 75, 0.05)' }} /><Bar dataKey="value" fill="#032F2A" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between"><div><h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3></div><button onClick={() => navigate('/employer/transactions')} className="text-xs font-semibold text-primary-dark hover:text-primary">View All</button></div>
          <div className="space-y-3">{transactions.map((tx) => (<div key={tx.id} className="flex items-start gap-3 rounded-lg border border-border/50 p-3 hover:bg-slate-50 transition-colors"><div className="mt-1">{getStatusIcon(tx.status)}</div><div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-900">{tx.desc}</p><p className="text-xs text-muted">{tx.date}</p></div><p className={`text-sm font-semibold whitespace-nowrap ${tx.amount.startsWith('+') ? 'text-success' : tx.status === 'failed' ? 'text-error' : 'text-slate-900'}`}>{tx.amount}</p></div>))}</div>
        </motion.div>
      </div>

      <FundsActionModal isOpen={activeFundsModal !== null} mode={activeFundsModal ?? 'send'} onClose={() => setActiveFundsModal(null)} onSubmit={handleFundsSubmit} />
    </div>
  );
}
