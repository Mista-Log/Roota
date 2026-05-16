import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import type { MouseEvent } from 'react';

export default function EmployerHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  return (
    <motion.header
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.28, delay: 0.06 }}
      role="banner"
      className="sticky top-0 z-40 bg-white border-b border-border"
    >
      <div className="flex max-w-full items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleSidebar && onToggleSidebar()}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white md:hidden"
            aria-label="Open navigation"
          >
            <Menu size={16} />
          </button>
          <Link to="/employer/dashboard" className="text-lg font-bold">Roota</Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </div>
    </motion.header>
  );
}
