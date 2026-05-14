import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import AppShell from './layouts/AppShell';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import RoleSelectionPage from './pages/Landing/RoleSelectionPage';
import AuthPage from './pages/Auth/AuthPage';
import WorkerDashboardPage from './pages/Dashboard/WorkerDashboard';
import EmployerDashboardPage from './pages/Dashboard/EmployerDashboard';
import MarketplacePage from './pages/Marketplace/MarketplacePage';
import FinancesPage from './pages/Dashboard/FinancesPage';
import InsightsPage from './pages/Dashboard/InsightsPage';
import JobsPage from './pages/Jobs/JobsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import EmployerJobsPage from './pages/Jobs/EmployerJobsPage';
import WalletPage from './pages/Wallet/WalletPage';
import TransactionsPage from './pages/Wallet/TransactionsPage';
import TrustScorePage from './pages/TrustScore/TrustScorePage';
import SettingsPage from './pages/Settings/SettingsPage';
import SupportPage from './pages/Support/SupportPage';

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
            <AppShell>
              <WorkerDashboardPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/jobs" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <AppShell>
              <JobsPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker/jobs/:jobId" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <AppShell>
              <JobDetailsPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />

      {/* Employer Routes */}
      <Route 
        path="/employer/dashboard" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <AppShell>
              <EmployerDashboardPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/jobs" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <AppShell>
              <EmployerJobsPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/employer/jobs/:jobId" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <AppShell>
              <JobDetailsPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />

      {/* Legacy redirects for old routes */}
      <Route path="/dashboard" element={<Navigate to="/worker/dashboard" replace />} />
      <Route path="/worker" element={<Navigate to="/worker/dashboard" replace />} />
      <Route path="/employer" element={<Navigate to="/employer/dashboard" replace />} />
      <Route path="/jobs" element={<Navigate to="/worker/jobs" replace />} />
      <Route path="/jobs/:jobId" element={<Navigate to="/worker/jobs/:jobId" replace />} />

      {/* Shared protected pages */}
      <Route
        path="/marketplace"
        element={
          <ProtectedRoute>
            <AppShell>
              <MarketplacePage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/finances"
        element={
          <ProtectedRoute>
            <AppShell>
              <FinancesPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/insights"
        element={
          <ProtectedRoute>
            <AppShell>
              <InsightsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <AppShell>
              <WalletPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <AppShell>
              <TransactionsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/trust-score"
        element={
          <ProtectedRoute>
            <AppShell>
              <TrustScorePage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppShell>
              <SettingsPage />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <AppShell>
              <SupportPage />
            </AppShell>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
