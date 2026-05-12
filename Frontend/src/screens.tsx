import type { ReactNode } from 'react';
import { createContext, useContext, useState, ReactNode as RN } from 'react';
import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './roota.css';

type ActiveTab = 'dashboard' | 'jobs' | 'finances' | 'insights';
type WorkspaceMode = 'worker' | 'employer' | 'finance' | 'insights';

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: 'worker' | 'employer' | null;
  login: (role: 'worker' | 'employer') => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: RN }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'worker' | 'employer' | null>(null);

  const login = (role: 'worker' | 'employer') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true, userRole: role }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('auth');
  };

  return <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

function ProtectedRoute({ children, allowedRoles }: { children: RN; allowedRoles?: Array<'worker' | 'employer'> }) {
  const { isAuthenticated, userRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/role" replace />;
  }

  return <>{children}</>;
}

const tabs: Array<{ to: string; label: string; tab: ActiveTab }> = [
  { to: '/worker', label: 'Dashboard', tab: 'dashboard' },
  { to: '/marketplace', label: 'Jobs', tab: 'jobs' },
  { to: '/finances', label: 'Finances', tab: 'finances' },
  { to: '/insights', label: 'Insights', tab: 'insights' },
];

const landingFeatures = [
  {
    title: 'Verified Jobs',
    body: 'Direct access to vetted global roles that contribute directly to your career reputation and score.',
    icon: 'briefcase',
    tone: 'light',
  },
  {
    title: 'Smart Payroll',
    body: 'Seamless cross-border payments with integrated tax compliance and instant withdrawal options.',
    icon: 'card',
    tone: 'green',
  },
  {
    title: 'AI Insights',
    body: 'Real-time feedback on your professional growth and actionable steps to increase your Trust Score.',
    icon: 'insight',
    tone: 'sand',
  },
] as const;

const payrollTiles = [
  {
    title: 'Global Wallets',
    body: 'Receive payments in USD, EUR, or Local Currency instantly.',
    kind: 'large',
  },
  {
    title: 'Automated Tax',
    body: 'Smart compliance tracking for 50+ countries.',
    kind: 'dark',
  },
  { title: 'Instant Payouts', body: '', kind: 'compact' },
  { title: 'Employer Portal', body: '', kind: 'mint' },
] as const;

const marketplaceCards = [
  {
    title: 'Senior Systems Architect',
    company: 'Luminary Wealth Systems',
    pay: '$12,500 - $18,000',
    score: '892',
    badge: 'PERFECT MATCH',
    matchTone: 'mint',
  },
  {
    title: 'Lead Product Designer',
    company: 'Oasis Capital Partners',
    pay: '$9,000 - $14,000',
    score: '750',
    badge: '92% COMPATIBILITY',
    matchTone: 'lavender',
  },
  {
    title: 'Director of AI Trust',
    company: 'Vertex Intelligence',
    pay: '$20,000 - $25,000',
    score: '950',
    badge: 'PERFECT MATCH',
    matchTone: 'mint',
  },
  {
    title: 'Growth Lead, Sub-Saharan',
    company: 'NairaFlow Technologies',
    pay: '$10,000 - $15,000',
    score: '810',
    badge: '88% COMPATIBILITY',
    matchTone: 'lavender',
  },
] as const;

const workerJobs = [
  ['Senior RLHF Fine-Tuning Specialist', 'Anthropic (Via Roota Direct)', '98%'],
  ['Dataset Optimization Lead', 'Scale AI • Remote', '94%'],
  ['AI Ethics Auditor - African Dialects', 'Meta Platforms • Hybrid', '89%'],
] as const;

const workerSkills = [
  ['Python Mastery', 'Lvl 4', 82],
  ['Model Benchmarking', 'Lvl 5', 91],
  ['Arabic Data Labeling', 'In Progress', 54],
] as const;

const employerMetrics = [
  { title: 'Total Payroll (MTD)', value: '$142,850', meta: '+12.5% vs last month', accent: 'positive' },
  { title: 'Active Workers', value: '84', meta: 'across 12 global regions', accent: 'neutral' },
  { title: 'Open Jobs', value: '06', meta: '4 high-priority roles', accent: 'warning' },
] as const;

const payrollRows = [
  ['James Adenuga', 'Lagos, Nigeria', 'AI Model Training', '$3,200.00', 'JA', 'lavender'],
  ['Sarah Kim', 'Seoul, KR', 'Cloud Architecture', '$5,450.00', 'SK', 'mint'],
  ['Marcus Edwards', 'London, UK', 'Product Research', '$1,800.00', 'ME', 'sand'],
] as const;

