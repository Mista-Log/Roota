import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '../../components/layout/Header';
import { MarketingFooter } from '../../components/layout/Footer';

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
  to,
  variant,
}: ChoiceCardProps) {
  return (
    <Link to={to} className="choice-card">
      <div className={`choice-card__media choice-card__media--${variant}`} />
      <div className="choice-card__content">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="choice-card__action">
          <span>{action.toUpperCase()}</span>
          <span className="choice-arrow">›</span>
        </div>
      </div>
    </Link>
  );
}

export default function RoleSelectionPage() {
  return (
    <div className="page role-page">
      <SimpleHeader left="Roota" right={<Link to="/auth">Back to home</Link>} />

      <main className="role-layout">
        <section className="role-intro">
          <span className="eyebrow eyebrow--soft">Welcome to the Wealth Oasis</span>
          <h1>
            How will you plant your <span>roots</span> today?
          </h1>
          <p>
            Select your path to start building your economic future. Roota connects African talent with global opportunities.
          </p>
        </section>

        <section className="role-cards">
          <ChoiceCard
            title="Join as a Worker"
            body="Find high-value projects, build your trust score, and secure your financial growth."
            action="Start Earning"
            to="/auth"
            variant="worker"
          />
          <ChoiceCard
            title="Hire as an Employer"
            body="Access top-tier verified talent across the continent and scale your vision with speed."
            action="Find Talent"
            to="/marketplace"
            variant="employer"
          />
        </section>
      </main>

      <MarketingFooter minimal />
    </div>
  );
}
