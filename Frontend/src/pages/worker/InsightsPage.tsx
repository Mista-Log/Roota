import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, easeOut } from 'framer-motion';
import { ShieldAlert, TrendingUp, Target, Globe2, RefreshCw } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import AnimatedNumber from '../../components/common/AnimatedNumber';
import { TrustRing } from '../../components/common/TrustRing';
import { apiGet } from '../../utils/api';

type InsightTone = 'default' | 'warning' | 'dark';

type InsightCard = {
  title: string;
  description: string;
  tone: InsightTone;
  action: 'jobs' | 'profile' | 'wallet';
};

type WorkerProfile = {
  title?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  hourly_rate?: string | number;
  availability?: string;
  verified?: boolean;
  verificationBadge?: string;
};

type JobRecord = {
  id: string | number;
  title?: string;
  company?: string;
  location?: string;
  matchScore?: number | string;
  skills?: string[];
  salary?: string;
  description?: string;
};

type TransactionRecord = {
  id: string | number;
  description?: string;
  desc?: string;
  amount?: string;
  status?: string;
  date?: string;
  created_at?: string;
};

const fallbackProfile: WorkerProfile = {
  title: 'Senior AI Data Strategist',
  location: 'Lagos, Nigeria',
  bio: '',
  skills: ['React', 'TypeScript', 'Data Analysis'],
  hourly_rate: 35,
  availability: 'Open to opportunities',
  verified: true,
  verificationBadge: 'Verified Economic Identity',
};

const fallbackJobs: JobRecord[] = [
  { id: '1', title: 'Senior FinTech Lead', company: 'Acme Corp', location: 'San Francisco, CA', matchScore: 98, skills: ['React', 'Node.js'], salary: '$12,500 - $18,000', description: 'Lead fintech product buildout' },
  { id: '2', title: 'Product Strategist', company: 'Tech Startup', location: 'Remote', matchScore: 85, skills: ['Analytics', 'Strategy'], salary: '$8,000 - $12,000', description: 'Drive product growth strategy' },
];

const fallbackSuggestedJobs: JobRecord[] = [
  { id: '1', title: 'Senior FinTech Lead', company: 'Acme Corp', location: 'San Francisco, CA', matchScore: 98, skills: ['React', 'Node.js'], salary: '$12,500 - $18,000' },
  { id: '2', title: 'Product Strategist', company: 'Tech Startup', location: 'Remote', matchScore: 85, skills: ['Analytics', 'Strategy'], salary: '$8,000 - $12,000' },
];

const fallbackTransactions: TransactionRecord[] = [
  { id: '1', description: 'Payroll - Project X', amount: '+$4,200.00', status: 'SUCCESS', date: 'Oct 24, 2023' },
  { id: '2', description: 'Bonus Reward', amount: '+$550.00', status: 'SUCCESS', date: 'Oct 20, 2023' },
];

function asArray<T>(value: any, fallback: T[]): T[] {
  if (Array.isArray(value?.results)) return value.results;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value)) return value;
  return fallback;
}

