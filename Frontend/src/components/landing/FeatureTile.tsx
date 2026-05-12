import React from 'react';
import { Briefcase, CreditCard, ShieldCheck, TrendingUp } from 'lucide-react';

interface FeatureTileProps {
  title: string;
  body: string;
  icon: string;
  tone: string;
}

export function FeatureTile({ title, body, icon, tone }: FeatureTileProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase':
        return <Briefcase size={24} />;
      case 'card':
        return <CreditCard size={24} />;
      case 'insight':
        return <TrendingUp size={24} />;
      case 'shield':
        return <ShieldCheck size={24} />;
      default:
        return <Briefcase size={24} />;
    }
  };

  return (
    <article className={`feature-tile feature-tile--${tone}`}>
      <div className="feature-tile__icon">
        {getIcon(icon)}
      </div>
      <h3>{title}</h3>
      <p>{body}</p>
    </article>
  );
}
