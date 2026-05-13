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
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-card rounded-lg border border-border p-8 shadow-sm"
    >
      <div className="flex gap-8">
        {/* Profile image */}
        {image && (
          <div className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-32 h-32 rounded-xl border-2 border-border overflow-hidden relative"
            >
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
              {verified && (
                <div className="absolute bottom-2 right-2 bg-primary-dark text-white rounded-full p-1.5">
                  <Check size={16} />
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Profile info */}
        <div className="flex-1">
          <div className="mb-4">
            <h1 className="text-4xl font-bold text-slate-900">{name}</h1>
            <p className="text-lg text-muted mt-1">{title}</p>
          </div>

          <div className="flex items-center gap-2 text-muted mb-6">
            <MapPin size={18} />
            <span>{location}</span>
          </div>

          {/* Verification badge */}
          {verificationBadge && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full mb-6"
            >
              <div className="w-2 h-2 bg-yellow-600 rounded-full" />
              <span className="text-sm font-medium text-yellow-700">{verificationBadge}</span>
            </motion.div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium"
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
