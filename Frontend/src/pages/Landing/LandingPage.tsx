import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FeatureTile } from '../../components/landing/FeatureTile';
import { TrustRing } from '../../components/common/TrustRing';
import { MarketingFooter } from '../../components/layout/Footer';
import { MarketingHeader } from '../../components/layout/Header';

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const slideInVariants: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function LandingPage() {
  return (
    <motion.div className="page marketing-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <MarketingHeader />

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
