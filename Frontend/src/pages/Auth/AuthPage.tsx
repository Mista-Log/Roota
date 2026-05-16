import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

// ─── Design tokens (from HTML Tailwind config) ────────────────────────────────
// primary:               #003527
// primary-container:     #064e3b
// primary-fixed:         #b0f0d6
// on-tertiary-container: #f69f0d  (gold)
// surface:               #f7f9fb
// surface-container-low: #f2f4f6
// surface-container-lowest: #ffffff
// on-surface-variant:    #404944
// outline-variant:       #bfc9c3
// ─────────────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
};
import { GoogleLogin } from "@react-oauth/google";
import { apiPost } from '../../utils/api';

export default function AuthPage() {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const [isLogin, setIsLogin] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role] = useState<'WORKER' | 'EMPLOYER'>(
    (localStorage.getItem('selectedRole') as any) || 'WORKER'
  );
  const [loading, setLoading] = useState(false);

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof Error && error.message.trim().length > 0) return error.message;
    return fallback;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await signup({ full_name: fullName, email, password, role });
      localStorage.removeItem('selectedRole');
      toast.success('Signup successful. Welcome to Roota!');
      navigate(user.role === 'WORKER' ? '/worker/onboarding' : '/employer/onboarding');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Signup failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = await login(email, password);
      toast.success('Login successful.');
      navigate(user.role === 'WORKER' ? '/worker/dashboard' : '/employer/dashboard');
    } catch (err) {
      toast.error(getErrorMessage(err, 'Login failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      setLoading(true);
      const data = await apiPost('/api/auth/google/', {
        token: credentialResponse.credential,
        role,
      }, true);

      // save tokens
      localStorage.setItem("access", data.access);

      localStorage.setItem("refresh", data.refresh);

      localStorage.removeItem("selectedRole");

      // redirect
      const onboardingPath = data.user.role === "WORKER" ? '/worker/onboarding' : '/employer/onboarding';
      const dashboardPath = data.user.role === "WORKER" ? '/worker/dashboard' : '/employer/dashboard';

      if (data.redirect === '/confirm') {
        navigate(onboardingPath);
      } else {
        navigate(dashboardPath);
      }

    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error, 'Google login failed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap');
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

        .internal-glow {
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
        }

        .auth-input {
          width: 100%;
          background: #f2f4f6;
          border: 1px solid rgba(191, 201, 195, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 24px;
          color: #191c1e;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .auth-input:focus {
          border-color: #003527;
          box-shadow: 0 0 0 2px rgba(6, 78, 59, 0.1);
        }
        .auth-input::placeholder { color: #9eaaa4; }

        .tab-btn {
          flex: 1;
          padding-bottom: 12px;
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          cursor: pointer;
        }
        .tab-btn.active {
          color: #003527;
          border-bottom-color: #003527;
        }
        .tab-btn.inactive {
          color: #404944;
          border-bottom-color: transparent;
        }
        .tab-btn.inactive:hover { color: #003527; }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 0;
          border: 1px solid rgba(191, 201, 195, 0.3);
          border-radius: 8px;
          background: transparent;
          cursor: pointer;
          transition: background 0.2s;
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #191c1e;
        }
        .social-btn:hover { background: #f2f4f6; }

        .submit-btn {
          width: 100%;
          background: #064e3b;
          color: #fff;
          padding: 16px;
          border-radius: 8px;
          font-family: 'Hanken Grotesk', sans-serif;
          font-size: 24px;
          line-height: 32px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
          box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.2);
          margin-top: 16px;
        }
        .submit-btn:hover { background: #003527; }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
      `}</style>

      <div
        className="min-h-screen flex flex-col antialiased"
        style={{ background: '#f7f9fb', fontFamily: 'Inter, sans-serif', color: '#191c1e' }}
      >

        {/* ═══════════════════════════════════════════════════
            HEADER — fixed, blurred
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
            <Link
              to="/"
              className="roota-display font-bold tracking-tight"
              style={{ color: '#003527', fontSize: 32, lineHeight: '40px', letterSpacing: '-0.01em', textDecoration: 'none' }}
            >
              Roota
            </Link>
            <div className="flex items-center gap-4">
              <button
                className="roota-display transition-all duration-300"
                style={{
                  color: '#404944',
                  background: '#fff',
                  border: '1px solid rgba(64,73,68,0.25)',
                  padding: '8px 24px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#064e3b';
                  e.currentTarget.style.borderColor = '#064e3b';
                  e.currentTarget.style.background = 'rgba(6,78,59,0.03)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#404944';
                  e.currentTarget.style.borderColor = 'rgba(64,73,68,0.25)';
                  e.currentTarget.style.background = '#fff';
                }}
                onClick={() => setIsLogin(true)}
                type="button"
              >
                Login
              </button>

              <button
                className="roota-display internal-glow transition-transform active:scale-95"
                style={{
                  background: '#064e3b',
                  color: '#fff',
                  padding: '8px 24px',
                  borderRadius: 8,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
                onClick={() => setIsLogin(false)}
                type="button"
              >
                Get Started
              </button>
            </div>
          </div>
        </header>

        {/* ═══════════════════════════════════════════════════
            MAIN — 12-col grid
        ═══════════════════════════════════════════════════ */}
        <main
          className="flex-grow flex items-center justify-center px-5"
          style={{ paddingTop: 96, paddingBottom: 48 }}
        >
          <div
            className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch"
            style={{ maxWidth: 1280, minHeight: 700 }}
          >

            {/* ── LEFT PANEL — col-span-7 ── */}
            <motion.div
              className="hidden md:flex md:col-span-6 lg:col-span-7 flex-col justify-center relative overflow-hidden rounded-xl"
              style={{ background: '#003527' }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Background image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHAIHkLPX_mnbx3OHMMTgRUqdOpPwwSIZJzxl9BVBN6MUAM7VagZpwiWlKrNcyKD4MYVA2WASTrc-yoYDHHm-OlBmMRgWI9_7PvXkmAVRcv9FRUjCG1ywq7f_RdJVpZHfROweDPMUSQCA_eub-b2jF85Gp7Mos_8oWFqsLEC7iPGoQ3jxVTT4ZvcKm5wpr9xmR-WA3WqMR8MW8Nksik1XBD6SKhqn8XQcBp1LdJmW0-hN_wGT8RbGiT9oJrC9tTMdteAtX1fLIcC0"
                  alt="African Professionals"
                  className="w-full h-full object-cover"
                  style={{ opacity: 0.4 }}
                />
              </div>

              {/* Glass content */}
              <div className="relative z-10 p-12 flex flex-col gap-8">
                {/* Main glass card */}
                <motion.div
                  className="glass-card p-8 rounded-xl"
                  style={{ maxWidth: 448 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="material-symbols-outlined"
                      style={{ color: '#f69f0d', fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                    <span
                      className="roota-display uppercase tracking-widest"
                      style={{ color: '#f69f0d', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      Global Standard
                    </span>
                  </div>
                  <h2
                    className="roota-display mb-4"
                    style={{ color: '#003527', fontSize: 32, fontWeight: 600, lineHeight: '40px', letterSpacing: '-0.01em' }}
                  >
                    Secure Your Wealth Frontier
                  </h2>
                  <p
                    style={{ color: '#404944', fontSize: 18, lineHeight: '28px' }}
                  >
                    Roota leverages advanced AI to provide an immutable Trust Score, bridging African talent with
                    global high-value opportunities.
                  </p>
                </motion.div>

                {/* Stat cards row */}
                <div className="flex gap-6" style={{ maxWidth: 448 }}>
                  {[
                    { value: '98.2%', label: 'Avg. Trust Growth', delay: 0.25 },
                    { value: '24/7', label: 'AI Monitoring', delay: 0.35 },
                  ].map(({ value, label, delay }) => (
                    <motion.div
                      key={label}
                      className="glass-card flex-1 p-4 rounded-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay }}
                    >
                      <div
                        className="roota-display mb-1"
                        style={{ color: '#f69f0d', fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
                      >
                        {value}
                      </div>
                      <div
                        className="roota-display"
                        style={{ color: '#404944', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                      >
                        {label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT PANEL — col-span-5 ── */}
            <motion.div
              className="md:col-span-6 lg:col-span-5 flex flex-col justify-center"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="w-full rounded-xl"
                style={{
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,53,39,0.06)',
                  border: '1px solid rgba(191,201,195,0.3)',
                  padding: '48px',
                }}
              >

                {/* ── Tabs ── */}
                <div
                  className="flex mb-8"
                  style={{ borderBottom: '1px solid rgba(191,201,195,0.3)' }}
                >
                  <button
                    type="button"
                    className={`tab-btn ${!isLogin ? 'active' : 'inactive'}`}
                    onClick={() => setIsLogin(false)}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    className={`tab-btn ${isLogin ? 'active' : 'inactive'}`}
                    onClick={() => setIsLogin(true)}
                  >
                    Login
                  </button>
                </div>

                {/* ── Heading ── */}
                <motion.div
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-8"
                >
                  <h3
                    className="roota-display mb-2"
                    style={{ color: '#003527', fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
                  >
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </h3>
                  <p style={{ color: '#404944', fontSize: 16, lineHeight: '24px' }}>
                    {isLogin
                      ? 'Log in to your professional workspace.'
                      : 'Join the network of futuristic professionals today.'}
                  </p>
                </motion.div>

                {/* ── Social login buttons ── */}
                {googleClientId ? (
                  <div className="w-full mb-8">
                    <GoogleLogin
                      onSuccess={handleGoogleLogin}
                      onError={() => {
                        toast.error('Google login failed');
                      }}
                    />
                  </div>
                ) : null}

                {/* ── Divider ── */}
                <div className="relative flex items-center mb-8">
                  <div className="flex-grow" style={{ borderTop: '1px solid rgba(191,201,195,0.3)' }} />
                  <span
                    className="mx-4 roota-display uppercase"
                    style={{
                      color: '#404944',
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      background: '#fff',
                      padding: '0 8px',
                    }}
                  >
                    Or continue with
                  </span>
                  <div className="flex-grow" style={{ borderTop: '1px solid rgba(191,201,195,0.3)' }} />
                </div>

                {/* ── Form ── */}
                <form
                  onSubmit={isLogin ? handleLogin : handleSignup}
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  {!isLogin && (
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block roota-display mb-2"
                        style={{ color: '#191c1e', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                      >
                        Full Name
                      </label>
                      <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="Chinua Achebe"
                        required
                        className="auth-input"
                      />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="email"
                      className="block roota-display mb-2"
                      style={{ color: '#191c1e', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="chinua@roota.future"
                      required
                      className="auth-input"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block roota-display mb-2"
                      style={{ color: '#191c1e', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="auth-input"
                        style={{ paddingRight: 48 }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2"
                        style={{ color: '#404944', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        id="terms"
                        type="checkbox"
                        style={{ accentColor: '#003527', borderRadius: 4 }}
                        required
                      />
                      <label
                        htmlFor="terms"
                        className="roota-display"
                        style={{ color: '#404944', fontSize: 14, fontWeight: 600, letterSpacing: '0.05em' }}
                      >
                        I agree to the{' '}
                        <Link
                          to="/terms"
                          style={{ color: '#003527', fontWeight: 700, textDecoration: 'none' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
                        >
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link
                          to="/privacy"
                          style={{ color: '#003527', fontWeight: 700, textDecoration: 'none' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'underline'; }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textDecoration = 'none'; }}
                        >
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="submit-btn"
                  >
                    {loading ? 'Loading...' : isLogin ? 'Login' : 'Create Account'}
                  </button>
                </form>

              </div>
            </motion.div>

          </div>
        </main>

        {/* ═══════════════════════════════════════════════════
            FOOTER — minimal
        ═══════════════════════════════════════════════════ */}
        <footer
          className="w-full py-8"
          style={{
            background: '#f2f4f6',
            borderTop: '1px solid rgba(191,201,195,0.3)',
          }}
        >
          <div
            className="flex flex-col md:flex-row justify-between items-center gap-4 px-5 md:px-12 w-full mx-auto"
            style={{ maxWidth: 1280 }}
          >
            <div className="flex flex-col gap-1">
              <div
                className="roota-display font-bold"
                style={{ color: '#003527', fontSize: 24, fontWeight: 600, lineHeight: '32px' }}
              >
                Roota
              </div>
              <div style={{ color: '#404944', fontSize: 16, lineHeight: '24px' }}>
                © 2026 Roota. Built for the African Future.
              </div>
            </div>
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
                  className="roota-display transition-colors"
                  style={{
                    color: '#404944',
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#003527'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#404944'; }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}