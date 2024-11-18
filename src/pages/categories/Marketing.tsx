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
    switch (toolName) {
      case 'Social Media Manager':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <select className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50">
                <option value="facebook">Facebook</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
                <option value="linkedin">LinkedIn</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
                Post
              </button>
            </div>
            <textarea 
              placeholder="Write your post..." 
              className="w-full h-[100px] px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50 resize-none"
            ></textarea>
            <div className="flex justify-between items-center">
              <button className="text-blue-400 hover:text-blue-300">
                Schedule
              </button>
              <div className="flex space-x-2">
                <button className="text-blue-400 hover:text-blue-300">Image</button>
                <button className="text-blue-400 hover:text-blue-300">Link</button>
              </div>
            </div>
          </div>
        );

      case 'Email Campaigns':
        return (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Campaign Name" 
              className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
                <span className="text-white">Welcome Series</span>
                <div className="text-blue-400">32% Open Rate</div>
              </div>
              <div className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
                <span className="text-white">Newsletter</span>
                <div className="text-blue-400">28% Open Rate</div>
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
              Create Campaign
            </button>
          </div>
        );

      case 'Analytics Dashboard':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Page Views', value: '12.5K', change: '+8%' },
                { label: 'Conversions', value: '234', change: '+12%' },
                { label: 'Engagement', value: '67%', change: '+5%' },
                { label: 'Click Rate', value: '3.2%', change: '+2%' }
              ].map((metric, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  <div className="text-white text-lg font-bold">{metric.value}</div>
                  <div className="text-blue-400 text-sm">{metric.change}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Content Calendar':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <select className="px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50">
                <option>This Week</option>
                <option>Next Week</option>
                <option>This Month</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
                Add Event
              </button>
            </div>
            <div className="space-y-2">
              {[
                { day: 'Mon', content: 'Blog Post: Marketing Tips' },
                { day: 'Wed', content: 'Social Media Campaign' },
                { day: 'Fri', content: 'Email Newsletter' }
              ].map((item, i) => (
                <div key={i} className="flex items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
                  <div className="w-16 text-blue-400">{item.day}</div>
                  <div className="text-white">{item.content}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'SEO Optimizer':
        return (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter URL to analyze..." 
              className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50"
            />
            <div className="space-y-2">
              {[
                { aspect: 'Meta Title', status: 'Good' },
                { aspect: 'Meta Description', status: 'Needs Improvement' },
                { aspect: 'Keywords', status: 'Good' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
                  <span className="text-white">{item.aspect}</span>
                  <span className={item.status === 'Good' ? 'text-green-400' : 'text-yellow-400'}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Ad Manager':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <select className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50">
                <option>Facebook Ads</option>
                <option>Google Ads</option>
                <option>LinkedIn Ads</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
                Create Ad
              </button>
            </div>
            <div className="space-y-2">
              {[
                { campaign: 'Summer Sale', budget: '$500', status: 'Active' },
                { campaign: 'Product Launch', budget: '$1000', status: 'Scheduled' }
              ].map((ad, i) => (
                <div key={i} className="p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{ad.campaign}</span>
                    <span className="text-blue-400">{ad.budget}</span>
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{ad.status}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Lead Generator':
        return (
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-800/30 border border-blue-500/10">
              <h3 className="text-white font-semibold mb-2">Active Forms</h3>
              <div className="space-y-2">
                {[
                  { name: 'Newsletter Signup', conversions: 45 },
                  { name: 'Free Trial', conversions: 23 },
                  { name: 'Contact Form', conversions: 12 }
                ].map((form, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-300">{form.name}</span>
                    <span className="text-blue-400">{form.conversions} leads</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
              Create New Form
            </button>
          </div>
        );

      case 'Brand Kit':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
                <div className="text-white mb-2">Colors</div>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-600"></div>
                  <div className="w-6 h-6 rounded-full bg-blue-700"></div>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
                <div className="text-white mb-2">Fonts</div>
                <div className="text-gray-300 text-sm">Inter, Roboto</div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
              <div className="text-white mb-2">Logo</div>
              <div className="h-16 bg-gray-700/50 rounded flex items-center justify-center">
                <span className="text-blue-400">Upload Logo</span>
              </div>
            </div>
          </div>
        );

      case 'Competitor Analysis':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input 
                type="text" 
                placeholder="Add competitor URL..." 
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50"
              />
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
                Add
              </button>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Competitor A', traffic: '50K', ranking: 12 },
                { name: 'Competitor B', traffic: '35K', ranking: 15 }
              ].map((competitor, i) => (
                <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
                  <div className="flex justify-between items-center">
                    <span className="text-white">{competitor.name}</span>
                    <span className="text-blue-400">Rank #{competitor.ranking}</span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    Monthly Traffic: {competitor.traffic}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Marketing ROI':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
                <div className="text-gray-400">Total Spend</div>
                <div className="text-white text-lg">$12,500</div>
                <div className="text-sm text-blue-400">This Month</div>
              </div>
              <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
                <div className="text-gray-400">Revenue</div>
                <div className="text-white text-lg">$45,000</div>
                <div className="text-sm text-blue-400">This Month</div>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
              <div className="flex justify-between items-center">
                <span className="text-white">ROI</span>
                <span className="text-green-400">360%</span>
              </div>
              <div className="mt-2 bg-gray-700 h-2 rounded-full">
                <div className="bg-blue-500 h-full rounded-full" style={{width: '78%'}}></div>
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
