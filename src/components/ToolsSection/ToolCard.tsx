import React from 'react';
import * as Icons from 'lucide-react';
import { ToolCardProps } from './types';

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const Icon = Icons[tool.icon as keyof typeof Icons];

  return (
    <button
      onClick={onClick}
      className="group relative w-full bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6 transition-all duration-300 hover:scale-105 hover:bg-white/10"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
      
      <div className="relative flex flex-col items-center text-center">
        <div className="p-3 bg-white/5 rounded-lg mb-4">
          <Icon className="h-8 w-8 text-purple-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">{tool.name}</h3>
        <p className="text-sm text-gray-400">{tool.description}</p>
        
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </button>
  );
}