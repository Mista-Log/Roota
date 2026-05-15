import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutGrid, Briefcase, Wallet, ShieldCheck, Settings, LifeBuoy, LogOut, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function WorkerSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navItems = [
    { path: '/worker/dashboard', label: 'Overview', icon: LayoutGrid },
    { path: '/worker/jobs', label: 'Jobs', icon: Briefcase },
    { path: '/worker/marketplace', label: 'Marketplace', icon: Briefcase },
    { path: '/worker/insights', label: 'Insights', icon: ShieldCheck },
    { path: '/worker/wallet', label: 'Wallet', icon: Wallet },
    { path: '/worker/trust-score', label: 'AI Trust Score', icon: ShieldCheck },
    { path: '/worker/settings', label: 'Settings', icon: Settings },
    { path: '/worker/support', label: 'Support', icon: LifeBuoy },
  ];

  const isNavItemActive = (path: string) => location.pathname.startsWith(path);

  return (
    <motion.aside
      initial={{ x: -12, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.24 }}
      role="navigation"
      aria-label="Worker navigation"
      className="fixed z-50 flex h-screen w-72 flex-col overflow-y-auto border-r border-[#d6e4dc] bg-[#f8faf8] text-slate-900"
    >
      <div className="border-b border-[#e6efe6] px-6 py-5">
        <Link to="/worker/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-bold text-primary-dark">Ⓡ</div>
          <div>
            <div className="text-sm font-bold">Roota AI</div>
            <div className="text-xs text-slate-500">Worker Workspace</div>
          </div>
        </Link>
      </div>

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
                  isActive ? 'bg-[#0b5d4b] text-white shadow-sm' : 'text-slate-700 hover:bg-[#dcebe4] hover:text-slate-900'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
                {isActive && <span className="absolute left-0 -ml-4 h-full w-1 rounded-r-md bg-[#0b5d4b]" aria-hidden />}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 border-t border-[#e6efe6] px-4 py-6">
        <button
          type="button"
          onClick={() => {
            logout();
            navigate('/auth');
          }}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-[#f0f6f2]"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
}
