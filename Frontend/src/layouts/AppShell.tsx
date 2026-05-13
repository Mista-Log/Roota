import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen app-bg">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area (offset by sidebar width) */}
      <div className="flex-1 flex flex-col overflow-hidden ml-72">
        {/* Top navbar */}
        <TopNavbar />

        {/* Page content */}
        <motion.main
          id="main-content"
          role="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto bg-transparent"
        >
          <div className="p-8">
            {children}
          </div>
        </motion.main>
      </div>
    </div>
  );
}
