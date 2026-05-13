import React from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin } from 'lucide-react';

interface ProfileHeroProps {
  name: string;
  title: string;
  location: string;
  image?: string;
  verified?: boolean;
  skills?: string[];
  verificationBadge?: string;
}

export default function ProfileHero({
  name,
  title,
  location,
  image,
  verified = true,
  skills = [],
  verificationBadge = 'Verified Economic Identity',
}: ProfileHeroProps) {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32 }}
      className="relative overflow-hidden rounded-2xl border border-border bg-card px-7 py-7 shadow-sm"
    >
      <div className="absolute right-0 top-0 h-full w-40 bg-[radial-gradient(circle_at_top_right,rgba(11,93,75,0.08),transparent_58%)]" aria-hidden />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="relative h-[120px] w-[120px] flex-none overflow-hidden rounded-2xl border border-slate-300 bg-slate-100 shadow-[0_2px_6px_rgba(0,0,0,0.08)]"
        >
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-slate-200 to-slate-100 text-2xl font-bold text-slate-700">
              {initials}
            </div>
          )}

          {verified && (
            <div className="absolute bottom-2 right-2 grid h-7 w-7 place-items-center rounded-full border-2 border-card bg-primary-dark text-white shadow-sm">
              <Check size={14} />
            </div>
          )}
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.04em] text-slate-900">{name}</h1>
              <p className="mt-2 text-[18px] leading-7 text-muted">{title}</p>
            </div>

            {verificationBadge && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#F9E79D] px-4 py-2 text-sm font-medium text-[#A96A00]"
              >
                <span className="h-2 w-2 rounded-full bg-[#C98600]" />
                {verificationBadge}
              </motion.div>
            )}
          </div>

          <div className="mt-4 flex items-center gap-2 text-[16px] text-muted">
            <MapPin size={17} />
            <span>{location}</span>
          </div>

          {skills.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2.5">
              {skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + idx * 0.03 }}
                  className="rounded-full bg-slate-100 px-4 py-2 text-[15px] font-medium text-slate-700"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
