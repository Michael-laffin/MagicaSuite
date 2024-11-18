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
                     rounded-xl border border-cyan-500/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
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

export default function Business() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Financial Dashboard',
      description: 'Track revenue and expenses.'
    },
    {
      name: 'Invoice Generator',
      description: 'Create professional invoices.'
    },
    {
      name: 'Client CRM',
      description: 'Manage customer relationships.'
    },
    {
      name: 'Project Management',
      description: 'Plan and track projects.'
    },
    {
      name: 'Business Analytics',
      description: 'Analyze business performance.'
    },
    {
      name: 'Resource Planning',
      description: 'Manage business resources.'
    },
    {
      name: 'Team Management',
      description: 'Manage team members.'
    },
    {
      name: 'Expense Tracker',
      description: 'Track business expenses.'
    },
    {
      name: 'Meeting Scheduler',
      description: 'Organize business meetings.'
    },
    {
      name: 'Document Manager',
      description: 'Store and organize files.'
    }
  ];

  const renderToolContent = (toolName: string) => {
    switch (toolName) {
      case 'Invoice Generator':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Client Name" 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50"
              />
              <input 
                type="text" 
                placeholder="Invoice #" 
                className="w-32 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="space-y-2">
              {[
                { item: 'Consulting Services', amount: 1500 },
                { item: 'Project Management', amount: 2000 }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <span className="text-white">{item.item}</span>
                  <span className="text-purple-400">${item.amount}</span>
                </div>
              ))}
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
              Generate Invoice
            </button>
          </div>
        );

      case 'Expense Tracker':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                <div className="text-gray-400">Total Expenses</div>
                <div className="text-white text-lg">$8,750</div>
                <div className="text-sm text-purple-400">This Month</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                <div className="text-gray-400">Budget</div>
                <div className="text-white text-lg">$10,000</div>
                <div className="text-sm text-purple-400">87.5% Used</div>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { category: 'Office Supplies', amount: 250 },
                { category: 'Software', amount: 500 },
                { category: 'Marketing', amount: 2000 }
              ].map((expense, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <span className="text-white">{expense.category}</span>
                  <span className="text-purple-400">${expense.amount}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Project Management':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <select className="px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50">
                <option>Active Projects</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
                New Project
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Website Redesign', progress: 75, status: 'On Track' },
                { name: 'Mobile App', progress: 45, status: 'Delayed' }
              ].map((project, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white">{project.name}</span>
                    <span className="text-purple-400">{project.status}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div 
                      className="bg-purple-500 h-full rounded-full" 
                      style={{width: `${project.progress}%`}}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Team Management':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { name: 'Alice', role: 'Designer', status: 'Active' },
                { name: 'Bob', role: 'Developer', status: 'Away' },
                { name: 'Charlie', role: 'Manager', status: 'Meeting' }
              ].map((member, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="text-white">{member.name}</div>
                  <div className="text-gray-400 text-sm">{member.role}</div>
                  <div className="text-purple-400 text-sm mt-1">{member.status}</div>
                </div>
              ))}
            </div>
            <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
              Manage Team
            </button>
          </div>
        );

      case 'Financial Dashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Revenue', value: '$45,000', change: '+12%' },
                { label: 'Expenses', value: '$28,500', change: '-5%' },
                { label: 'Profit', value: '$16,500', change: '+15%' },
                { label: 'Cash Flow', value: '$8,200', change: '+8%' }
              ].map((metric, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  <div className="text-white text-lg font-bold">{metric.value}</div>
                  <div className="text-purple-400 text-sm">{metric.change}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Client CRM':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Search clients..." 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50"
              />
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
                Add Client
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Acme Corp', status: 'Active', value: '$50,000' },
                { name: 'TechStart', status: 'Prospect', value: '$25,000' }
              ].map((client, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white">{client.name}</div>
                      <div className="text-gray-400 text-sm">{client.status}</div>
                    </div>
                    <div className="text-purple-400">{client.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Document Manager':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <select className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50">
                <option>All Documents</option>
                <option>Contracts</option>
                <option>Proposals</option>
                <option>Reports</option>
              </select>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
                Upload
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Q2 Report.pdf', type: 'PDF', size: '2.5 MB' },
                { name: 'Contract_v2.docx', type: 'Word', size: '1.8 MB' }
              ].map((doc, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div>
                    <div className="text-white">{doc.name}</div>
                    <div className="text-gray-400 text-sm">{doc.type}</div>
                  </div>
                  <div className="text-purple-400">{doc.size}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Meeting Scheduler':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Meeting Title" 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50"
              />
              <input 
                type="date" 
                className="w-40 px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50"
              />
            </div>
            <div className="space-y-2">
              {[
                { title: 'Team Sync', time: '10:00 AM', attendees: 5 },
                { title: 'Client Meeting', time: '2:30 PM', attendees: 3 }
              ].map((meeting, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white">{meeting.title}</div>
                      <div className="text-gray-400 text-sm">{meeting.time}</div>
                    </div>
                    <div className="text-purple-400">{meeting.attendees} attendees</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Business Analytics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Sales Growth', value: '+23%', period: 'YoY' },
                { label: 'Customer Retention', value: '85%', period: 'Last 12m' },
                { label: 'Market Share', value: '12%', period: 'Current' },
                { label: 'ROI', value: '156%', period: 'Annual' }
              ].map((metric, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  <div className="text-white text-lg font-bold">{metric.value}</div>
                  <div className="text-purple-400 text-sm">{metric.period}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Resource Planning':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <select className="px-3 py-2 rounded-lg bg-gray-800/50 border border-purple-500/20 text-white focus:outline-none focus:border-purple-500/50">
                <option>All Resources</option>
                <option>Equipment</option>
                <option>Personnel</option>
                <option>Facilities</option>
              </select>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-white transition-colors">
                Add Resource
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Conference Room A', status: 'Available', utilization: '75%' },
                { name: 'Development Team', status: 'Allocated', utilization: '90%' }
              ].map((resource, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-purple-500/10">
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <div className="text-white">{resource.name}</div>
                      <div className="text-gray-400 text-sm">{resource.status}</div>
                    </div>
                    <div className="text-purple-400">{resource.utilization}</div>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div 
                      className="bg-purple-500 h-full rounded-full" 
                      style={{width: resource.utilization}}
                    ></div>
                  </div>
                </div>
              ))}
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
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-cyan-800/10 to-cyan-900/20 backdrop-blur-md" />
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
              color: 'rgba(34, 211, 238, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as any}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-cyan-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Business Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-cyan-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-cyan-300/60">Streamline your business operations</p>
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
                bg-gradient-to-br from-cyan-900/30 via-cyan-800/20 to-cyan-900/30
                p-6 rounded-xl
                border border-cyan-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-cyan-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-cyan-400/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-cyan-100/70 group-hover:text-cyan-50/90 transition-colors duration-500">
                  {tool.description}
                </p>
              </div>

              {/* Magical effects */}
              {hoveredTool === tool.name && (
                <>
                  <div className="absolute -top-2 -right-2 animate-sparkle">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                    <Sparkles className="h-3 w-3 text-cyan-400" />
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
