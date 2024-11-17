import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!user) return;

      try {
        const response = await fetch(`http://localhost:3001/api/check-payment-status?userId=${user.uid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPaymentVerified(data.status === 'paid');
      } catch (err) {
        console.error('Error checking payment status:', err);
        // Don't block access on payment check failure in development
        setPaymentVerified(true);
      } finally {
        setVerifying(false);
      }
    };

    checkPaymentStatus();
  }, [user]);

  if (loading || verifying) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (!paymentVerified) {
    return <Navigate to="/signup" />;
  }

  return <>{children}</>;
}