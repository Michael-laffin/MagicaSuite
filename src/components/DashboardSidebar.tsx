import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Wand2,
  Settings,
  BarChart,
  FileText,
  Image,
  MessageSquare,
  Code,
  LogOut
} from 'lucide-react';
import { auth } from '../lib/firebase';

const categories = [
  {
    name: 'Analytics',
    icon: BarChart,
    tools: ['Performance Metrics', 'User Tracking', 'Revenue Analytics']
  },
  {
    name: 'Content',
    icon: FileText,
    tools: ['Blog Writer', 'SEO Optimizer', 'Content Scheduler']
  },
  {
    name: 'Design',
    icon: Image,
    tools: ['Image Generator', 'Logo Maker', 'Banner Designer']
  },
  {
    name: 'Communication',
    icon: MessageSquare,
    tools: ['Email Templates', 'Chat Bot', 'Social Posts']
  },
  {
    name: 'Development',
    icon: Code,
    tools: ['Code Generator', 'API Tester', 'Database Manager']
  }
];

export default function DashboardSidebar() {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <div className="h-screen w-64 bg-gray-900 border-r border-white/10 flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center space-x-2">
          <Wand2 className="h-8 w-8 text-purple-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
            MagicaSuite
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <Link
          to="/dashboard"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg group transition-colors"
        >
          <LayoutDashboard className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
          Overview
        </Link>

        <div className="mt-8">
          <div className="px-3 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Tools
          </div>
          {categories.map((category) => (
            <div key={category.name} className="space-y-1">
              <button
                className="w-full flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg group transition-colors"
              >
                <div className="flex items-center">
                  <category.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
                  <span>{category.name}</span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-white/10">
        <Link
          to="/dashboard/settings"
          className="flex items-center px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg group transition-colors"
        >
          <Settings className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
          Settings
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg group transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-400 group-hover:text-white" />
          Sign out
        </button>
      </div>
    </div>
  );
}