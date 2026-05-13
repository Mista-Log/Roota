import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutGrid,
  Briefcase,
  Wallet,
  ShieldCheck,
  Settings,
  LifeBuoy,
  LogOut,
  Zap,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Overview', icon: LayoutGrid },
  { path: '/marketplace', label: 'Marketplace', icon: Briefcase },
  { path: '/wallet', label: 'Wallet', icon: Wallet },
  { path: '/trust-score', label: 'AI Trust Score', icon: ShieldCheck },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

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
      className="w-72 bg-primary-dark text-white fixed h-screen border-r border-primary/20 overflow-y-auto z-50 flex flex-col"
    >
      {/* Logo section */}
      <div className="px-6 py-5 border-b border-primary/20">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-primary-dark">
            Ⓡ
          </div>
          <div>
            <div className="font-bold text-sm">Roota AI</div>
            <div className="text-xs text-primary-light opacity-70">Premium Workforce</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(item.path);

          return (
            <motion.div key={item.path} whileHover={{ x: 4 }} transition={{ duration: 0.18 }}>
              <Link
                to={item.path}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-primary-light hover:bg-primary/10'
                }`}
              >
                <Icon size={18} />
                <span className="text-sm">{item.label}</span>
                {isActive && (
                  <span className="absolute left-0 w-1 h-full bg-primary-dark rounded-r-md -ml-4" aria-hidden />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Upgrade card */}
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="mx-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/8 border border-accent/30 rounded-lg cursor-pointer">
        <div className="flex items-start gap-3">
          <Zap size={18} className="text-accent mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white">Upgrade to Pro</p>
            <p className="text-xs text-primary-light opacity-80 mt-1">Unlock AI-powered matches and higher visibility</p>
              <button className="mt-3 w-full bg-accent text-primary-dark font-semibold py-2 px-3 rounded-lg text-xs transition-all duration-200 hover:bg-accent/90 active:scale-95">
                Get Access
              </button>
          </div>
        </div>
        </div>
      </motion.div>

      {/* Bottom section */}
      <div className="px-4 py-6 border-t border-primary/20 mt-auto space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-light hover:bg-primary/10 transition-colors duration-200 text-sm font-medium">
          <LifeBuoy size={18} />
          Support
        </button>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-primary-light hover:bg-primary/10 transition-colors duration-200 text-sm font-medium">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
}
