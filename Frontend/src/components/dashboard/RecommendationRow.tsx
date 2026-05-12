import React from 'react';
import { LayoutGrid } from 'lucide-react';

interface RecommendationRowProps {
  title: string;
  company: string;
  score: string;
  active?: boolean;
}

export function RecommendationRow({ title, company, score, active }: RecommendationRowProps) {
  return (
    <div className="recommendation-row">
      <div className="recommendation-row__left">
        <span className="recommendation-row__icon">
          <LayoutGrid size={16} />
        </span>
        <div>
          <strong>{title}</strong>
          <p>{company}</p>
        </div>
      </div>
      <div className="recommendation-row__score">
        {score}%
        <small>AI MATCH</small>
      </div>
      <div className={`row-arrow ${active ? 'row-arrow--active' : ''}`}>›</div>
    </div>
  );
}
