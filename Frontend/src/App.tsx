import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import AppShell from './layouts/AppShell';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import RoleSelectionPage from './pages/Landing/RoleSelectionPage';
import AuthPage from './pages/Auth/AuthPage';
import MarketplacePage from './pages/Marketplace/MarketplacePage';
import WorkerDashboardPage from './pages/Dashboard/WorkerDashboard';
import EmployerDashboardPage from './pages/Dashboard/EmployerDashboard';
import FinancesPage from './pages/Dashboard/FinancesPage';
import InsightsPage from './pages/Dashboard/InsightsPage';
import JobsPage from './pages/Jobs/JobsPage';
import JobDetailsPage from './pages/Jobs/JobDetailsPage';
import WalletPage from './pages/Wallet/WalletPage';
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
      
      {/* Protected Routes with AppShell */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <AppShell>
              <WorkerDashboardPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs" 
        element={
          <ProtectedRoute>
            <AppShell>
              <JobsPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/jobs/:jobId" 
        element={
          <ProtectedRoute>
            <AppShell>
              <JobDetailsPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
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
      <Route 
        path="/employer" 
        element={
          <ProtectedRoute allowedRoles={['employer']}>
            <AppShell>
              <EmployerDashboardPage />
            </AppShell>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/worker" 
        element={
          <ProtectedRoute allowedRoles={['worker']}>
            <AppShell>
              <WorkerDashboardPage />
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
