import { motion } from 'framer-motion';

export default function AppPreloader() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f9fb]">
      <motion.img
        src="/logo.png"
        alt="Loading Roota"
        className="h-24 w-24 object-contain"
        animate={{ rotate: [0, 8, -8, 0], y: [0, -6, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.p
        className="mt-4 text-sm font-semibold tracking-wide text-[#0b5d4b]"
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
      >
        Preparing your workspace...
      </motion.p>
    </div>
  );
}
