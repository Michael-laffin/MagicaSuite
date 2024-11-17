import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';

export default function Productivity() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Task Manager',
      description: 'Organize and track your daily tasks.'
    },
    {
      name: 'Time Tracker',
      description: 'Monitor time spent on activities.'
    },
    {
      name: 'Project Planner',
      description: 'Plan and manage project timelines.'
    },
    {
      name: 'Note Taking',
      description: 'Create and organize digital notes.'
    },
    {
      name: 'Calendar Sync',
      description: 'Synchronize events across calendars.'
    },
    {
      name: 'Focus Timer',
      description: 'Stay focused with timed work sessions.'
    },
    {
      name: 'File Organizer',
      description: 'Organize and manage digital files.'
    },
    {
      name: 'Goal Tracker',
      description: 'Set and track personal goals.'
    },
    {
      name: 'Habit Builder',
      description: 'Develop and maintain good habits.'
    },
    {
      name: 'Team Collaboration',
      description: 'Work together efficiently with teams.'
    }
  ];

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header with magical effects */}
      <div className="flex items-center mb-8 relative">
        <div className="absolute -left-3 -top-3 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="relative flex items-center">
          <Zap className="h-10 w-10 text-blue-400 mr-4 animate-float" />
          <div>
            <h1 className="text-3xl font-bold text-white mb-1 relative group">
              Productivity Tools
              <span className="absolute -top-1 -right-2">
                <Sparkles className="h-4 w-4 text-blue-400 animate-sparkle" />
              </span>
            </h1>
            <p className="text-blue-300/60">Boost your productivity and efficiency</p>
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
              border border-blue-500/20 hover:border-blue-500/40
              transition-all duration-500
              hover:scale-[1.02]
              ${hoveredTool === tool.name ? 'shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]' : ''}
              cursor-pointer
              overflow-hidden
            `}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
            
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
                  <Sparkles className="h-4 w-4 text-blue-400" />
                </div>
                <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                  <Sparkles className="h-3 w-3 text-blue-400" />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
