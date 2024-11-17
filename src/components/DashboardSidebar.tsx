import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Wand2,
  Settings,
  BarChart,
  Code,
  LogOut,
  Clock,
  Megaphone,
  Briefcase,
  Palette,
  Cog,
  Sparkles,
  Stars
} from 'lucide-react';
import { auth } from '../lib/firebase';

const categories = [
  {
    name: 'Productivity',
    icon: Clock,
    path: '/dashboard/productivity',
    color: 'from-blue-500 via-cyan-400 to-blue-600',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]',
    particleColor: 'rgba(59, 130, 246, 0.7)'
  },
  {
    name: 'Marketing',
    icon: Megaphone,
    path: '/dashboard/marketing',
    color: 'from-purple-500 via-fuchsia-400 to-purple-600',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)]',
    particleColor: 'rgba(147, 51, 234, 0.7)'
  },
  {
    name: 'Business',
    icon: Briefcase,
    path: '/dashboard/business',
    color: 'from-emerald-500 via-green-400 to-emerald-600',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]',
    particleColor: 'rgba(16, 185, 129, 0.7)'
  },
  {
    name: 'Creativity',
    icon: Palette,
    path: '/dashboard/creativity',
    color: 'from-orange-500 via-amber-400 to-orange-600',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)]',
    particleColor: 'rgba(249, 115, 22, 0.7)'
  },
  {
    name: 'Analytics',
    icon: BarChart,
    path: '/dashboard/analytics',
    color: 'from-rose-500 via-pink-400 to-rose-600',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.5)]',
    particleColor: 'rgba(244, 63, 94, 0.7)'
  },
  {
    name: 'Tech',
    icon: Code,
    path: '/dashboard/tech',
    color: 'from-indigo-500 via-violet-400 to-indigo-600',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(99,102,241,0.5)]',
    particleColor: 'rgba(99, 102, 241, 0.7)'
  }
];

