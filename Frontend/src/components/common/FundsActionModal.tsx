import { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Send, ArrowUpRight, X, CheckCircle } from 'lucide-react';

interface FundsActionModalProps {
  isOpen: boolean;
  mode: 'send' | 'withdraw';
  onClose: () => void;
  onSubmit: (payload: {
    amount: string;
    recipientName: string;
    accountNumber: string;
    bankName: string;
    note: string;
  }) => Promise<void>;
}

export default function FundsActionModal({ isOpen, mode, onClose, onSubmit }: FundsActionModalProps) {
  const [form, setForm] = useState({
    amount: '',
    recipientName: '',
    accountNumber: '',
    bankName: '',
    note: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = mode === 'send' ? 'Send Money' : 'Withdraw Funds';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await onSubmit(form);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ amount: '', recipientName: '', accountNumber: '', bankName: '', note: '' });
        onClose();
      }, 1200);
    } catch (error) {
      console.error(`Failed to ${mode}:`, error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <motion.div
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-xl rounded-2xl border border-border bg-card p-6 shadow-xl"
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-slate-100" disabled={submitting}>
            <X size={18} className="text-muted" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle size={48} className="mx-auto text-success" />
            <p className="mt-3 font-semibold text-slate-900">
              {mode === 'send' ? 'Transfer submitted' : 'Withdrawal requested'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-900">Amount (USD)</label>
              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                placeholder="Enter amount"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-900">
                  {mode === 'send' ? 'Recipient Name' : 'Account Name'}
                </label>
                <input
                  name="recipientName"
                  value={form.recipientName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-900">Account Number</label>
                <input
                  name="accountNumber"
                  value={form.accountNumber}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                  placeholder="0123456789"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-900">Bank</label>
              <input
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                placeholder="Select or type bank"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-900">Note</label>
              <textarea
                name="note"
                value={form.note}
                onChange={handleChange}
                rows={3}
                className="w-full resize-none rounded-xl border border-border bg-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary-dark"
                placeholder={mode === 'send' ? 'Reason for transfer' : 'Withdrawal reference'}
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={submitting || !form.amount || !form.recipientName || !form.accountNumber || !form.bankName}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-dark py-3 text-sm font-semibold text-white transition-colors hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : mode === 'send' ? <Send size={16} /> : <ArrowUpRight size={16} />}
                {submitting ? 'Processing...' : mode === 'send' ? 'Send Now' : 'Withdraw Now'}
              </button>
              <button
                onClick={onClose}
                disabled={submitting}
                className="flex-1 rounded-xl border border-border bg-white py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
