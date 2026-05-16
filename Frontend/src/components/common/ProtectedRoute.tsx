import { useEffect, useMemo, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiGet } from '../../utils/api';
import AppPreloader from './AppPreloader';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'worker' | 'employer' | 'admin'>;
}


/**
 * Route guard that checks authentication and role-based access.
 * Redirects to /auth if not authenticated, or to /role if role is not allowed.
 */
export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, userRole, loading } = useAuth();
  const location = useLocation();
  const [onboardingComplete, setOnboardingComplete] = useState<boolean | null>(null);

  const isOnboardingRoute = useMemo(
    () => location.pathname === '/worker/onboarding' || location.pathname === '/employer/onboarding',
    [location.pathname]
  );

  useEffect(() => {
    let cancelled = false;

    const checkOnboarding = async () => {
      if (!isAuthenticated || !userRole) {
        setOnboardingComplete(null);
        return;
      }

      if (userRole === 'admin') {
        setOnboardingComplete(true);
        return;
      }

      try {
        if (userRole === 'worker') {
          const [meData, workerProfile] = await Promise.all([
            apiGet('/api/auth/me/'),
            apiGet('/api/auth/workers/me/'),
          ]);

          const complete = Boolean(String(meData?.full_name ?? '').trim())
            && Boolean(String(meData?.phone ?? '').trim())
            && Boolean(String(workerProfile?.location ?? '').trim())
            && Boolean(String(workerProfile?.bio ?? '').trim());

          if (!cancelled) setOnboardingComplete(complete);
          return;
        }

        if (userRole === 'employer') {
          const employerProfileResponse = await apiGet('/api/auth/employer/profile/');
          const employerProfile = employerProfileResponse?.data ?? employerProfileResponse;

          const complete = Boolean(String(employerProfile?.full_name ?? '').trim())
            && Boolean(String(employerProfile?.phone ?? '').trim())
            && Boolean(String(employerProfile?.company_name ?? '').trim())
            && Boolean(String(employerProfile?.industry ?? '').trim())
            && Boolean(String(employerProfile?.location ?? '').trim())
            && Boolean(String(employerProfile?.bio ?? '').trim());

          if (!cancelled) setOnboardingComplete(complete);
          return;
        }

        if (!cancelled) setOnboardingComplete(true);
      } catch {
        // Avoid trapping users if profile check endpoint is temporarily unavailable.
        if (!cancelled) setOnboardingComplete(true);
      }
    };

    if (!loading && isAuthenticated && userRole) {
      checkOnboarding();
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, loading, userRole]);

  // Show branded preloader while checking auth and onboarding status
  if (loading || (isAuthenticated && userRole !== 'admin' && onboardingComplete === null)) {
    return <AppPreloader />;
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Check role-based access if roles are specified
  if (allowedRoles && userRole && !allowedRoles.includes(userRole as any)) {
    return <Navigate to="/role" replace />;
  }

  // Redirect users who have not completed onboarding.
  if (!isOnboardingRoute && onboardingComplete === false) {
    return <Navigate to={userRole === 'worker' ? '/worker/onboarding' : '/employer/onboarding'} replace />;
  }

  // Prevent fully onboarded users from revisiting onboarding route.
  if (isOnboardingRoute && onboardingComplete === true) {
    return <Navigate to={userRole === 'worker' ? '/worker/dashboard' : '/employer/dashboard'} replace />;
  }

  return <>{children}</>;
}
