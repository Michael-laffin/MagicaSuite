import React from 'react';
import { useAuth } from '../hooks/useAuth';
import SubscriptionManager from '../components/SubscriptionManager';

const Settings: React.FC = () => {
  const { user } = useAuth();

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
