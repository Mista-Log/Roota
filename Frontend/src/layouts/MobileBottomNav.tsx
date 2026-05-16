import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

export type MobileNavItem = {
  path: string;
  label: string;
  icon: LucideIcon;
};

interface MobileBottomNavProps {
  items: MobileNavItem[];
  label?: string;
}

export default function MobileBottomNav({ items, label = 'Mobile navigation' }: MobileBottomNavProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <motion.nav
      initial={{ y: 16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.22 }}
      aria-label={label}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#d6e4dc] bg-white/95 backdrop-blur-md shadow-[0_-10px_30px_rgba(15,23,42,0.08)] md:hidden"
    >
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {items.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={active ? 'page' : undefined}
              className={`flex flex-col items-center justify-center rounded-2xl px-2 py-2 text-[11px] font-semibold transition-colors ${
                active ? 'text-primary-dark bg-[#dff4eb]' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={18} />
              <span className="mt-1 leading-none">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}