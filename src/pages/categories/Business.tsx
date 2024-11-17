import React, { useState } from 'react';
import { Briefcase, Sparkles } from 'lucide-react';

export default function Business() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Invoice Generator',
      description: 'Create professional invoices for your clients.'
    },
    {
      name: 'Expense Tracker',
      description: 'Track and categorize business expenses.'
    },
    {
      name: 'Project Budget Planner',
      description: 'Plan and manage project budgets effectively.'
    },
    {
      name: 'Contract Builder',
      description: 'Generate and customize business contracts.'
    },
    {
      name: 'Business Plan Creator',
      description: 'Create comprehensive business plans.'
    },
    {
      name: 'Financial Forecaster',
      description: 'Predict future business performance.'
    },
    {
      name: 'Meeting Scheduler',
      description: 'Schedule and manage business meetings.'
    },
    {
      name: 'Task Manager',
      description: 'Organize and track business tasks.'
    },
    {
      name: 'Resource Allocator',
      description: 'Manage and allocate business resources.'
    },
    {
      name: 'Business Analytics',
      description: 'Analyze business performance metrics.'
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header with magical effects */}
      <div className="flex items-center mb-8 relative">
        <div className="absolute -left-3 -top-3 w-16 h-16 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative flex items-center">
          <Briefcase className="h-10 w-10 text-emerald-400 mr-4 animate-float" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 relative group">
              Business Tools
              <span className="absolute -top-1 -right-2">
                <Sparkles className="h-4 w-4 text-emerald-400 animate-sparkle" />
              </span>
            </h1>
            <p className="text-emerald-300/60">Streamline your business operations</p>
          </div>
        </div>
      </div>

      {/* Tools grid with enhanced magical styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.name}
            onMouseEnter={() => setHoveredTool(tool.name)}
            onMouseLeave={() => setHoveredTool(null)}
            className={`
              relative group
              bg-gradient-to-br from-gray-800/50 via-gray-700/30 to-gray-800/50
              backdrop-blur-sm
              p-6 rounded-xl
              border border-emerald-500/20 hover:border-emerald-500/40
              transition-all duration-500
              hover:scale-[1.02]
              ${hoveredTool === tool.name ? 'shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]' : ''}
              cursor-pointer
              overflow-hidden
            `}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-green-400/20 to-emerald-600/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative">
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-shadow-glow transition-all duration-500">
                {tool.name}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-500">
                {tool.description}
              </p>
            </div>

            {/* Magical effects */}
            {hoveredTool === tool.name && (
              <>
                <div className="absolute -top-2 -right-2 animate-sparkle">
                  <Sparkles className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                  <Sparkles className="h-3 w-3 text-emerald-400" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
