import React, { ReactNode } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BrandBlock } from '../components/common/BrandBlock';
import { Grid, Briefcase, Wallet, ShieldCheck, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

type ActiveTab = 'dashboard' | 'jobs' | 'finances' | 'insights';
type WorkspaceMode = 'worker' | 'employer' | 'finance' | 'insights';

const tabs = [
  { to: '/worker', label: 'Dashboard', tab: 'dashboard' },
  { to: '/marketplace', label: 'Jobs', tab: 'jobs' },
  { to: '/finances', label: 'Finances', tab: 'finances' },
  { to: '/insights', label: 'Insights', tab: 'insights' },
] as const;

const promoCopy = {
  worker: {
    title: 'Upgrade to Pro',
    body: 'Unlock more matches, payouts, and advanced analytics.',
    button: 'Get Pro',
  },
  employer: {
    title: 'Enterprise Plan',
    body: 'Scale your team with dedicated support and custom tools.',
    button: 'Contact Sales',
  },
  finance: {
    title: 'Wealth Management',
    body: 'Optimize your earnings with AI-driven investment advice.',
    button: 'Learn More',
  },
  insights: {
    title: 'Deep Analytics',
    body: 'Get granular data on market trends and performance.',
    button: 'View More',
  },
};

interface WorkspaceShellProps {
  activeTab: ActiveTab;
  mode: WorkspaceMode;
  title: string;
  subtitle: string;
  showSearch?: boolean;
  children: ReactNode;
}

export function WorkspaceShell({
  activeTab,
  mode,
  title,
  subtitle,
  showSearch = false,
  children,
}: WorkspaceShellProps) {
  return (
    <div className={`workspace-page workspace-page--${mode}`}>
      <motion.aside
        className="workspace-sidebar"
        initial={{ opacity: 0, x: -18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <BrandBlock compact={mode !== 'worker'} />

        <nav className="workspace-sidebar__nav">
          <SidebarLink to="/worker" icon={<Grid size={20} />} label="Overview" active={activeTab === 'dashboard'} />
          <SidebarLink to="/marketplace" icon={<Briefcase size={20} />} label="Marketplace" active={activeTab === 'jobs'} />
          <SidebarLink to="/finances" icon={<Wallet size={20} />} label="Wallet" active={activeTab === 'finances'} />
          <SidebarLink to="/insights" icon={<ShieldCheck size={20} />} label="AI Trust Score" active={activeTab === 'insights'} />
          <SidebarLink to="#settings" icon={<Settings size={20} />} label="Settings" />
        </nav>

        <div className={`workspace-promo workspace-promo--${mode}`}>
          <strong>{promoCopy[mode].title}</strong>
          <p>{promoCopy[mode].body}</p>
          <button type="button" className={`pill-button pill-button--block ${mode === 'finance' ? 'pill-button--light' : 'pill-button--gold'}`}>
            {promoCopy[mode].button}
          </button>
        </div>

        <div className="workspace-sidebar__footer">
          <a href="#support">Support</a>
          <a href="#logout">Logout</a>
        </div>
      </motion.aside>

      <motion.main
        className="workspace-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.05 }}
      >
        <motion.header
          className="workspace-topbar"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {showSearch ? <input className="workspace-topbar__search" placeholder="Search talent..." /> : <div className="workspace-topbar__spacer" />}
          <nav className="workspace-topbar__nav">
            {tabs.map((tab) => (
              <NavLink
                key={tab.tab}
                to={tab.to}
                className={({ isActive }) => `topbar-tab ${isActive || activeTab === tab.tab ? 'topbar-tab--active' : ''}`}
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>
          <div className="workspace-topbar__actions">
            <Link to="/role" className="plain-link">
              Switch Role
            </Link>
            <Link to="/marketplace" className="pill-button pill-button--solid pill-button--small">
              Hire Talent
            </Link>
            <div className={`avatar avatar--${mode}`} />
          </div>
        </motion.header>

        <section className={`workspace-content workspace-content--${activeTab}`}>
          {title || subtitle ? (
            <div className="page-heading">
              {title ? <h1>{title}</h1> : null}
              {subtitle ? <p>{subtitle}</p> : null}
            </div>
          ) : null}
          {children}
        </section>
      </motion.main>
    </div>
  );
}

function SidebarLink({ to, label, icon, active = false }: { to: string; label: string; icon: React.ReactNode; active?: boolean }) {
  return (
    <NavLink to={to} className={({ isActive }) => `sidebar-link ${active || isActive ? 'sidebar-link--active' : ''}`}>
      <span className="sidebar-link__icon">{icon}</span>
      {label}
    </NavLink>
  );
}
