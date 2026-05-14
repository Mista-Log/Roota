interface MarketingFooterProps {
  minimal?: boolean;
  auth?: boolean;
}

export function MarketingFooter({ minimal = false, auth = false }: MarketingFooterProps) {
  if (minimal) {
    return (
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 md:text-left text-center">
              <h3 className="text-lg font-bold text-slate-900">Roota</h3>
              <p className="text-sm text-slate-600">
                {auth ? '© 2026 Roota. Built for the African Future.' : 'Building Africa\'s professional future with AI-driven trust.'}
              </p>
            </div>
            <nav className="flex flex-wrap justify-center md:justify-end gap-6">
              <a href="#terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Terms of Service
              </a>
              <a href="#privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Privacy Policy
              </a>
              <a href="#help" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Help Center
              </a>
              <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                Contact Support
              </a>
            </nav>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Roota</h3>
            <p className="text-sm text-slate-600">
              Building Africa's professional future with AI-driven trust.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#jobs" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Jobs Seeker
                </a>
              </li>
              <li>
                <a href="#payroll" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Payroll
                </a>
              </li>
              <li>
                <a href="#trust" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Trust Score
                </a>
              </li>
              <li>
                <a href="#api" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#blog" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#press" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#help" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-600 text-center">© 2026 Roota. Built for the African Future.</p>
        </div>
      </div>
    </footer>
  );
}
