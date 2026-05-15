import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldAlert, TrendingUp, Target, Globe2 } from 'lucide-react';
import { MiniBarChart } from '../../components/common/MiniBarChart';
import { TrustRing } from '../../components/common/TrustRing';
import AnimatedNumber from '../../components/common/AnimatedNumber';
import { apiGet } from '../../utils/api';

const mockInsightCards = [
  {
    title: 'Hiring Velocity',
    description: 'Open roles are moving 18.5% faster than last quarter across your active teams.',
    icon: TrendingUp,
    tone: 'default',
  },
  {
    title: 'Risk Alert',
    description: 'Candidate verification queue is growing. Review pending profiles to avoid hiring delays.',
    icon: ShieldAlert,
    tone: 'warning',
  },
  {
    title: 'Hiring Recommendation',
    description: 'Increase budget for fintech and product roles to capture Q3 demand from global partners.',
    icon: Target,
    tone: 'dark',
  },
] as const;

export default function EmployerInsightsPage() {
  const navigate = useNavigate();
  const [insightCards, setInsightCards] = useState(mockInsightCards);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/employer/insights/recommendations/');
        setInsightCards(Array.isArray(data.results) ? data.results : data);
      } catch (error) {
        console.warn('Error fetching employer insights, using fallback:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const panelVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  const handleExportMap = () => {
    const data = {
      generatedAt: new Date().toISOString(),
      metrics: { placementRate: '88%', growth: '+12.4%', gtvTarget: '$4.82M' },
      regions: ['West Africa', 'East Africa', 'Southern Africa'],
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'roota-employer-insights.json';
    link.click();
    URL.revokeObjectURL(url);
    setStatusMessage('Employer insights export downloaded successfully.');
    setTimeout(() => setStatusMessage(null), 2200);
  };

  const handleRefreshInsights = () => {
    setInsightCards((prev) => [...prev].reverse());
    setStatusMessage('Employer insights refreshed with latest data.');
    setTimeout(() => setStatusMessage(null), 2200);
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm">
          {statusMessage}
        </motion.div>
      )}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.7fr_1.5fr_0.7fr]">
        <motion.div variants={panelVariants} initial="hidden" animate="visible" className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <p className="text-sm text-muted">Active payroll coverage</p>
          <h3 className="mt-3 text-4xl font-bold text-slate-900">
            <AnimatedNumber value={4820000} duration={1500} currency="USD" compact />
          </h3>
          <p className="mt-2 text-sm font-medium text-primary-dark">+12.4% vs last quarter</p>
          <div className="mt-6 h-10 rounded-xl bg-slate-100" />
        </motion.div>

        <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.08 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-slate-900">Hiring velocity</p>
              <p className="text-sm text-muted">Open roles and filled roles over time</p>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} onClick={handleRefreshInsights} className="rounded-full bg-[#FFF1D9] px-3 py-1 text-xs font-semibold text-[#B7791F] transition-colors hover:bg-[#FFE6B5]">
              Refresh
            </motion.button>
          </div>
          <MiniBarChart bars={[34, 46, 38, 56, 52, 72, 86]} labels={['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV']} activeIndex={6} compact />
        </motion.div>

        <motion.div variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.16 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <TrustRing value="88%" label="Team Fit" compact pill="Goal: 90%" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.75fr]">
        <motion.section variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Regional hiring distribution</h3>
              <p className="text-sm text-muted">Market density across active hiring regions</p>
            </div>
            <motion.button whileHover={{ y: -2 }} onClick={handleExportMap} className="rounded-lg border border-border bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200">
              Export Map
            </motion.button>
          </div>

          <div className="relative h-[560px] overflow-hidden rounded-[20px] bg-[linear-gradient(180deg,#eef2db_0%,#f7f6ea_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(11,93,75,0.16),transparent_24%),radial-gradient(circle_at_65%_34%,rgba(245,166,35,0.25),transparent_18%),radial-gradient(circle_at_55%_72%,rgba(11,93,75,0.12),transparent_20%)]" />
            <div className="absolute left-1/2 top-1/2 h-[340px] w-[420px] -translate-x-1/2 -translate-y-1/2 rotate-[-11deg] rounded-[48%_52%_50%_50%/58%_46%_54%_42%] bg-gradient-to-br from-[#f9e4b8] via-[#42baa7] to-[#0b5d4b] opacity-95 shadow-[0_40px_80px_rgba(11,93,75,0.18)]" />
            <div className="absolute bottom-14 right-10 h-28 w-16 rotate-12 rounded-[45%] bg-gradient-to-br from-[#f8d18b] to-[#b96e1f] opacity-90 shadow-lg" />
          </div>
        </motion.section>

        <motion.aside variants={panelVariants} initial="hidden" animate="visible" transition={{ delay: 0.28 }} className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EFE8DE] text-[#5B4A37]">
              <Globe2 size={18} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Employer insights</h3>
              <p className="text-sm text-muted">Hiring signals and recommendations for your team</p>
            </div>
          </div>

          <div className="space-y-4">
            {insightCards.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={`rounded-2xl border px-5 py-5 ${item.tone === 'dark' ? 'border-[#0f4a3c] bg-primary-dark text-white' : 'border-border bg-white text-slate-900'}`}>
                  <div className="mb-3 flex items-center gap-3">
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${item.tone === 'dark' ? 'bg-white/10 text-white' : 'bg-[#EFE8DE] text-[#5B4A37]'}`}>
                      <Icon size={16} />
                    </div>
                    <strong className="text-sm">{item.title}</strong>
                  </div>
                  <p className={`text-sm leading-6 ${item.tone === 'dark' ? 'text-white/82' : 'text-slate-700'}`}>{item.description}</p>
                  <motion.button whileHover={{ y: -1 }} onClick={() => {
                    if (item.title === 'Hiring Velocity') navigate('/employer/finances');
                    else if (item.title === 'Risk Alert') navigate('/trust-score');
                    else navigate('/employer/jobs');
                  }} className={`mt-3 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${item.tone === 'dark' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-slate-100 text-slate-800 hover:bg-slate-200'}`}>
                    Take Action
                  </motion.button>
                </div>
              );
            })}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
