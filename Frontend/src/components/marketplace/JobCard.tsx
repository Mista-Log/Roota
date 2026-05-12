import React from 'react';
import { Star } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  pay: string;
  score: string;
  badge: string;
  matchTone: 'mint' | 'lavender';
}

export function JobCard({
  title,
  company,
  pay,
  score,
  badge,
  matchTone,
}: JobCardProps) {
  return (
    <article className="job-card">
      <div className="job-card__top">
        <span className="job-card__logo" />
        <span className={`match-pill match-pill--${matchTone}`}>{badge}</span>
      </div>
      <h3>{title}</h3>
      <p>{company}</p>
      <div className="job-card__meta">
        <div>
          <strong>{pay}</strong>
          <span>MONTHLY PAY RATE</span>
        </div>
        <div className="score-chip">
          <Star size={14} fill="currentColor" />
          {score}
        </div>
      </div>
      <button type="button" className="pill-button pill-button--solid pill-button--block pill-button--small">
        Apply with Trust Score <span className="arrow-inline">→</span>
      </button>
    </article>
  );
}
