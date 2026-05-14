import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Phone, MessageSquare, CheckCircle, Clock, AlertCircle, Send } from 'lucide-react';
import Section from '../../components/layout/Section';

const faqs = [
  { question: 'How do I get started as a worker?', answer: 'Sign up as a worker, complete your profile, and start applying to jobs that match your skills.', category: 'Getting Started' },
  { question: 'How does the worker trust score work?', answer: 'Your trust score is built on completed projects, payroll consistency, payment history, and transaction behavior.', category: 'Trust Score' },
  { question: 'Can I withdraw my earnings?', answer: 'Yes, workers can withdraw earnings directly to their bank account.', category: 'Payments' },
  { question: 'How are payroll payments processed?', answer: 'Employers can pay workers individually or in bulk using our payroll system.', category: 'Payroll' },
  { question: 'Is my data secure?', answer: 'We use industry-standard encryption and security protocols to protect your data.', category: 'Security' },
  { question: 'How do I increase my trust score?', answer: 'Complete jobs on time, maintain a strong payment history, and keep your profile verified.', category: 'Trust Score' },
];

const supportChannels = [
  { icon: Mail, title: 'Email Support', description: 'Send us detailed queries', contact: 'support@roota.ai', avgResponse: '2-4 hours' },
  { icon: MessageCircle, title: 'Live Chat', description: 'Chat with our team in real-time', contact: 'Available 9 AM - 6 PM WAT', avgResponse: 'Instant' },
  { icon: Phone, title: 'Phone Support', description: 'Call us for urgent issues', contact: '+234 (0) 123-456-7890', avgResponse: 'Immediate' },
  { icon: MessageSquare, title: 'Community Forum', description: 'Connect with other workers', contact: 'Join our Discord community', avgResponse: 'Peer support' },
];

const ticketStatuses = [
  { id: 'TICKET-2401', subject: 'Withdrawal not received', status: 'resolved', date: 'May 10, 2026' },
  { id: 'TICKET-2398', subject: 'Profile verification pending', status: 'in-progress', date: 'May 8, 2026' },
  { id: 'TICKET-2395', subject: 'Job application issue', status: 'resolved', date: 'May 5, 2026' },
];

export default function WorkerSupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({ subject: '', category: 'Getting Started', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (formData.subject.trim() && formData.message.trim()) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ subject: '', category: 'Getting Started', message: '' }); }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-[#DDF6E9] text-primary';
      case 'in-progress': return 'bg-[#FFF1D9] text-[#B7791F]';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved': return <CheckCircle size={16} />;
      case 'in-progress': return <Clock size={16} />;
      default: return <AlertCircle size={16} />;
    }
  };

  return (
    <div className="space-y-8">
      <Section title="Get Help" description="Choose your preferred way to contact us">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {supportChannels.map((channel, idx) => { const Icon = channel.icon; return (<motion.div key={idx} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary-dark/30 transition-colors"><div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-primary-dark"><Icon size={20} /></div><h3 className="mb-1 font-semibold text-slate-900">{channel.title}</h3><p className="mb-4 text-sm text-muted">{channel.description}</p><div className="space-y-2 border-t border-border/50 pt-4"><p className="text-sm font-medium text-slate-900">{channel.contact}</p><p className="text-xs text-muted">Avg response: {channel.avgResponse}</p></div></motion.div>); })}
        </div>
      </Section>

      <Section title="Submit a Ticket" description="Tell us how we can help">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="space-y-5 max-w-2xl">
            <div><label className="mb-2 block text-sm font-medium text-slate-900">Subject</label><input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Brief description of your issue" className="input w-full" /></div>
            <div><label className="mb-2 block text-sm font-medium text-slate-900">Category</label><select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input w-full">{['Getting Started', 'Trust Score', 'Payments', 'Payroll', 'Security', 'Other'].map((cat) => (<option key={cat} value={cat}>{cat}</option>))}</select></div>
            <div><label className="mb-2 block text-sm font-medium text-slate-900">Message</label><textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Provide detailed information to help us assist you better" rows={5} className="input w-full resize-none" /></div>
            <motion.button whileHover={{ y: -2 }} onClick={handleSubmit} className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${submitted ? 'bg-green-600 text-white' : 'bg-primary-dark text-white hover:bg-primary-dark/90'}`}>{submitted ? (<><CheckCircle size={18} />Ticket submitted!</>) : (<><Send size={18} />Submit Ticket</>)}</motion.button>
          </div>
        </motion.div>
      </Section>

      <Section title="Your Support Tickets" description="Track the status of your requests">
        <div className="space-y-3">{ticketStatuses.map((ticket, idx) => (<motion.div key={ticket.id} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} className="flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary-dark/30"><div><p className="font-semibold text-slate-900">{ticket.subject}</p><p className="text-sm text-muted">{ticket.id} • {ticket.date}</p></div><span className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusColor(ticket.status)}`}>{getStatusIcon(ticket.status)}{ticket.status === 'resolved' ? 'Resolved' : 'In Progress'}</span></motion.div>))}</div>
      </Section>

      <Section title="Frequently Asked Questions" description="Find answers to common questions">
        <div className="space-y-3">{faqs.map((faq, idx) => (<motion.div key={idx} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="overflow-hidden rounded-xl border border-border bg-card"><button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)} className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50"><div><p className="font-semibold text-slate-900">{faq.question}</p><p className="mt-1 text-xs text-muted">{faq.category}</p></div><span className={`flex-shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`}>▼</span></button>{expandedFaq === idx && (<div className="border-t border-border bg-slate-50 px-5 py-4 text-sm leading-6 text-slate-700">{faq.answer}</div>)}</motion.div>))}</div>
      </Section>
    </div>
  );
}
