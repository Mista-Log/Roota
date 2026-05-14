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
      className="group cursor-pointer rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all"
    >
      {/* Image Placeholder */}
      <div className={`h-52 mb-0 rounded-t-2xl ${
        variant === 'worker'
          ? 'bg-gradient-to-br from-amber-800 via-amber-900 to-slate-900'
          : 'bg-gradient-to-br from-teal-900 via-slate-800 to-slate-900'
      }`} />
      
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{body}</p>
        <div className="flex items-center gap-3 text-primary-dark font-semibold group-hover:gap-4 transition-all pt-2">
          <span className="text-sm uppercase tracking-wide">{action}</span>
          <div className="w-8 h-8 rounded-full bg-primary-dark flex items-center justify-center text-white group-hover:bg-primary-dark transition-all">
            <ArrowRight size={18} />
          </div>
        </div>
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
      <SimpleHeader left="Roota" right={<Link to="/">← Back to home</Link>} />

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* LEFT - INTRO TEXT */}
          <motion.section
            className="space-y-6 pt-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-semibold text-[#42BAA7] bg-[#E8F7F5] rounded-full px-3 py-1">
              Welcome to the Wealth Oasis
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              How will you plant your <span className="text-[#F5A623]">roots</span> today?
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              Select your path to start building your economic future. Roota connects African talent with global opportunities.
            </p>
          </motion.section>

          {/* RIGHT - CHOICE CARDS */}
          <motion.section
            className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ChoiceCard
              title="Join as a Worker"
              body="Find high-value projects, build your professional reputation with AI-verified opportunities across Africa and the globe."
              action="Start Earning"
              variant="worker"
              onClick={() => selectRole("worker", "/auth")}
            />

            <ChoiceCard
              title="Hire as an Employer"
              body="Access top-tier verified talent across the continent and scale your vision with speed."
              action="Find Talent"
              variant="employer"
              onClick={() => selectRole("employer", "/auth")}
            />
          </motion.section>
        </div>
      </main>

      <MarketingFooter minimal />
    </div>
  );
}
