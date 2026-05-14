import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface TransactionItem {
  id: string;
  description: string;
  amount: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  type: 'incoming' | 'outgoing';
  date: string;
  method: string;
  reference: string;
  counterpart: string;
}

const mockTransactions: TransactionItem[] = [
  { id: 'tx_1', description: 'Team payroll cycle', amount: '-$14,200.00', status: 'SUCCESS', type: 'outgoing', date: 'Oct 24, 2023', method: 'Bank transfer', reference: 'PAY-8821', counterpart: 'Worker team' },
  { id: 'tx_2', description: 'Hiring bonus payout', amount: '-$3,000.00', status: 'PENDING', type: 'outgoing', date: 'Oct 22, 2023', method: 'Wallet debit', reference: 'BON-1104', counterpart: 'New hire' },
  { id: 'tx_3', description: 'Refund from vendor', amount: '+$550.00', status: 'SUCCESS', type: 'incoming', date: 'Oct 20, 2023', method: 'Bank credit', reference: 'RFD-1002', counterpart: 'Vendor' },
  { id: 'tx_4', description: 'Platform subscription', amount: '-$199.00', status: 'FAILED', type: 'outgoing', date: 'Oct 18, 2023', method: 'Card charge', reference: 'SUB-2810', counterpart: 'Roota Premium' },
];

export default function EmployerTransactionsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SUCCESS' | 'PENDING' | 'FAILED'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'incoming' | 'outgoing'>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((tx) => {
      const statusOk = statusFilter === 'ALL' || tx.status === statusFilter;
      const typeOk = typeFilter === 'ALL' || tx.type === typeFilter;
      const searchOk =
        tx.description.toLowerCase().includes(search.toLowerCase()) ||
        tx.reference.toLowerCase().includes(search.toLowerCase()) ||
        tx.counterpart.toLowerCase().includes(search.toLowerCase());
      return statusOk && typeOk && searchOk;
    });
  }, [search, statusFilter, typeFilter]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Employer Transactions</h1>
        <p className="mt-1 text-sm text-muted">Inspect payroll spend, refunds, and vendor billing</p>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-[1.2fr_0.7fr_0.7fr]">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by description, reference or counterpart" className="w-full rounded-xl border border-border bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition-colors focus:border-primary-dark" />
          </div>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'ALL' | 'SUCCESS' | 'PENDING' | 'FAILED')} className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark">
            <option value="ALL">All status</option>
            <option value="SUCCESS">Success</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>

          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'ALL' | 'incoming' | 'outgoing')} className="w-full rounded-xl border border-border bg-white px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark">
            <option value="ALL">All type</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filteredTransactions.map((tx) => {
          const expanded = expandedId === tx.id;
          return (
            <motion.div key={tx.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm">
              <button onClick={() => setExpandedId(expanded ? null : tx.id)} className="flex w-full items-center justify-between gap-4 text-left">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{tx.description}</p>
                  <p className="mt-0.5 text-xs text-muted">{tx.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${tx.status === 'SUCCESS' ? 'bg-[#DDF6E9] text-primary' : tx.status === 'PENDING' ? 'bg-[#FFF1D9] text-[#B7791F]' : 'bg-[#FDECEC] text-error'}`}>
                    {tx.status}
                  </span>
                  <p className={`text-sm font-semibold ${tx.amount.startsWith('+') ? 'text-success' : 'text-slate-900'}`}>{tx.amount}</p>
                  {expanded ? <ChevronUp size={18} className="text-muted" /> : <ChevronDown size={18} className="text-muted" />}
                </div>
              </button>

              {expanded && (
                <div className="mt-4 grid grid-cols-1 gap-3 rounded-xl border border-border/80 bg-slate-50 p-4 text-sm md:grid-cols-2">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Reference</p>
                    <p className="mt-1 font-semibold text-slate-900">{tx.reference}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Counterpart</p>
                    <p className="mt-1 font-semibold text-slate-900">{tx.counterpart}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Method</p>
                    <p className="mt-1 font-semibold text-slate-900">{tx.method}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-muted">Type</p>
                    <p className="mt-1 font-semibold capitalize text-slate-900">{tx.type}</p>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}

        {filteredTransactions.length === 0 && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted">No transactions match your current filters.</div>
        )}
      </div>
    </div>
  );
}
