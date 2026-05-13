'use client';

import { useState, useEffect } from 'react';
import { ArrowUpRight, Users, Briefcase, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedNumber from '../../components/common/AnimatedNumber';

interface Worker {
  id: string;
  name: string;
  location: string;
  project: string;
  amount: string;
  initials: string;
}

interface Talent {
  id: string;
  name: string;
  title: string;
  score: number;
  skills: string[];
}

interface RecentHire {
  id: string;
  name: string;
  action: string;
  timestamp: string;
  icon: string;
}

const mockWorkers: Worker[] = [
  { id: '1', name: 'James Adenuga', location: 'Lagos, Nigeria', project: 'AI Model Training', amount: '$3,200.00', initials: 'JA' },
  { id: '2', name: 'Sarah Kim', location: 'Seoul, KR', project: 'Cloud Architecture', amount: '$5,450.00', initials: 'SK' },
  { id: '3', name: 'Marcus Edwards', location: 'London, UK', project: 'Product Research', amount: '$1,800.00', initials: 'ME' },
];

const mockTalent: Talent[] = [
  { id: '1', name: 'Ananya Patel', title: 'Full-Stack Dev', score: 98, skills: ['Python', 'React', 'AWS'] },
  { id: '2', name: 'David Chen', title: 'ML Engineer', score: 94, skills: ['PyTorch', 'Kafka'] },
];

const mockRecentHires: RecentHire[] = [
  { id: '1', name: 'Bayo Omoboriowo', action: 'Onboarded 2 ago', icon: '👥', timestamp: '2 ago' },
  { id: '2', name: 'Elena Rodriguez', action: 'Contract Signed', icon: '📋', timestamp: 'now' },
  { id: '3', name: 'Liam Wilson', action: 'Trust Score Verified', icon: '✓', timestamp: 'now' },
  { id: '4', name: 'Sophia Muller', action: 'Offer Extended', icon: '🎁', timestamp: 'now' },
];

export default function EmployerDashboard() {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [talent, setTalent] = useState<Talent[]>(mockTalent);
  const [recentHires, setRecentHires] = useState<RecentHire[]>(mockRecentHires);

  // Fetch employer data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
        
        // Fetch payroll workers
        const workersRes = await fetch(`${apiUrl}/api/employer/payroll/`);
        if (workersRes.ok) {
          const workersData = await workersRes.json();
          setWorkers(Array.isArray(workersData.results) ? workersData.results : workersData);
        }

        // Fetch top talent
        const talentRes = await fetch(`${apiUrl}/api/employer/talent/`);
        if (talentRes.ok) {
          const talentData = await talentRes.json();
          setTalent(Array.isArray(talentData.results) ? talentData.results : talentData);
        }

        // Fetch recent hires
        const hiresRes = await fetch(`${apiUrl}/api/employer/recent-hires/`);
        if (hiresRes.ok) {
          const hiresData = await hiresRes.json();
          setRecentHires(Array.isArray(hiresData.results) ? hiresData.results : hiresData);
        }
      } catch (error) {
        console.error('Error fetching employer data:', error);
        // Use mock data as fallback
      }
    };

    fetchData();
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Stats Strip */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <motion.div
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0 }}
          className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Total Payroll (MTD)</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                <AnimatedNumber value={142850} duration={1500} currency="USD" />
              </p>
              <p className="mt-2 text-[13px] text-success font-medium">↑ 12.5% vs last month</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
              <TrendingUp size={20} className="text-primary-dark" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Active Workers</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                <AnimatedNumber value={84} duration={1500} />
              </p>
              <p className="mt-2 text-[13px] text-muted font-medium">across 12 global regions</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
              <Users size={20} className="text-primary-dark" />
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card px-6 py-5 shadow-sm"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Open Jobs</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">
                <AnimatedNumber value={6} duration={1500} />
              </p>
              <p className="mt-2 text-[13px] text-warning font-medium">◆ 4 high-priority roles</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-slate-100 flex items-center justify-center">
              <Briefcase size={20} className="text-primary-dark" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Pending Payroll */}
        <motion.section
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
          className="col-span-1 xl:col-span-2 rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Pending Payroll</h3>
              <p className="text-sm text-muted">Review and approve contractor payments</p>
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-[12px] bg-[#F5A623] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
              💳 Pay All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Worker</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Project</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Amount</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Action</th>
                </tr>
              </thead>
              <tbody>
                {workers.map((worker) => (
                  <tr key={worker.id} className="border-b border-border/50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary-dark/10 flex items-center justify-center text-xs font-bold text-primary-dark">
                          {worker.initials}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{worker.name}</p>
                          <p className="text-xs text-muted">{worker.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-900">{worker.project}</td>
                    <td className="px-4 py-4 font-semibold text-slate-900">{worker.amount}</td>
                    <td className="px-4 py-4">
                      <button className="text-primary-dark hover:text-primary transition-colors">
                        <ArrowUpRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.section>

        {/* Top Talent */}
        <motion.section
          variants={statVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="col-span-1 rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Top Talent</h3>
            <span className="rounded-full bg-[#FFF1D9] px-3 py-1 text-xs font-semibold text-[#B7791F]">AI Matched</span>
          </div>

          <div className="space-y-4">
            {talent.map((person, index) => (
              <div key={person.id} className="rounded-2xl border border-border/60 bg-white p-4 shadow-sm transition-colors hover:border-primary/30">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full ${index === 0 ? 'bg-[#E7F2FE]' : 'bg-[#F0ECE7]'} text-sm font-bold text-slate-900`}>
                      {person.name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">{person.name}</p>
                      <p className="text-xs text-muted">{person.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#F5A623]">{person.score}</p>
                    <p className="text-[10px] uppercase tracking-wider text-muted">Trust Score</p>
                  </div>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {person.skills.map((skill) => (
                    <span key={skill} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>

                <button className="w-full rounded-xl border border-primary-dark bg-white px-3 py-2.5 text-sm font-semibold text-primary-dark transition-all hover:bg-primary-dark hover:text-white">
                  Quick Hire
                </button>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Recent Hires Activity */}
      <motion.section
        variants={statVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
        className="rounded-2xl border border-border bg-card px-6 py-6 shadow-sm"
      >
        <h3 className="mb-6 text-lg font-semibold text-slate-900">Recent Hires Activity</h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {recentHires.map((hire) => (
            <div key={hire.id} className="flex items-center gap-3 rounded-xl border border-border/50 p-4 transition-colors hover:border-primary/30">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg">{hire.icon}</div>
              <div>
                <p className="font-semibold text-slate-900">{hire.name}</p>
                <p className="mt-1 text-xs text-muted">{hire.action}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
