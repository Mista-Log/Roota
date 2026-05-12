import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';

type CardProps = {
  title: string;
  body: string;
  accent?: 'green' | 'gold' | 'mint';
  icon?: string;
};

type JobCardProps = {
  title: string;
  company: string;
  pay: string;
  score: string;
  badge?: string;
};

const routes = [
  { to: '/', label: 'Home' },
  { to: '/role', label: 'Get Started' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/worker', label: 'Dashboard' },
  { to: '/finances', label: 'Finances' },
  { to: '/insights', label: 'Insights' },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/role" element={<RoleSelectionPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/worker" element={<WorkerDashboardPage />} />
      <Route path="/employer" element={<EmployerDashboardPage />} />
      <Route path="/finances" element={<FinancesPage />} />
      <Route path="/insights" element={<InsightsPage />} />
    </Routes>
  );
}

function Shell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">✦</div>
          <div>
            <div className="brand-title">Roota AI</div>
            <div className="brand-subtitle">Premium Workforce</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/worker" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span>◫</span>
            Overview
          </NavLink>
          <NavLink to="/marketplace" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span>⌂</span>
            Marketplace
          </NavLink>
          <NavLink to="/finances" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span>◧</span>
            Wallet
          </NavLink>
          <NavLink to="/insights" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <span>◌</span>
            AI Trust Score
          </NavLink>
          <a className="sidebar-link" href="#settings">
            <span>⚙</span>
            Settings
          </a>
        </nav>

        <div className="sidebar-panel upgrade-card">
          <div className="upgrade-title">Upgrade to Pro</div>
          <p>Unlock more matches, payouts, and advanced analytics.</p>
          <button className="ghost-cta gold">Get Pro</button>
        </div>

        <div className="sidebar-footer">
          <a href="#support">Support</a>
          <a href="#logout">Logout</a>
        </div>
      </aside>

      <main className="shell-main">
        <header className="shell-topbar">
          <div>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          <div className="topbar-actions">
            <input className="search-input" placeholder="Search talent..." />
            <Link className="switch-role" to="/role">
              Switch Role
            </Link>
            <Link className="primary-cta" to="/marketplace">
              Hire Talent
            </Link>
            <div className="avatar">AR</div>
          </div>
        </header>

        <section className={`shell-content ${location.pathname === '/finances' ? 'finances-layout' : ''}`}>
          {children}
        </section>
      </main>
    </div>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-brand">Roota</div>
        <nav className="landing-nav">
          {['Dashboard', 'Jobs', 'Finances', 'Insights'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
          ))}
        </nav>
        <div className="landing-actions">
          <Link to="/role" className="text-link">Switch Role</Link>
          <Link to="/marketplace" className="primary-cta small">Hire Talent</Link>
        </div>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Rooted in Trust</span>
          <h2>Powering Africa&apos;s <span>Economic Roots.</span></h2>
          <p>
            Building the world&apos;s most trusted AI-driven workforce ecosystem. We empower African talent with verified
            financial identities and global employment opportunities.
          </p>
          <div className="hero-actions">
            <Link to="/role" className="primary-cta">Join as Worker</Link>
            <Link to="/marketplace" className="secondary-cta">Hire Talent</Link>
          </div>
        </div>

        <div className="hero-stat-card">
          <div className="mini-card">
            <div className="mini-label">Active Talent Pool</div>
            <div className="mini-value">124,500+</div>
            <div className="mini-foot">Verified identities</div>
          </div>
          <div className="stat-overlay">
            <div>
              <div className="mini-label">AI Trust Score</div>
              <div className="mini-value">98.4</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-band light" id="dashboard">
        <h3>The New Standard of Trust</h3>
        <p>We leverage proprietary AI to analyze work history, technical proficiency, and reliability to create a portable financial identity for every worker.</p>
        <div className="feature-grid">
          <FeatureCard title="Verified Jobs" body="Direct access to vetted global roles that contribute directly to your career reputation and score." icon="⌂" />
          <FeatureCard title="Smart Payroll" body="Seamless cross-border payments with integrated tax compliance and instant withdrawal options." icon="◫" accent="green" />
          <FeatureCard title="AI Insights" body="Real-time feedback on your professional growth and actionable steps to increase your Trust Score." icon="◌" accent="gold" />
        </div>
      </section>

      <section className="identity-section">
        <div className="ring-card">
          <div className="ring-score">845</div>
          <div className="ring-label">Identity Verified</div>
          <div className="top-badge">Top 1%</div>
        </div>
        <div className="identity-copy">
          <h3>Your Professional Identity, Quantified.</h3>
          <p>
            Forget traditional resumes. Roota&apos;s AI Trust Score aggregates your delivery speed, skill proficiency, and client satisfaction into a single, verifiable metric that global employers trust.
          </p>
          <ul>
            <li>Portable financial reputation across platforms</li>
            <li>Instant verification for banking and credit</li>
            <li>AI-driven career path recommendations</li>
          </ul>
          <Link to="/auth" className="dark-cta">Get Your Score Free</Link>
        </div>
      </section>

      <section className="feature-band dark" id="jobs">
        <h3>Payroll for Everyone, Everywhere.</h3>
        <p>From individual freelancers to large-scale enterprises, we handle the complexities of global finance so you can focus on work.</p>
        <div className="payroll-grid">
          <div className="payroll-feature large">
            <div className="payroll-image" />
            <div>
              <h4>Global Wallets</h4>
              <p>Receive payments in USD, EUR, or Local Currency instantly.</p>
            </div>
          </div>
          <div className="payroll-feature">Automated Tax<span>Smart compliance tracking for 50+ countries.</span></div>
          <div className="payroll-feature compact">Instant Payouts</div>
          <div className="payroll-feature mint">Employer Portal</div>
        </div>
      </section>

      <section className="cta-panel">
        <h3>Ready to plant your roots?</h3>
        <p>Whether you&apos;re looking for the best talent in Africa or aiming to build your professional reputation, Roota is your engine for growth.</p>
        <div className="hero-actions centered">
          <Link to="/role" className="primary-cta light">Join as Worker</Link>
          <Link to="/marketplace" className="secondary-cta dark">Hire Talent</Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div>
          <div className="brand-title">Roota</div>
          <p>Building Africa&apos;s professional future with AI-driven trust.</p>
        </div>
        <nav>
          <a href="#product">Product</a>
          <a href="#company">Company</a>
          <a href="#support">Support</a>
        </nav>
      </footer>
    </div>
  );
}

