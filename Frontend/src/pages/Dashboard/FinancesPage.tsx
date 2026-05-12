import React from 'react';
import { WorkspaceShell } from '../../layouts/WorkspaceShell';
import { MetricCard } from '../../components/common/MetricCard';

const transactions = [
  ['Payroll - Project X', '+$4,200.00', 'SUCCESS', 'Oct 24, 2023'],
  ['Bank Withdrawal', '-$1,500.00', 'PENDING', 'Oct 22, 2023'],
  ['Bonus Reward', '+$550.00', 'SUCCESS', 'Oct 20, 2023'],
  ['Subscription Fee', '-$29.00', 'FAILED', 'Oct 18, 2023'],
] as const;

export default function FinancesPage() {
  return (
    <WorkspaceShell activeTab="finances" mode="finance" title="Financial Hub" subtitle="Manage your global earnings and payouts.">
      <div className="finances-grid">
        <section className="metric-strip">
          <MetricCard title="Wallet Balance" value="$8,420.50" meta="Available for withdrawal" accent="positive" />
          <MetricCard title="Pending Payouts" value="$3,200.00" meta="Processing: 2" accent="neutral" />
          <MetricCard title="Total Tax Paid" value="$1,120.00" meta="YTD compliance active" accent="neutral" />
        </section>

        <section className="panel wallet-panel">
          <div className="panel-header">
            <h3>Global Wallet</h3>
            <button type="button" className="pill-button pill-button--solid pill-button--small">Withdraw</button>
          </div>
          <div className="wallet-visual">
            <div className="wallet-card">
              <div className="card-top">
                <span className="chip" />
                <span className="brand">Roota Finance</span>
              </div>
              <div className="card-number">•••• •••• •••• 4290</div>
              <div className="card-bottom">
                <div>
                  <small>HOLDER</small>
                  <strong>JAMES ADENUGA</strong>
                </div>
                <div>
                  <small>EXPIRES</small>
                  <strong>10/28</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="panel transaction-panel panel--wide">
          <div className="panel-header">
            <h3>Recent Transactions</h3>
            <button type="button" className="text-button">Export CSV</button>
          </div>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(([desc, amt, status, date], idx) => (
                <tr key={idx}>
                  <td>{desc}</td>
                  <td className={amt.startsWith('+') ? 'text-positive' : ''}>{amt}</td>
                  <td>
                    <span className={`status-pill status-pill--${status.toLowerCase()}`}>{status}</span>
                  </td>
                  <td>{date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </WorkspaceShell>
  );
}
