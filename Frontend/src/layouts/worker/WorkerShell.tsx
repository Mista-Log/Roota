import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import WorkerSidebar from './WorkerSidebar';
import WorkerHeader from './WorkerHeader';

interface WorkerShellProps {
  children: ReactNode;
}

export default function WorkerShell({ children }: WorkerShellProps) {
  return (
    <div className="flex min-h-screen app-bg">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <WorkerSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-72">
        <WorkerHeader />

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
