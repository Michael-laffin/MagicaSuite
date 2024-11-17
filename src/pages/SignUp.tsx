import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import AuthLayout from '../components/AuthLayout';
import SignUpForm from '../components/SignUp/SignUpForm';
import PaymentForm from '../components/SignUp/PaymentForm';
import UserInfoForm from '../components/SignUp/UserInfoForm';

type SignUpStep = 'account' | 'info' | 'payment';

interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  company?: string;
}

export default function SignUp() {
  const [step, setStep] = useState<SignUpStep>('account');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<UserData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: ''
  });
  const navigate = useNavigate();

  const handleAccountSubmit = async (email: string, password: string) => {
    try {
      // Attempt to create the Firebase account first
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // If successful, update the local state
      setUserData(prev => ({ ...prev, email, password }));
      setStep('info');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please try signing in instead.');
      } else if (err.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters long.');
      } else {
        setError('Could not create account. Please try again.');
      }
    }
  };

  const handleUserInfoSubmit = async (info: { firstName: string; lastName: string; company?: string }) => {
    try {
      // Update the user profile with additional information
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: `${info.firstName} ${info.lastName}`
        });
      }

      // Update local state
      setUserData(prev => ({ ...prev, ...info }));
      setStep('payment');
    } catch (err) {
      setError('Could not update profile information. Please try again.');
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      navigate('/dashboard');
    } catch (err) {
      setError('Could not complete signup');
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white">{step === 'account' ? 'Create your account' : step === 'info' ? 'Tell us about yourself' : 'Start your free trial'}</h2>
          <p className="mt-2 text-gray-400">
            {step === 'account' && 'Enter your email to get started'}
            {step === 'info' && 'Help us personalize your experience'}
            {step === 'payment' && '7 days free, then $20/month'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-white">
              Step {step === 'account' ? '1' : step === 'info' ? '2' : '3'} of 3
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: step === 'account' ? '33%' : step === 'info' ? '66%' : '100%'
              }}
            />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-md">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {step === 'account' && (
          <SignUpForm onSubmit={handleAccountSubmit} />
        )}

        {step === 'info' && (
          <UserInfoForm onSubmit={handleUserInfoSubmit} />
        )}

        {step === 'payment' && (
          <PaymentForm onSuccess={handlePaymentSuccess} error={error} />
        )}
      </div>
    </AuthLayout>
  );
}