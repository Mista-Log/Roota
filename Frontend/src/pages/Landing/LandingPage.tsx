import { motion, useInView, type Variants } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { MarketingHeader } from '../../components/layout/Header';
import { MarketingFooter } from '../../components/layout/Footer';
import { useEffect, useState } from "react";


// ─── Design tokens (mirrored from HTML Tailwind config) ───────────────────────
// primary:              #003527
// primary-container:    #064e3b
// primary-fixed:        #b0f0d6
// primary-fixed-dim:    #95d3ba
// on-tertiary-container:#f69f0d  (gold)
// tertiary-fixed:       #ffddb8
// tertiary-fixed-dim:   #ffb95f
// inverse-surface:      #2d3133
// surface:              #f7f9fb
// surface-container-low:#f2f4f6
// on-surface-variant:   #404944
// ─────────────────────────────────────────────────────────────────────────────

// ─── Animation variants ───────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.93 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Scroll-reveal wrapper ────────────────────────────────────────────────────
function ScrollReveal({
  children,
  variants = fadeUp,
  className = '',
}: {
  children: React.ReactNode;
  variants?: Variants;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Inline style helpers ─────────────────────────────────────────────────────
const glassCard: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(0, 53, 39, 0.1)',
};

const emeraldGlow: React.CSSProperties = {
  boxShadow: '0 0 20px rgba(6, 78, 59, 0.15)',
};

const goldGlow: React.CSSProperties = {
  boxShadow: '0 0 25px rgba(245, 158, 11, 0.2)',
};

// ─── Feature data ─────────────────────────────────────────────────────────────
const features = [
  {
    icon: 'work',
    title: 'Verified Jobs',
    desc: 'Direct access to vetted global roles that contribute directly to your career reputation and score.',
    accent: false,
  },
  {
    icon: 'payments',
    title: 'Smart Payroll',
    desc: 'Seamless cross-border payments with integrated tax compliance and instant withdrawal options.',
    accent: true,
  },
  {
    icon: 'analytics',
    title: 'AI Insights',
    desc: 'Real-time feedback on your professional growth and actionable steps to increase your Trust Score.',
    accent: false,
  },
] as const;

const checks = [
  'Portable financial reputation across platforms',
  'Instant verification for banking and credit',
  'AI-driven career path recommendations',
];



// ─────────────────────────────────────────────────────────────────────────────
export default function LandingPage() {

  const [score, setScore] = useState(0);

  useEffect(() => {
    const target = 845;
    const duration = 200; // 2 seconds
    const intervalTime = 16; // ~60fps
    const increment = target / (duration / intervalTime);

    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setScore(target);
        clearInterval(timer);
      } else {
        setScore(Math.floor(current));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);


  return (
    <>
      {/* Global font + icon imports */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;900&family=Inter:wght@400;500;600&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-weight: normal;
          font-style: normal;
          line-height: 1;
          display: inline-block;
          white-space: nowrap;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
        }
        .roota-display { font-family: 'Hanken Grotesk', sans-serif; }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(0, 53, 39, 0.1);
        }
        .emerald-glow { box-shadow: 0 0 20px rgba(6, 78, 59, 0.15); }
        .gold-glow    { box-shadow: 0 0 25px rgba(245, 158, 11, 0.2); }
      `}</style>

      <div
        className="min-h-screen overflow-x-hidden"
        style={{ background: '#f7f9fb', fontFamily: 'Inter, sans-serif' }}
      >
        <MarketingHeader />

        <main>

          {/* ═══════════════════════════════════════════════════
              HERO
          ═══════════════════════════════════════════════════ */}
          <section
            className="relative flex items-center overflow-hidden py-20"
            style={{ minHeight: '921px', background: '#2d3133' }}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3GlAm1EN7LHFOTebi5TvoYQtYbh3lsHFJ5d3BxnyLr5XNE2wtt53EVu9dFri_76SKlPJzHYDKoBXVVHcjrHJmM8MdNpWGsLIv7PEv1rePRR2IRrpH-wveEtj10bQytJ1CfE1JJiBTmK4iD5YClFjafnCa2EO3HzkwJJ_U3VLMX_MGo7IFK4hsj1gFWRk2043i4gES64qOYmIJJaxrhBBKZEDC3QW123AAQLwV1iKQl-CSliYafw-T-m-d-VSOEoBEqeFSoRjGp8M')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.2,
              }}
            />

            <div
              className="relative z-10 w-full mx-auto px-5 md:px-12"
              style={{ maxWidth: 1280 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* ── Left copy ── */}
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-8"
                >
                  {/* Badge */}
                  <motion.span
                    variants={fadeUp}
                    className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full roota-display"
                    style={{
                      background: 'rgba(0,53,39,0.2)',
                      color: '#0b513d',
                      border: '1px solid rgba(0,53,39,0.2)',
                      backdropFilter: 'blur(4px)',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                      verified_user
                    </span>
                    Rooted in Trust
                  </motion.span>

                  {/* Heading */}
                  <motion.h1
                    variants={fadeUp}
                    className="roota-display font-black text-white leading-tight"
                    style={{ fontSize: 'clamp(40px, 5vw, 48px)', letterSpacing: '-0.02em', lineHeight: '56px' }}
                  >
                    Powering Africa&apos;s{' '}
                    <br />
                    <span style={{ color: '#b0f0d6' }}>Economic Roots.</span>
                  </motion.h1>

                  {/* Sub */}
                  <motion.p
                    variants={fadeUp}
                    className="max-w-xl"
                    style={{ color: '#e0e3e5', fontSize: 18, lineHeight: '28px' }}
                  >
                    Building the world&apos;s most trusted AI-driven workforce ecosystem. We empower African
                    talent with verified financial identities and global employment opportunities.
                  </motion.p>

                  {/* CTAs */}
                  <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
                    <Link
                      to="/role"
                      className="roota-display inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold emerald-glow transition-transform hover:-translate-y-0.5"
                      style={{
                        background: '#064e3b',
                        color: '#ffffff',
                        fontSize: 24,
                        lineHeight: '32px',
                      }}
                    >
                      Join as Worker
                    </Link>
                    <Link
                      to="/employer/marketplace"
                      className="roota-display inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-white transition-colors hover:bg-white/5"
                      style={{
                        border: '1px solid rgba(191,201,195,0.3)',
                        backdropFilter: 'blur(8px)',
                        fontSize: 24,
                        lineHeight: '32px',
                      }}
                    >
                      Hire Talent
                    </Link>
                  </motion.div>
                </motion.div>

                {/* ── Right glass card ── */}
                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="relative hidden lg:block"
                >
                  {/* Main card */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    className="glass-card p-8 rounded-3xl shadow-2xl relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-12">
                      <div>
                        <p
                          className="roota-display mb-1"
                          style={{
                            color: '#404944',
                            fontSize: 14,
                            fontWeight: 600,
                            letterSpacing: '0.05em',
                          }}
                        >
                          Active Talent Pool
                        </p>
                        <h3
                          className="roota-display"
                          style={{ color: '#003527', fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: '-0.01em' }}
                        >
                          124,500+
                        </h3>
                      </div>
                      <div
                        className="h-12 w-12 rounded-full flex items-center justify-center"
                        style={{ background: '#b0f0d6', color: '#003527' }}
                      >
                        <span className="material-symbols-outlined">trending_up</span>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div
                        className="h-4 w-full rounded-full overflow-hidden"
                        style={{ background: '#eceef0' }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: '75%', background: '#003527' }}
                        />
                      </div>
                      <div
                        className="flex justify-between roota-display"
                        style={{ color: '#404944', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                      >
                        <span>Verified Identities</span>
                        <span>89% Success</span>
                      </div>
                    </div>

                    {/* Overlapping trust score card */}
                    <div
                      className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl w-64 gold-glow"
                      style={{ borderColor: 'rgba(0,53,39,0.2)' }}
                    >
                      <p
                        className="roota-display mb-2"
                        style={{ color: '#653e00', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                      >
                        AI Trust Score
                      </p>
                      <div className="flex items-center gap-3">
                        <span
                          className="roota-display"
                          style={{ color: '#442800', fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
                        >
                          98.4
                        </span>
                        <div
                          className="flex-1 h-2 rounded-full overflow-hidden"
                          style={{ background: '#ffddb8' }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: '98%', background: '#f69f0d' }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

              </div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              FEATURES
          ═══════════════════════════════════════════════════ */}
          <section className="py-24 px-5 md:px-12" style={{ background: '#f7f9fb' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>

              <ScrollReveal>
                <div className="text-center max-w-2xl mx-auto mb-20 flex flex-col gap-4">
                  <h2
                    className="roota-display"
                    style={{ color: '#003527', fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: '-0.01em' }}
                  >
                    The New Standard of Trust
                  </h2>
                  <p style={{ color: '#404944', fontSize: 18, lineHeight: '28px' }}>
                    We leverage proprietary AI to analyze work history, technical proficiency, and reliability to
                    create a portable financial identity for every worker.
                  </p>
                </div>
              </ScrollReveal>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {features.map((f) => (
                  <motion.div
                    key={f.title}
                    variants={fadeUp}
                    className="flex flex-col gap-6 p-8 rounded-3xl transition-colors"
                    style={
                      f.accent
                        ? { background: '#064e3b', ...emeraldGlow }
                        : {
                            background: '#f2f4f6',
                            border: '1px solid rgba(191,201,195,0.1)',
                          }
                    }
                    whileHover={
                      f.accent
                        ? undefined
                        : { borderColor: 'rgba(0,53,39,0.2)', transition: { duration: 0.2 } }
                    }
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={
                        f.accent
                          ? { background: 'rgba(255,255,255,0.1)', color: '#b0f0d6' }
                          : f.icon === 'analytics'
                          ? { background: 'rgba(255,221,184,0.3)', color: '#442800' }
                          : { background: 'rgba(149,211,186,0.2)', color: '#003527' }
                      }
                    >
                      <span className="material-symbols-outlined" style={{ fontSize: 32 }}>
                        {f.icon}
                      </span>
                    </div>
                    <h3
                      className="roota-display"
                      style={{
                        color: f.accent ? '#fff' : '#003527',
                        fontSize: 24,
                        fontWeight: 600,
                        lineHeight: '32px',
                      }}
                    >
                      {f.title}
                    </h3>
                    <p style={{ color: f.accent ? 'rgba(128,190,166,0.9)' : '#404944' }}>
                      {f.desc}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              TRUST SCORE / IDENTITY
          ═══════════════════════════════════════════════════ */}
          <section className="py-24 px-5 md:px-12 overflow-hidden" style={{ background: '#fff' }}>
            <div
              className="flex flex-col lg:flex-row gap-20 items-center"
              style={{ maxWidth: 1280, margin: '0 auto' }}
            >

              {/* SVG Gauge */}
              <ScrollReveal variants={scaleIn} className="w-full lg:w-1/2">
                <div className="relative w-80 h-80 mx-auto">
                  <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx="160" cy="160" r="140"
                      fill="transparent"
                      stroke="#eceef0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="160" cy="160" r="140"
                      fill="transparent"
                      stroke="#f69f0d"
                      strokeWidth="12"
                      strokeDasharray="880"
                      strokeDashoffset="150"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(246,159,13,0.5))' }}
                    />
                  </svg>
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{ transform: 'rotate(0deg)' }}
                  >
                    <span
                      className="roota-display font-black"
                      style={{
                        color: '#003527',
                        fontSize: 48,
                        lineHeight: '56px',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {score}
                    </span>

                    <span
                      className="roota-display"
                      style={{
                        color: '#404944',
                        fontSize: 14,
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                      }}
                    >
                      EXCELLENT
                    </span>
                  </div>

                  {/* Top-right badge */}
                  <div
                    className="absolute top-0 right-0 glass-card p-4 rounded-xl shadow-lg"
                    style={{ borderColor: 'rgba(0,53,39,0.1)' }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined"
                        style={{ color: '#003527', fontVariationSettings: "'FILL' 1" }}
                      >
                        stars
                      </span>
                      <span
                        className="roota-display"
                        style={{ color: '#003527', fontSize: 24, fontWeight: 600 }}
                      >
                        Top 1%
                      </span>
                    </div>
                  </div>

                  {/* Bottom-left badge */}
                  <div
                    className="absolute bottom-10 left-0 glass-card p-4 rounded-xl shadow-lg"
                    style={{ borderColor: 'rgba(0,53,39,0.1)' }}
                  >
                    <div className="flex items-center gap-2" style={{ color: '#404944' }}>
                      <span className="material-symbols-outlined">history</span>
                      <span
                        className="roota-display"
                        style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                      >
                        Identity Verified
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Copy */}
              <ScrollReveal variants={slideLeft} className="w-full lg:w-1/2 flex flex-col gap-8">
                <h2
                  className="roota-display"
                  style={{ color: '#003527', fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: '-0.01em' }}
                >
                  Your Professional Identity, Quantified.
                </h2>
                <p style={{ color: '#404944', fontSize: 18, lineHeight: '28px' }}>
                  Forget traditional resumes. Roota&apos;s AI Trust Score aggregates your delivery speed, skill
                  proficiency, and client satisfaction into a single, verifiable metric that global employers trust.
                </p>
                <ul className="space-y-4">
                  {checks.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div
                        className="h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: '#b0f0d6' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: '#003527' }}>
                          check
                        </span>
                      </div>
                      <span style={{ fontSize: 16, lineHeight: '24px' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-2">
                  <Link
                    to="/auth"
                    className="roota-display inline-flex items-center justify-center px-8 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
                    style={{
                      background: '#003527',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                    }}
                  >
                    Get Your Score Free
                  </Link>
                </div>
              </ScrollReveal>

            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              PAYROLL BENTO
          ═══════════════════════════════════════════════════ */}
          <section className="py-24 px-5 md:px-12 text-white" style={{ background: '#2d3133' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto' }}>

              <ScrollReveal>
                <div className="text-center mb-16">
                  <h2
                    className="roota-display mb-6"
                    style={{ fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: '-0.01em' }}
                  >
                    Payroll for Everyone, Everywhere.
                  </h2>
                  <p className="max-w-2xl mx-auto" style={{ color: '#e0e3e5' }}>
                    From individual freelancers to large-scale enterprises, we handle the complexities of global
                    finance so you can focus on work.
                  </p>
                </div>
              </ScrollReveal>

              {/* Bento grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-6"
                style={{ gridTemplateRows: 'auto auto' }}
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {/* Large card — col 1-2, row 1-2 */}
                <motion.article
                  variants={fadeUp}
                  className="md:col-span-2 md:row-span-2 rounded-3xl p-10 flex flex-col justify-end relative overflow-hidden group transition-colors"
                  style={{
                    minHeight: 300,
                    background: 'rgba(6,78,59,0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ borderColor: 'rgba(176,240,214,0.15)' }}
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtpthDe1JDlZC_hUrkeaM4pWKdqKHiDdS0fvAhsJPhdTEkv4-eAwyT_JhrVPuVbm9rOkOQLYuP21SDmbvdiyXU-U-c6XVWpaNCpaGw85y2XYvVjUrdMclgiyIgr5jelXE6cc5gJ4ykM41vm1QjR_vLVpmz-eUtFp7MxwiFU3CQ_UXV_-gWJ4wzNKaf4sybWYXHoScNPbrwneq0xroqQYIciXRfltUtJmVbswfTuZEOxNR10Ast-eAnAF8bMf0P7iBvPRYNIgQmAFk"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="relative z-10">
                    <h4
                      className="roota-display mb-2"
                      style={{ fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
                    >
                      Global Wallets
                    </h4>
                    <p style={{ color: '#80bea6' }}>
                      Receive payments in USD, EUR, or Local Currency instantly.
                    </p>
                  </div>
                </motion.article>

                {/* Wide card — col 3-4, row 1 */}
                <motion.article
                  variants={fadeUp}
                  className="md:col-span-2 rounded-3xl p-10 flex items-center justify-between transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ borderColor: 'rgba(176,240,214,0.15)' }}
                >
                  <div style={{ maxWidth: '60%' }}>
                    <h4
                      className="roota-display mb-2"
                      style={{ fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
                    >
                      Automated Tax
                    </h4>
                    <p style={{ color: '#e0e3e5' }}>
                      Smart compliance tracking for 50+ countries.
                    </p>
                  </div>
                  <span className="material-symbols-outlined" style={{ fontSize: 64, color: '#ffb95f' }}>
                    account_balance
                  </span>
                </motion.article>

                {/* Instant payouts card */}
                <motion.article
                  variants={fadeUp}
                  className="rounded-3xl p-10 flex flex-col justify-between transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  whileHover={{ borderColor: 'rgba(176,240,214,0.15)' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 40, color: '#b0f0d6' }}>
                    bolt
                  </span>
                  <p className="roota-display" style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}>
                    Instant Payouts
                  </p>
                </motion.article>

                {/* Employer portal card — mint */}
                <motion.article
                  variants={fadeUp}
                  className="rounded-3xl p-10 flex flex-col justify-between cursor-pointer transition-colors"
                  style={{ background: '#b0f0d6', color: '#003527' }}
                  whileHover={{ background: '#95d3ba' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 40 }}>
                    shield_person
                  </span>
                  <p className="roota-display font-bold" style={{ fontSize: 14, letterSpacing: '0.05em' }}>
                    Employer Portal
                  </p>
                </motion.article>
              </motion.div>

            </div>
          </section>

          {/* ═══════════════════════════════════════════════════
              CTA BANNER
          ═══════════════════════════════════════════════════ */}
          <section className="py-24 px-5 md:px-12" style={{ background: '#f7f9fb' }}>
            <ScrollReveal variants={scaleIn}>
              <div
                className="max-w-4xl mx-auto rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
                style={{ background: '#003527' }}
              >
                {/* Decorative blobs */}
                <div
                  className="absolute top-0 right-0 rounded-full"
                  style={{ width: 256, height: 256, background: 'rgba(98,60,0,0.3)', filter: 'blur(100px)' }}
                />
                <div
                  className="absolute bottom-0 left-0 rounded-full"
                  style={{ width: 256, height: 256, background: 'rgba(176,240,214,0.2)', filter: 'blur(100px)' }}
                />

                <div className="relative z-10">
                  <h2
                    className="roota-display font-black text-white mb-6"
                    style={{ fontSize: 'clamp(34px,4.5vw,48px)', letterSpacing: '-0.02em', lineHeight: '56px' }}
                  >
                    Ready to plant your roots?
                  </h2>
                  <p
                    className="mb-12 max-w-xl mx-auto"
                    style={{ color: '#80bea6', fontSize: 18, lineHeight: '28px' }}
                  >
                    Whether you&apos;re looking for the best talent in Africa or aiming to build your professional
                    reputation, Roota is your engine for growth.
                  </p>

                  <motion.div
                    className="flex flex-col sm:flex-row gap-6 justify-center"
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={fadeUp}>
                      <Link
                        to="/role"
                        className="roota-display inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-white shadow-lg transition-transform hover:scale-105"
                        style={{
                          background: '#fff',
                          color: '#003527',
                          fontSize: 24,
                          lineHeight: '32px',
                        }}
                      >
                        Join as Worker
                      </Link>
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <Link
                        to="/employer/marketplace"
                        className="roota-display inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-white transition-colors"
                        style={{
                          background: '#064e3b',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontSize: 24,
                          lineHeight: '32px',
                        }}
                      >
                        Hire Talent
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </section>

        </main>

        <MarketingFooter />
      </div>
    </>
  );
}