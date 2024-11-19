import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import MagicalToolWindow
import MagicalToolWindow from '../../components/analytics/MagicalToolWindow';

// Import all tool components
import DataVisualizer from '../../components/analytics/tools/DataVisualizer';
import MetricsDashboard from '../../components/analytics/tools/MetricsDashboard';
import ReportGenerator from '../../components/analytics/tools/ReportGenerator';
import TrendAnalyzer from '../../components/analytics/tools/TrendAnalyzer';
import PredictiveAnalytics from '../../components/analytics/tools/PredictiveAnalytics';
import DataExplorer from '../../components/analytics/tools/DataExplorer';
import CustomReports from '../../components/analytics/tools/CustomReports';
import RealTimeAnalytics from '../../components/analytics/tools/RealTimeAnalytics';
import PerformanceMetrics from '../../components/analytics/tools/PerformanceMetrics';
import DataInsights from '../../components/analytics/tools/DataInsights';
import DefaultTool from '../../components/analytics/tools/DefaultTool';

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

  // Mapping tool names to their respective components
  const toolComponents: { [key: string]: React.FC } = {
    'Data Visualizer': DataVisualizer,
    'Metrics Dashboard': MetricsDashboard,
    'Report Generator': ReportGenerator,
    'Trend Analyzer': TrendAnalyzer,
    'Predictive Analytics': PredictiveAnalytics,
    'Data Explorer': DataExplorer,
    'Custom Reports': CustomReports,
    'Real-time Analytics': RealTimeAnalytics,
    'Performance Metrics': PerformanceMetrics,
    'Data Insights': DataInsights
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
            } as React.CSSProperties}
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
        <AnimatePresence>
          {activeTool !== null && (
            <MagicalToolWindow
              isOpen={true}
              onClose={() => setActiveTool(null)}
              title={activeTool}
            >
              {activeTool && toolComponents[activeTool] && 
                React.createElement(toolComponents[activeTool])
              }
            </MagicalToolWindow>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
