import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface PaymentFormProps {
  onSuccess: () => void;
  error?: string;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onSuccess, error: propError }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(propError || null);
  const { user } = useAuth();

  const handleStartSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3001/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId: user?.uid,
          success_url: window.location.origin + '/success?session_id={CHECKOUT_SESSION_ID}',
          cancel_url: window.location.origin + '/canceled',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl rounded-lg p-8">
        <div className="space-y-6">
          {/* Plan Header */}
          <div className="text-center">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
              Pro Plan
            </h3>
            <div className="mt-4 flex items-center justify-center">
              <span className="text-5xl font-bold text-white">$20</span>
              <span className="text-gray-400 ml-2">/month</span>
            </div>
            <p className="mt-2 text-purple-400 font-medium">
              7 days free trial
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Features List */}
          <ul className="space-y-4">
            <li className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Access to all AI tools
            </li>
            <li className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Unlimited generations
            </li>
            <li className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Priority support
            </li>
            <li className="flex items-center text-gray-300">
              <svg className="w-5 h-5 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </li>
          </ul>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-md">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleStartSubscription}
            disabled={loading}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-200 
              ${loading 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 hover:from-blue-500 hover:via-purple-500 hover:to-green-500 transform hover:scale-[1.02]'
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Processing...
              </div>
            ) : (
              'Start 7-Day Free Trial'
            )}
          </button>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-400">
              Try free for 7 days, then $20/month
            </p>
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-gray-400">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;