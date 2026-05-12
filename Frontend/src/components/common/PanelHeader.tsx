import React from 'react';
import { Link } from 'react-router-dom';

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  action?: string;
  actionButton?: string;
  actionBadge?: string;
  value?: string;
  menu?: boolean;
  sparkle?: boolean;
}

export function PanelHeader({
  title,
  subtitle,
  action,
  actionButton,
  actionBadge,
  value,
  menu = false,
  sparkle = false,
}: PanelHeaderProps) {
  return (
    <div className="panel-header">
      <div className="panel-header__copy">
        <h3>
          {sparkle ? <span className="sparkle-mark">✦</span> : null}
          {title}
        </h3>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
      {value ? <strong className="panel-header__value">{value}</strong> : null}
      {action ? <Link to="#" className="panel-header__action">{action}</Link> : null}
      {actionButton ? (
        <button type="button" className="pill-button pill-button--gold pill-button--small">
          {actionButton}
        </button>
      ) : null}
      {actionBadge ? <span className="badge badge--soft">{actionBadge}</span> : null}
      {menu ? <span className="menu-dot">⋮</span> : null}
    </div>
  );
}
