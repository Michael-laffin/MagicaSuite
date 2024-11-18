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
                     rounded-xl border border-emerald-500/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-emerald-500/20">
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

export default function Productivity() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Task Manager',
      description: 'Organize and track your tasks efficiently.'
    },
    {
      name: 'Time Tracker',
      description: 'Monitor and optimize your time usage.'
    },
    {
      name: 'Focus Mode',
      description: 'Eliminate distractions and stay focused.'
    },
    {
      name: 'Project Planner',
      description: 'Plan and manage your projects effectively.'
    },
    {
      name: 'Note Taking',
      description: 'Take and organize notes seamlessly.'
    },
    {
      name: 'Calendar',
      description: 'Schedule and manage your time.'
    },
    {
      name: 'Habit Tracker',
      description: 'Build and maintain productive habits.'
    },
    {
      name: 'Goal Setting',
      description: 'Set and track your goals.'
    },
    {
      name: 'Pomodoro Timer',
      description: 'Work in focused time intervals.'
    },
    {
      name: 'Task Analytics',
      description: 'Analyze your productivity patterns.'
    }
  ];

  const renderToolContent = (toolName: string) => {
    switch (toolName) {
      case 'Task Manager':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Add a new task..." 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white focus:outline-none focus:border-emerald-500/50" />
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors">
                Add
              </button>
            </div>
            <div className="space-y-2 max-h-[250px] overflow-y-auto">
              {/* Sample tasks */}
              {['Complete project proposal', 'Review documentation', 'Team meeting'].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10">
                  <span className="text-white">{task}</span>
                  <button className="text-emerald-400 hover:text-emerald-300">✓</button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Time Tracker':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-400">25:00</div>
              <div className="text-gray-400">Current Session</div>
            </div>
            <div className="flex justify-center space-x-2">
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors">
                Start
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                Reset
              </button>
            </div>
          </div>
        );

      case 'Focus Mode':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-emerald-500/10">
              <span className="text-white">Focus Mode</span>
              <div className="w-12 h-6 bg-emerald-600 rounded-full relative cursor-pointer">
                <div className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-gray-300">
                <span>Block Notifications</span>
                <input type="checkbox" className="accent-emerald-500" />
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span>White Noise</span>
                <input type="checkbox" className="accent-emerald-500" />
              </div>
            </div>
          </div>
        );

      case 'Project Planner':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="New project..." 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white focus:outline-none focus:border-emerald-500/50" />
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors">
                Create
              </button>
            </div>
            <div className="space-y-2">
              {['Website Redesign', 'Mobile App', 'Marketing Campaign'].map((project, i) => (
                <div key={i} className="p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{project}</span>
                    <span className="text-emerald-400 text-sm">In Progress</span>
                  </div>
                  <div className="mt-2 bg-gray-700 h-2 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{width: `${(i + 1) * 25}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Note Taking':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input type="text" placeholder="Note title..." 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white focus:outline-none focus:border-emerald-500/50" />
            </div>
            <textarea 
              placeholder="Start typing your note..." 
              className="w-full h-[200px] px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white focus:outline-none focus:border-emerald-500/50 resize-none"
            ></textarea>
          </div>
        );

      case 'Calendar':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-gray-400">{day}</div>
              ))}
              {Array.from({length: 31}, (_, i) => (
                <div key={i} className="text-center p-2 rounded hover:bg-emerald-500/20 cursor-pointer text-white">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        );

      case 'Habit Tracker':
        return (
          <div className="space-y-4">
            {['Exercise', 'Reading', 'Meditation'].map((habit, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30 border border-emerald-500/10">
                <span className="text-white">{habit}</span>
                <div className="flex space-x-1">
                  {Array.from({length: 7}, (_, j) => (
                    <div key={j} className="w-6 h-6 rounded-full border border-emerald-500/30 cursor-pointer hover:bg-emerald-500/20"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'Goal Setting':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              {['Learn TypeScript', 'Build Portfolio', 'Network'].map((goal, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-emerald-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{goal}</span>
                    <select className="bg-gray-700 text-white rounded px-2 py-1 text-sm">
                      <option>Daily</option>
                      <option>Weekly</option>
                      <option>Monthly</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Pomodoro Timer':
        return (
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-5xl font-bold text-emerald-400">25:00</div>
              <div className="text-gray-400 mt-2">Work Session</div>
            </div>
            <div className="flex justify-center space-x-2">
              <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors">
                Start
              </button>
              <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
                Skip
              </button>
            </div>
          </div>
        );

      case 'Task Analytics':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-white">
                <span>Completed Tasks</span>
                <span>24</span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>Productivity Score</span>
                <span className="text-emerald-400">85%</span>
              </div>
              <div className="flex justify-between items-center text-white">
                <span>Focus Time</span>
                <span>4h 30m</span>
              </div>
              <div className="h-32 bg-gray-800/30 rounded-lg border border-emerald-500/10 mt-4">
                {/* Placeholder for charts */}
                <div className="flex items-end justify-between h-full p-2">
                  {Array.from({length: 7}, (_, i) => (
                    <div key={i} 
                      className="w-8 bg-emerald-500/50 rounded-t" 
                      style={{height: `${Math.random() * 100}%`}}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
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
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-emerald-800/10 to-emerald-900/20 backdrop-blur-md" />
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
              color: 'rgba(16, 185, 129, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as any}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-emerald-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Productivity Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-emerald-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-emerald-300/60">Boost your efficiency and focus</p>
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
                bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-emerald-900/30
                p-6 rounded-xl
                border border-emerald-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-emerald-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-emerald-100/70 group-hover:text-emerald-50/90 transition-colors duration-500">
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
