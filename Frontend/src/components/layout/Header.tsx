import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/worker', label: 'Dashboard', tab: 'dashboard' },
  { to: '/marketplace', label: 'Jobs', tab: 'jobs' },
  { to: '/finances', label: 'Finances', tab: 'finances' },
  { to: '/insights', label: 'Insights', tab: 'insights' },
] as const;

export function MarketingHeader() {
  return (
    <header className="marketing-header">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Link to="/" className="brand-wordmark">
          Roota
        </Link>
      </motion.div>
      <nav className="marketing-nav">
        {tabs.map((tab, idx) => (
          <motion.div key={tab.tab} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.5 }}>
            <Link to={tab.to}>
              {tab.label}
            </Link>
          </motion.div>
        ))}
      </nav>
      <motion.div className="header-actions" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
        <Link to="/role" className="plain-link">
          Switch Role
        </Link>
        <Link to="/marketplace" className="pill-button pill-button--solid">
          Hire Talent
        </Link>
      </motion.div>
    </header>
  );
}

interface SimpleHeaderProps {
  left: string;
  right: React.ReactNode;
}

export function SimpleHeader({ left, right }: SimpleHeaderProps) {
  return (
    <header className="simple-header">
      <Link to="/" className="brand-wordmark">
        {left}
      </Link>
      <div className="simple-header__right">{right}</div>
    </header>
  );
}
