import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '@components/ui/Loading';
import { Error } from '@components/ui/Error';
import { useAuth } from '@hooks/useAuth';

interface LayoutProps {
  requireAuth?: boolean;
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  requireAuth = false,
  children,
}) => {
  const { user, loading, error } = useAuth();

  // Handle authentication loading state
  if (loading) {
    return <Loading fullScreen message="Loading authentication..." />;
  }

  // Handle authentication error state
  if (error) {
    return (
      <Error
        fullScreen
        title="Authentication Error"
        message="There was a problem with authentication. Please try again."
        error={error}
      />
    );
  }

  // Handle unauthenticated state for protected routes
  if (requireAuth && !user) {
    return (
      <Error
        fullScreen
        title="Access Denied"
        message="You need to be logged in to access this page."
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<Loading fullScreen />}>
          {children || <Outlet />}
        </Suspense>
      </main>
    </div>
  );
};

export const ProtectedLayout: React.FC<Omit<LayoutProps, 'requireAuth'>> = (
  props
) => <Layout {...props} requireAuth />;

export default Layout;
