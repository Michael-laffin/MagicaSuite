import React from 'react';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import { ToolModalProps } from './types';
import { categories } from './toolsData';

export default function ToolModal({ tool, isOpen, onClose }: ToolModalProps) {
  if (!tool || !isOpen) return null;

  const Icon = Icons[tool.icon as keyof typeof Icons];
  const category = categories.find(c => c.id === tool.category);

  const getCategoryColors = () => {
    switch (tool.category) {
      case 'productivity':
        return {
          gradient: 'from-blue-500/10 via-cyan-400/10 to-blue-600/10',
          icon: 'text-blue-400'
        };
      case 'marketing':
        return {
          gradient: 'from-purple-500/10 via-fuchsia-400/10 to-purple-600/10',
          icon: 'text-purple-400'
        };
      case 'business':
        return {
          gradient: 'from-emerald-500/10 via-green-400/10 to-emerald-600/10',
          icon: 'text-emerald-400'
        };
      case 'creativity':
        return {
          gradient: 'from-orange-500/10 via-amber-400/10 to-orange-600/10',
          icon: 'text-orange-400'
        };
      case 'analytics':
        return {
          gradient: 'from-rose-500/10 via-pink-400/10 to-rose-600/10',
          icon: 'text-rose-400'
        };
      case 'tech':
        return {
          gradient: 'from-indigo-500/10 via-violet-400/10 to-indigo-600/10',
          icon: 'text-indigo-400'
        };
      default:
        return {
          gradient: 'from-gray-500/10 via-slate-400/10 to-zinc-600/10',
          icon: 'text-gray-400'
        };
    }
  };

  const colors = getCategoryColors();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl transform transition-all">
        <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} rounded-2xl opacity-50`} />
        
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <div className={`p-3 bg-white/5 rounded-lg bg-gradient-to-r ${colors.gradient}`}>
              <Icon className={`h-8 w-8 ${colors.icon}`} />
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
              <p className="text-gray-400">{tool.description}</p>
            </div>
            <div className={`
              px-3 py-1 rounded-full text-sm font-medium
              bg-gradient-to-r ${colors.gradient}
              border border-white/10 backdrop-blur-sm
              ${colors.icon}
            `}>
              {category?.name}
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-6">
            {/* Tool-specific content will be rendered here */}
            <div className="text-center text-gray-400">
              Tool interface coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}