import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import WorkerSidebar from './WorkerSidebar';
import WorkerHeader from './WorkerHeader';
import MobileBottomNav from '../MobileBottomNav';
import { LayoutGrid, Briefcase, Wallet, ShieldCheck } from 'lucide-react';

interface WorkerShellProps {
  children: ReactNode;
}

export default function WorkerShell({ children }: WorkerShellProps) {
  return (
    <div className="flex min-h-screen app-bg">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <WorkerSidebar />

      <div className="flex-1 flex flex-col overflow-hidden md:ml-72">
        <WorkerHeader />

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
          { path: '/worker/dashboard', label: 'Home', icon: LayoutGrid },
          { path: '/worker/jobs', label: 'Jobs', icon: Briefcase },
          { path: '/worker/wallet', label: 'Wallet', icon: Wallet },
          { path: '/worker/insights', label: 'Insights', icon: ShieldCheck },
        ]}
        label="Worker mobile navigation"
      />
    </div>
  );
}
