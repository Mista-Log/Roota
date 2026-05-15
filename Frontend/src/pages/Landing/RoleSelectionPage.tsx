import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// ─── Design tokens ────────────────────────────────────────────────────────────
// primary:               #003527
// primary-container:     #064e3b
// primary-fixed:         #b0f0d6  (mint badge bg)
// on-primary-fixed-variant: #0b513d (badge text)
// on-tertiary-container: #f69f0d  (gold)
// surface:               #f7f9fb
// surface-container-low: #f2f4f6
// on-surface-variant:    #404944
// outline-variant:       #bfc9c3
// ─────────────────────────────────────────────────────────────────────────────

interface RoleCardProps {
  title: string;
  body: string;
  action: string;
  cornerIcon: string;
  imageSrc: string;
  imageAlt: string;
  onClick: () => void;
}

function RoleCard({ title, body, action, cornerIcon, imageSrc, imageAlt, onClick }: RoleCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="group relative flex flex-col items-start text-left w-full"
      style={{
        padding: 32,
        borderRadius: 12,
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(6, 78, 59, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Corner icon — fades in on hover via group */}
      <div
        className="absolute top-4 right-4 transition-all duration-300"
        style={{ color: 'rgba(246, 159, 13, 0.2)' }}
      >
        <span
          className="material-symbols-outlined group-hover:text-[#f69f0d] transition-colors duration-300"
          style={{ fontSize: 40 }}
        >
          {cornerIcon}
        </span>
      </div>

      {/* Square image */}
      <div
        className="w-full rounded-lg overflow-hidden mb-4"
        style={{ aspectRatio: '1 / 1' }}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-2 w-full">
        <h3
          className="roota-display"
          style={{ color: '#003527', fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
        >
          {title}
        </h3>
        <p style={{ color: '#404944', fontSize: 16, lineHeight: '24px' }}>
          {body}
        </p>

        {/* Bottom row: label + circle button */}
        <div className="flex items-center justify-between w-full pt-4">
          <span
            className="roota-display font-bold uppercase"
            style={{ color: '#003527', fontSize: 14, letterSpacing: '0.05em' }}
          >
            {action}
          </span>
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm transition-colors duration-200"
            style={{ background: '#003527' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
              chevron_right
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const selectRole = (role: 'WORKER' | 'EMPLOYER') => {
    localStorage.setItem('selectedRole', role);
    navigate('/auth');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700&family=Inter:wght@400;500&display=swap');
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

        /* Back link arrow animates left on hover */
        .back-link:hover .back-arrow {
          transform: translateX(-4px);
        }

        /* Role card circle button turns primary-container on group hover */
        .group:hover .role-circle {
          background: #064e3b !important;
        }
      `}</style>

      <div
        className="min-h-screen flex flex-col"
        style={{ background: '#f7f9fb', fontFamily: 'Inter, sans-serif', color: '#191c1e' }}
      >

        {/* ═══════════════════════════════════════════════════
            HEADER
        ═══════════════════════════════════════════════════ */}
        <header
          className="fixed top-0 w-full z-50"
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(247,249,251,0.7)',
            borderBottom: '1px solid rgba(25,28,30,0.05)',
            boxShadow: '0 1px 8px rgba(0,53,39,0.04)',
          }}
        >
          <div
            className="flex justify-between items-center px-5 md:px-12 py-4 w-full mx-auto"
            style={{ maxWidth: 1280 }}
          >
            {/* Logo */}
            <div
              className="roota-display font-bold tracking-tight"
              style={{ color: '#003527', fontSize: 32, lineHeight: '40px', letterSpacing: '-0.01em' }}
            >
              Roota
            </div>

            {/* Back link */}
            <Link
              to="/"
              className="back-link flex items-center gap-2 font-medium transition-colors duration-200 group"
              style={{ color: '#404944', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#003527'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#404944'; }}
            >
              <span
                className="back-arrow material-symbols-outlined transition-transform duration-200"
                style={{ fontSize: 20 }}
              >
                arrow_back
              </span>
              <span
                className="roota-display"
                style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
              >
                Back to home
              </span>
            </Link>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════
            MAIN
        ═══════════════════════════════════════════════════ */}
        <main
          className="flex-grow flex items-center justify-center px-5"
          style={{ paddingTop: 96, paddingBottom: 48 }}
        >
          <div
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            style={{ maxWidth: 1280 }}
          >

            {/* ── Left intro col — col-span-5 ── */}
            <motion.div
              className="md:col-span-5 flex flex-col gap-4 text-center md:text-left"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Badge */}
              <div>
                <span
                  className="roota-display inline-flex items-center px-3 py-1 rounded-full"
                  style={{
                    background: '#b0f0d6',
                    color: '#0b513d',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    marginBottom: 8,
                  }}
                >
                  Welcome to the Wealth Oasis
                </span>
              </div>

              {/* Heading */}
              <h1
                className="roota-display font-black leading-tight"
                style={{ color: '#003527', fontSize: 'clamp(40px, 4vw, 48px)', lineHeight: '56px', letterSpacing: '-0.02em' }}
              >
                How will you plant your{' '}
                <span style={{ color: '#f69f0d' }}>roots</span> today?
              </h1>

              {/* Body */}
              <p
                className="mx-auto md:mx-0"
                style={{ color: '#404944', fontSize: 18, lineHeight: '28px', maxWidth: 448 }}
              >
                Select your path to start building your economic future. Roota connects African talent with global
                opportunities.
              </p>
            </motion.div>

            {/* ── Right cards col — col-span-7 ── */}
            <motion.div
              className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <RoleCard
                title="Join as a Worker"
                body="Find high-value projects, build your trust score, and secure your financial growth."
                action="Start Earning"
                cornerIcon="trending_up"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuCd9TZMMydgO-zJW6mEE0HIP8ZcsT1xQQ2DN-RyWztaRZpH8Hx-CWGbm5XE0zQ_x7Bxot697FMGfpAH4iy2zcaK4SsjTJFdUrxZzwVFgLpKYDt1N_i7kZVaOdjT63gECn-7PiLntkXI0nynJ2M-R0pJ7fj_mhaQyDE--Itr5tb-lt1iUg1R5cvqPSVcVpDgX3SBPNrUVpUePINIBSybeDXCTPccjYyxExW1ILCZT4-uTiemxCo4yYbzGe0Yt8aOyZ3qpXQt9DDOyiQ"
                imageAlt="Professional woman using technology"
                onClick={() => selectRole('WORKER')}
              />

              <RoleCard
                title="Hire as an Employer"
                body="Access top-tier verified talent across the continent and scale your vision with speed."
                action="Find Talent"
                cornerIcon="token"
                imageSrc="https://lh3.googleusercontent.com/aida-public/AB6AXuC5svNn133b8MsFiFnagR3da2uXvBM1nuWtFQ7r-5CxsTvN_Dq21chEDd6_aA11RfiMa7Zug47CX36VHojqiccbimfZiMb0lxITJgS_Z3x3lM7ZLDOnkbbypnmdLLV9SH123ngwxXSLMHsE7WCPDsrbxrdxUc903t3PqDbQvCzuw4l5DHZMJ0H17OLM7uSz8AcRJOvGnX4iodEl5F5JoiSvnaJeEAnhJucNGHXQjhx7eFlMoqbZGx7V044YN3TZuaJCVbKH0N49un4"
                imageAlt="Professional man leading a meeting"
                onClick={() => selectRole('EMPLOYER')}
              />
            </motion.div>

          </div>
        </main>

        {/* ═══════════════════════════════════════════════════
            FOOTER
        ═══════════════════════════════════════════════════ */}
        <footer
          className="w-full py-8 mt-auto"
          style={{
            background: '#f2f4f6',
            borderTop: '1px solid rgba(191,201,195,0.3)',
          }}
        >
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 px-5 md:px-12 w-full mx-auto"
            style={{ maxWidth: 1280 }}
          >
            {/* Logo */}
            <div
              className="roota-display font-bold"
              style={{ color: '#003527', fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
            >
              Roota
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { label: 'Terms of Service', to: '/terms' },
                { label: 'Privacy Policy', to: '/privacy' },
                { label: 'Help Center', to: '/help' },
                { label: 'Contact Support', to: '/contact' },
              ].map(({ label, to }) => (
                <Link
                  key={label}
                  to={to}
                  className="roota-display transition-colors duration-200"
                  style={{ color: '#404944', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textDecoration: 'none' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#f69f0d'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#404944'; }}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Copyright */}
            <p style={{ color: '#404944', fontSize: 16, lineHeight: '24px' }}>
              © 2024 Roota. Built for the African Future.
            </p>
          </div>
        </footer>

      </div>
    </>
  );
}