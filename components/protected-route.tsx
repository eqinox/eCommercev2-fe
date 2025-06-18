'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'user';
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // If not logged in, redirect to login
        router.push('/login');
      } else if (requiredRole === 'admin' && user.user.role !== 'admin') {
        // If admin role required but user is not admin, redirect to home
        router.push('/');
      }
    }
  }, [user, isLoading, router, requiredRole]);

  // Show nothing while checking authentication
  if (isLoading) {
    return null;
  }

  // If not logged in or doesn't have required role, don't render children
  if (!user || (requiredRole === 'admin' && user.user.role !== 'admin')) {
    return null;
  }

  // If all checks pass, render children
  return <>{children}</>;
}
