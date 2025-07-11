// src/Components/tech/Tech.tsx

import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import MagicalToolWindow
import MagicalToolWindow from '../../components/shared/MagicalToolWindow';

// Import all tool components
import CodeEditor from '../../components/tech/tools/CodeEditor';
import APITester from '../../components/tech/tools/APITester';
import DatabaseManager from '../../components/tech/tools/DatabaseManager';
import GitInterface from '../../components/tech/tools/GitInterface';
import CloudConsole from '../../components/tech/tools/CloudConsole';
import Terminal from '../../components/tech/tools/Terminal';
import DevOpsDashboard from '../../components/tech/tools/DevOpsDashboard';
import SecurityScanner from '../../components/tech/tools/SecurityScanner';
import PerformanceMonitor from '../../components/tech/tools/PerformanceMonitor';
import DocumentationGenerator from '../../components/tech/tools/DocumentationGenerator';
import DefaultTool from '../../components/tech/tools/DefaultTool';

const Tech: React.FC = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Code Editor',
      description: 'Write and edit code efficiently.'
    },
    {
      name: 'API Tester',
      description: 'Test and debug API endpoints.'
    },
    {
      name: 'Database Manager',
      description: 'Manage and query databases.'
    },
    {
      name: 'Git Interface',
      description: 'Control version management.'
    },
    {
      name: 'Cloud Console',
      description: 'Manage cloud resources.'
    },
    {
      name: 'Terminal',
      description: 'Command-line interface access.'
    },
    {
      name: 'DevOps Dashboard',
      description: 'Monitor development operations.'
    },
    {
      name: 'Security Scanner',
      description: 'Analyze code for vulnerabilities.'
    },
    {
      name: 'Performance Monitor',
      description: 'Track system performance.'
    },
    {
      name: 'Documentation Generator',
      description: 'Generate technical documentation.'
    }
  ];

  // Mapping tool names to their respective components
  const toolComponents: { [key: string]: React.FC } = {
    'Code Editor': CodeEditor,
    'API Tester': APITester,
    'Database Manager': DatabaseManager,
    'Git Interface': GitInterface,
    'Cloud Console': CloudConsole,
    'Terminal': Terminal,
    'DevOps Dashboard': DevOpsDashboard,
    'Security Scanner': SecurityScanner,
    'Performance Monitor': PerformanceMonitor,
    'Documentation Generator': DocumentationGenerator
    // Add more mappings as you create new tools
  };

  const renderToolContent = (toolName: string) => {
    const ToolComponent = toolComponents[toolName];
    if (ToolComponent) {
      return <ToolComponent />;
    } else {
      return <DefaultTool toolName={toolName} />;
    }
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden">
      {/* Magical Background with category-specific color */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-purple-900/20 backdrop-blur-md" />
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
              color: 'rgba(147, 51, 234, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-purple-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-purple-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Tech Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-purple-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-purple-300/60">Power your development workflow</p>
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
                bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-purple-900/30
                p-6 rounded-xl
                border border-purple-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-purple-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-400/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-purple-100/70 group-hover:text-purple-50/90 transition-colors duration-500">
                  {tool.description}
                </p>
              </div>

              {/* Magical effects */}
              {hoveredTool === tool.name && (
                <>
                  <div className="absolute -top-2 -right-2 animate-sparkle">
                    <Sparkles className="h-4 w-4 text-purple-400" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                    <Sparkles className="h-3 w-3 text-purple-400" />
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
          variant="tech"
        >
          {activeTool && renderToolContent(activeTool)}
        </MagicalToolWindow>
      </div>
    </div>
  );
};

export default Tech;
