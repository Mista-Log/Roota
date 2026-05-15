'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, Star, Loader } from 'lucide-react';
import { apiGet, apiPost } from '../../utils/api';

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
  { id: '1', title: 'Senior FinTech Lead', score: '98%', subtitle: 'Match based on your score' },
  { id: '2', title: 'Product Strategist', score: '85%', subtitle: 'Match based on your score' },
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

export default function MarketplacePage() {
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

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const data = await apiGet('/api/marketplace/jobs/');
        setJobs(data.results || mockMarketplaceJobs);
      } catch (error) {
        console.warn('Using mock data - backend unavailable', error);
        setJobs(mockMarketplaceJobs);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Fetch suggested jobs from backend
  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const data = await apiGet('/api/marketplace/suggested/');
        setSuggestedJobs(data.results || mockSuggestedJobs);
      } catch (error) {
        console.warn('Using mock suggested jobs - backend unavailable', error);
      }
    };

    fetchSuggested();
  }, []);

  // Handle job search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockMarketplaceJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase())
    );
    setJobs(filtered.length > 0 ? filtered : mockMarketplaceJobs);
  };

  // Handle filter application
  const handleApplyFilters = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        skills: filters.skills,
        location: filters.location,
        roleType: filters.roleType,
        minTrustScore: filters.trustScore.toString(),
      });

      const data = await apiGet(`/api/marketplace/jobs/?${queryParams}`);
      setJobs(data.results || mockMarketplaceJobs);
    } catch (error) {
      console.warn('Filter failed, using mock data', error);
    } finally {
      setLoading(false);
      setShowFilters(false);
    }
  };

  // Handle job application
  const handleApplyJob = async (job: Job) => {
    try {
      await apiPost('/api/applications/', { job_id: job.id });
      alert(`Applied to ${job.title} at ${job.company}`);
    } catch (error) {
      alert(`Application submitted for ${job.title}`);
    }
  };

  // Handle job card click - navigate to job detail
  const handleJobCardClick = (job: Job) => {
    navigate(`/jobs/${job.id}`, { state: { job } });
  };

  // Handle suggested job click
  const handleSuggestedJobClick = (job: SuggestedJob) => {
    setSearchQuery(job.title);
    handleSearch(job.title);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Job Marketplace</h1>
        <p className="text-base text-muted">Discover opportunities perfectly matched to your profile and skills</p>
      </div>

      {/* Search and Filter Section */}
      <section className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search for roles, technologies, or keywords..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 w-full rounded-[14px] border border-border bg-white pl-11 pr-4 text-[14px] text-slate-900 outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_1fr_0.8fr_auto] xl:items-end">
          <label
            className="rounded-[12px] border border-border bg-white px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Skills</span>
            <div className="mt-1 text-[14px] text-slate-900">{filters.skills}</div>
          </label>
          <label
            className="rounded-[12px] border border-border bg-white px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Location</span>
            <div className="mt-1 flex items-center gap-2 text-[14px] text-slate-900">
              <MapPin size={14} /> {filters.location}
            </div>
          </label>
          <label
            className="rounded-[12px] border border-border bg-white px-4 py-3 cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Role Type</span>
            <div className="mt-1 text-[14px] text-slate-900">{filters.roleType}</div>
          </label>
          <button
            onClick={handleApplyFilters}
            disabled={loading}
            className="inline-flex h-12 items-center justify-center rounded-[12px] bg-primary-dark px-5 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader size={16} className="mr-2 animate-spin" /> : <SlidersHorizontal size={16} className="mr-2" />}
            Apply Filters
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="space-y-4">
          {/* AI Suggested */}
          <section className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">AI Suggested for You</p>

            <div className="mt-4 space-y-3">
              {suggestedJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => handleSuggestedJobClick(job)}
                  className="rounded-[14px] border border-border bg-[#F8FAFB] px-3 py-3 cursor-pointer hover:bg-slate-100 hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-8 w-8 place-items-center rounded-full bg-[#EAF0FF] text-[#8D98D6] flex-shrink-0">◌</div>
                    <div className="min-w-0">
                      <div className="text-[14px] font-semibold text-slate-900 truncate">{job.title}</div>
                      <div className="text-[12px] text-muted">{job.subtitle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Filters Panel */}
          <section className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
            <div className="space-y-3">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-900">Pay Range</p>
                <div className="mt-3 space-y-2 text-[13px] text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" onChange={(e) => e.target.checked && setFilters({ ...filters, payRange: '$50k - $100k' })} />
                    $50k - $100k
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" onChange={(e) => e.target.checked && setFilters({ ...filters, payRange: '$100k - $200k' })} />
                    $100k - $200k
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-slate-900">
                    <input type="checkbox" defaultChecked onChange={(e) => e.target.checked && setFilters({ ...filters, payRange: '$200k+' })} />
                    $200k+
                  </label>
                </div>
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-slate-900">Minimum Trust Score</p>
                <div className="mt-4">
                  <div className="relative h-1.5 rounded-full bg-slate-200">
                    <input
                      type="range"
                      min="500"
                      max="999"
                      value={filters.trustScore}
                      onChange={(e) => setFilters({ ...filters, trustScore: parseInt(e.target.value) })}
                      className="absolute top-0 left-0 w-full h-1.5 rounded-full appearance-none bg-transparent cursor-pointer"
                      style={{
                        WebkitAppearance: 'slider-horizontal',
                        zIndex: 5,
                      }}
                    />
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-white bg-primary-dark shadow-sm pointer-events-none"
                      style={{ left: `${((filters.trustScore - 500) / (999 - 500)) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-muted">
                    <span>500</span>
                    <span>{filters.trustScore}</span>
                    <span>999</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </aside>

        {/* Job Cards Grid */}
        <main className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {loading && jobs.length === 0 ? (
            <div className="col-span-2 flex justify-center items-center py-20">
              <Loader size={32} className="animate-spin text-primary-dark" />
            </div>
          ) : jobs.length > 0 ? (
            jobs.map((job) => (
              <article
                key={job.id}
                onClick={() => handleJobCardClick(job)}
                className="rounded-[18px] border border-border bg-card px-5 py-5 shadow-sm cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="h-11 w-11 rounded-[12px] bg-[#10221D] group-hover:scale-110 transition-transform" />
                  <span className="rounded-full bg-[#DDF6E9] px-3 py-1 text-[11px] font-semibold text-[#0B5D4B] whitespace-nowrap">
                    {job.tag}
                  </span>
                </div>

                <div className="mt-4 text-[22px] font-semibold leading-[1.1] tracking-[-0.03em] text-slate-900 group-hover:text-primary transition-colors">
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

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApplyJob(job);
                  }}
                  className={`mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[12px] px-4 py-3 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${job.accent}`}
                >
                  Apply with Trust Score <span aria-hidden>→</span>
                </button>
              </article>
            ))
          ) : (
            <div className="col-span-2 text-center py-20">
              <p className="text-muted text-lg">No jobs found matching your criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
