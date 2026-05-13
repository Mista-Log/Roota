import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Lightbulb } from 'lucide-react';

interface InsightCardProps {
  title: string;
  description: string;
  icon?: 'alert' | 'tip';
  tone?: 'warning' | 'info' | 'success';
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toneConfig = {
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
    badge: 'bg-yellow-100 text-yellow-700',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    badge: 'bg-blue-100 text-blue-700',
  },
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
  },
};

export default function InsightCard({
  title,
  description,
  icon = 'tip',
  tone = 'info',
  action,
}: InsightCardProps) {
  const config = toneConfig[tone];
  const Icon = icon === 'alert' ? AlertCircle : Lightbulb;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`${config.bg} rounded-lg border ${config.border} p-5 shadow-sm`}
    >
      <div className="flex gap-4">
        <motion.div
          className={`${config.icon} flex-shrink-0 mt-0.5`}
          initial={{ rotate: -10 }}
          whileInView={{ rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Icon size={20} />
        </motion.div>

        <div className="flex-1">
          <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">{description}</p>

          {action && (
            <motion.button
              whileHover={{ x: 2 }}
              onClick={action.onClick}
              className={`${config.badge} text-xs font-semibold px-3 py-1.5 rounded transition-all duration-200 hover:shadow-md`}
            >
              {action.label}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
