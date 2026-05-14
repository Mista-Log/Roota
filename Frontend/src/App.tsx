import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import WorkerShell from './layouts/worker/WorkerShell';
import EmployerShell from './layouts/employer/EmployerShell';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import RoleSelectionPage from './pages/Landing/RoleSelectionPage';
import AuthPage from './pages/Auth/AuthPage';
import WorkerDashboardPage from './pages/Dashboard/WorkerDashboard';
import EmployerDashboardPage from './pages/Dashboard/EmployerDashboard';
import WorkerMarketplacePage from './pages/worker/MarketplacePage';
import EmployerMarketplacePage from './pages/employer/MarketplacePage';
import WorkerFinancesPage from './pages/worker/FinancesPage';
import EmployerFinancesPage from './pages/employer/FinancesPage';
import WorkerInsightsPage from './pages/worker/InsightsPage';
import EmployerInsightsPage from './pages/employer/InsightsPage';
import JobsPage from './pages/Jobs/JobsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import EmployerJobsPage from './pages/Jobs/EmployerJobsPage';
import WorkerWalletPage from './pages/worker/WalletPage';
import EmployerWalletPage from './pages/employer/WalletPage';
import WorkerTransactionsPage from './pages/worker/TransactionsPage';
import EmployerTransactionsPage from './pages/employer/TransactionsPage';
import WorkerTrustScorePage from './pages/worker/TrustScorePage';
import EmployerTrustScorePage from './pages/employer/TrustScorePage';
import WorkerSettingsPage from './pages/worker/SettingsPage';
import EmployerSettingsPage from './pages/employer/SettingsPage';
import WorkerSupportPage from './pages/worker/SupportPage';
import EmployerSupportPage from './pages/employer/SupportPage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/role" element={<RoleSelectionPage />} />
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Worker Routes */}
      <Route 
        path="/worker/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerDashboardPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/jobs" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <JobsPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/jobs/:jobId" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <JobDetailsPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/marketplace" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerMarketplacePage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/finances" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerFinancesPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/insights" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerInsightsPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/wallet" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerWalletPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/transactions" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerTransactionsPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/trust-score" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerTrustScorePage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/settings" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerSettingsPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/support" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <WorkerShell>
              <WorkerSupportPage />
            </WorkerShell>
          </ProtectedRoute>
        } 
      />

      {/* Employer Routes */}
      <Route 
        path="/employer/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerDashboardPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/jobs" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerJobsPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/jobs/:jobId" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <JobDetailsPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/marketplace" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerMarketplacePage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/finances" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerFinancesPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/insights" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerInsightsPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/wallet" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerWalletPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/transactions" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerTransactionsPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/trust-score" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerTrustScorePage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/settings" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerSettingsPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/support" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <EmployerShell>
              <EmployerSupportPage />
            </EmployerShell>
          </ProtectedRoute>
        } 
      />

      {/* Legacy redirects for old routes */}
      <Route path="/dashboard" element={<Navigate to="/worker/dashboard" replace />} />
      <Route path="/worker" element={<Navigate to="/worker/dashboard" replace />} />
      <Route path="/employer" element={<Navigate to="/employer/dashboard" replace />} />
      <Route path="/jobs" element={<Navigate to="/worker/jobs" replace />} />
      <Route path="/jobs/:jobId" element={<Navigate to="/worker/jobs/:jobId" replace />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
