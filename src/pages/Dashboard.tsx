import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import DashboardSidebar from '../components/DashboardSidebar';
import FeaturedTools from '../components/FeaturedTools';
import ToolsSection from '../components/ToolsSection/ToolsSection';
import { Activity, Users, DollarSign, Sparkles, CheckSquare, Clock, Zap, HardDrive, LogOut } from 'lucide-react';
import Productivity from './categories/Productivity';
import Marketing from './categories/Marketing';
import Business from './categories/Business';
import Creativity from './categories/Creativity';
import Analytics from './categories/Analytics';
import Tech from './categories/Tech';
import Settings from './Settings';

function DashboardHome({ user, stats }) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative py-6">
      {/* Animated Background */}
      <div className="absolute inset-0 animated-gradient opacity-10" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
              Welcome back, {user?.email}
            </h1>
            <p className="text-gray-400 mt-2">Your magical workspace awaits</p>
          </div>
          <button
            onClick={handleSignOut}
            className="group px-4 py-2 bg-white/5 hover:bg-red-500/20 rounded-lg text-gray-300 hover:text-red-300 transition-all duration-300 backdrop-blur-sm border border-white/10 flex items-center space-x-2"
          >
            <LogOut className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.slice(0, 4).map((stat) => (
            <div
              key={stat.name}
              className="bg-white/5 backdrop-blur-lg overflow-hidden rounded-xl border border-white/10 p-6 hover:bg-white/10 transition-colors shadow-xl shadow-black/10"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-lg">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd>
                      <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
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

        {/* Featured Tools Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text mb-6">
            Featured Tools
          </h2>
          <FeaturedTools />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState([
    { name: 'Active Projects', value: '0', icon: Activity, change: '0%', changeType: 'neutral' },
    { name: 'Team Members', value: '0', icon: Users, change: '0', changeType: 'neutral' },
    { name: 'Monthly Cost', value: '$0', icon: DollarSign, change: '0%', changeType: 'neutral' },
    { name: 'Magic Points', value: '0', icon: Sparkles, change: '0', changeType: 'neutral' },
    { name: 'Tasks Completed', value: '0', icon: CheckSquare, change: '0', changeType: 'neutral' },
    { name: 'Time Saved', value: '0h', icon: Clock, change: '0h', changeType: 'neutral' },
    { name: 'AI Credits', value: '0', icon: Zap, change: '0', changeType: 'neutral' },
    { name: 'Storage Used', value: '0GB', icon: HardDrive, change: '0GB', changeType: 'neutral' }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;
      
      try {
        const response = await fetch(`http://localhost:3001/api/user-stats?userId=${user.uid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch stats');
        }
        
        const data = await response.json();
        setStats([
          { 
            name: 'Active Projects', 
            value: data.activeProjects.toString(), 
            icon: Activity, 
            change: `${data.projectsChange > 0 ? '+' : ''}${data.projectsChange}%`,
            changeType: data.projectsChange > 0 ? 'increase' : data.projectsChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Team Members', 
            value: data.teamMembers.toString(), 
            icon: Users, 
            change: `${data.teamChange > 0 ? '+' : ''}${data.teamChange}`,
            changeType: data.teamChange > 0 ? 'increase' : data.teamChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Monthly Cost', 
            value: `$${data.monthlyCost}`, 
            icon: DollarSign, 
            change: `${data.costChange > 0 ? '+' : ''}${data.costChange}%`,
            changeType: data.costChange > 0 ? 'decrease' : data.costChange < 0 ? 'increase' : 'neutral'
          },
          { 
            name: 'Magic Points', 
            value: data.magicPoints.toLocaleString(), 
            icon: Sparkles, 
            change: `${data.pointsChange > 0 ? '+' : ''}${data.pointsChange}`,
            changeType: data.pointsChange > 0 ? 'increase' : data.pointsChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Tasks Completed', 
            value: data.tasksCompleted.toString(), 
            icon: CheckSquare, 
            change: `${data.tasksChange > 0 ? '+' : ''}${data.tasksChange}`,
            changeType: data.tasksChange > 0 ? 'increase' : data.tasksChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Time Saved', 
            value: `${data.timeSaved}h`, 
            icon: Clock, 
            change: `${data.timeChange > 0 ? '+' : ''}${data.timeChange}h`,
            changeType: data.timeChange > 0 ? 'increase' : data.timeChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'AI Credits', 
            value: data.aiCredits.toString(), 
            icon: Zap, 
            change: `${data.creditsChange > 0 ? '+' : ''}${data.creditsChange}`,
            changeType: data.creditsChange > 0 ? 'increase' : data.creditsChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Storage Used', 
            value: `${data.storageUsed}GB`, 
            icon: HardDrive, 
            change: `${data.storageChange > 0 ? '+' : ''}${data.storageChange}GB`,
            changeType: data.storageChange > 0 ? 'decrease' : data.storageChange < 0 ? 'increase' : 'neutral'
          }
        ]);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <div className="flex h-screen bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 animated-gradient opacity-5" />
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto relative">
        <Routes>
          <Route index element={<DashboardHome user={user} stats={stats} />} />
          <Route path="productivity" element={<Productivity />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="business" element={<Business />} />
          <Route path="creativity" element={<Creativity />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="tech" element={<Tech />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}