function FeatureCard({ title, body, accent = 'mint', icon = '◫' }: CardProps) {
  return (
    <article className={`feature-card ${accent}`}>
      <div className="feature-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{body}</p>
    </article>
  );
}

function RoleSelectionPage() {
  return (
    <div className="role-page">
      <header className="simple-topbar">
        <div className="landing-brand">Roota</div>
        <div className="simple-topbar-links">
          <Link to="/auth">Login</Link>
          <Link to="/role" className="primary-cta small">Get Started</Link>
        </div>
      </header>

      <main className="role-hero">
        <div className="role-copy">
          <span className="eyebrow soft">Welcome to the Wealth Oasis</span>
          <h2>How will you plant your <span>roots</span> today?</h2>
          <p>Select your path to start building your economic future. Roota connects African talent with global opportunities.</p>
        </div>
        <div className="role-cards">
          <RoleCard title="Join as a Worker" body="Find high-value projects, build your trust score, and secure your financial growth." action="START EARNING" to="/auth" imageClass="worker" />
          <RoleCard title="Hire as an Employer" body="Access top-tier verified talent across the continent and scale your vision with speed." action="FIND TALENT" to="/marketplace" imageClass="employer" />
        </div>
      </main>

      <footer className="landing-footer role-footer">
        <div className="brand-title">Roota</div>
        <nav>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#help">Help Center</a>
          <a href="#contact">Contact Support</a>
        </nav>
      </footer>
    </div>
  );
}

