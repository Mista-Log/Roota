'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Star, Loader } from 'lucide-react';

const API_BASE_URL = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000' : 'http://localhost:8000';

interface Job {
  id: string;
  title: string;
  company: string;
  tag: string;
  rate: string;
  score: string | number;
  accent: string;
  location?: string;
  description?: string;
}

interface SuggestedJob {
  id: string;
  title: string;
  score: string;
  subtitle: string;
}

const mockSuggestedJobs: SuggestedJob[] = [
  { id: '1', title: 'Senior FinTech Lead', score: '98%', subtitle: 'Match based on your profile' },
  { id: '2', title: 'Product Strategist', score: '85%', subtitle: 'Match based on your profile' },
];

const mockMarketplaceJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Systems Architect',
    company: 'Luminary Wealth Systems',
    tag: 'PERFECT MATCH',
    rate: '$12,500 - $18,000',
    score: '892',
    accent: 'bg-[#0A4B3A]',
    location: 'San Francisco, CA',
    description: 'Lead architect for our fintech platform',
  },
  {
    id: '2',
    title: 'Lead Product Designer',
    company: 'Oasis Capital Partners',
    tag: '92% COMPATIBILITY',
    rate: '$9,000 - $14,000',
    score: '750',
    accent: 'bg-slate-900',
    location: 'New York, NY',
    description: 'Design lead for financial products',
  },
  {
    id: '3',
    title: 'Director of AI Trust',
    company: 'Vertex Intelligence',
    tag: 'PERFECT MATCH',
    rate: '$20,000 - $25,000',
    score: '950',
    accent: 'bg-[#0A4B3A]',
    location: 'Remote',
    description: 'Lead our AI trust & safety initiatives',
  },
  {
    id: '4',
    title: 'Growth Lead, Sub-Saharan',
    company: 'NairaFlow Technologies',
    tag: '88% COMPATIBILITY',
    rate: '$10,000 - $15,000',
    score: '810',
    accent: 'bg-slate-900',
    location: 'Lagos, Nigeria',
    description: 'Drive growth across sub-saharan markets',
  },
];

export default function WorkerMarketplacePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(mockMarketplaceJobs);
  const [suggestedJobs, setSuggestedJobs] = useState<SuggestedJob[]>(mockSuggestedJobs);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    skills: 'React, Node.js, Python',
    location: 'Lagos, Nigeria',
    roleType: 'Full-time',
    payRange: '$200k+',
    trustScore: 750,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/worker/marketplace/jobs/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setJobs(data.results || mockMarketplaceJobs);
        } else {
          setJobs(mockMarketplaceJobs);
        }
      } catch (error) {
        console.log('Using worker mock data - backend unavailable');
        setJobs(mockMarketplaceJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/worker/marketplace/suggested/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestedJobs(data.results || mockSuggestedJobs);
        }
      } catch (error) {
        console.log('Using worker mock suggested jobs - backend unavailable');
      }
    };

    fetchSuggested();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockMarketplaceJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
    );
    setJobs(filtered.length > 0 ? filtered : mockMarketplaceJobs);
  };

  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        skills: filters.skills,
        location: filters.location,
        roleType: filters.roleType,
        minTrustScore: filters.trustScore.toString(),
      });

      const response = await fetch(`${API_BASE_URL}/api/worker/marketplace/jobs/?${queryParams}`, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.results || mockMarketplaceJobs);
      }
    } catch (error) {
      console.log('Worker filter failed, using mock data');
    } finally {
      setLoading(false);
      setShowFilters(false);
    }
  };

  const handleApplyJob = async (job: Job) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/worker/applications/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: job.id }),
      });

      if (response.ok) {
        alert(`Applied to ${job.title} at ${job.company}`);
      }
    } catch (error) {
      alert(`Application submitted for ${job.title}`);
    }
  };

  const handleJobCardClick = (job: Job) => {
    navigate(`/worker/jobs/${job.id}`, { state: { job } });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Job Marketplace</h1>
        <p className="text-base text-muted">Browse jobs posted by employers and match on your skills</p>
      </div>

      <section className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 w-full rounded-[14px] border border-border bg-white pl-11 pr-4 text-[14px] text-slate-900 outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_1fr_0.8fr_auto] xl:items-end">
          <label className="cursor-pointer rounded-[12px] border border-border bg-white px-4 py-3 transition-colors hover:bg-slate-50" onClick={() => setShowFilters(!showFilters)}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Skills</span>
            <div className="mt-1 text-[14px] text-slate-900">{filters.skills}</div>
          </label>
          <label className="cursor-pointer rounded-[12px] border border-border bg-white px-4 py-3 transition-colors hover:bg-slate-50" onClick={() => setShowFilters(!showFilters)}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Location</span>
            <div className="mt-1 flex items-center gap-2 text-[14px] text-slate-900">
              <MapPin size={14} /> {filters.location}
            </div>
          </label>
          <label className="cursor-pointer rounded-[12px] border border-border bg-white px-4 py-3 transition-colors hover:bg-slate-50" onClick={() => setShowFilters(!showFilters)}>
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Role Type</span>
            <div className="mt-1 text-[14px] text-slate-900">{filters.roleType}</div>
          </label>
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-[12px] bg-primary-dark px-5 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? <Loader size={18} className="animate-spin" /> : 'Apply Filters'}
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Open jobs for you</h2>
              <p className="text-sm text-muted">Apply to roles matched by your profile</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-slate-700">
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          <div className="space-y-3">
            {jobs.map((job) => (
              <button key={job.id} onClick={() => handleJobCardClick(job)} className="w-full text-left rounded-2xl border border-border bg-white p-4 transition hover:border-primary/30 hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                    <p className="mt-1 text-sm text-muted">{job.company} • {job.location}</p>
                    <p className="mt-2 text-sm text-slate-700">{job.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-dark">{job.rate}</div>
                    <div className="mt-1 text-xs text-muted">Match Score</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      <Star size={12} /> {job.score}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Suggested jobs</h3>
          <p className="text-sm text-muted">Roles aligned with your profile</p>
          <div className="mt-4 space-y-3">
            {suggestedJobs.map((job) => (
              <button
                key={job.id}
                onClick={() => handleSearch(job.title)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{job.title}</p>
                    <p className="text-xs text-muted">{job.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-[#DDF6E9] px-2.5 py-1 text-xs font-semibold text-primary-dark">{job.score}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
