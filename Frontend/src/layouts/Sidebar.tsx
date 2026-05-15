import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Briefcase, Wallet, ShieldCheck, Settings, LifeBuoy, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, logout } = useAuth();

  const homePath = userRole === 'employer' ? '/employer/dashboard' : '/worker/dashboard';

  const navItems = userRole === 'employer' ? [
    { path: '/employer/dashboard', label: 'Overview', icon: LayoutGrid },
    { path: '/employer/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/trust-score', label: 'AI Trust Score', icon: ShieldCheck },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/support', label: 'Support', icon: LifeBuoy },
  ] : [
    { path: '/worker/dashboard', label: 'Overview', icon: LayoutGrid },
    { path: '/worker/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/wallet', label: 'Wallet', icon: Wallet },
    { path: '/trust-score', label: 'AI Trust Score', icon: ShieldCheck },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/support', label: 'Support', icon: LifeBuoy },
  ];

  const isNavItemActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={{ x: -12, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.24 }}
      role="navigation"
      aria-label="Main navigation"
      className="fixed z-50 flex h-screen w-72 flex-col overflow-y-auto border-r border-[#d6e4dc] bg-[#edf6f1] text-slate-900"
    >
      {/* Logo section */}
      <div className="border-b border-[#d6e4dc] bg-[#0b5d4b] px-6 py-5 text-white">
        <Link to={homePath} className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-bold text-primary-dark">
            Ⓡ
          </div>
          <div>
            <div className="text-sm font-bold text-white">Roota AI</div>
            <div className="text-xs text-white/75">Premium Workforce</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(item.path);

          return (
            <motion.div key={item.path} whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
              <Link
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#0b5d4b] text-white shadow-sm'
                    : 'text-slate-700 hover:bg-[#dcebe4] hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <span className="absolute left-0 -ml-4 h-full w-1 rounded-r-md bg-[#0b5d4b]" aria-hidden />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="mx-4 mb-6">
        <div className="cursor-pointer rounded-2xl border border-[#2f6b59] bg-[#134b3d] p-4 text-white shadow-sm">
          <div className="flex items-start gap-3">
            <Zap size={18} className="mt-0.5 flex-shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
              <p className="mt-1 text-xs text-white/75">Unlock AI-powered matches and higher visibility</p>
              <button className="mt-3 w-full rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-primary-dark transition-all duration-200 hover:bg-accent/90 active:scale-95">
                Get Access
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom section */}
      <div className="mt-auto space-y-2 border-t border-[#d6e4dc] px-4 py-6">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-[#dcebe4] hover:text-slate-900">
          <LifeBuoy size={18} />
          Support
        </button>
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/auth');
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-[#dcebe4] hover:text-slate-900"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
}
