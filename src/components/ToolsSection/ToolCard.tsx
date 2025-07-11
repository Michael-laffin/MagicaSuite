import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ToolCardProps, categories } from '../../data/tools';
import Sparkles from './Sparkles';
import Stars from './Stars';

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const Icon = Icons[tool.icon as keyof typeof Icons];
  const [isHovered, setIsHovered] = useState(false);

  // Get category-specific colors
  const getCategoryColors = () => {
    switch (tool.category) {
      case 'productivity':
        return {
          gradient: 'from-blue-500/20 via-cyan-400/20 to-blue-600/20',
          glow: 'rgba(59, 130, 246, 0.3)',
          icon: 'text-blue-400',
          border: 'border-blue-500/20',
          hover: 'hover:border-blue-500/40'
        };
      case 'marketing':
        return {
          gradient: 'from-purple-500/20 via-fuchsia-400/20 to-purple-600/20',
          glow: 'rgba(147, 51, 234, 0.3)',
          icon: 'text-purple-400',
          border: 'border-purple-500/20',
          hover: 'hover:border-purple-500/40'
        };
      case 'business':
        return {
          gradient: 'from-emerald-500/20 via-green-400/20 to-emerald-600/20',
          glow: 'rgba(16, 185, 129, 0.3)',
          icon: 'text-emerald-400',
          border: 'border-emerald-500/20',
          hover: 'hover:border-emerald-500/40'
        };
      case 'creativity':
        return {
          gradient: 'from-orange-500/20 via-amber-400/20 to-orange-600/20',
          glow: 'rgba(249, 115, 22, 0.3)',
          icon: 'text-orange-400',
          border: 'border-orange-500/20',
          hover: 'hover:border-orange-500/40'
        };
      case 'analytics':
        return {
          gradient: 'from-rose-500/20 via-pink-400/20 to-rose-600/20',
          glow: 'rgba(244, 63, 94, 0.3)',
          icon: 'text-rose-400',
          border: 'border-rose-500/20',
          hover: 'hover:border-rose-500/40'
        };
      case 'tech':
        return {
          gradient: 'from-indigo-500/20 via-violet-400/20 to-indigo-600/20',
          glow: 'rgba(99, 102, 241, 0.3)',
          icon: 'text-indigo-400',
          border: 'border-indigo-500/20',
          hover: 'hover:border-indigo-500/40'
        };
      default:
        return {
          gradient: 'from-gray-500/20 via-slate-500/20 to-zinc-500/20',
          glow: 'rgba(107, 114, 128, 0.3)',
          icon: 'text-gray-400',
          border: 'border-gray-500/20',
          hover: 'hover:border-gray-500/40'
        };
    }
  };

  const colors = getCategoryColors();
  const categoryName = categories.find(c => c.id === tool.category)?.name || tool.category;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative w-full h-full
        bg-white/5 backdrop-blur-sm
        rounded-xl ${colors.border} ${colors.hover}
        p-6 transition-all duration-500
        hover:scale-[1.02] hover:bg-white/10
        ${isHovered ? `shadow-[0_0_30px_-5px_${colors.glow}]` : ''}
      `}
    >
      {/* Animated gradient background */}
      <div className={`
        absolute inset-0 bg-gradient-to-r ${colors.gradient}
        opacity-0 group-hover:opacity-100 rounded-xl
        transition-all duration-500
      `} />
      
      {/* Magical effects */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -right-2 animate-sparkle">
            <Sparkles className={`h-4 w-4 ${colors.icon}`} />
          </div>
          <div className="absolute top-1/2 left-0 -translate-x-1/2 animate-star">
            <Stars className={`h-3 w-3 ${colors.icon}`} />
          </div>
          <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
            <Sparkles className={`h-3 w-3 ${colors.icon}`} />
          </div>
        </>
      )}
      
      <div className="relative flex flex-col items-center text-center space-y-4">
        {/* Icon container with hover effects */}
        <div className={`
          p-3 rounded-lg
          transition-all duration-500 group-hover:scale-110
          bg-gradient-to-r ${colors.gradient}
          group-hover:animate-pulse
        `}>
          <Icon className={`
            h-8 w-8 ${colors.icon}
            transition-all duration-500
            group-hover:rotate-12
          `} />
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white
            transition-all duration-500 group-hover:scale-105
            group-hover:text-shadow-glow"
          >
            {tool.name}
          </h3>
          
          <p className="text-white/60 text-sm
            transition-all duration-500
            group-hover:text-white/80"
          >
            {tool.description}
          </p>
        </div>
        
        {/* Category badge */}
        <div className={`
          mt-auto px-3 py-1
          rounded-full text-xs font-medium
          bg-gradient-to-r ${colors.gradient}
          border ${colors.border}
          backdrop-blur-sm
          transition-all duration-500
          group-hover:scale-105
          group-hover:shadow-lg
          ${colors.icon}
        `}>
          {categoryName}
        </div>
      </div>
    </button>
  );
}