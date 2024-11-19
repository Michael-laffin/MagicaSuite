import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import SubscriptionManager from '../components/SubscriptionManager';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    updates: true,
  });
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  const handleNotificationChange = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev]
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {/* Account Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <p className="text-white">{user?.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">User ID</label>
              <p className="text-white">{user?.uid}</p>
            </div>
            <div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Email Notifications</label>
              <button 
                onClick={() => handleNotificationChange('email')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.email ? 'bg-blue-600' : 'bg-gray-600'
                } relative`}
              >
                <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.email ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Desktop Notifications</label>
              <button 
                onClick={() => handleNotificationChange('desktop')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.desktop ? 'bg-blue-600' : 'bg-gray-600'
                } relative`}
              >
                <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.desktop ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Product Updates</label>
              <button 
                onClick={() => handleNotificationChange('updates')}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications.updates ? 'bg-blue-600' : 'bg-gray-600'
                } relative`}
              >
                <span className={`block w-4 h-4 bg-white rounded-full transition-transform ${
                  notifications.updates ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Appearance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Theme</label>
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Language</label>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </div>

        {/* Subscription Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Subscription</h2>
          <SubscriptionManager />
        </div>
      </div>
    </div>
  );
};

export default Settings;
