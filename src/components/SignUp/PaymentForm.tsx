import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

interface PaymentFormProps {
  onSuccess: () => void;
  error?: string;
}

export default function PaymentForm({ onSuccess, error }: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="bg-white/5 p-4 rounded-lg space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-300">MagicaSuite Pro</span>
          <span className="text-sm font-medium text-white">$20/month</span>
        </div>
        <div className="text-xs text-gray-400">
          First 7 days free, cancel anytime
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="card" className="block text-sm font-medium text-gray-300">
            Card number
          </label>
          <input
            id="card"
            type="text"
            required
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="mt-1 block w-full border border-white/10 rounded-md shadow-sm bg-white/5 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="expiry" className="block text-sm font-medium text-gray-300">
              Expiry date
            </label>
            <input
              id="expiry"
              type="text"
              required
              placeholder="MM/YY"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="mt-1 block w-full border border-white/10 rounded-md shadow-sm bg-white/5 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-300">
              CVC
            </label>
            <input
              id="cvc"
              type="text"
              required
              placeholder="123"
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              className="mt-1 block w-full border border-white/10 rounded-md shadow-sm bg-white/5 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
              <span>Processing...</span>
            </div>
          ) : (
            'Start Free Trial'
          )}
        </button>
      </form>

      <div className="text-xs text-gray-400 text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy.
        Your free trial will begin today and end in 7 days.
      </div>
    </div>
  );
}