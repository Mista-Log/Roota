'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, SlidersHorizontal, Star, Loader } from 'lucide-react';

const API_BASE_URL = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000' : 'http://localhost:8000';

interface TalentProfile {
  id: string;
  name: string;
  title: string;
  company?: string;
  rate: string;
  score: string | number;
  accent: string;
  location?: string;
  summary?: string;
}

interface SuggestedTalent {
  id: string;
  name: string;
  score: string;
  subtitle: string;
}

const mockSuggestedTalent: SuggestedTalent[] = [
  { id: '1', name: 'Ananya Patel', score: '98%', subtitle: 'Top fit for your opening' },
  { id: '2', name: 'David Chen', score: '92%', subtitle: 'Strong match for your role' },
];

const mockTalentProfiles: TalentProfile[] = [
  {
    id: '1',
    name: 'Ananya Patel',
    title: 'Full-Stack Developer',
    rate: '$8,000 - $12,000',
    score: '98',
    accent: 'bg-[#0A4B3A]',
    location: 'Remote',
    summary: 'React, Node.js, AWS, product-minded engineer',
  },
  {
    id: '2',
    name: 'David Chen',
    title: 'ML Engineer',
    rate: '$10,000 - $15,000',
    score: '94',
    accent: 'bg-slate-900',
    location: 'Singapore',
    summary: 'PyTorch, MLOps, vector search, LLM systems',
  },
  {
    id: '3',
    name: 'Maya Okafor',
    title: 'Product Strategist',
    rate: '$7,500 - $11,000',
    score: '91',
    accent: 'bg-[#0A4B3A]',
    location: 'Lagos, Nigeria',
    summary: 'Marketplace growth, analytics, GTM strategy',
  },
  {
    id: '4',
    name: 'Jordan Smith',
    title: 'Design Lead',
    rate: '$9,500 - $13,500',
    score: '89',
    accent: 'bg-slate-900',
    location: 'London, UK',
    summary: 'Brand systems, UX leadership, team hiring',
  },
];

export default function EmployerMarketplacePage() {
  const navigate = useNavigate();
  const [talent, setTalent] = useState<TalentProfile[]>(mockTalentProfiles);
  const [suggestedTalent, setSuggestedTalent] = useState<SuggestedTalent[]>(mockSuggestedTalent);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchTalent = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/employer/marketplace/talent/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setTalent(data.results || mockTalentProfiles);
        } else {
          setTalent(mockTalentProfiles);
        }
      } catch (error) {
        console.log('Using employer mock talent - backend unavailable');
        setTalent(mockTalentProfiles);
      } finally {
        setLoading(false);
      }
    };

    fetchTalent();
  }, []);

  useEffect(() => {
    const fetchSuggested = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/employer/marketplace/suggested/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setSuggestedTalent(data.results || mockSuggestedTalent);
        }
      } catch (error) {
        console.log('Using employer mock suggested talent - backend unavailable');
      }
    };

    fetchSuggested();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = mockTalentProfiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(query.toLowerCase()) ||
        profile.title.toLowerCase().includes(query.toLowerCase())
    );
    setTalent(filtered.length > 0 ? filtered : mockTalentProfiles);
  };

  const handleOpenProfile = (profile: TalentProfile) => {
    navigate(`/employer/jobs/${profile.id}`, { state: { profile } });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Talent Marketplace</h1>
        <p className="text-base text-muted">Browse professionals who have listed their skills and availability</p>
      </div>

      <section className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_auto] xl:items-center">
          <div className="relative">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search talent, skills, or location..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="h-12 w-full rounded-[14px] border border-border bg-white pl-11 pr-4 text-[14px] text-slate-900 outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 xl:grid-cols-[1fr_1fr_auto] xl:items-end">
          <label className="cursor-pointer rounded-[12px] border border-border bg-white px-4 py-3 transition-colors hover:bg-slate-50">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Role Type</span>
            <div className="mt-1 text-[14px] text-slate-900">Available talent</div>
          </label>
          <label className="cursor-pointer rounded-[12px] border border-border bg-white px-4 py-3 transition-colors hover:bg-slate-50">
            <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">Location</span>
            <div className="mt-1 text-[14px] text-slate-900">Global</div>
          </label>
          <button className="inline-flex h-12 items-center justify-center rounded-[12px] bg-primary-dark px-5 text-[14px] font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary">
            <SlidersHorizontal size={16} className="mr-2" /> Filter
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        <section className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">Available talent</h2>
              <p className="text-sm text-muted">Profiles you can hire for your open roles</p>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-2 text-xs font-semibold text-slate-700">
              <Users size={14} /> Team fit
            </button>
          </div>

          <div className="space-y-3">
            {talent.map((profile) => (
              <button key={profile.id} onClick={() => handleOpenProfile(profile)} className="w-full rounded-2xl border border-border bg-white p-4 text-left transition hover:border-primary/30 hover:shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
                    <p className="mt-1 text-sm text-muted">{profile.title} • {profile.location}</p>
                    <p className="mt-2 text-sm text-slate-700">{profile.summary}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary-dark">{profile.rate}</div>
                    <div className="mt-1 text-xs text-muted">Projected cost</div>
                    <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                      <Star size={12} /> {profile.score}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <aside className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">Suggested hires</h3>
          <p className="text-sm text-muted">People aligned to your current openings</p>
          <div className="mt-4 space-y-3">
            {suggestedTalent.map((profile) => (
              <button
                key={profile.id}
                onClick={() => handleSearch(profile.name)}
                className="w-full rounded-xl border border-border bg-white px-4 py-3 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{profile.name}</p>
                    <p className="text-xs text-muted">{profile.subtitle}</p>
                  </div>
                  <span className="rounded-full bg-[#DDF6E9] px-2.5 py-1 text-xs font-semibold text-primary-dark">{profile.score}</span>
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
