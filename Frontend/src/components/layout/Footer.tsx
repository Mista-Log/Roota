interface MarketingFooterProps {
  minimal?: boolean;
  auth?: boolean;
}

export function MarketingFooter({ minimal = false, auth = false }: MarketingFooterProps) {
  return (
    <footer className={`marketing-footer ${minimal ? 'marketing-footer--minimal' : ''} ${auth ? 'marketing-footer--auth' : ''}`}>
      <div>
        <div className="brand-name">Roota</div>
        <p>
          {auth ? '© 2026 Roota. Built for the African Future.' : 'Building Africa\'s professional future with AI-driven trust.'}
        </p>
      </div>
      <nav>
        <a href="#terms">Terms of Service</a>
        <a href="#privacy">Privacy Policy</a>
        <a href="#help">Help Center</a>
        <a href="#contact">Contact Support</a>
      </nav>
    </footer>
  );
}
