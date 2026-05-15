import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';
import { useAuth } from '../context/AuthContext';
import MobileBottomNav from './MobileBottomNav';
import { LayoutGrid, Briefcase, Wallet, ShieldCheck, Settings, LifeBuoy } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { userRole } = useAuth();
  const isEmployer = userRole === 'employer';
  const mobileNavItems = isEmployer
    ? [
        { path: '/employer/dashboard', label: 'Home', icon: LayoutGrid },
        { path: '/employer/jobs', label: 'Jobs', icon: Briefcase },
        { path: '/employer/wallet', label: 'Wallet', icon: Wallet },
        { path: '/employer/insights', label: 'Insights', icon: ShieldCheck },
      ]
    : [
        { path: '/worker/dashboard', label: 'Home', icon: LayoutGrid },
        { path: '/worker/jobs', label: 'Jobs', icon: Briefcase },
        { path: '/worker/wallet', label: 'Wallet', icon: Wallet },
        { path: '/worker/insights', label: 'Insights', icon: ShieldCheck },
      ];

  return (
    <div className="flex min-h-screen app-bg">
      {/* Skip link for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to content</a>
      {/* Sidebar (desktop) and mobile drawer */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main content area (offset by sidebar width) */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-72">
        {/* Top navbar */}
        <TopNavbar onToggleSidebar={() => setIsSidebarOpen((s) => !s)} />

        {/* Page content */}
        <motion.main
          id="main-content"
          role="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex-1 overflow-auto bg-transparent pb-24 md:pb-0"
        >
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </motion.main>
      </div>

      <MobileBottomNav items={mobileNavItems} />
    </div>
  );
}
