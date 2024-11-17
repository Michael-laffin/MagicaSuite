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
      setUserData(prev => ({ ...prev, email, password }));
      setStep('info');
    } catch (err) {
      setError('Could not create account');
    }
  };

  const handleUserInfoSubmit = async (info: { firstName: string; lastName: string; company?: string }) => {
    try {
      setUserData(prev => ({ ...prev, ...info }));
      setStep('payment');
    } catch (err) {
      setError('Could not save user information');
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      // Create Firebase user
      const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      
      // Update profile with user's name
      await updateProfile(user, {
        displayName: `${userData.firstName} ${userData.lastName}`
      });

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Could not complete registration');
    }
  };

  const getStepContent = () => {
    switch (step) {
      case 'account':
        return (
          <SignUpForm 
            onSubmit={handleAccountSubmit}
            error={error}
          />
        );
      case 'info':
        return (
          <UserInfoForm
            onSubmit={handleUserInfoSubmit}
            error={error}
          />
        );
      case 'payment':
        return (
          <PaymentForm
            onSuccess={handlePaymentSuccess}
            error={error}
          />
        );
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'account':
        return 'Create your account';
      case 'info':
        return 'Tell us about yourself';
      case 'payment':
        return 'Start your free trial';
    }
  };

  const getStepSubtitle = () => {
    switch (step) {
      case 'account':
        return 'Enter your email to get started';
      case 'info':
        return 'Help us personalize your experience';
      case 'payment':
        return '7 days free, then $20/month';
    }
  };

  return (
    <AuthLayout
      title={getStepTitle()}
      subtitle={getStepSubtitle()}
    >
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {['Account', 'Information', 'Payment'].map((label, index) => (
            <div
              key={label}
              className={`text-sm ${
                index <= ['account', 'info', 'payment'].indexOf(step)
                  ? 'text-purple-400'
                  : 'text-gray-400'
              }`}
            >
              {label}
            </div>
          ))}
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transition-all duration-500"
            style={{
              width: `${
                ((['account', 'info', 'payment'].indexOf(step) + 1) / 3) * 100
              }%`,
            }}
          />
        </div>
      </div>

      {getStepContent()}
    </AuthLayout>
  );
}