import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sharedNavItems = [
  { path: '/jobs', label: 'Jobs' },
  { path: '/finances', label: 'Finances' },
  { path: '/insights', label: 'Insights' },
];

export default function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole } = useAuth();

  const currentRole = userRole === 'employer' ? 'employer' : 'worker';
  const dashboardPath = currentRole === 'employer' ? '/employer' : '/dashboard';

  const topNavItems = [{ path: dashboardPath, label: 'Dashboard' }, ...sharedNavItems];

  const isNavItemActive = (path: string) => location.pathname.startsWith(path);

  const switchRole = () => {
    navigate(currentRole === 'worker' ? '/employer' : '/dashboard');
  };

  return (
    <motion.header
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.28, delay: 0.06 }}
      role="banner"
      className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
    >
      <div className="flex max-w-full items-center justify-between px-8 py-4">
        {/* Left navigation tabs */}
        <div className="flex items-center gap-6">
          {location.pathname.startsWith('/employer') && (
            <div className="hidden xl:flex items-center gap-3 rounded-full border border-border bg-[#f7f8f6] px-4 py-2.5">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                aria-label="Search talent"
                placeholder="Search talent..."
                className="w-56 bg-transparent text-sm text-slate-900 outline-none placeholder:text-muted"
              />
            </div>
          )}

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
        </div>

        {/* Right section with buttons and profile */}
        <div className="flex items-center gap-4">
          <button
            onClick={switchRole}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:border-primary-dark hover:text-primary-dark"
          >
            Switch Role
          </button>

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
