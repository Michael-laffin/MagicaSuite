import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicalToolWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const MagicalToolWindow: React.FC<MagicalToolWindowProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with lighter blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />

          {/* Tool Window */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            exit={{ 
              scale: 0.8, 
              opacity: 0, 
              y: 20,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            className="fixed top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[40vh] max-h-[400px] 
                     bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 
                     rounded-xl border border-rose-500/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-rose-500/20">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4 text-gray-300">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Analytics() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Data Visualizer',
      description: 'Create interactive data charts.'
    },
    {
      name: 'Metrics Dashboard',
      description: 'Monitor key performance indicators.'
    },
    {
      name: 'Report Generator',
      description: 'Generate comprehensive reports.'
    },
    {
      name: 'Trend Analyzer',
      description: 'Identify data patterns and trends.'
    },
    {
      name: 'Predictive Analytics',
      description: 'Forecast future trends.'
    },
    {
      name: 'Data Explorer',
      description: 'Explore and analyze datasets.'
    },
    {
      name: 'Custom Reports',
      description: 'Build tailored analytics reports.'
    },
    {
      name: 'Real-time Analytics',
      description: 'Monitor live data streams.'
    },
    {
      name: 'Performance Metrics',
      description: 'Track business performance.'
    },
    {
      name: 'Data Insights',
      description: 'Extract meaningful insights.'
    }
  ];

  const renderToolContent = (toolName: string) => {
    switch (toolName) {
      case 'Data Visualizer':
        return (
          <div className="flex flex-col items-center space-y-4 p-4">
            <select className="bg-gray-800 text-white p-2 rounded-md w-full max-w-xs">
              <option value="bar">Bar Chart</option>
              <option value="line">Line Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
            <div className="w-full h-48 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Chart Preview Area</p>
            </div>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition">
              Generate Chart
            </button>
          </div>
        );

      case 'Metrics Dashboard':
        return (
          <div className="grid grid-cols-2 gap-4 p-4">
            {['Users', 'Revenue', 'Conversion', 'Growth'].map((metric) => (
              <div key={metric} className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-gray-300 text-sm mb-2">{metric}</h3>
                <p className="text-2xl text-white font-bold">0</p>
                <span className="text-rose-400 text-sm">+0% vs last period</span>
              </div>
            ))}
          </div>
        );

      case 'Report Generator':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex space-x-2">
              <input
                type="date"
                className="bg-gray-800 text-white p-2 rounded-md"
              />
              <select className="bg-gray-800 text-white p-2 rounded-md">
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition">
              Generate Report
            </button>
          </div>
        );

      case 'Trend Analyzer':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Trend Graph</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-gray-800 p-2 rounded-lg text-center">
                <p className="text-sm text-gray-400">Upward</p>
                <p className="text-rose-400">45%</p>
              </div>
              <div className="bg-gray-800 p-2 rounded-lg text-center">
                <p className="text-sm text-gray-400">Stable</p>
                <p className="text-rose-400">30%</p>
              </div>
              <div className="bg-gray-800 p-2 rounded-lg text-center">
                <p className="text-sm text-gray-400">Downward</p>
                <p className="text-rose-400">25%</p>
              </div>
            </div>
          </div>
        );

      case 'Predictive Analytics':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <select className="bg-gray-800 text-white p-2 rounded-md">
              <option>Revenue Forecast</option>
              <option>User Growth</option>
              <option>Churn Rate</option>
            </select>
            <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Forecast Chart</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">Confidence Score</p>
              <p className="text-xl text-rose-400">85%</p>
            </div>
          </div>
        );

      case 'Data Explorer':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <input
              type="text"
              placeholder="Search data..."
              className="bg-gray-800 text-white p-2 rounded-md"
            />
            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                Filter
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
                Sort
              </button>
            </div>
            <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Data Preview</p>
            </div>
          </div>
        );

      case 'Custom Reports':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-gray-400">Report Name</label>
              <input
                type="text"
                className="w-full bg-gray-800 text-white p-2 rounded-md"
                placeholder="Enter report name"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {['Users', 'Revenue', 'Products', 'Time'].map((metric) => (
                <div
                  key={metric}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                >
                  {metric}
                </div>
              ))}
            </div>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition">
              Create Report
            </button>
          </div>
        );

      case 'Real-time Analytics':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-400">Live Users</p>
              <span className="text-rose-400">124</span>
            </div>
            <div className="w-full h-32 bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Activity Graph</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-gray-800 p-2 rounded-lg text-center">
                <p className="text-gray-400">Page Views</p>
                <p className="text-rose-400">1,234</p>
              </div>
              <div className="bg-gray-800 p-2 rounded-lg text-center">
                <p className="text-gray-400">Actions</p>
                <p className="text-rose-400">456</p>
              </div>
            </div>
          </div>
        );

      case 'Performance Metrics':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Load Time</p>
                <p className="text-xl text-white">1.2s</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Error Rate</p>
                <p className="text-xl text-white">0.1%</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">Uptime</p>
                <p className="text-xl text-white">99.9%</p>
              </div>
              <div className="bg-gray-800 p-3 rounded-lg">
                <p className="text-gray-400 text-sm">CPU Usage</p>
                <p className="text-xl text-white">45%</p>
              </div>
            </div>
          </div>
        );

      case 'Data Insights':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white mb-2">Key Findings</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• User engagement increased by 25%</li>
                <li>• Peak usage time: 2-4 PM</li>
                <li>• Most active user segment: Mobile</li>
              </ul>
            </div>
            <button className="px-4 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition">
              Generate New Insights
            </button>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-lg">
              {toolName} content coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden">
      {/* Magical Background with category-specific color */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-rose-800/10 to-rose-900/20 backdrop-blur-md" />
      <div className="absolute inset-0 animated-gradient opacity-10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="magic-particle"
            style={{
              '--x': Math.random() * 2 - 1,
              '--y': -(Math.random() * 2),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              color: 'rgba(244, 63, 94, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as any}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-rose-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-rose-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Analytics Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-rose-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-rose-300/60">Transform data into insights</p>
            </div>
          </div>
        </div>

        {/* Tools grid with enhanced magical styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              onClick={() => setActiveTool(tool.name)}
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
              whileHover={{ scale: 1.02 }}
              className={`
                relative group
                glass-effect
                bg-gradient-to-br from-rose-900/30 via-rose-800/20 to-rose-900/30
                p-6 rounded-xl
                border border-rose-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-rose-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 via-rose-400/10 to-rose-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-rose-100/70 group-hover:text-rose-50/90 transition-colors duration-500">
                  {tool.description}
                </p>
              </div>

              {/* Magical effects */}
              {hoveredTool === tool.name && (
                <>
                  <div className="absolute -top-2 -right-2 animate-sparkle">
                    <Sparkles className="h-4 w-4 text-rose-400" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                    <Sparkles className="h-3 w-3 text-rose-400" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Magical Tool Window */}
        <MagicalToolWindow
          isOpen={activeTool !== null}
          onClose={() => setActiveTool(null)}
          title={activeTool || ''}
        >
          {activeTool && renderToolContent(activeTool)}
        </MagicalToolWindow>
      </div>
    </div>
  );
}