function parseAmount(amount?: string) {
  const numeric = Number(String(amount ?? '0').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function regionFromLocation(location?: string) {
  const value = (location ?? '').toLowerCase();
  if (value.includes('nigeria') || value.includes('ghana') || value.includes('west')) return 'West Africa';
  if (value.includes('kenya') || value.includes('uganda') || value.includes('tanzania') || value.includes('east')) return 'East Africa';
  if (value.includes('south')) return 'Southern Africa';
  if (value.includes('egypt') || value.includes('morocco') || value.includes('north')) return 'North Africa';
  return 'Other';
}

function monthLabelFromDate(dateLike?: string) {
  const parsed = dateLike ? new Date(dateLike) : null;
  if (!parsed || Number.isNaN(parsed.getTime())) return 'UNK';
  return parsed.toLocaleString('en-US', { month: 'short' }).toUpperCase();
}

function profileCompletion(profile: WorkerProfile) {
  const values = [profile.title, profile.location, profile.bio, profile.skills, profile.availability];
  const filled = values.filter((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return String(value ?? '').trim().length > 0;
  }).length;
  return Math.round((filled / values.length) * 100);
}

export default function WorkerInsightsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<WorkerProfile>(fallbackProfile);
  const [marketplaceJobs, setMarketplaceJobs] = useState<JobRecord[]>(fallbackJobs);
  const [suggestedJobs, setSuggestedJobs] = useState<JobRecord[]>(fallbackSuggestedJobs);
  const [transactions, setTransactions] = useState<TransactionRecord[]>(fallbackTransactions);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const [profileData, jobsData, suggestedData, transactionsData] = await Promise.all([
        apiGet('/api/auth/workers/me/'),
        apiGet('/api/worker/marketplace/jobs/'),
        apiGet('/api/worker/marketplace/suggested/'),
        apiGet('/api/wallets/transactions/'),
      ]);

      setProfile(profileData?.data ?? profileData ?? fallbackProfile);
      setMarketplaceJobs(asArray<JobRecord>(jobsData?.results ?? jobsData, fallbackJobs));
      setSuggestedJobs(asArray<JobRecord>(suggestedData?.results ?? suggestedData, fallbackSuggestedJobs));
      setTransactions(asArray<TransactionRecord>(transactionsData, fallbackTransactions));
      setStatusMessage('Worker insights refreshed with live data.');
    } catch (error) {
      console.warn('Error fetching worker dashboard data, using fallback:', error);
      setProfile(fallbackProfile);
      setMarketplaceJobs(fallbackJobs);
      setSuggestedJobs(fallbackSuggestedJobs);
      setTransactions(fallbackTransactions);
      setStatusMessage('Live data is unavailable right now. Showing fallback insights.');
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 2200);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const summary = useMemo(() => {
    const earningsThisQuarter = transactions
      .filter((transaction) => parseAmount(transaction.amount) > 0)
      .reduce((sum, transaction) => sum + parseAmount(transaction.amount), 0);

    const monthlyBuckets = transactions.reduce<Record<string, number>>((accumulator, transaction) => {
      const label = monthLabelFromDate(transaction.created_at ?? transaction.date);
      accumulator[label] = (accumulator[label] ?? 0) + Math.max(0, parseAmount(transaction.amount));
      return accumulator;
    }, {});

    const monthlyTrend = Object.entries(monthlyBuckets)
      .slice(-6)
      .map(([label, value]) => ({ label, value }));

    const regionCounts = marketplaceJobs.reduce<Record<string, number>>((accumulator, job) => {
      const region = regionFromLocation(job.location);
      accumulator[region] = (accumulator[region] ?? 0) + 1;
      return accumulator;
    }, {});

    const totalRegions = Object.values(regionCounts).reduce((sum, value) => sum + value, 0) || 1;
    const regionalDistribution = ['West Africa', 'East Africa', 'Southern Africa', 'North Africa', 'Other']
      .filter((region) => (regionCounts[region] ?? 0) > 0)
      .map((region, index) => {
        const colors = ['#0b5d4b', '#0f7a65', '#f5a623', '#b96e1f', '#94a3b8'];
        return {
          region,
          share: Math.round(((regionCounts[region] ?? 0) / totalRegions) * 100),
          density: regionCounts[region] ?? 0,
          color: colors[index] ?? '#0b5d4b',
        };
      });

    const trustScore = Math.min(
      100,
      profileCompletion(profile) + (profile.verified ? 12 : 0) + Math.min(18, suggestedJobs.length * 2)
    );

    return {
      earningsThisQuarter,
      monthlyTrend,
      regionalDistribution,
      trustScore,
      opportunityCount: marketplaceJobs.length,
      suggestedCount: suggestedJobs.length,
      recentTransactions: transactions.slice(0, 5),
    };
  }, [marketplaceJobs, profile, suggestedJobs, transactions]);

  const recommendations: InsightCard[] = [
    {
      title: 'Earnings Growth',
      description: `${summary.earningsThisQuarter > 0 ? '$' + summary.earningsThisQuarter.toLocaleString() : 'No earnings yet'} recorded this quarter from wallet activity.`,
      tone: 'default',
      action: 'wallet',
    },
    {
      title: 'Trust Score Alert',
      description: `Your profile is ${profileCompletion(profile)}% complete. Completing missing fields will improve discovery.`,
      tone: 'warning',
      action: 'profile',
    },
    {
      title: 'Next Best Move',
      description: `${summary.suggestedCount} suggested roles are ready based on your current profile and market activity.`,
      tone: 'dark',
      action: 'jobs',
    },
  ];

  const panelVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
  };

  const monthlyTrendData = summary.monthlyTrend.length > 0 ? summary.monthlyTrend : [{ label: 'N/A', value: 0 }];
  const regionalData = summary.regionalDistribution.length > 0
    ? summary.regionalDistribution
    : [{ region: 'Other', share: 100, density: marketplaceJobs.length, color: '#0b5d4b' }];

  const exportCsv = () => {
    const rows = [
      ['Worker', String(profile.title ?? 'Unknown')],
      ['Location', String(profile.location ?? 'Unknown')],
      ['Profile Completion', `${profileCompletion(profile)}%`],
      ['Trust Score', String(summary.trustScore)],
      ['Opportunities', String(summary.opportunityCount)],
      ['Suggested Roles', String(summary.suggestedCount)],
      ['Earnings This Quarter', String(summary.earningsThisQuarter)],
      [],
      ['Region', 'Opportunity Share (%)', 'Market Density Index'],
      ...regionalData.map((item) => [item.region, String(item.share), String(item.density)]),
      [],
      ['Month', 'Earnings'],
      ...monthlyTrendData.map((item) => [item.label, String(item.value)]),
    ];

    const blob = new Blob([rows.map((row) => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roota-worker-insights.csv';
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Worker insights CSV downloaded successfully.');
    setTimeout(() => setStatusMessage(null), 2200);
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm"
        >
          {statusMessage}
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.7fr_1.5fr_0.7fr]">
        <motion.div variants={panelVariants} initial="hidden" animate="visible" className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <p className="text-sm text-muted">Earnings this quarter</p>
          <h3 className="mt-3 text-4xl font-bold text-slate-900">
            <AnimatedNumber value={summary.earningsThisQuarter || 0} duration={1500} currency="USD" compact />
          </h3>
          <p className="mt-2 text-sm font-medium text-primary-dark">Live wallet activity from the backend feed</p>
          <div className="mt-6 h-10 rounded-xl bg-slate-100" />
        </motion.div>

        <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.08 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">Opportunity Growth</p>
              <p className="text-sm text-muted">Live wallet earnings across the quarter</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} onClick={fetchDashboard} disabled={loading} className="inline-flex items-center gap-2 rounded-full bg-[#FFF1D9] px-3 py-1 text-xs font-semibold text-[#B7791F] transition-colors hover:bg-[#FFE6B5] disabled:cursor-not-allowed disabled:opacity-60">
              <RefreshCw size={14} />
              Refresh
            </motion.button>
          </div>
          <div className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTrendData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '16px', borderColor: '#e2e8f0' }} />
                <Bar dataKey="value" fill="#0b5d4b" radius={[10, 10, 0, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.16 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <TrustRing value={`${summary.trustScore}%`} label="Trust Score" compact pill="Goal: 90%" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.75fr]">
        <motion.section variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Regional distribution</h3>
              <p className="text-sm text-muted">Where your best opportunities are appearing</p>
            </div>
            <motion.button whileHover={{ y: -2 }} onClick={exportCsv} className="rounded-lg border border-border bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Export CSV
            </motion.button>
          </div>

          <div className="rounded-[20px] border border-border bg-white p-6">
            <div className="h-[380px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} layout="vertical" margin={{ top: 8, right: 24, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis type="category" dataKey="region" tickLine={false} axisLine={false} width={120} tick={{ fill: '#334155', fontSize: 12, fontWeight: 600 }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(15, 118, 110, 0.08)' }}
                    formatter={(value, name) => [name === 'share' ? `${value}%` : value, name === 'share' ? 'Opportunity share' : 'Market density']}
                    labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                    contentStyle={{ borderRadius: '16px', borderColor: '#e2e8f0' }}
                  />
                  <Bar dataKey="share" radius={[0, 14, 14, 0]} barSize={20}>
                    {regionalData.map((entry) => (
                      <Cell key={entry.region} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4 sm:grid-cols-4">
              {regionalData.map((item) => (
                <div key={`${item.region}-summary`} className="text-center">
                  <div className="mx-auto mb-2 h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <div className="text-xs font-medium text-muted">{item.region}</div>
                  <div className="mt-1 text-lg font-bold text-slate-900">{item.share}%</div>
                  <div className="text-[11px] text-slate-500">Density {item.density}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.aside variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.28 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFE8DE] text-[#5B4A37]">
              <Globe2 size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Worker insights</h3>
              <p className="text-sm text-muted">Live signals and recommendations for your profile</p>
            </div>
          </div>

          <div className="space-y-4">
            {recommendations.map((item) => {
              const Icon = item.title === 'Earnings Growth' ? TrendingUp : item.title === 'Trust Score Alert' ? ShieldAlert : Target;
              return (
                <div key={item.title} className={`rounded-2xl border px-5 py-5 ${item.tone === 'dark' ? 'border-[#0f4a3c] bg-primary-dark text-white' : 'border-border bg-white text-slate-900'}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${item.tone === 'dark' ? 'bg-white/10 text-white' : 'bg-[#EFE8DE] text-[#5B4A37]'}`}>
                      <Icon size={16} />
                    </div>
                    <strong className="text-sm">{item.title}</strong>
                  </div>
                  <p className={`text-sm leading-6 ${item.tone === 'dark' ? 'text-white/82' : 'text-slate-700'}`}>{item.description}</p>
                  <motion.button
                    whileHover={{ y: -1 }}
                    onClick={() => {
                      if (item.action === 'jobs') navigate('/worker/jobs');
                      else if (item.action === 'wallet') navigate('/worker/finances');
                      else navigate('/worker/settings');
                    }}
                    className={`mt-3 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${item.tone === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}
                  >
                    Take Action
                  </motion.button>
                </div>
              );
            })}
          </div>
        </motion.aside>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <motion.section variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.32 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Recent opportunities</h3>
              <p className="text-sm text-muted">Latest roles surfaced from the marketplace</p>
            </div>
          </div>

          <div className="space-y-3">
            {marketplaceJobs.slice(0, 5).map((job) => (
              <button
                key={job.id}
                type="button"
                onClick={() => navigate(`/worker/jobs/${job.id}`, { state: { job } })}
                className="w-full rounded-2xl border border-border bg-white px-4 py-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{job.title ?? 'Untitled role'}</p>
                    <p className="mt-1 text-sm text-muted">{job.company ?? 'Company unavailable'} • {job.location ?? 'Location unavailable'}</p>
                  </div>
                  <div className="text-right">
                    <span className="rounded-full bg-[#DDF6E9] px-2.5 py-1 text-[10px] font-semibold text-primary-dark">
                      {String(job.matchScore ?? '0')} MATCH
                    </span>
                    <p className="mt-2 text-xs text-slate-500">{job.salary ?? 'Salary not listed'}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        <motion.section variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.4 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Wallet activity</h3>
              <p className="text-sm text-muted">Recent earnings and payouts</p>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
              {summary.suggestedCount} suggestions
            </span>
          </div>

          <div className="space-y-3">
            {summary.recentTransactions.map((transaction) => (
              <div key={transaction.id} className="rounded-xl border border-border/60 px-4 py-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{transaction.description ?? transaction.desc ?? 'Transaction'}</p>
                    <p className="text-xs text-muted">{transaction.date ?? transaction.created_at ?? 'Recently'}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${String(transaction.amount ?? '').startsWith('+') ? 'text-success' : transaction.status === 'FAILED' ? 'text-error' : 'text-slate-900'}`}>
                      {transaction.amount ?? '$0.00'}
                    </p>
                    <span className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${transaction.status === 'SUCCESS' ? 'bg-[#DDF6E9] text-primary' : transaction.status === 'PENDING' ? 'bg-[#FFF1D9] text-[#B7791F]' : 'bg-[#FDECEC] text-error'}`}>
                      {transaction.status ?? 'PENDING'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
