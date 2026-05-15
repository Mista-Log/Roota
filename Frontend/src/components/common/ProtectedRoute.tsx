/*
  Authentication is temporarily disabled while backend auth endpoints are unavailable.

  TODO: When the login endpoint is ready, re-enable the route guard by
  uncommenting the logic below and restoring the necessary imports:

  // import { Navigate } from 'react-router-dom';
  // import { useAuth } from '../../context/AuthContext';

  // const { isAuthenticated, userRole, loading } = useAuth();
  // if (loading) return <div>Loading...</div>;
  // if (!isAuthenticated) return <Navigate to="/auth" replace />;
  // if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
  //   return <Navigate to="/role" replace />;
  // }
*/

// interface ProtectedRouteProps {
//   children: React.ReactNode;
//   allowedRoles?: Array<'worker' | 'employer' | 'admin'>;
// }

// export function ProtectedRoute({ children }: ProtectedRouteProps) {
//   return <>{children}</>;
// }
