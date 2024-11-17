import React, { Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Loading from './ui/Loading';
import { useAuth } from '../hooks/useAuth';
import ParticleBackground from './ParticleBackground';

const ProtectedLayout: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <Loading fullScreen message="Checking authentication..." />;
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ParticleBackground />
      <main>
        <Suspense fallback={<Loading fullScreen />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default ProtectedLayout;
