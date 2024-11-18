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
    color: 'from-emerald-900/30 via-emerald-800/20 to-emerald-900/30',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.5)]',
    particleColor: 'rgba(16, 185, 129, 0.3)',
    gradientBg: 'from-emerald-900/20 via-emerald-800/10 to-emerald-900/20',
    borderColor: 'border-emerald-500/20',
    hoverBorderColor: 'hover:border-emerald-400/40',
    textColor: 'text-emerald-400'
  },
  {
    name: 'Marketing',
    icon: Megaphone,
    path: '/dashboard/marketing',
    color: 'from-blue-900/30 via-blue-800/20 to-blue-900/30',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.5)]',
    particleColor: 'rgba(59, 130, 246, 0.3)',
    gradientBg: 'from-blue-900/20 via-blue-800/10 to-blue-900/20',
    borderColor: 'border-blue-500/20',
    hoverBorderColor: 'hover:border-blue-400/40',
    textColor: 'text-blue-400'
  },
  {
    name: 'Business',
    icon: Briefcase,
    path: '/dashboard/business',
    color: 'from-cyan-900/30 via-cyan-800/20 to-cyan-900/30',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]',
    particleColor: 'rgba(34, 211, 238, 0.3)',
    gradientBg: 'from-cyan-900/20 via-cyan-800/10 to-cyan-900/20',
    borderColor: 'border-cyan-500/20',
    hoverBorderColor: 'hover:border-cyan-400/40',
    textColor: 'text-cyan-400'
  },
  {
    name: 'Creativity',
    icon: Palette,
    path: '/dashboard/creativity',
    color: 'from-orange-900/30 via-orange-800/20 to-orange-900/30',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)]',
    particleColor: 'rgba(249, 115, 22, 0.3)',
    gradientBg: 'from-orange-900/20 via-orange-800/10 to-orange-900/20',
    borderColor: 'border-orange-500/20',
    hoverBorderColor: 'hover:border-orange-400/40',
    textColor: 'text-orange-400'
  },
  {
    name: 'Analytics',
    icon: BarChart,
    path: '/dashboard/analytics',
    color: 'from-rose-900/30 via-rose-800/20 to-rose-900/30',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.5)]',
    particleColor: 'rgba(244, 63, 94, 0.3)',
    gradientBg: 'from-rose-900/20 via-rose-800/10 to-rose-900/20',
    borderColor: 'border-rose-500/20',
    hoverBorderColor: 'hover:border-rose-400/40',
    textColor: 'text-rose-400'
  },
  {
    name: 'Tech',
    icon: Code,
    path: '/dashboard/tech',
    color: 'from-purple-900/30 via-purple-800/20 to-purple-900/30',
    hoverEffect: 'hover:shadow-[0_0_30px_-5px_rgba(147,51,234,0.5)]',
    particleColor: 'rgba(147, 51, 234, 0.3)',
    gradientBg: 'from-purple-900/20 via-purple-800/10 to-purple-900/20',
    borderColor: 'border-purple-500/20',
    hoverBorderColor: 'hover:border-purple-400/40',
    textColor: 'text-purple-400'
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
    <aside className="h-screen w-64 bg-gray-900/95 border-r border-white/10 flex flex-col relative overflow-hidden backdrop-blur-xl glass-effect">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-800/50 to-gray-900/80 opacity-50" />
      <div className="absolute inset-0 bg-magic-pattern opacity-[0.015]" />
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6">
          <Link 
            to="/dashboard" 
            className="flex items-center gap-3 group hover-lift"
          >
            <div className="relative">
              <Wand2 className="h-8 w-8 text-purple-400 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-purple-400/15 blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="absolute inset-0">
                <Stars className="h-8 w-8 text-purple-400/30 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400/90 via-pink-400/90 to-purple-400/90 bg-clip-text text-transparent group-hover:from-blue-400/90 group-hover:via-purple-400/90 group-hover:to-pink-400/90 transition-all duration-500">
              MagicaSuite
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Dashboard Link */}
          <Link
            to="/dashboard"
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500 hover-lift magical-border-animation
              ${location.pathname === '/dashboard' 
                ? 'bg-white/5 text-white shadow-glow category-active' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            onMouseEnter={() => setIsHovered('dashboard')}
            onMouseLeave={() => setIsHovered(null)}
            style={{ '--border-color': 'rgba(139, 92, 246, 0.2)' } as any}
          >
            <GlowEffect color="rgba(139, 92, 246, 0.5)" />
            <LayoutDashboard className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
            <span className="font-medium">Dashboard</span>
            {location.pathname === '/dashboard' && (
              <MagicParticles active={true} color="rgba(139, 92, 246, 0.5)" />
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
                className={`relative flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500 hover-lift magical-border-animation
                  ${isActive 
                    ? `${category.gradientBg} ${category.textColor} shadow-category category-active` 
                    : `${category.textColor} hover:bg-white/5 ${category.hoverBorderColor}`}`}
                onMouseEnter={(e) => {
                  setIsHovered(category.name);
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                onMouseLeave={() => setIsHovered(null)}
                style={{ 
                  '--category-color': category.particleColor,
                  '--border-color': category.borderColor
                } as any}
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
                  <Sparkles className="w-4 h-4 text-white/50 absolute right-4 animate-glow-pulse" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 space-y-2">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          
          {/* Settings */}
          <Link
            to="/dashboard/settings"
            className={`relative flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500 hover-lift magical-border-animation
              ${location.pathname === '/dashboard/settings' 
                ? 'bg-white/5 text-white shadow-glow category-active' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            onMouseEnter={() => setIsHovered('settings')}
            onMouseLeave={() => setIsHovered(null)}
            style={{ '--border-color': 'rgba(139, 92, 246, 0.2)' } as any}
          >
            <GlowEffect color="rgba(139, 92, 246, 0.5)" />
            <Cog className="w-5 h-5 transition-transform duration-500 group-hover:rotate-90" />
            <span className="font-medium">Settings</span>
            {location.pathname === '/dashboard/settings' && (
              <MagicParticles active={true} color="rgba(139, 92, 246, 0.5)" />
            )}
          </Link>

          {/* Logout */}
          <button
            onClick={() => auth.signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg group transition-all duration-500 text-gray-400 hover:text-red-400 hover:bg-red-500/5 hover-lift magical-border-animation"
            style={{ '--border-color': 'rgba(239, 68, 68, 0.15)' } as any}
          >
            <LogOut className="w-5 h-5 transition-transform duration-500 group-hover:-translate-x-1" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}