const talentCards = [
  ['Ananya Patel', 'Full-Stack Dev', '98', ['Python', 'React', 'AWS']],
  ['David Chen', 'ML Engineer', '94', ['PyTorch', 'Kafka']],
] as const;

const transactions = [
  ['Payroll - Project X', '+$4,200.00', 'SUCCESS', 'Oct 24, 2023'],
  ['Bank Withdrawal', '-$1,500.00', 'PENDING', 'Oct 22, 2023'],
  ['Bonus Reward', '+$550.00', 'SUCCESS', 'Oct 20, 2023'],
  ['Subscription Fee', '-$29.00', 'FAILED', 'Oct 18, 2023'],
] as const;

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role" element={<RoleSelectionPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
        <Route path="/worker" element={<ProtectedRoute allowedRoles={['worker']}><WorkerDashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><WorkerDashboardPage /></ProtectedRoute>} />
        <Route path="/employer" element={<ProtectedRoute allowedRoles={['employer']}><EmployerDashboardPage /></ProtectedRoute>} />
        <Route path="/finances" element={<ProtectedRoute><FinancesPage /></ProtectedRoute>} />
        <Route path="/insights" element={<ProtectedRoute><InsightsPage /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const slideInVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  const scaleInVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const floatVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: [0, -10, 0],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div className="page marketing-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <header className="marketing-header">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="brand-wordmark">
            Roota
          </Link>
        </motion.div>
        <nav className="marketing-nav">
          {tabs.map((tab, idx) => (
            <motion.div key={tab.tab} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05, duration: 0.5 }}>
              <Link to={tab.to} className={tab.tab === 'dashboard' ? 'active' : ''}>
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

      <main className="landing-stack">
        <section className="hero-section hero-section--dark">
          <motion.div className="hero-copy" variants={containerVariants} initial="hidden" animate="visible">
            <motion.span className="eyebrow eyebrow--hero" variants={itemVariants}>
              Rooted in Trust
            </motion.span>
            <motion.h1 variants={itemVariants}>
              Powering Africa&apos;s <span>Economic Roots.</span>
            </motion.h1>
            <motion.p variants={itemVariants}>
              Building the world&apos;s most trusted AI-driven workforce ecosystem. We empower African talent with verified financial
              identities and global employment opportunities.
            </motion.p>
            <motion.div className="hero-actions" variants={itemVariants}>
              <Link to="/role" className="pill-button pill-button--solid">
                Join as Worker
              </Link>
              <Link to="/marketplace" className="pill-button pill-button--ghost">
                Hire Talent
              </Link>
            </motion.div>
          </motion.div>

          <motion.div className="hero-orbit-card" variants={scaleInVariants} initial="hidden" animate="visible">
            <motion.div className="hero-orbit-card__primary" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}>
              <div>
                <span>Active Talent Pool</span>
                <strong>124,500+</strong>
              </div>
              <span className="mini-circle">↗</span>
            </motion.div>
            <motion.div className="hero-orbit-card__secondary" animate={{ y: [0, 8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}>
              <div>
                <span>Verified Identities</span>
                <strong>98.4</strong>
              </div>
              <span className="trust-badge">AI Trust Score</span>
            </motion.div>
          </motion.div>
        </section>

        <motion.section
          className="section-block section-block--light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="section-intro" variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>The New Standard of Trust</h2>
            <p>
              We leverage proprietary AI to analyze work history, technical proficiency, and reliability to create a portable financial
              identity for every worker.
            </p>
          </motion.div>
          <motion.div className="feature-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {landingFeatures.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <FeatureTile {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="identity-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div variants={scaleInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <TrustRing value="845" label="Identity Verified" corner="Top 1%" />
          </motion.div>
          <motion.div className="identity-copy" variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Your Professional Identity, Quantified.</h2>
            <p>
              Forget traditional resumes. Roota&apos;s AI Trust Score aggregates your delivery speed, skill proficiency, and client
              satisfaction into a single, verifiable metric that global employers trust.
            </p>
            <ul>
              <li>Portable financial reputation across platforms</li>
              <li>Instant verification for banking and credit</li>
              <li>AI-driven career path recommendations</li>
            </ul>
            <Link to="/auth" className="pill-button pill-button--solid pill-button--small dark-shadow">
              Get Your Score Free
            </Link>
          </motion.div>
        </motion.section>

        <motion.section
          className="section-block section-block--dark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="section-intro section-intro--light" variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2>Payroll for Everyone, Everywhere.</h2>
            <p>
              From individual freelancers to large-scale enterprises, we handle the complexities of global finance so you can focus on
              work.
            </p>
          </motion.div>
          <motion.div className="payroll-grid" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {payrollTiles.map((tile) => (
              <motion.article key={tile.title} variants={itemVariants} className={`payroll-tile payroll-tile--${tile.kind}`}>
                <div className="payroll-tile__visual" />
                <div>
                  <h3>{tile.title}</h3>
                  {tile.body ? <p>{tile.body}</p> : null}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="cta-banner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Ready to plant your roots?
          </motion.h2>
          <motion.p variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            Whether you&apos;re looking for the best talent in Africa or aiming to build your professional reputation, Roota is your
            engine for growth.
          </motion.p>
          <motion.div className="hero-actions hero-actions--centered" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={itemVariants}>
              <Link to="/role" className="pill-button pill-button--light">
                Join as Worker
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/marketplace" className="pill-button pill-button--ghost-light">
                Hire Talent
              </Link>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>

      <MarketingFooter />
    </motion.div>
  );
}

function RoleSelectionPage() {
  return (
    <div className="page role-page">
      <SimpleHeader left="Roota" right={<Link to="/auth">Back to home</Link>} />

      <main className="role-layout">
        <section className="role-intro">
          <span className="eyebrow eyebrow--soft">Welcome to the Wealth Oasis</span>
          <h1>
            How will you plant your <span>roots</span> today?
          </h1>
          <p>
            Select your path to start building your economic future. Roota connects African talent with global opportunities.
          </p>
        </section>

        <section className="role-cards">
          <ChoiceCard
            title="Join as a Worker"
            body="Find high-value projects, build your trust score, and secure your financial growth."
            action="Start Earning"
            to="/auth"
            variant="worker"
          />
          <ChoiceCard
            title="Hire as an Employer"
            body="Access top-tier verified talent across the continent and scale your vision with speed."
            action="Find Talent"
            to="/marketplace"
            variant="employer"
          />
        </section>
      </main>

      <MarketingFooter minimal />
    </div>
  );
}

function AuthPage() {
  return (
    <div className="page auth-page">
      <SimpleHeader left="Roota" right={<Link to="/">Back to home</Link>} />

      <main className="auth-layout">
        <section className="auth-visual">
          <div className="auth-visual__panel">
            <span className="eyebrow eyebrow--gold">Global Standard</span>
            <h2>Secure Your Wealth Frontier</h2>
            <p>
              Roota leverages advanced AI to provide an immutable Trust Score, bridging African talent with global high-value
              opportunities.
            </p>
          </div>

          <div className="auth-visual__chips">
            <div>
              <strong>98.2%</strong>
              <span>Avg. Trust Growth</span>
            </div>
            <div>
              <strong>24/7</strong>
              <span>AI Monitoring</span>
            </div>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-tabs">
            <button className="auth-tabs__button auth-tabs__button--active" type="button">
              Sign Up
            </button>
            <button className="auth-tabs__button" type="button">
              Login
            </button>
          </div>

          <div className="auth-copy">
            <h2>Create your account</h2>
            <p>Join the network of futuristic professionals today.</p>
          </div>

          <div className="auth-socials">
            <button type="button" className="social-button">
              <span className="social-button__mark social-button__mark--google" /> Google
            </button>
            <button type="button" className="social-button">
              <span className="social-button__mark social-button__mark--linkedin" /> LinkedIn
            </button>
          </div>

          <div className="divider">OR CONTINUE WITH</div>

          <form className="auth-form">
            <label>
              Full Name
              <input defaultValue="Chinua Achebe" />
            </label>
            <label>
              Email Address
              <input defaultValue="chinua@roota.future" />
            </label>
            <label>
              Password
              <div className="input-shell">
                <input type="password" defaultValue="password" />
                <span className="field-icon">◦</span>
              </div>
            </label>
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
            <button type="submit" className="pill-button pill-button--solid pill-button--block">
              Create Account
            </button>
          </form>
        </section>
      </main>

      <MarketingFooter auth />
    </div>
  );
}

function MarketplacePage() {
  return (
    <WorkspaceShell
      activeTab="jobs"
      mode="employer"
      title="Job Marketplace"
      subtitle="Find premium opportunities powered by Roota Intelligence."
    >
      <div className="marketplace-grid">
        <section className="search-panel">
          <input className="search-panel__input" placeholder="Search for roles, technologies, or keywords..." />
          <div className="search-panel__fields">
            <FilterField label="SKILLS" value="React, Node.js, Python" />
            <FilterField label="LOCATION" value="Lagos, Nigeria" />
            <FilterField label="ROLE TYPE" value="Full-time" />
            <button className="pill-button pill-button--solid pill-button--block" type="button">
              Apply Filters
            </button>
          </div>
        </section>

        <aside className="market-sidebar-panel">
          <div className="market-sidebar-stack">
            <div className="sidebar-list-card">
              <h3>AI Suggested for You</h3>
              <div className="suggestion-item">
                <span className="suggestion-icon">↯</span>
                <div>
                  <strong>Senior FinTech Lead</strong>
                  <p>98% Match based on your score</p>
                </div>
              </div>
              <div className="suggestion-item">
                <span className="suggestion-icon">✦</span>
                <div>
                  <strong>Product Strategist</strong>
                  <p>85% Match • Lagos-based</p>
                </div>
              </div>
            </div>

            <div className="sidebar-list-card sidebar-list-card--filters">
              <h4>Pay Range</h4>
              <label><input type="checkbox" /> $50k - $100k</label>
              <label><input type="checkbox" /> $100k - $200k</label>
              <label><input type="checkbox" defaultChecked /> $200k+</label>
              <h4>Minimum Trust Score</h4>
              <div className="slider-track">
                <span />
              </div>
              <div className="slider-scale">
                <span>500</span>
                <span>750+</span>
                <span>999</span>
              </div>
            </div>
          </div>

          <div className="upgrade-card upgrade-card--gold">
            <div>
              <strong>Upgrade to Pro</strong>
              <p>Unlock AI-powered matches and higher visibility.</p>
            </div>
            <button type="button" className="pill-button pill-button--gold pill-button--block pill-button--small">
              Go Premium
            </button>
          </div>

          <div className="sidebar-links">
            <a href="#support">Support</a>
            <a href="#logout">Logout</a>
          </div>
        </aside>

        <section className="market-cards-grid">
          {marketplaceCards.map((card) => (
            <JobCard key={card.title} {...card} />
          ))}
        </section>
      </div>
    </WorkspaceShell>
  );
}

function WorkerDashboardPage() {
  return (
    <WorkspaceShell activeTab="dashboard" mode="worker" title="Dashboard" subtitle="">
      <div className="worker-grid">
        <section className="profile-card panel panel--wide">
          <div className="profile-photo profile-photo--worker" />
          <div className="profile-content">
            <span className="identity-pill identity-pill--peach">Verified Economic Identity</span>
            <h2>Marcus Chen</h2>
            <p>Lagos, Nigeria • Senior AI Data Strategist</p>
            <div className="tag-row">
              <Tag>Pytorch</Tag>
              <Tag>Prompt Engineering</Tag>
              <Tag>LLM Tuning</Tag>
              <Tag>SQL</Tag>
              <Tag>+4 More</Tag>
            </div>
          </div>
        </section>

        <section className="score-card panel">
          <div className="panel-kicker">AI TRUST SCORE</div>
          <TrustRing value="850" label="/ 1000" compact pill="Elite Tier (Top 2%)" />
        </section>

        <section className="panel recommendation-panel panel--wide">
          <PanelHeader title="Recommended Jobs" action="See All" sparkle />
          <div className="recommendation-list">
            {workerJobs.map(([jobTitle, company, pct]) => (
              <RecommendationRow key={jobTitle} title={jobTitle} company={company} score={pct} active={jobTitle.includes('RLHF')} />
            ))}
          </div>
        </section>

        <section className="panel earnings-panel">
          <PanelHeader title="Recent Earnings" value="$12,450" />
          <MiniBarChart activeIndex={3} />
          <div className="payout-pill">
            <span>Next Payout</span>
            <strong>In 48 Hours</strong>
          </div>
        </section>

        <section className="panel skill-panel">
          <h3>Skill Verification</h3>
          <div className="skill-list">
            {workerSkills.map(([name, level, percent]) => (
              <SkillRow key={name} name={name} level={level} value={percent} />
            ))}
          </div>
          <button type="button" className="pill-button pill-button--ghost pill-button--block pill-button--outline">
            Verify New Skill
          </button>
        </section>

        <section className="panel insight-panel panel--wide">
          <h3>AI Opportunity Insights</h3>
          <div className="insight-columns">
            <InsightBlock title="High Demand Alert" body="Swahili NLP experts are earning 1.5x more this week. Update your language profile." />
            <InsightBlock title="Trust Score Tip" body="Complete the 'Adversarial Testing' bootcamp to increase your trust score by 40 pts." />
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}

function EmployerDashboardPage() {
  return (
    <WorkspaceShell activeTab="dashboard" mode="employer" title="Dashboard" subtitle="" showSearch>
      <div className="employer-grid">
        <section className="metrics-grid">
          {employerMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </section>

        <section className="panel payroll-panel panel--wide">
          <PanelHeader title="Pending Payroll" subtitle="Review and approve contractor payments" actionButton="Pay All" />
          <div className="table-head">
            <span>WORKER</span>
            <span>PROJECT</span>
            <span>AMOUNT</span>
            <span>ACTION</span>
          </div>
          <div className="table-body">
            {payrollRows.map(([name, location, project, amount, initials, tone]) => (
              <PayrollRow key={name} name={name} location={location} project={project} amount={amount} initials={initials} tone={tone} />
            ))}
          </div>
        </section>

        <section className="panel talent-panel">
          <PanelHeader title="Top Talent" actionBadge="AI Matched" />
          <div className="talent-stack">
            {talentCards.map(([name, role, score, skills]) => (
              <TalentCard key={name} name={name} role={role} score={score} skills={skills} />
            ))}
          </div>
        </section>

        <section className="panel activity-panel panel--wide">
          <h3>Recent Hires Activity</h3>
          <div className="activity-row">
            <ActivityItem title="Bayo Omoboriowo" body="Onboarded 2h ago" icon="user-add" />
            <ActivityItem title="Elena Rodriguez" body="Contract Signed" icon="document" />
            <ActivityItem title="Liam Wilson" body="Trust Score Verified" icon="shield" />
            <ActivityItem title="Sophia Muller" body="Offer Extended" icon="send" />
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}

function FinancesPage() {
  return (
    <WorkspaceShell activeTab="finances" mode="finance" title="Wallet" subtitle="">
      <div className="finance-grid">
        <section className="balance-card panel panel--hero">
          <div className="balance-card__top">
            <div>
              <span>Available Balance</span>
              <strong>$24,580.45</strong>
            </div>
            <span className="wallet-glyph">▣</span>
          </div>
          <div className="balance-metrics">
            <div>
              <span>MONTHLY YIELD</span>
              <strong>+4.2%</strong>
            </div>
            <div>
              <span>LOCKED REWARDS</span>
              <strong>$1,200.00</strong>
            </div>
          </div>
          <div className="balance-card__holder">
            <span>Account Holder</span>
            <strong>ALEXANDER ROOTAI</strong>
          </div>
          <div className="balance-dots">
            <span />
            <span />
          </div>
        </section>

        <section className="finance-actions">
          <ActionCard tone="green" title="Send Money" body="Instant transfers to any global account" icon="paper-plane" />
          <ActionCard tone="white" title="Withdraw" body="Transfer funds to your local bank" icon="bank" />
        </section>

        <section className="panel earnings-history-panel">
          <PanelHeader title="Monthly Earnings" subtitle="Payroll history for the last 6 months" menu />
          <div className="blank-chart" />
          <div className="month-row">
            <span>JAN</span>
            <span>FEB</span>
            <span>MAR</span>
            <span className="active">APR</span>
            <span>MAY</span>
            <span>JUN</span>
          </div>
        </section>

        <section className="panel transactions-panel">
          <PanelHeader title="Recent Transactions" action="View All" />
          <div className="transaction-list">
            {transactions.map(([title, amount, status, date]) => (
              <TransactionRow key={title} title={title} amount={amount} status={status} date={date} />
            ))}
          </div>
        </section>

        <section className="panel optimizer-panel panel--wide">
          <div className="optimizer-ring-wrap">
            <TrustRing value="850" label="TRUST SCORE" compact />
          </div>
          <div className="optimizer-copy">
            <h3>AI Wealth Optimizer</h3>
            <p>
              Based on your consistent payroll history and low failure rate, your trust score has increased. You are now eligible
              for 0.5% lower transaction fees and early payout features.
            </p>
            <div className="chip-row">
              <Tag>Verified Earner</Tag>
              <Tag>High Stability</Tag>
            </div>
          </div>
          <button type="button" className="pill-button pill-button--solid pill-button--compact">
            Claim Reward
          </button>
        </section>
      </div>
    </WorkspaceShell>
  );
}

function InsightsPage() {
  return (
    <WorkspaceShell activeTab="insights" mode="insights" title="Overview" subtitle="" showSearch>
      <div className="insights-grid">
        <section className="metric-strip">
          <MetricCard title="Total GTV" value="$4.82M" meta="+12.4% vs LY" tone="compact" />
          <section className="panel growth-card">
            <div className="growth-card__header">
              <h3>Active Users Growth</h3>
              <span className="real-time-chip">Real-time</span>
            </div>
            <MiniBarChart bars={[34, 46, 38, 56, 52, 72, 86]} labels={['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV']} activeIndex={6} compact />
          </section>
          <section className="panel placement-card">
            <TrustRing value="88%" label="Placement Rate" compact pill="Goal: 90%" />
          </section>
        </section>

        <section className="panel map-panel panel--wide">
          <PanelHeader title="Regional Distribution" actionButton="Export Map" />
          <div className="africa-map" />
        </section>

        <section className="panel insights-panel-stack">
          <div className="insight-card-stack__header">
            <span className="panel-icon">◌</span>
            <h3>AI Insights</h3>
          </div>
          <InsightBlock title="Growth Forecast" body="Active users in West Africa are projected to increase by 18.5% next quarter based on current hiring velocity." />
          <InsightBlock title="Risk Alert" body="Flagged profiles have increased in the Creative sector. Verification wait times have risen to 4.2 hours." alert />
          <div className="insight-block insight-block--dark">
            <strong>Investor Recommendation</strong>
            <p>Increase seed liquidity for Fintech-specific roles to capture emerging Q3 demand from European partners.</p>
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}

function WorkspaceShell({
  activeTab,
  mode,
  title,
  subtitle,
  showSearch = false,
  children,
}: {
  activeTab: ActiveTab;
  mode: WorkspaceMode;
  title: string;
  subtitle: string;
  showSearch?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`workspace-page workspace-page--${mode}`}>
      <aside className="workspace-sidebar">
        <BrandBlock compact={mode !== 'worker'} />

        <nav className="workspace-sidebar__nav">
          <SidebarLink to="/worker" icon="grid" label="Overview" active={activeTab === 'dashboard'} />
          <SidebarLink to="/marketplace" icon="bag" label="Marketplace" active={activeTab === 'jobs'} />
          <SidebarLink to="/finances" icon="wallet" label="Wallet" active={activeTab === 'finances'} />
          <SidebarLink to="/insights" icon="shield" label="AI Trust Score" active={activeTab === 'insights'} />
          <SidebarLink to="#settings" icon="gear" label="Settings" />
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
      </aside>

      <main className="workspace-main">
        <header className="workspace-topbar">
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
            <Link to={mode === 'worker' ? '/marketplace' : '/marketplace'} className="pill-button pill-button--solid pill-button--small">
              Hire Talent
            </Link>
            <div className={`avatar avatar--${mode}`} />
          </div>
        </header>

        <section className={`workspace-content workspace-content--${activeTab}`}>
          <div className="page-heading">
            <h1>{title}</h1>
            {subtitle ? <p>{subtitle}</p> : null}
          </div>
          {children}
        </section>
      </main>
    </div>
  );
}

function BrandBlock({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-block ${compact ? 'brand-block--compact' : ''}`}>
      <div className="brand-mark">✦</div>
      <div>
        <div className="brand-name">Roota AI</div>
        <div className="brand-subtitle">Premium Workforce</div>
      </div>
    </div>
  );
}

function SidebarLink({ to, label, icon, active = false }: { to: string; label: string; icon: string; active?: boolean }) {
  return (
    <NavLink to={to} className={({ isActive }) => `sidebar-link ${active || isActive ? 'sidebar-link--active' : ''}`}>
      <span className={`sidebar-link__icon sidebar-link__icon--${icon}`} />
      {label}
    </NavLink>
  );
}

function FeatureTile({ title, body, icon, tone }: { title: string; body: string; icon: string; tone: string }) {
  return (
    <article className={`feature-tile feature-tile--${tone}`}>
      <div className={`feature-tile__icon feature-tile__icon--${icon}`} />
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function TrustRing({
  value,
  label,
  compact = false,
  pill,
  corner,
}: {
  value: string;
  label: string;
  compact?: boolean;
  pill?: string;
  corner?: string;
}) {
  return (
    <div className={`trust-ring ${compact ? 'trust-ring--compact' : ''}`}>
      {corner ? <span className="trust-ring__corner">{corner}</span> : null}
      <div className="trust-ring__circle">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>
      {pill ? <div className="trust-ring__pill">{pill}</div> : null}
    </div>
  );
}

function ChoiceCard({
  title,
  body,
  action,
  to,
  variant,
}: {
  title: string;
  body: string;
  action: string;
  to: string;
  variant: 'worker' | 'employer';
}) {
  return (
    <Link to={to} className="choice-card">
      <div className={`choice-card__media choice-card__media--${variant}`} />
      <div className="choice-card__content">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="choice-card__action">
          <span>{action.toUpperCase()}</span>
          <span className="choice-arrow">›</span>
        </div>
      </div>
    </Link>
  );
}

function MarketingFooter({ minimal = false, auth = false }: { minimal?: boolean; auth?: boolean }) {
  return (
    <footer className={`marketing-footer ${minimal ? 'marketing-footer--minimal' : ''} ${auth ? 'marketing-footer--auth' : ''}`}>
      <div>
        <div className="brand-name">Roota</div>
        <p>
          {auth ? '© 2026 Roota. Built for the African Future.' : 'Building Africa&apos;s professional future with AI-driven trust.'}
        </p>
      </div>
      <nav>
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#help">Help Center</a>
        <a href="#contact">Contact Support</a>
      </nav>
    </footer>
  );
}

function SimpleHeader({ left, right }: { left: string; right: ReactNode }) {
  return (
    <header className="simple-header">
      <Link to="/" className="brand-wordmark">
        {left}
      </Link>
      <div className="simple-header__right">{right}</div>
    </header>
  );
}

function FilterField({ label, value }: { label: string; value: string }) {
  return (
    <label className="filter-field">
      <span>{label}</span>
      <div>{value}</div>
    </label>
  );
}

function JobCard({
  title,
  company,
  pay,
  score,
  badge,
  matchTone,
}: {
  title: string;
  company: string;
  pay: string;
  score: string;
  badge: string;
  matchTone: 'mint' | 'lavender';
}) {
  return (
    <article className="job-card">
      <div className="job-card__top">
        <span className="job-card__logo" />
        <span className={`match-pill match-pill--${matchTone}`}>{badge}</span>
      </div>
      <h3>{title}</h3>
      <p>{company}</p>
      <div className="job-card__meta">
        <div>
          <strong>{pay}</strong>
          <span>MONTHLY PAY RATE</span>
        </div>
        <div className="score-chip">
          <span>★</span>
          {score}
        </div>
      </div>
      <button type="button" className="pill-button pill-button--solid pill-button--block pill-button--small">
        Apply with Trust Score <span className="arrow-inline">→</span>
      </button>
    </article>
  );
}

function PanelHeader({
  title,
  subtitle,
  action,
  actionButton,
  actionBadge,
  value,
  menu = false,
  sparkle = false,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  actionButton?: string;
  actionBadge?: string;
  value?: string;
  menu?: boolean;
  sparkle?: boolean;
}) {
  return (
    <div className="panel-header">
      <div className="panel-header__copy">
        <h3>
          {sparkle ? <span className="sparkle-mark">✦</span> : null}
          {title}
        </h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {value ? <strong className="panel-header__value">{value}</strong> : null}
      {action ? <Link to="#" className="panel-header__action">{action}</Link> : null}
      {actionButton ? (
        <button type="button" className="pill-button pill-button--gold pill-button--small">
          {actionButton}
        </button>
      ) : null}
      {actionBadge ? <span className="badge badge--soft">{actionBadge}</span> : null}
      {menu ? <span className="menu-dot">⋮</span> : null}
    </div>
  );
}

function RecommendationRow({ title, company, score, active }: { title: string; company: string; score: string; active?: boolean }) {
  return (
    <div className="recommendation-row">
      <div className="recommendation-row__left">
        <span className="recommendation-row__icon">◫</span>
        <div>
          <strong>{title}</strong>
          <p>{company}</p>
        </div>
      </div>
      <div className="recommendation-row__score">
        {score}%
        <small>AI MATCH</small>
      </div>
      <div className={`row-arrow ${active ? 'row-arrow--active' : ''}`}>›</div>
    </div>
  );
}

function MiniBarChart({ bars, labels, activeIndex, compact = false }: { bars?: number[]; labels?: string[]; activeIndex: number; compact?: boolean }) {
  const values = bars ?? [35, 52, 28, 72, 40];
  const chartLabels = labels ?? ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  return (
    <div className={`mini-chart ${compact ? 'mini-chart--compact' : ''}`}>
      <div className="mini-chart__bars">
        {values.map((value, index) => (
          <span key={`${value}-${index}`} className={index === activeIndex ? 'active' : ''} style={{ height: `${value}%` }} />
        ))}
      </div>
      <div className="mini-chart__labels">
        {chartLabels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function SkillRow({ name, level, value }: { name: string; level: string; value: number }) {
  return (
    <div className="skill-row">
      <div className="skill-row__top">
        <strong>{name}</strong>
        <span>{level}</span>
      </div>
      <div className="skill-row__track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function MetricCard({ title, value, meta, accent, tone = 'default' }: { title: string; value: string; meta: string; accent?: string; tone?: 'default' | 'compact' }) {
  return (
    <article className={`panel metric-card metric-card--${tone}`}>
      <span className="metric-card__label">{title}</span>
      <strong>{value}</strong>
      <p className={accent ? `metric-card__meta metric-card__meta--${accent}` : 'metric-card__meta'}>{meta}</p>
    </article>
  );
}

function PayrollRow({
  name,
  location,
  project,
  amount,
  initials,
  tone,
}: {
  name: string;
  location: string;
  project: string;
  amount: string;
  initials: string;
  tone: string;
}) {
  return (
    <div className="payroll-row">
      <div className="payroll-row__person">
        <span className={`initial-chip initial-chip--${tone}`}>{initials}</span>
        <div>
          <strong>{name}</strong>
          <p>{location}</p>
        </div>
      </div>
      <div className="payroll-row__project">{project}</div>
      <div className="payroll-row__amount">{amount}</div>
      <div className="payroll-row__arrow">›</div>
    </div>
  );
}

function TalentCard({ name, role, score, skills }: { name: string; role: string; score: string; skills: readonly string[] }) {
  return (
    <article className="talent-card">
      <div className="talent-card__top">
        <div className="talent-card__avatar" />
        <div className="talent-card__score">
          <strong>{score}</strong>
          <small>TRUST SCORE</small>
        </div>
      </div>
      <div>
        <h4>{name}</h4>
        <p>{role}</p>
      </div>
      <div className="chip-row chip-row--soft">
        {skills.map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>
      <button type="button" className="pill-button pill-button--ghost pill-button--block pill-button--outline">
        Quick Hire
      </button>
    </article>
  );
}

function ActivityItem({ title, body, icon }: { title: string; body: string; icon: string }) {
  return (
    <div className="activity-item">
      <span className={`activity-item__icon activity-item__icon--${icon}`} />
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    </div>
  );
}

function ActionCard({ tone, title, body, icon }: { tone: 'green' | 'white'; title: string; body: string; icon: string }) {
  return (
    <article className={`action-card action-card--${tone}`}>
      <span className={`action-card__icon action-card__icon--${icon}`} />
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}

function TransactionRow({ title, amount, status, date }: { title: string; amount: string; status: string; date: string }) {
  return (
    <div className="transaction-row">
      <div className="transaction-row__left">
        <span className="transaction-row__icon" />
        <div>
          <strong>{title}</strong>
          <p>{date}</p>
        </div>
      </div>
      <div className="transaction-row__right">
        <strong>{amount}</strong>
        <span className={`status-pill status-pill--${status.toLowerCase()}`}>{status}</span>
      </div>
    </div>
  );
}

function InsightBlock({ title, body, alert = false }: { title: string; body: string; alert?: boolean }) {
  return (
    <article className={`insight-block ${alert ? 'insight-block--alert' : ''}`}>
      <strong>{title}</strong>
      <p>{body}</p>
    </article>
  );
}

function Tag({ children }: { children: ReactNode }) {
  return <span className="chip">{children}</span>;
}

const promoCopy: Record<WorkspaceMode, { title: string; body: string; button: string }> = {
  worker: {
    title: 'Upgrade to Pro',
    body: 'Unlock exclusive high-ticket AI training jobs.',
    button: 'Get Access',
  },
  employer: {
    title: 'Upgrade to Pro',
    body: 'Unlock AI-powered matches and higher visibility.',
    button: 'Go Premium',
  },
  finance: {
    title: 'Upgrade to Pro',
    body: 'Unlock advanced treasury insights.',
    button: 'Get Pro',
  },
  insights: {
    title: 'Upgrade to Pro',
    body: 'Unlock advanced investor analytics.',
    button: 'Get Pro',
  },
};

export default App;