import React from 'react';
import { useAuth } from '../hooks/useAuth';
import DashboardSidebar from '../components/DashboardSidebar';
import ToolsSection from '../components/ToolsSection/ToolsSection';
import { Activity, Users, DollarSign, Sparkles } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();

  const stats = [
    { name: 'Active Projects', value: '12', icon: Activity, change: '+2.5%', changeType: 'increase' },
    { name: 'Team Members', value: '4', icon: Users, change: '+3', changeType: 'increase' },
    { name: 'Monthly Cost', value: '$20', icon: DollarSign, change: '0%', changeType: 'neutral' },
    { name: 'Magic Points', value: '1,234', icon: Sparkles, change: '+150', changeType: 'increase' }
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      <DashboardSidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-white">Welcome back, {user?.email}</h1>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 transition-colors">
                  View Tutorials
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-lg text-white hover:opacity-90 transition-opacity">
                  Upgrade Plan
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="bg-white/5 backdrop-blur-lg overflow-hidden rounded-lg border border-white/10 p-5"
                >
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <stat.icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-400 truncate">
                          {stat.name}
                        </dt>
                        <dd>
                          <div className="text-lg font-medium text-white">
                            {stat.value}
                          </div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className={`mt-4 flex items-center text-sm ${
                    stat.changeType === 'increase' ? 'text-green-400' : 
                    stat.changeType === 'decrease' ? 'text-red-400' : 
                    'text-gray-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>

            {/* Tools Section */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-white mb-6">All Tools</h2>
              <ToolsSection />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}