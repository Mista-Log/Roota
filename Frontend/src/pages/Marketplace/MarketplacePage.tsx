import React from 'react';
import { WorkspaceShell } from '../../layouts/WorkspaceShell';
import { JobCard } from '../../components/marketplace/JobCard';
import { FilterField } from '../../components/marketplace/FilterField';
import { Search } from 'lucide-react';

const marketplaceCards = [
  {
    title: 'Senior Systems Architect',
    company: 'Luminary Wealth Systems',
    pay: '$12,500 - $18,000',
    score: '892',
    badge: 'PERFECT MATCH',
    matchTone: 'mint',
  },
  {
    title: 'Lead Product Designer',
    company: 'Oasis Capital Partners',
    pay: '$9,000 - $14,000',
    score: '750',
    badge: '92% COMPATIBILITY',
    matchTone: 'lavender',
  },
  {
    title: 'Director of AI Trust',
    company: 'Vertex Intelligence',
    pay: '$20,000 - $25,000',
    score: '950',
    badge: 'PERFECT MATCH',
    matchTone: 'mint',
  },
  {
    title: 'Growth Lead, Sub-Saharan',
    company: 'NairaFlow Technologies',
    pay: '$10,000 - $15,000',
    score: '810',
    badge: '88% COMPATIBILITY',
    matchTone: 'lavender',
  },
] as const;

export default function MarketplacePage() {
  return (
    <WorkspaceShell activeTab="jobs" mode="worker" title="Marketplace" subtitle="Browse global opportunities tailored to your trust score.">
      <div className="marketplace-layout">
        <aside className="marketplace-filters">
          <div className="search-box">
            <Search size={18} />
            <input type="text" placeholder="Search jobs, skills..." />
          </div>
          
          <div className="filter-group">
            <FilterField label="Job Type" value="All Types" />
            <FilterField label="Experience" value="Senior Level" />
            <FilterField label="Pay Range" value="$10k - $25k" />
            <FilterField label="Region" value="Global / Remote" />
          </div>

          <div className="trust-filter">
            <label>Minimum Trust Score</label>
            <input type="range" min="0" max="1000" defaultValue="700" />
            <div className="range-labels">
              <span>0</span>
              <span>700+</span>
              <span>1000</span>
            </div>
          </div>
        </aside>

        <main className="marketplace-content">
          <div className="content-header">
            <span>Showing 124 results</span>
            <div className="sort-by">
              Sort by: <strong>Relevance</strong>
            </div>
          </div>
          
          <div className="job-grid">
            {marketplaceCards.map((card) => (
              <JobCard key={card.title} {...card} />
            ))}
          </div>
        </main>
      </div>
    </WorkspaceShell>
  );
}
