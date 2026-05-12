import { WorkspaceShell } from '../../layouts/WorkspaceShell';
import { MetricCard, PanelHeader } from '../../components/common';

const employerMetrics = [
  { title: 'Total Payroll (MTD)', value: '$142,850', meta: '+12.5% vs last month', accent: 'positive' },
  { title: 'Active Workers', value: '84', meta: 'across 12 global regions', accent: 'neutral' },
  { title: 'Open Jobs', value: '06', meta: '4 high-priority roles', accent: 'warning' },
] as const;

const payrollRows = [
  ['James Adenuga', 'Lagos, Nigeria', 'AI Model Training', '$3,200.00', 'JA', 'lavender'],
  ['Sarah Kim', 'Seoul, KR', 'Cloud Architecture', '$5,450.00', 'SK', 'mint'],
  ['Marcus Edwards', 'London, UK', 'Product Research', '$1,800.00', 'ME', 'sand'],
] as const;

const talentCards = [
  ['Ananya Patel', 'Full-Stack Dev', '98', ['Python', 'React', 'AWS']],
  ['David Chen', 'ML Engineer', '94', ['PyTorch', 'Kafka']],
] as const;

export default function EmployerDashboardPage() {
  return (
    <WorkspaceShell activeTab="dashboard" mode="employer" title="Employer Console" subtitle="Manage your global team and payroll.">
      <div className="employer-grid">
        <section className="metric-strip">
          {employerMetrics.map((m) => (
            <MetricCard key={m.title} {...m} />
          ))}
        </section>

        <section className="panel payroll-panel panel--wide">
          <PanelHeader title="Active Payroll" actionButton="Run Payroll" sparkle />
          <table className="payroll-table">
            <thead>
              <tr>
                <th>Worker</th>
                <th>Region</th>
                <th>Project</th>
                <th>Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payrollRows.map(([name, region, project, amt, init, tone], idx) => (
                <tr key={idx}>
                  <td className="worker-cell">
                    <div className={`avatar avatar--${tone}`}>{init}</div>
                    {name}
                  </td>
                  <td>{region}</td>
                  <td>{project}</td>
                  <td>{amt}</td>
                  <td><button type="button" className="text-button">View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="panel talent-panel">
          <PanelHeader title="Recommended Talent" action="Browse Marketplace" />
          <div className="talent-stack">
            {talentCards.map(([name, role, score, skills], idx) => (
              <div key={idx} className="talent-card">
                <div className="talent-card__top">
                  <strong>{name}</strong>
                  <span>{role}</span>
                </div>
                <div className="talent-card__score">
                  <strong>{score}</strong>
                  <small>TRUST</small>
                </div>
                <div className="talent-card__skills">
                  {skills.map(s => <span key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </WorkspaceShell>
  );
}
