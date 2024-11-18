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
                     rounded-xl border border-blue-500/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
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

export default function Marketing() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Social Media Manager',
      description: 'Schedule and manage social media content.'
    },
    {
      name: 'Email Campaigns',
      description: 'Create and track email marketing campaigns.'
    },
    {
      name: 'Analytics Dashboard',
      description: 'Track marketing performance metrics.'
    },
    {
      name: 'Content Calendar',
      description: 'Plan and organize content strategy.'
    },
    {
      name: 'SEO Optimizer',
      description: 'Improve search engine visibility.'
    },
    {
      name: 'Ad Manager',
      description: 'Create and manage digital advertising.'
    },
    {
      name: 'Lead Generator',
      description: 'Capture and nurture potential leads.'
    },
    {
      name: 'Brand Kit',
      description: 'Maintain consistent brand identity.'
    },
    {
      name: 'Competitor Analysis',
      description: 'Monitor competitor strategies.'
    },
    {
      name: 'Marketing ROI',
      description: 'Calculate marketing return on investment.'
    }
  ];

  const renderToolContent = (toolName: string) => {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400 text-lg">
          {toolName} content coming soon...
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden">
      {/* Magical Background with category-specific color */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-blue-800/10 to-blue-900/20 backdrop-blur-md" />
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
              color: 'rgba(59, 130, 246, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as any}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-blue-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Marketing Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-blue-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-blue-300/60">Amplify your marketing impact</p>
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
                bg-gradient-to-br from-blue-900/30 via-blue-800/20 to-blue-900/30
                p-6 rounded-xl
                border border-blue-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-blue-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-400/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-blue-100/70 group-hover:text-blue-50/90 transition-colors duration-500">
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
