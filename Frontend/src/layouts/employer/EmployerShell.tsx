import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import EmployerSidebar from './EmployerSidebar';
import EmployerHeader from './EmployerHeader';

interface EmployerShellProps {
  children: ReactNode;
}

export default function EmployerShell({ children }: EmployerShellProps) {
  return (
    <div className="flex min-h-screen app-bg">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <EmployerSidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-72">
        <EmployerHeader />

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
