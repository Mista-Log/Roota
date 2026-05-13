import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'worker' | 'employer'>;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole } = useAuth();

  // TEMPORARILY DISABLED - Remove protection to work on pages while backend dev finishes auth endpoint
  // Uncomment the code below when backend auth is ready
  
  // if (!isAuthenticated) {
  //   return <Navigate to="/auth" replace />;
  // }

  // if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/role" replace />;
  // }

  return <>{children}</>;
}