const MagicParticles: React.FC<{ active: boolean; color: string }> = ({ active, color }) => {
  if (!active) return null;
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full animate-magic-particle"
          style={{
            backgroundColor: color,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 1000}ms`,
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

export default function DashboardSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [activeSparkles, setActiveSparkles] = useState<string | null>(null);
  const [magicTrail, setMagicTrail] = useState<{ x: number; y: number } | null>(null);

  const handleNavigation = (path: string) => {
    setActiveSparkles(path);
    setTimeout(() => {
      navigate(path);
      setActiveSparkles(null);
    }, 600);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const sidebar = document.querySelector('.dashboard-sidebar');
      if (sidebar) {
        const rect = sidebar.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
          setMagicTrail({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="dashboard-sidebar h-screen w-64 bg-gray-900/95 border-r border-white/10 flex flex-col relative overflow-hidden backdrop-blur-lg">
      {/* Animated background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 opacity-50" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      
      {magicTrail && (
        <div 
          className="absolute w-32 h-32 pointer-events-none transition-transform duration-1000"
          style={{
            transform: `translate(${magicTrail.x - 64}px, ${magicTrail.y - 64}px)`,
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0) 70%)',
          }}
        />
      )}

      {/* Logo section */}
      <div className="p-4 relative">
        <button 
          onClick={() => handleNavigation('/dashboard')}
          className="w-full flex items-center space-x-2 transform hover:scale-105 transition-all duration-500 ease-out group"
        >
          <div className="relative">
            <Wand2 className="h-8 w-8 text-purple-400 animate-pulse" />
            <div className="absolute inset-0 bg-purple-400 blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="absolute inset-0 animate-spin-slow">
              <Stars className="h-8 w-8 text-purple-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text group-hover:bg-gradient-to-l transition-all duration-500">
            MagicaSuite
          </span>
        </button>
      </div>

      {/* Navigation section */}
      <nav className="flex-1 p-4 space-y-2 relative">
        {/* Dashboard button */}
        <button
          onClick={() => handleNavigation('/dashboard')}
          onMouseEnter={() => setHoveredCategory('/dashboard')}
          onMouseLeave={() => setHoveredCategory(null)}
          className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-500 relative group
            hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]
            ${location.pathname === '/dashboard'
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
          <div className="relative">
            <LayoutDashboard className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
            {(hoveredCategory === '/dashboard' || activeSparkles === '/dashboard') && (
              <>
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-purple-400 animate-ping" />
                <Stars className="absolute -bottom-1 -left-1 h-3 w-3 text-purple-400 animate-pulse" />
              </>
            )}
          </div>
          <span>Dashboard</span>
          <MagicParticles 
            active={hoveredCategory === '/dashboard' || activeSparkles === '/dashboard'}
            color="rgba(139, 92, 246, 0.7)"
          />
          {activeSparkles === '/dashboard' && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-400/20 to-purple-600/20 animate-pulse rounded-lg" />
          )}
        </button>

        {/* Category buttons */}
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleNavigation(category.path)}
            onMouseEnter={() => setHoveredCategory(category.path)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-500 relative group
              ${category.hoverEffect}
              ${location.pathname === category.path
                ? 'bg-white/10 text-white'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
          >
            <div className="relative">
              <category.icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
              {(hoveredCategory === category.path || activeSparkles === category.path) && (
                <>
                  <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-ping" />
                  <Stars className="absolute -bottom-1 -left-1 h-3 w-3 text-yellow-400 animate-pulse" />
                </>
              )}
            </div>
            <span>{category.name}</span>
            <MagicParticles 
              active={hoveredCategory === category.path || activeSparkles === category.path}
              color={category.particleColor}
            />
            {activeSparkles === category.path && (
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-20 animate-pulse rounded-lg`} />
            )}
            {hoveredCategory === category.path && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 transition-transform duration-500">
                <div className="animate-spin-slow">
                  <Stars className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer section */}
      <div className="p-4 space-y-2 relative">
        {/* Settings button */}
        <button
          onClick={() => handleNavigation('/dashboard/settings')}
          onMouseEnter={() => setHoveredCategory('/dashboard/settings')}
          onMouseLeave={() => setHoveredCategory(null)}
          className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-all duration-500 relative group
            hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]
            ${location.pathname === '/dashboard/settings'
              ? 'bg-white/10 text-white'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
        >
          <div className="relative">
            <Cog className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-90" />
            {(hoveredCategory === '/dashboard/settings' || activeSparkles === '/dashboard/settings') && (
              <>
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-purple-400 animate-ping" />
                <Stars className="absolute -bottom-1 -left-1 h-3 w-3 text-purple-400 animate-pulse" />
              </>
            )}
          </div>
          <span>Settings</span>
          <MagicParticles 
            active={hoveredCategory === '/dashboard/settings' || activeSparkles === '/dashboard/settings'}
            color="rgba(139, 92, 246, 0.7)"
          />
          {activeSparkles === '/dashboard/settings' && (
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-violet-400/20 to-purple-600/20 animate-pulse rounded-lg" />
          )}
        </button>

        {/* Sign out button */}
        <button
          onClick={() => auth.signOut()}
          onMouseEnter={() => setHoveredCategory('signout')}
          onMouseLeave={() => setHoveredCategory(null)}
          className="w-full flex items-center space-x-2 p-2 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-500 relative group hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)]"
        >
          <div className="relative">
            <LogOut className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-1" />
            {hoveredCategory === 'signout' && (
              <>
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-red-400 animate-ping" />
                <Stars className="absolute -bottom-1 -left-1 h-3 w-3 text-red-400 animate-pulse" />
              </>
            )}
          </div>
          <span>Sign Out</span>
          <MagicParticles 
            active={hoveredCategory === 'signout'}
            color="rgba(239, 68, 68, 0.7)"
          />
        </button>
      </div>
    </div>
  );
}