import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Pages
import LandingPage from './pages/Landing/LandingPage';
import RoleSelectionPage from './pages/Landing/RoleSelectionPage';
import AuthPage from './pages/Auth/AuthPage';
import MarketplacePage from './pages/Marketplace/MarketplacePage';
import WorkerDashboardPage from './pages/Dashboard/WorkerDashboard';
import EmployerDashboardPage from './pages/Dashboard/EmployerDashboard';
import FinancesPage from './pages/Dashboard/FinancesPage';
import InsightsPage from './pages/Dashboard/InsightsPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/role" element={<RoleSelectionPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        {/* Protected Routes */}
        <Route 
          path="/marketplace" 
          element={
            <ProtectedRoute>
              <MarketplacePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/worker" 
          element={
            <ProtectedRoute allowedRoles={['worker']}>
              <WorkerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employer" 
          element={
            <ProtectedRoute allowedRoles={['employer']}>
              <EmployerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <WorkerDashboardPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/finances" 
          element={
            <ProtectedRoute>
              <FinancesPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/insights" 
          element={
            <ProtectedRoute>
              <InsightsPage />
            </ProtectedRoute>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
