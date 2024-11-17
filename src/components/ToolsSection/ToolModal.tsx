import React from 'react';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';
import { ToolModalProps } from './types';

export default function ToolModal({ tool, isOpen, onClose }: ToolModalProps) {
  if (!tool || !isOpen) return null;

  const Icon = Icons[tool.icon as keyof typeof Icons];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl transform transition-all">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-2xl opacity-50" />
        
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-white/5 rounded-lg">
              <Icon className="h-8 w-8 text-purple-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{tool.name}</h3>
              <p className="text-gray-400">{tool.description}</p>
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