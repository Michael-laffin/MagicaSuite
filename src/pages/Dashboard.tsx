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

interface SubscriptionStatus {
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'canceling' | 'none';
  currentPeriodEnd?: string;
}

function DashboardHome({ user, stats }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionStatus>({ status: 'none' });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchSubscriptionStatus();
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      if (!user) return;
      
      // Get a fresh token
      const token = await user.getIdToken(true);
      const response = await fetch('/api/subscription-status', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch subscription status');
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load subscription status');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionAction = async (action: 'cancel' | 'reactivate' | 'portal') => {
    try {
      setLoading(true);
      const token = await user.getIdToken(true);
      const response = await fetch('/api/manage-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to manage subscription');
      }

      const data = await response.json();

      if (action === 'portal') {
        window.location.href = data.url;
        return;
      }

      await fetchSubscriptionStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to manage subscription');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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

        {/* Subscription Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
          <div className="mb-4">
            <p className="text-gray-600">
              Status:{' '}
              <span className="font-medium">
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </span>
            </p>
            {subscription.currentPeriodEnd && (
              <p className="text-gray-600">
                Current Period End:{' '}
                <span className="font-medium">
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </span>
              </p>
            )}
          </div>

          <div className="space-x-4">
            {subscription.status === 'active' && (
              <>
                <button
                  onClick={() => handleSubscriptionAction('cancel')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  disabled={loading}
                >
                  Cancel Subscription
                </button>
                <button
                  onClick={() => handleSubscriptionAction('portal')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  disabled={loading}
                >
                  Manage Billing
                </button>
              </>
            )}

            {subscription.status === 'canceling' && (
              <button
                onClick={() => handleSubscriptionAction('reactivate')}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                disabled={loading}
              >
                Reactivate Subscription
              </button>
            )}

            {subscription.status === 'none' && (
              <button
                onClick={() => navigate('/pricing')}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                disabled={loading}
              >
                View Plans
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Dashboard({ activeCategory }: { activeCategory?: string }) {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    activeProjects: 0,
    projectsChange: 0,
    teamMembers: 0,
    teamChange: 0,
    monthlyCost: 0,
    costChange: 0,
    magicPoints: 0,
    pointsChange: 0,
    tasksCompleted: 0,
    tasksChange: 0,
    timeSaved: 0,
    timeChange: 0,
    aiCredits: 0,
    creditsChange: 0,
    storageUsed: 0,
    storageChange: 0
  });

  useEffect(() => {
    if (!user) return;
    fetchStats();
  }, [user]);

  const fetchStats = async () => {
    try {
      const token = await user.getIdToken(true);
      const response = await fetch('/api/user-stats', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to fetch stats');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  };

  const renderCategory = () => {
    switch (activeCategory) {
      case 'productivity':
        return <Productivity />;
      case 'marketing':
        return <Marketing />;
      case 'business':
        return <Business />;
      case 'creativity':
        return <Creativity />;
      case 'analytics':
        return <Analytics />;
      case 'tech':
        return <Tech />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardHome user={user} stats={[
          { 
            name: 'Active Projects', 
            value: stats.activeProjects.toString(), 
            icon: Activity, 
            change: `${stats.projectsChange > 0 ? '+' : ''}${stats.projectsChange}%`,
            changeType: stats.projectsChange > 0 ? 'increase' : stats.projectsChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Team Members', 
            value: stats.teamMembers.toString(), 
            icon: Users, 
            change: `${stats.teamChange > 0 ? '+' : ''}${stats.teamChange}`,
            changeType: stats.teamChange > 0 ? 'increase' : stats.teamChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Monthly Cost', 
            value: `$${stats.monthlyCost}`, 
            icon: DollarSign, 
            change: `${stats.costChange > 0 ? '+' : ''}${stats.costChange}%`,
            changeType: stats.costChange > 0 ? 'decrease' : stats.costChange < 0 ? 'increase' : 'neutral'
          },
          { 
            name: 'Magic Points', 
            value: stats.magicPoints.toLocaleString(), 
            icon: Sparkles, 
            change: `${stats.pointsChange > 0 ? '+' : ''}${stats.pointsChange}`,
            changeType: stats.pointsChange > 0 ? 'increase' : stats.pointsChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Tasks Completed', 
            value: stats.tasksCompleted.toString(), 
            icon: CheckSquare, 
            change: `${stats.tasksChange > 0 ? '+' : ''}${stats.tasksChange}`,
            changeType: stats.tasksChange > 0 ? 'increase' : stats.tasksChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Time Saved', 
            value: `${stats.timeSaved}h`, 
            icon: Clock, 
            change: `${stats.timeChange > 0 ? '+' : ''}${stats.timeChange}h`,
            changeType: stats.timeChange > 0 ? 'increase' : stats.timeChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'AI Credits', 
            value: stats.aiCredits.toString(), 
            icon: Zap, 
            change: `${stats.creditsChange > 0 ? '+' : ''}${stats.creditsChange}`,
            changeType: stats.creditsChange > 0 ? 'increase' : stats.creditsChange < 0 ? 'decrease' : 'neutral'
          },
          { 
            name: 'Storage Used', 
            value: `${stats.storageUsed}GB`, 
            icon: HardDrive, 
            change: `${stats.storageChange > 0 ? '+' : ''}${stats.storageChange}GB`,
            changeType: stats.storageChange > 0 ? 'decrease' : stats.storageChange < 0 ? 'increase' : 'neutral'
          }
        ]} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {renderCategory()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;