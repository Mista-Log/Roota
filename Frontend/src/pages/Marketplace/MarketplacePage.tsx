import React from 'react';
import AppShell from '../../layouts/AppShell';
import { Search, MapPin, SlidersHorizontal, Check, Briefcase, Star } from 'lucide-react';

const suggestedJobs = [
  { title: 'Senior FinTech Lead', score: '98%', subtitle: 'Match based on your score' },
  { title: 'Product Strategist', score: '85%', subtitle: 'Match based on your score' },
];

const marketplaceJobs = [
  {
    title: 'Senior Systems Architect',
    company: 'Luminary Wealth Systems',
    tag: 'PERFECT MATCH',
    rate: '$12,500 - $18,000',
    score: '892',
    accent: 'bg-[#0A4B3A]',
  },
  {
    title: 'Lead Product Designer',
    company: 'Oasis Capital Partners',
    tag: '92% COMPATIBILITY',
    rate: '$9,000 - $14,000',
    score: '750',
    accent: 'bg-slate-900',
  },
  {
    title: 'Director of AI Trust',
    company: 'Vertex Intelligence',
    tag: 'PERFECT MATCH',
    rate: '$20,000 - $25,000',
    score: '950',
    accent: 'bg-[#0A4B3A]',
  },
  {
    title: 'Growth Lead, Sub-Saharan',
    company: 'NairaFlow Technologies',
    tag: '88% COMPATIBILITY',
    rate: '$10,000 - $15,000',
    score: '810',
    accent: 'bg-slate-900',
  },
];

export default function MarketplacePage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <section className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
            <div className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search for roles, technologies, or keywords..."
                className="h-12 w-full rounded-[14px] border border-border bg-white pl-11 pr-4 text-[14px] text-slate-900 outline-none placeholder:text-muted"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_1fr_0.8fr_auto] xl:items-end">
            <label className="rounded-[12px] border border-border bg-white px-4 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Skills</span>
              <div className="mt-1 text-[14px] text-slate-900">React, Node.js, Python</div>
            </label>
            <label className="rounded-[12px] border border-border bg-white px-4 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Location</span>
              <div className="mt-1 flex items-center gap-2 text-[14px] text-slate-900"><MapPin size={14} /> Lagos, Nigeria</div>
            </label>
            <label className="rounded-[12px] border border-border bg-white px-4 py-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Role Type</span>
              <div className="mt-1 text-[14px] text-slate-900">Full-time</div>
            </label>
            <button className="inline-flex h-12 items-center justify-center rounded-[12px] bg-primary-dark px-5 text-[14px] font-semibold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
              <SlidersHorizontal size={16} className="mr-2" /> Apply Filters
            </button>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <section className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">AI Suggested for You</p>

              <div className="mt-4 space-y-3">
                {suggestedJobs.map((job) => (
                  <div key={job.title} className="rounded-[14px] border border-border bg-[#F8FAFB] px-3 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-full bg-[#EAF0FF] text-[#8D98D6]">◌</div>
                      <div className="min-w-0">
                        <div className="text-[14px] font-semibold text-slate-900">{job.title}</div>
                        <div className="text-[12px] text-muted">{job.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-900">Pay Range</p>
                  <div className="mt-3 space-y-2 text-[13px] text-slate-700">
                    <label className="flex items-center gap-2"><input type="checkbox" /> $50k - $100k</label>
                    <label className="flex items-center gap-2"><input type="checkbox" /> $100k - $200k</label>
                    <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> $200k+</label>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-900">Minimum Trust Score</p>
                  <div className="mt-4">
                    <div className="relative h-1.5 rounded-full bg-slate-200">
                      <div className="absolute left-[62%] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white bg-primary-dark shadow-sm" />
                    </div>
                    <div className="mt-2 flex justify-between text-[11px] text-muted">
                      <span>500</span>
                      <span>750+</span>
                      <span>999</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </aside>

          <main className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {marketplaceJobs.map((job) => (
              <article key={job.title} className="rounded-[18px] border border-border bg-card px-5 py-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                  <div className="h-11 w-11 rounded-[12px] bg-[#10221D]" />
                  <span className="rounded-full bg-[#DDF6E9] px-3 py-1 text-[11px] font-semibold text-[#0B5D4B]">
                    {job.tag}
                  </span>
                </div>

                <div className="mt-4 text-[22px] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900">
                  {job.title}
                </div>
                <div className="mt-2 text-[14px] text-muted">{job.company}</div>

                <div className="mt-4 flex items-end justify-between gap-4">
                  <div>
                    <div className="text-[15px] font-medium text-slate-900">{job.rate}</div>
                    <div className="text-[11px] uppercase tracking-[0.08em] text-muted">Monthly pay rate</div>
                  </div>
                  <div className="flex items-center gap-2 rounded-[10px] bg-slate-50 px-3 py-2 text-[13px] font-semibold text-slate-700">
                    <Star size={14} className="text-[#F5A623]" fill="currentColor" /> {job.score}
                  </div>
                </div>

                <button className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5 ${job.accent}`}>
                  Apply with Trust Score <span aria-hidden>→</span>
                </button>
              </article>
            ))}
          </main>
        </div>
      </div>
    </AppShell>
  );
}
