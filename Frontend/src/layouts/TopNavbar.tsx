import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, User, Menu, X, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import type { MouseEvent } from 'react';

const sharedNavItems = [
  { path: '/jobs', label: 'Jobs' },
  { path: '/finances', label: 'Finances' },
  { path: '/insights', label: 'Insights' },
];

export default function TopNavbar({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { userRole, logout, user } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const avatarSrc =
    user?.avatar ||
    user?.profile_image ||
    user?.profile_picture ||
    user?.image_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.full_name || 'User')}&background=E2E8F0&color=1E293B`;

  const currentRole = userRole === 'employer' ? 'employer' : 'worker';
  const dashboardPath = currentRole === 'employer' ? '/employer/dashboard' : '/worker/dashboard';
  const jobsPath = currentRole === 'employer' ? '/employer/jobs' : '/worker/jobs';

  const topNavItems = [
    { path: dashboardPath, label: 'Dashboard' },
    { path: jobsPath, label: 'Jobs' },
    { path: '/finances', label: 'Finances' },
    { path: '/insights', label: 'Insights' },
  ];

  const isNavItemActive = (path: string) => location.pathname.startsWith(path);

  const switchRole = () => {
    navigate(currentRole === 'worker' ? '/employer/dashboard' : '/worker/dashboard');
  };

  return (
    <motion.header
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.28, delay: 0.06 }}
      role="banner"
      className="sticky top-0 z-40 bg-card border-b border-border shadow-sm"
    >
      <div className="flex max-w-full items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        {/* Left navigation tabs */}
        <div className="flex items-center gap-6">
          {/* Mobile hamburger */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => onToggleSidebar && onToggleSidebar()}
              aria-label="Open navigation"
              className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white text-slate-700"
            >
              <Menu size={18} />
            </button>
          </div>
          {location.pathname.startsWith('/employer/dashboard') && (
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

          <nav aria-label="Top Navigation" className="hidden md:flex items-center gap-8">
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

        {/* Mobile right: profile & dropdown */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="relative">
            <button
              onClick={(e: MouseEvent) => {
                e.stopPropagation();
                setShowProfileMenu((s) => !s);
              }}
              aria-expanded={showProfileMenu}
              aria-label="Open profile menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100"
            >
              <img
                src={avatarSrc}
                alt="Profile"
                className="h-10 w-10 rounded-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border border-border bg-white shadow-lg">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/settings');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/support');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-slate-50"
                >
                  <LifeBuoy size={16} /> Support
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    logout();
                    navigate('/auth');
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-slate-50"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right section with buttons and profile */}
        <div className="hidden md:flex items-center gap-4">
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
            <img
              src={avatarSrc}
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
}
