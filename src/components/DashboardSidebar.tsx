import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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
      {[...Array(6)].map((_, i) => {
        const randomDelay = Math.random() * 1000;
        const tx = (Math.random() - 0.5) * 40;
        const ty = (Math.random() - 0.5) * 40;
        const tx2 = tx * 2;
        const ty2 = ty * 2;

        return (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-magic-particle"
            style={{
              backgroundColor: color,
              left: '50%',
              top: '50%',
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
              '--tx2': `${tx2}px`,
              '--ty2': `${ty2}px`,
              animationDelay: `${randomDelay}ms`,
              filter: 'blur(1px)',
            } as any}
          />
        );
      })}
    </div>
  );
};

const GlowEffect: React.FC<{ color: string }> = ({ color }) => (
  <div 
    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
    style={{
      background: `radial-gradient(circle at center, ${color}, transparent 70%)`
    }}
  />
);

export default function DashboardSidebar() {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  useEffect(() => {
    const path = location.pathname.split('/').pop();
    setActiveCategory(path || 'dashboard');
  }, [location]);

  return (
    <aside className="h-screen w-64 bg-gray-900/95 border-r border-white/10 flex flex-col relative overflow-hidden backdrop-blur-xl">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900 opacity-50" />
      <div className="absolute inset-0 bg-magic-pattern opacity-[0.02]" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 group"
          >
            <div className="relative">
              <Wand2 className="h-8 w-8 text-purple-400 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-purple-400/20 blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="absolute inset-0">
                <Stars className="h-8 w-8 text-purple-400/40 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-500">
              MagicaSuite
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500
              ${location.pathname === '/dashboard' 
                ? 'bg-white/10 text-white shadow-glow' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            onMouseEnter={() => setIsHovered('dashboard')}
            onMouseLeave={() => setIsHovered(null)}
          >
            <GlowEffect color="rgba(139, 92, 246, 0.7)" />
            <LayoutDashboard className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
            <span className="font-medium">Dashboard</span>
            {location.pathname === '/dashboard' && (
              <MagicParticles active={true} color="rgba(139, 92, 246, 0.7)" />
            )}
          </Link>

          {/* Category Links */}
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.path.split('/').pop();
            
            return (
              <Link
                key={category.name}
                to={category.path}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500
                  ${isActive 
                    ? `bg-gradient-to-r ${category.color} shadow-category` 
                    : 'hover:bg-white/5'}`}
                onMouseEnter={() => setIsHovered(category.name)}
                onMouseLeave={() => setIsHovered(null)}
                style={{ '--category-color': category.particleColor } as any}
              >
                <GlowEffect color={category.particleColor} />
                <Icon className={`w-5 h-5 transition-transform duration-500 group-hover:scale-110
                  ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                  {category.name}
                </span>
                {(isActive || isHovered === category.name) && (
                  <MagicParticles active={true} color={category.particleColor} />
                )}
                {isActive && (
                  <Sparkles className="w-4 h-4 text-white/70 absolute right-4 animate-glow-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 space-y-2">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          
          {/* Settings */}
          <Link
            to="/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500 text-gray-400 hover:text-white hover:bg-white/5"
          >
            <Cog className="w-5 h-5 transition-all duration-500 group-hover:rotate-90" />
            <span>Settings</span>
          </Link>

          {/* Logout */}
          <button
            onClick={() => auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500 text-gray-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5 transition-transform duration-500 group-hover:-translate-x-1" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}