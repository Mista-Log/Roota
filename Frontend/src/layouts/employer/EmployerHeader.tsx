import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function EmployerHeader() {
  return (
    <motion.header
      initial={{ y: -6, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.28, delay: 0.06 }}
      role="banner"
      className="sticky top-0 z-40 bg-white border-b border-border"
    >
      <div className="flex max-w-full items-center justify-between px-4 py-3 sm:px-8 sm:py-4">
        <div className="flex items-center gap-6">
          <Link to="/employer/dashboard" className="text-lg font-bold">Roota</Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-200" />
        </div>
      </div>
    </motion.header>
  );
}
