import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';

interface SignUpFormProps {
  onSubmit: (email: string, password: string) => void;
  error?: string;
}

export default function SignUpForm({ onSubmit, error }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-md text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full border border-white/10 rounded-md shadow-sm bg-white/5 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full border border-white/10 rounded-md shadow-sm bg-white/5 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Continue
        </button>
      </form>

      <div className="text-sm text-center">
        <span className="text-gray-400">Already have an account? </span>
        <Link to="/signin" className="font-medium text-purple-400 hover:text-purple-300">
          Sign in
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="w-full inline-flex justify-center py-2 px-4 border border-white/10 rounded-md shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10">
          <Mail className="h-5 w-5" />
        </button>
        <button className="w-full inline-flex justify-center py-2 px-4 border border-white/10 rounded-md shadow-sm bg-white/5 text-sm font-medium text-white hover:bg-white/10">
          <Github className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}