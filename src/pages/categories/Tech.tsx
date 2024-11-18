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
                     rounded-xl border border-purple-500/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-500/20">
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

export default function Tech() {
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

  const renderToolContent = (toolName: string) => {
    switch (toolName) {
      case 'Code Editor':
        return (
          <div className="flex flex-col h-full space-y-4 p-4">
            <div className="flex space-x-2 text-sm">
              <button className="px-3 py-1 bg-purple-500/20 rounded-md hover:bg-purple-500/30">File</button>
              <button className="px-3 py-1 bg-purple-500/20 rounded-md hover:bg-purple-500/30">Edit</button>
              <button className="px-3 py-1 bg-purple-500/20 rounded-md hover:bg-purple-500/30">View</button>
            </div>
            <div className="flex-grow bg-gray-900 rounded-md p-4 font-mono text-sm">
              <div className="text-purple-400">// Write your code here</div>
              <div className="text-gray-300">function hello() {'{'}</div>
              <div className="text-gray-300 ml-4">console.log("Hello, World!");</div>
              <div className="text-gray-300">{'}'}</div>
            </div>
          </div>
        );

      case 'API Tester':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex space-x-2">
              <select className="bg-gray-800 text-white px-3 py-1 rounded-md">
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
              <input
                type="text"
                placeholder="Enter API endpoint"
                className="flex-grow bg-gray-800 text-white px-3 py-1 rounded-md"
              />
            </div>
            <div className="bg-gray-900 rounded-md p-4 h-32">
              <p className="text-gray-400">Response Preview</p>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition">
              Send Request
            </button>
          </div>
        );

      case 'Database Manager':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex space-x-2">
              <select className="bg-gray-800 text-white px-3 py-1 rounded-md">
                <option>MySQL</option>
                <option>PostgreSQL</option>
                <option>MongoDB</option>
              </select>
              <input
                type="text"
                placeholder="Connection string"
                className="flex-grow bg-gray-800 text-white px-3 py-1 rounded-md"
              />
            </div>
            <textarea
              placeholder="Enter SQL query"
              className="bg-gray-900 text-white p-4 rounded-md h-32 font-mono"
            />
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition">
              Execute Query
            </button>
          </div>
        );

      case 'Git Interface':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="grid grid-cols-2 gap-2">
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Pull</button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Push</button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Commit</button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">Branch</button>
            </div>
            <div className="bg-gray-900 rounded-md p-4 h-32">
              <p className="text-purple-400 mb-2">Current Branch: main</p>
              <p className="text-gray-400">Modified files: 0</p>
              <p className="text-gray-400">Staged changes: 0</p>
            </div>
          </div>
        );

      case 'Cloud Console':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex space-x-2">
              <select className="bg-gray-800 text-white px-3 py-1 rounded-md">
                <option>AWS</option>
                <option>Azure</option>
                <option>GCP</option>
              </select>
              <select className="bg-gray-800 text-white px-3 py-1 rounded-md">
                <option>Region: US-East</option>
                <option>Region: US-West</option>
                <option>Region: EU</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Active Services</p>
                <p className="text-xl text-white">4</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Resources</p>
                <p className="text-xl text-white">12</p>
              </div>
            </div>
          </div>
        );

      case 'Terminal':
        return (
          <div className="flex flex-col h-full space-y-2 p-4">
            <div className="flex-grow bg-gray-900 rounded-md p-4 font-mono text-sm">
              <p className="text-purple-400">$ _</p>
              <p className="text-gray-400 text-sm mt-2">Type commands here...</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700">Clear</button>
              <button className="px-3 py-1 bg-gray-800 text-white rounded-md hover:bg-gray-700">History</button>
            </div>
          </div>
        );

      case 'DevOps Dashboard':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Build Status</p>
                <p className="text-green-400">Passing</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Deployments</p>
                <p className="text-purple-400">3/3 Success</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Tests</p>
                <p className="text-purple-400">100% Pass</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Pipeline</p>
                <p className="text-green-400">Active</p>
              </div>
            </div>
          </div>
        );

      case 'Security Scanner':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex justify-between items-center bg-gray-900 p-4 rounded-md">
              <div>
                <p className="text-gray-400">Last Scan</p>
                <p className="text-white">2 hours ago</p>
              </div>
              <div>
                <p className="text-gray-400">Vulnerabilities</p>
                <p className="text-green-400">0 Critical</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition">
              Start New Scan
            </button>
            <div className="bg-gray-900 p-3 rounded-md">
              <p className="text-gray-400">Security Score</p>
              <p className="text-2xl text-green-400">A+</p>
            </div>
          </div>
        );

      case 'Performance Monitor':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">CPU Usage</p>
                <p className="text-xl text-white">32%</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Memory</p>
                <p className="text-xl text-white">4.2GB</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Network</p>
                <p className="text-xl text-white">2.1MB/s</p>
              </div>
              <div className="bg-gray-900 p-3 rounded-md">
                <p className="text-gray-400">Disk I/O</p>
                <p className="text-xl text-white">150KB/s</p>
              </div>
            </div>
          </div>
        );

      case 'Documentation Generator':
        return (
          <div className="flex flex-col space-y-4 p-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Project name"
                className="flex-grow bg-gray-800 text-white px-3 py-1 rounded-md"
              />
              <select className="bg-gray-800 text-white px-3 py-1 rounded-md">
                <option>Markdown</option>
                <option>HTML</option>
                <option>PDF</option>
              </select>
            </div>
            <div className="bg-gray-900 rounded-md p-4 h-32">
              <p className="text-purple-400 mb-2"># Documentation Preview</p>
              <p className="text-gray-400">Project overview and setup instructions will appear here.</p>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition">
              Generate Docs
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
            } as any}
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
        >
          {activeTool && renderToolContent(activeTool)}
        </MagicalToolWindow>
      </div>
    </div>
  );
}
