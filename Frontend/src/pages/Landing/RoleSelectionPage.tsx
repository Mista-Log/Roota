import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '../../components/layout/Header';
import { MarketingFooter } from '../../components/layout/Footer';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ChoiceCardProps {
  title: string;
  body: string;
  action: string;
  to: string;
  variant: 'worker' | 'employer';
}

function ChoiceCard({
  title,
  body,
  action,
  variant,
  onClick,
}: ChoiceCardProps & { onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer rounded-2xl border border-border bg-white p-8 shadow-sm hover:shadow-lg transition-all"
    >
      <div className={`h-48 mb-6 rounded-xl ${
        variant === 'worker'
          ? 'bg-gradient-to-br from-[#42BAA7]/20 to-[#0b5d4b]/10'
          : 'bg-gradient-to-br from-[#F5A623]/20 to-[#D97706]/10'
      }`} />
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6">{body}</p>
      <div className="flex items-center gap-2 text-primary-dark font-semibold group-hover:gap-3 transition-all">
        <span>{action.toUpperCase()}</span>
        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </motion.div>
  );
}

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const selectRole = (role: "worker" | "employer", path: string) => {
    localStorage.setItem("selectedRole", role.toUpperCase());
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-white">
      <SimpleHeader left="Roota" right={<Link to="/">Back to home</Link>} />

      <main className="space-y-24 py-20">
        {/* INTRO SECTION */}
        <motion.section
          className="max-w-4xl mx-auto px-6 text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-sm font-semibold text-[#F5A623] bg-[#FFF1D9] rounded-full px-4 py-1.5">
            🌱 Welcome to the Wealth Oasis
          </span>
          <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
            How will you plant your <span className="text-primary-dark">roots</span> today?
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Select your path to start building your economic future. Roota connects African talent with global opportunities.
          </p>
        </motion.section>

        {/* CHOICE CARDS */}
        <motion.section
          className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ChoiceCard
            title="Join as a Worker"
            body="Find high-value projects and build your professional reputation with AI-verified opportunities across Africa and the globe."
            action="Start Earning"
            variant="worker"
            onClick={() => selectRole("worker", "/auth")}
          />

          <ChoiceCard
            title="Hire as an Employer"
            body="Access top-tier African talent pool with verified trust scores, instant onboarding, and seamless global payroll management."
            action="Find Talent"
            variant="employer"
            onClick={() => selectRole("employer", "/marketplace")}
          />
        </motion.section>
      </main>

      <MarketingFooter minimal />
    </div>
  );
}
