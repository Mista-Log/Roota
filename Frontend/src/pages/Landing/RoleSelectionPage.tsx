import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '../../components/layout/Header';
import { MarketingFooter } from '../../components/layout/Footer';
import { useNavigate } from "react-router-dom";

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
    <div className="choice-card" onClick={onClick}>
      <div className={`choice-card__media choice-card__media--${variant}`} />
      <div className="choice-card__content">
        <h3>{title}</h3>
        <p>{body}</p>
        <div className="choice-card__action">
          <span>{action.toUpperCase()}</span>
          <span className="choice-arrow">›</span>
        </div>
      </div>
    </div>
  );
}

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  const selectRole = (role: "worker" | "employer", path: string) => {
    localStorage.setItem("selectedRole", role.toUpperCase());
    navigate(path);
  };

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
            body="Find high-value projects..."
            action="Start Earning"
            variant="worker"
            onClick={() => selectRole("worker", "/auth")}
          />

          <ChoiceCard
            title="Hire as an Employer"
            body="Access top-tier talent..."
            action="Find Talent"
            variant="employer"
            onClick={() => selectRole("employer", "/marketplace")}
          />
        </section>
      </main>

      <MarketingFooter minimal />
    </div>
  );
}
