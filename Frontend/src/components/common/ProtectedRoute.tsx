import React from 'react';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'worker' | 'employer'>;
}

export function ProtectedRoute({ children, allowedRoles: _allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();

  // TEMPORARILY DISABLED - Remove protection to work on pages while backend dev finishes auth endpoint
  // Keep references to variables to avoid "declared but never read" diagnostics while protection is disabled.
  void isAuthenticated;
  void userRole;
  void _allowedRoles;

  // Uncomment the original logic when backend auth is ready
  // if (!isAuthenticated) {
  //   return <Navigate to="/auth" replace />;
  // }

  // if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/role" replace />;
  // }

  return <>{children}</>;
}
