import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/worker/dashboard', label: 'Dashboard', tab: 'dashboard' },
  { to: '/worker/jobs', label: 'Jobs', tab: 'jobs' },
  { to: '/finances', label: 'Finances', tab: 'finances' },
  { to: '/insights', label: 'Insights', tab: 'insights' },
] as const;

export function MarketingHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="text-2xl font-bold text-slate-900 hover:opacity-80 transition-opacity">
            Roota
          </Link>
        </motion.div>

        <nav className="hidden lg:flex items-center gap-8">
          {tabs.map((tab, idx) => (
            <motion.div
              key={tab.tab}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.5 }}
            >
              <NavLink
                to={tab.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-dark border-b-2 border-primary-dark pb-1'
                      : 'text-slate-600 hover:text-slate-900'
                  }`
                }
              >
                {tab.label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/role" className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors">
            Login
          </Link>

          <Link to="/employer/marketplace" className="px-5 py-2.5 bg-primary-dark text-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity">
            Get Started
          </Link>
        </motion.div>
      </div>
    </header>
  );
}

interface SimpleHeaderProps {
  left: string;
  right: React.ReactNode;
}

export function SimpleHeader({ left, right }: SimpleHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-slate-900 hover:opacity-80 transition-opacity">
          {left}
        </Link>

        <div className="flex items-center gap-4">{right}</div>
      </div>
    </header>
  );
}