import React from 'react';
import { Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.2),transparent_70%),radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.2),transparent_70%)]" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <Link to="/" className="flex items-center justify-center space-x-2">
          <Wand2 className="h-12 w-12 text-purple-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
            MagicaSuite
          </span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="bg-white/5 backdrop-blur-lg py-8 px-4 shadow-xl border border-white/10 sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}