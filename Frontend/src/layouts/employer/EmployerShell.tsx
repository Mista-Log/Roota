import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import EmployerSidebar from './EmployerSidebar';
import EmployerHeader from './EmployerHeader';
import MobileBottomNav from '../MobileBottomNav';
import { LayoutGrid, Briefcase, Wallet, ShieldCheck } from 'lucide-react';

interface EmployerShellProps {
  children: ReactNode;
}

export default function EmployerShell({ children }: EmployerShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen app-bg">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <EmployerSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-72">
        <EmployerHeader onToggleSidebar={() => setIsSidebarOpen((s) => !s)} />

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

      <MobileBottomNav
        items={[
          { path: '/employer/dashboard', label: 'Home', icon: LayoutGrid },
          { path: '/employer/jobs', label: 'Jobs', icon: Briefcase },
          { path: '/employer/wallet', label: 'Wallet', icon: Wallet },
          { path: '/employer/insights', label: 'Insights', icon: ShieldCheck },
        ]}
        label="Employer mobile navigation"
      />
    </div>
  );
}
