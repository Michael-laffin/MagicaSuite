import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Loading from './ui/Loading';
import ParticleBackground from './ParticleBackground';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <ParticleBackground />
      <Navigation />
      <main>
        <Suspense fallback={<Loading fullScreen />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
