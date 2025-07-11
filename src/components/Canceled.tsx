import React from 'react';
import { Link } from 'react-router-dom';

const Canceled: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Canceled</h2>
        <p className="text-gray-600 mb-8">
          Your payment was canceled. No charges were made to your account.
        </p>
        <Link
          to="/#pricing"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Pricing
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