function RoleCard({ title, body, action, to, imageClass }: { title: string; body: string; action: string; to: string; imageClass: string }) {
  return (
    <Link to={to} className="role-card">
      <div className={`role-image ${imageClass}`} />
      <div className="role-card-body">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="role-action">
          <span>{action}</span>
          <span className="arrow-circle">›</span>
        </div>
      </div>
    </Link>
  );
}

function AuthPage() {
  return (
    <div className="auth-page">
      <header className="simple-topbar">
        <div className="landing-brand">Roota</div>
        <div className="simple-topbar-links">
          <Link to="/">Back to home</Link>
        </div>
      </header>

      <main className="auth-grid">
        <section className="auth-hero-panel">
          <div className="auth-overlay-card">
            <span className="eyebrow gold">Global Standard</span>
            <h2>Secure Your Wealth Frontier</h2>
            <p>Roota leverages advanced AI to provide an immutable Trust Score, bridging African talent with global high-value opportunities.</p>
          </div>

          <div className="auth-metrics">
            <div><span>98.2%</span><p>Avg. Trust Growth</p></div>
            <div><span>24/7</span><p>AI Monitoring</p></div>
          </div>
        </section>

        <section className="auth-form-panel">
          <div className="auth-tabs">
            <button className="auth-tab active">Sign Up</button>
            <button className="auth-tab">Login</button>
          </div>
          <h3>Create your account</h3>
          <p>Join the network of futuristic professionals today.</p>

          <div className="social-row">
            <button className="social-btn">Google</button>
            <button className="social-btn">LinkedIn</button>
          </div>

          <div className="divider"><span>OR CONTINUE WITH</span></div>

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
              <input type="password" defaultValue="password" />
            </label>
            <label className="checkbox-row">
              <input type="checkbox" defaultChecked />
              <span>I agree to the Terms of Service and Privacy Policy</span>
            </label>
            <button className="primary-cta form-submit">Create Account</button>
          </form>
        </section>
      </main>

      <footer className="auth-footer">
        <div>
          <div className="brand-title">Roota</div>
          <p>© 2026 Roota. Built for the African Future.</p>
        </div>
        <nav>
          <a href="#terms">Terms of Service</a>
          <a href="#privacy">Privacy Policy</a>
          <a href="#help">Help Center</a>
          <a href="#contact">Contact Support</a>
        </nav>
      </footer>
    </div>
  );
}

function MarketplacePage() {
  return (
    <Shell title="Job Marketplace" subtitle="Find premium opportunities powered by Roota Intelligence.">
      <div className="marketplace-layout">
        <div className="filter-panel">
          <input className="search-box large" placeholder="Search for roles, technologies, or keywords..." />
          <div className="filter-grid">
            <div className="filter-field"><label>SKILLS</label><div>React, Node.js, Python</div></div>
            <div className="filter-field"><label>LOCATION</label><div>Lagos, Nigeria</div></div>
            <div className="filter-field"><label>ROLE TYPE</label><div>Full-time</div></div>
            <button className="primary-cta filter-button">Apply Filters</button>
          </div>
        </div>

        <aside className="suggestion-panel">
          <div className="panel-title">AI Suggested for You</div>
          <div className="suggestion-item">
            <strong>Senior FinTech Lead</strong>
            <span>98% Match based on your score</span>
          </div>
          <div className="suggestion-item">
            <strong>Product Strategist</strong>
            <span>85% Match · Lagos-based</span>
          </div>

          <div className="filter-section">
            <h5>Pay Range</h5>
            <label><input type="checkbox" /> $50k - $100k</label>
            <label><input type="checkbox" /> $100k - $200k</label>
            <label><input type="checkbox" defaultChecked /> $200k+</label>
          </div>
          <div className="filter-section">
            <h5>Minimum Trust Score</h5>
            <div className="slider-track"><span /></div>
            <div className="slider-scale"><span>500</span><span>750+</span><span>999</span></div>
          </div>
        </aside>

        <div className="jobs-grid">
          <JobCard title="Senior Systems Architect" company="Luminary Wealth Systems" pay="$12,500 - $18,000" score="892" badge="PERFECT MATCH" />
          <JobCard title="Lead Product Designer" company="Oasis Capital Partners" pay="$9,000 - $14,000" score="750" badge="92% COMPATIBILITY" />
          <JobCard title="Director of AI Trust" company="Vertex Intelligence" pay="$20,000 - $25,000" score="950" badge="PERFECT MATCH" />
          <JobCard title="Growth Lead, Sub-Saharan" company="NairaFlow Technologies" pay="$10,000 - $15,000" score="810" badge="88% COMPATIBILITY" />
        </div>
      </div>
    </Shell>
  );
}

