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
    <motion.div className="min-h-screen bg-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <MarketingHeader />

      <main className="space-y-0 overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(11,93,75,0.15),transparent_30%),radial-gradient(circle_at_65%_34%,rgba(245,166,35,0.2),transparent_25%),radial-gradient(circle_at_55%_72%,rgba(11,93,75,0.12),transparent_20%)]" />
          
          <div className="relative max-w-7xl mx-auto w-full px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 pt-8">
                <motion.span variants={itemVariants} className="inline-block text-xs font-semibold text-[#F5A623] bg-[#2d2416]/70 rounded-full px-4 py-2 border border-[#F5A623]/30 backdrop-blur-sm">
                  🌱 Rooted in Trust
                </motion.span>
                <motion.h1 variants={itemVariants} className="text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Powering Africa&apos;s <span className="text-[#42BAA7]">Economic Roots.</span>
                </motion.h1>
                <motion.p variants={itemVariants} className="text-lg text-slate-300 leading-relaxed max-w-2xl">
                  Building the world&apos;s most trusted AI-driven workforce ecosystem. We empower African talent with verified financial
                  identities and global employment opportunities.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
                  <Link to="/role" className="inline-flex items-center justify-center px-7 py-3 bg-[#42BAA7] text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg">
                    Join as Worker
                  </Link>
                  <Link to="/employer/marketplace" className="inline-flex items-center justify-center px-7 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors">
                    Hire Talent
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div variants={scaleInVariants} initial="hidden" animate="visible" className="relative h-[500px]">
                <motion.div 
                  animate={{ y: [0, -16, 0] }} 
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 left-0 w-72 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl"
                >
                  <p className="text-xs text-slate-300 mb-3">Active Talent Pool</p>
                  <p className="text-4xl font-bold text-white mb-1">124,500+</p>
                  <p className="text-sm text-[#42BAA7] font-semibold">↗ Growing daily</p>
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 16, 0] }} 
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute bottom-0 right-0 w-72 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl"
                >
                  <p className="text-xs text-slate-300 mb-3">Verified Identities</p>
                  <p className="text-4xl font-bold text-white mb-3">98.4%</p>
                  <p className="text-xs text-slate-400 px-3 py-2 bg-white/10 rounded-full inline-block border border-white/20">AI Trust Score</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <motion.section
          className="max-w-7xl mx-auto px-6 py-24 space-y-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div className="space-y-6 text-center" variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-5xl font-bold text-slate-900">The New Standard of Trust</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We leverage proprietary AI to analyze work history, technical proficiency, and reliability to create a portable financial
              identity for every worker.
            </p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {landingFeatures.map((feature) => (
              <motion.div key={feature.title} variants={itemVariants}>
                <FeatureTile {...feature} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* IDENTITY SECTION */}
        <motion.section
          className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <TrustRing value="845" label="Trust Score" corner="Top 1%" pill="Verified Identity" />
          </motion.div>
          <motion.div className="space-y-8" variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-5xl font-bold text-slate-900">Your Professional Identity, Quantified.</h2>
            <p className="text-lg text-slate-600">
              Forget traditional resumes. Roota&apos;s AI Trust Score aggregates your delivery speed, skill proficiency, and client
              satisfaction into a single, verifiable metric that global employers trust.
            </p>
            <ul className="space-y-4">
              {[
                'Portable financial reputation across platforms',
                'Instant verification for banking and credit',
                'AI-driven career path recommendations',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                  <span className="text-primary-dark text-xl">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/auth" className="inline-flex items-center justify-center px-7 py-3 bg-primary-dark text-white font-semibold rounded-full hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl w-fit">
              Get Your Score Free
            </Link>
          </motion.div>
        </motion.section>

        {/* PAYROLL SECTION */}
        <motion.section
          className="bg-gradient-to-b from-slate-900 to-slate-800 py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto px-6 space-y-16">
            <motion.div className="space-y-6" variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="text-5xl font-bold text-white">Payroll for Everyone, Everywhere.</h2>
              <p className="text-lg text-slate-300 max-w-2xl">
                From individual freelancers to large-scale enterprises, we handle the complexities of global finance so you can focus on work.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* LARGE CARD */}
              <motion.article
                variants={itemVariants}
                className="md:col-span-2 md:row-span-2 rounded-3xl bg-gradient-to-br from-[#42BAA7]/20 to-slate-700/20 p-8 border border-white/10 flex flex-col justify-end backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <h3 className="text-2xl font-bold text-white mb-3">Global Wallets</h3>
                <p className="text-slate-300">Receive payments in USD, EUR, or Local Currency instantly.</p>
              </motion.article>

              {/* WIDE CARD */}
              <motion.article
                variants={itemVariants}
                className="md:col-span-2 rounded-3xl bg-gradient-to-br from-[#42BAA7]/20 to-slate-700/20 p-8 border border-white/10 flex flex-col justify-center backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-2">Automated Tax</h3>
                <p className="text-slate-300">Smart compliance tracking for 50+ countries.</p>
              </motion.article>

              {/* COMPACT CARD */}
              <motion.article
                variants={itemVariants}
                className="rounded-3xl bg-gradient-to-br from-slate-700/50 to-slate-600/30 p-6 border border-white/10 flex items-center justify-center backdrop-blur-sm hover:border-white/20 transition-colors"
              >
                <h3 className="text-lg font-bold text-white text-center">Instant Payouts</h3>
              </motion.article>

              {/* CTA CARD */}
              <motion.article
                variants={itemVariants}
                className="rounded-3xl bg-gradient-to-br from-[#42BAA7]/30 to-primary-dark/30 p-6 border border-[#42BAA7]/50 flex items-center justify-center hover:border-[#42BAA7] transition-colors cursor-pointer backdrop-blur-sm"
              >
                <h3 className="text-lg font-bold text-white text-center">Employer Portal</h3>
              </motion.article>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA BANNER */}
        <motion.section
          className="max-w-5xl mx-auto px-6 py-24 text-center space-y-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-5xl font-bold text-slate-900">
            Ready to plant your roots?
          </motion.h2>
          <motion.p variants={slideInVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you&apos;re looking for the best talent in Africa or aiming to build your professional reputation, Roota is your
            engine for growth.
          </motion.p>
          <motion.div className="flex flex-wrap justify-center gap-4" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.div variants={itemVariants}>
              <Link to="/role" className="inline-flex items-center justify-center px-7 py-3 bg-white text-primary-dark font-semibold rounded-full hover:bg-slate-50 transition-colors border-2 border-slate-200">
                Join as Worker
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link to="/employer/marketplace" className="inline-flex items-center justify-center px-7 py-3 border-2 border-slate-300 text-slate-900 font-semibold rounded-full hover:bg-slate-50 transition-colors">
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
