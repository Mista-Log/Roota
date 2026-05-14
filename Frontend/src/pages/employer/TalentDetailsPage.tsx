import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { MapPin, Star, Briefcase, MessageSquare, Clock3 } from 'lucide-react';

const API_BASE_URL = typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8000' : 'http://localhost:8000';

const mockTalentProfiles = [
  {
    id: '1',
    name: 'Ananya Patel',
    title: 'Full-Stack Developer',
    company: 'Independent',
    location: 'Remote',
    rate: '$8,000 - $12,000',
    score: '98',
    summary: 'React, Node.js, AWS, product-minded engineer',
    bio: 'Builds reliable product experiences across frontend and backend with a strong focus on growth and delivery.',
    skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
    availability: 'Available in 2 weeks',
    responseTime: '< 2 hours',
  },
  {
    id: '2',
    name: 'David Chen',
    title: 'ML Engineer',
    company: 'Independent',
    location: 'Singapore',
    rate: '$10,000 - $15,000',
    score: '94',
    summary: 'PyTorch, MLOps, vector search, LLM systems',
    bio: 'Designs model pipelines and retrieval systems that balance experimentation speed with production reliability.',
    skills: ['PyTorch', 'MLOps', 'Vector Search', 'LLMs'],
    availability: 'Open to select engagements',
    responseTime: 'Same day',
  },
  {
    id: '3',
    name: 'Maya Okafor',
    title: 'Product Strategist',
    company: 'Independent',
    location: 'Lagos, Nigeria',
    rate: '$7,500 - $11,000',
    score: '91',
    summary: 'Marketplace growth, analytics, GTM strategy',
    bio: 'Helps teams shape product direction with research-backed strategy, experimentation, and go-to-market execution.',
    skills: ['Product Strategy', 'Analytics', 'GTM', 'Research'],
    availability: 'Available now',
    responseTime: 'Within 4 hours',
  },
  {
    id: '4',
    name: 'Jordan Smith',
    title: 'Design Lead',
    company: 'Independent',
    location: 'London, UK',
    rate: '$9,500 - $13,500',
    score: '89',
    summary: 'Brand systems, UX leadership, team hiring',
    bio: 'Leads design systems and product UX with a practical approach to systems thinking, mentorship, and delivery.',
    skills: ['Design Systems', 'UX Leadership', 'Brand', 'Hiring'],
    availability: 'Available for advisory and delivery',
    responseTime: 'Same day',
  },
];

export default function EmployerTalentDetailsPage() {
  const { talentId } = useParams();
  const location = useLocation();
  const [talent, setTalent] = useState<any | null>(location.state?.profile || null);

  useEffect(() => {
    const fetchTalent = async () => {
      if (talent) {
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/api/employer/marketplace/talent/`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          const matchedTalent = (data.results || data || []).find((item: any) => `${item.id}` === `${talentId}`);
          setTalent(matchedTalent || mockTalentProfiles.find((item) => `${item.id}` === `${talentId}`) || mockTalentProfiles[0]);
          return;
        }
      } catch (error) {
        // fall back to mock data below
      }

      setTalent(mockTalentProfiles.find((item) => `${item.id}` === `${talentId}`) || mockTalentProfiles[0]);
    };

    fetchTalent();
  }, [talent, talentId]);

  if (!talent) {
    return <div className="text-sm text-muted">Loading talent profile...</div>;
  }

  const skillList = talent.skills || talent.skillsList || ['React', 'TypeScript', 'Product Delivery'];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DDF6E9] text-lg font-bold text-primary-dark">
                {talent.name?.slice(0, 1)}
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">{talent.name}</h1>
                <p className="text-sm text-muted">{talent.title} • {talent.location || 'Global'}</p>
              </div>
            </div>

            <p className="max-w-3xl text-sm leading-6 text-slate-700">
              {talent.bio || talent.summary || 'This talent profile includes experience, rate expectations, and availability for your open roles.'}
            </p>

            <div className="flex flex-wrap gap-3 text-sm">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                <MapPin size={14} /> {talent.location || 'Global'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700">
                <Briefcase size={14} /> {talent.company || 'Independent'}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#DDF6E9] px-3 py-2 font-semibold text-primary-dark">
                <Star size={14} /> {talent.score}% match
              </span>
            </div>
          </div>

          <div className="min-w-[280px] rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="text-sm text-muted">Projected cost</div>
            <div className="mt-1 text-2xl font-bold text-slate-900">{talent.rate}</div>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <Clock3 size={14} className="text-muted" /> {talent.availability || 'Available now'}
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-muted" /> Response time: {talent.responseTime || 'Within one business day'}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button className="rounded-xl bg-primary-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary">
                Message Talent
              </button>
              <button className="rounded-xl border border-border bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white">
                Shortlist
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Core skills</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {skillList.map((skill: string) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 p-4">
            <h3 className="text-sm font-semibold text-slate-900">Profile summary</h3>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              {talent.summary || 'A strong match for your open role with a balance of technical depth and collaboration.'}
            </p>
          </div>
        </div>

        <aside className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Hiring actions</h2>
          <p className="mt-1 text-sm text-muted">Review the profile and move forward when ready.</p>

          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <div className="rounded-2xl border border-border bg-white p-4">
              <div className="font-semibold text-slate-900">Availability</div>
              <div className="mt-1 text-muted">{talent.availability || 'Available now'}</div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-4">
              <div className="font-semibold text-slate-900">Match score</div>
              <div className="mt-1 text-muted">{talent.score}% aligned with your current openings</div>
            </div>
            <div className="rounded-2xl border border-border bg-white p-4">
              <div className="font-semibold text-slate-900">Rate range</div>
              <div className="mt-1 text-muted">{talent.rate}</div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}