function JobCard({ title, company, pay, score, badge }: JobCardProps) {
  return (
    <article className="job-card">
      <div className="job-badge-row">
        <span className="company-mark">◫</span>
        <span className="match-pill">{badge}</span>
      </div>
      <h3>{title}</h3>
      <p>{company}</p>
      <div className="job-meta">
        <div>
          <strong>{pay}</strong>
          <span>MONTHLY PAY RATE</span>
        </div>
        <div className="score-pill">★ {score}</div>
      </div>
      <button className="primary-cta full">Apply with Trust Score →</button>
    </article>
  );
}

function WorkerDashboardPage() {
  return (
    <Shell title="Dashboard" subtitle="Your professional profile, trust score, and recommendations at a glance.">
      <div className="dashboard-grid worker-grid">
        <section className="profile-card panel">
          <div className="profile-image">AR</div>
          <div className="profile-copy">
            <div className="verified-pill">Verified Economic Identity</div>
            <h3>Marcus Chen</h3>
            <p>Lagos, Nigeria · Senior AI Data Strategist</p>
            <div className="tag-row">
              <span>PyTorch</span><span>Prompt Engineering</span><span>LLM Tuning</span><span>SQL</span><span>+4 More</span>
            </div>
          </div>
        </section>

        <section className="trust-card panel">
          <div className="panel-label">AI TRUST SCORE</div>
          <div className="score-ring"><span>850</span><small>/1000</small></div>
          <div className="rating-pill">Elite Tier (Top 2%)</div>
        </section>

        <section className="panel recommendations-card">
          <div className="panel-header"><h4>Recommended Jobs</h4><a href="#all">See All</a></div>
          {[['Senior RLHF Fine-Tuning Specialist', 'Anthropic (via Roota Direct)', '98%'], ['Dataset Optimization Lead', 'Scale AI · Remote', '94%'], ['AI Ethics Auditor - African Dialects', 'Meta Platforms · Hybrid', '89%']].map(([title, company, pct]) => (
            <div className="recommendation-row" key={title}>
              <div>
                <strong>{title}</strong>
                <span>{company}</span>
              </div>
              <div className="recommendation-score">{pct}<small>AI MATCH</small></div>
              <div className="circle-arrow">›</div>
            </div>
          ))}
        </section>

        <section className="panel earnings-card">
          <div className="panel-header"><h4>Recent Earnings</h4><strong>$12,450</strong></div>
          <div className="bar-chart">
            <span style={{ height: '35%' }} />
            <span style={{ height: '52%' }} />
            <span style={{ height: '28%' }} />
            <span className="active" style={{ height: '72%' }} />
            <span style={{ height: '40%' }} />
          </div>
          <div className="payout-pill">Next Payout <strong>In 48 Hours</strong></div>
        </section>

        <section className="panel skills-card">
          <h4>Skill Verification</h4>
          {[
            ['Python Mastery', 'Lvl 4', 82],
            ['Model Benchmarking', 'Lvl 5', 91],
            ['Arabic Data Labeling', 'In Progress', 54],
          ].map(([name, level, value]) => (
            <div className="skill-row" key={name as string}>
              <div className="skill-top"><strong>{name as string}</strong><span>{level as string}</span></div>
              <div className="skill-track"><span style={{ width: `${value}%` }} /></div>
            </div>
          ))}
          <button className="secondary-cta full">Verify New Skill</button>
        </section>

        <section className="panel insights-card">
          <h4>AI Opportunity Insights</h4>
          <div className="insight-block">
            <strong>High Demand Alert</strong>
            <p>Swahili NLP experts are earning 1.5x more this week. Update your language profile.</p>
          </div>
          <div className="insight-block">
            <strong>Trust Score Tip</strong>
            <p>Complete the &apos;Adversarial Testing&apos; bootcamp to increase your trust score by 40 pts.</p>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function EmployerDashboardPage() {
  return (
    <Shell title="Overview" subtitle="Hire faster, approve payroll, and track workforce performance.">
      <div className="dashboard-grid employer-grid">
        <section className="stats-grid">
          <StatCard title="Total Payroll (MTD)" value="$142,850" meta="~ 12.5% vs last month" />
          <StatCard title="Active Workers" value="84" meta="across 12 global regions" />
          <StatCard title="Open Jobs" value="06" meta="4 high-priority roles" />
        </section>

        <section className="panel payroll-card">
          <div className="panel-header">
            <div>
              <h4>Pending Payroll</h4>
              <p>Review and approve contractor payments</p>
            </div>
            <button className="gold-cta">Pay All</button>
          </div>
          <div className="table-head">
            <span>WORKER</span><span>PROJECT</span><span>AMOUNT</span><span>ACTION</span>
          </div>
          {[
            ['James Adenuga', 'Lagos, Nigeria', 'AI Model Training', '$3,200.00'],
            ['Sarah Kim', 'Seoul, KR', 'Cloud Architecture', '$5,450.00'],
            ['Marcus Edwards', 'London, UK', 'Product Research', '$1,800.00'],
          ].map(([name, location, project, amount]) => (
            <div className="table-row" key={name}>
              <div><strong>{name}</strong><span>{location}</span></div>
              <div>{project}</div>
              <div className="amount">{amount}</div>
              <div className="row-arrow">›</div>
            </div>
          ))}
        </section>

        <section className="panel top-talent-card">
          <div className="panel-header"><h4>Top Talent</h4><span className="soft-badge">AI Matched</span></div>
          {[
            ['Ananya Patel', 'Full-Stack Dev', '98'],
            ['David Chen', 'ML Engineer', '94'],
          ].map(([name, role, score]) => (
            <div className="talent-card" key={name}>
              <div className="talent-avatar">{String(name).slice(0, 1)}</div>
              <div>
                <strong>{name}</strong>
                <p>{role}</p>
                <div className="skill-tags"><span>Python</span><span>React</span><span>AWS</span></div>
              </div>
              <div className="talent-score">{score}<small>TRUST SCORE</small></div>
              <button className="secondary-cta full">Quick Hire</button>
            </div>
          ))}
        </section>

        <section className="panel activity-card full-width">
          <h4>Recent Hires Activity</h4>
          <div className="activity-row">
            <span>👥</span>
            <div><strong>Bayo Omoboriowo</strong><p>Onboarded 2h ago</p></div>
            <span>📄</span>
            <div><strong>Elena Rodriguez</strong><p>Contract Signed</p></div>
            <span>⚙</span>
            <div><strong>Liam Wilson</strong><p>Trust Score Verified</p></div>
            <span>✉</span>
            <div><strong>Sophia Muller</strong><p>Offer Extended</p></div>
          </div>
        </section>
      </div>
    </Shell>
  );
}

function StatCard({ title, value, meta }: { title: string; value: string; meta: string }) {
  return (
    <article className="panel stat-card">
      <span className="panel-label">{title}</span>
      <strong>{value}</strong>
      <p>{meta}</p>
    </article>
  );
}

function FinancesPage() {
  return (
    <Shell title="Wallet" subtitle="Move, receive, and optimize payouts across currencies.">
      <div className="finances-grid">
        <section className="balance-card">
          <div className="balance-top">
            <div>
              <span>Available Balance</span>
              <h3>$24,580.45</h3>
            </div>
            <span className="wallet-icon">◫</span>
          </div>
          <div className="balance-metrics">
            <div><span>MONTHLY YIELD</span><strong>+4.2%</strong></div>
            <div><span>LOCKED REWARDS</span><strong>$1,200.00</strong></div>
          </div>
          <div className="account-holder">Account Holder <strong>ALEXANDER ROOTAI</strong></div>
          <div className="card-dots"><span /><span /></div>
        </section>

        <section className="quick-actions">
          <div className="quick-action dark-card">
            <span>Send Money</span>
            <p>Instant transfers to any global account</p>
          </div>
          <div className="quick-action light-card">
            <span>Withdraw</span>
            <p>Transfer funds to your local bank</p>
          </div>
        </section>

        <section className="panel earnings-panel">
          <div className="panel-header"><h4>Monthly Earnings</h4><span>Payroll history for the last 6 months</span></div>
          <div className="empty-chart" />
          <div className="month-labels"><span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span></div>
        </section>

        <section className="panel transactions-panel">
          <div className="panel-header"><h4>Recent Transactions</h4><a href="#view">View All</a></div>
          {[
            ['Payroll - Project X', '+$4,200.00', 'SUCCESS', 'Oct 24, 2023'],
            ['Bank Withdrawal', '-$1,500.00', 'PENDING', 'Oct 22, 2023'],
            ['Bonus Reward', '+$550.00', 'SUCCESS', 'Oct 20, 2023'],
            ['Subscription Fee', '-$29.00', 'FAILED', 'Oct 18, 2023'],
          ].map(([title, amount, status, date]) => (
            <div className="txn-row" key={title}>
              <div>
                <strong>{title}</strong>
                <p>{date}</p>
              </div>
              <div className="txn-right">
                <strong>{amount}</strong>
                <span className={status.toLowerCase()}>{status}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="optimizer-card panel full-width">
          <div className="optimizer-score">
            <div className="score-ring small"><span>850</span><small>TRUST SCORE</small></div>
          </div>
          <div className="optimizer-copy">
            <h4>AI Wealth Optimizer</h4>
            <p>Based on your consistent payroll history and low failure rate, your trust score has increased. You are now eligible for 0.5% lower transaction fees and early payout features.</p>
            <div className="skill-tags"><span>Verified Earner</span><span>High Stability</span></div>
          </div>
          <button className="primary-cta">Claim Reward</button>
        </section>
      </div>
    </Shell>
  );
}

function InsightsPage() {
  return (
    <Shell title="Overview" subtitle="Track regional hiring trends, growth signals, and risk alerts.">
      <div className="dashboard-grid insights-grid">
        <section className="stats-grid insight-stats">
          <StatCard title="Total GTV" value="$4.82M" meta="~ 12.4% vs LY" />
          <article className="panel stat-card chart-stat">
            <span className="panel-label">Active Users Growth</span>
            <div className="mini-bars">
              <span /><span /><span /><span /><span /><span /><span className="dark" />
            </div>
            <div className="mini-labels"><span>JAN</span><span>MAR</span><span>MAY</span><span>JUL</span><span>SEP</span><span>NOV</span></div>
            <div className="real-time">Real-time</div>
          </article>
          <article className="panel stat-card ring-stat">
            <div className="score-ring tiny"><span>88%</span><small>Placement Rate</small></div>
            <p>Goal: 90 %</p>
          </article>
        </section>

        <section className="panel map-card full-width">
          <div className="panel-header"><h4>Regional Distribution</h4><button className="ghost-cta">Export Map</button></div>
          <div className="africa-map" />
        </section>

        <section className="panel ai-insights-panel">
          <h4>AI Insights</h4>
          <div className="insight-block white"><strong>Growth Forecast</strong><p>Active users in West Africa are projected to increase by 18.5% next quarter based on current hiring velocity.</p></div>
          <div className="insight-block white"><strong>Risk Alert</strong><p>Flagged profiles have increased in the Creative sector. Verification wait times have risen to 4.2 hours.</p></div>
          <div className="insight-block dark"><strong>Investor Recommendation</strong><p>Increase seed liquidity for fintech-specific roles to capture emerging Q3 demand from European partners.</p></div>
        </section>
      </div>
    </Shell>
  );
}

function CardListSection({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="panel">{children}</section>;
}

export default App;