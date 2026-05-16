import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function EmployerHeader({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const { user } = useAuth();
  const avatarSrc =
    user?.avatar ||
    user?.profile_image ||
    user?.profile_picture ||
    user?.image_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'User')}&background=E2E8F0&color=1E293B`;

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
          <img
            src={avatarSrc}
            alt="Profile"
            className="h-9 w-9 rounded-full border border-slate-200 object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </motion.header>
  );
}
