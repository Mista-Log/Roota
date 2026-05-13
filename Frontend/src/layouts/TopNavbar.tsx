import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';

const topNavItems = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/jobs', label: 'Jobs' },
  { path: '/finances', label: 'Finances' },
  { path: '/insights', label: 'Insights' },
];

export default function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const isNavItemActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const getCurrentRole = () => {
    if (location.pathname.includes('/dashboard') || location.pathname.includes('/jobs')) {
      return 'Worker';
    }
    return 'Employer';
  };

  const switchRole = () => {
    const currentRole = getCurrentRole();
    if (currentRole === 'Worker') {
      navigate('/employer');
    } else {
      navigate('/dashboard');
    }
    setShowRoleMenu(false);
  };

  return (
    <motion.header
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.28, delay: 0.06 }}
      role="banner"
      className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
    >
      <div className="px-8 py-4 flex items-center justify-between max-w-full">
        {/* Left navigation tabs */}
        <nav aria-label="Top Navigation" className="flex items-center gap-8">
          {topNavItems.map((item) => {
            const isActive = isNavItemActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative text-sm font-medium transition-colors duration-200 py-2"
              >
                <span
                  className={`${
                    isActive ? 'text-primary-dark' : 'text-muted hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-dark"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right section with buttons and profile */}
        <div className="flex items-center gap-4">
          {/* Switch Role button */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="px-4 py-2 text-sm font-medium text-muted border border-border rounded-lg transition-all duration-200 hover:border-primary-dark hover:text-primary-dark"
            >
              Switch Role
            </button>
            {showRoleMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-50"
              >
                <button
                  onClick={switchRole}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                >
                  Switch to {getCurrentRole() === 'Worker' ? 'Employer' : 'Worker'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Hire Talent CTA */}
          <button className="px-4 py-2 text-sm font-semibold bg-primary-dark text-white rounded-lg transition-all duration-200 hover:bg-primary-dark/90 active:scale-95 shadow-sm">
            Hire Talent
          </button>

          {/* Profile avatar */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center transition-all duration-200 hover:shadow-md"
          >
            <User size={20} className="text-slate-600" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
