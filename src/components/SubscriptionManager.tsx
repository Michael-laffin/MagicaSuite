import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface SubscriptionStatus {
  active: boolean;
  subscription?: {
    status: string;
    current_period_end: number;
    cancel_at_period_end: boolean;
  };
}

const SubscriptionManager: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.uid) {
      fetchSubscriptionStatus();
    }
  }, [user]);

  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch(`/api/subscription/${user?.uid}`);
      if (!response.ok) throw new Error('Failed to fetch subscription status');
      const data = await response.json();
      setSubscriptionStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-portal-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: user?.uid }),
      });

      if (!response.ok) throw new Error('Failed to create portal session');
      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  const handleStartSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ customerId: user?.uid }),
      });

      if (!response.ok) throw new Error('Failed to create checkout session');
      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Subscription Status</h2>
      
      {subscriptionStatus?.active ? (
        <div>
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Active
            </span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Your subscription is active until{' '}
              {new Date(subscriptionStatus.subscription!.current_period_end * 1000).toLocaleDateString()}
            </p>
            {subscriptionStatus.subscription?.cancel_at_period_end && (
              <p className="text-amber-600 mt-2">
                Your subscription will end at the current period end.
              </p>
            )}
          </div>

          <button
            onClick={handleManageSubscription}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            Manage Subscription
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              Inactive
            </span>
          </div>
          
          <p className="text-gray-600 mb-4">
            You currently don't have an active subscription.
          </p>

          <button
            onClick={handleStartSubscription}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            Start Subscription
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionManager;
