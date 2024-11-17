import React from 'react';
import { Menu, X, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed w-full bg-black/10 backdrop-blur-lg border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Wand2 className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text">
                MagicaSuite
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">Testimonials</a>
            <Link to="/signin" className="text-gray-300 hover:text-white transition-colors">Sign In</Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/90 backdrop-blur-lg">
            <a href="#features" className="block px-3 py-2 text-gray-300 hover:text-white">Features</a>
            <a href="#pricing" className="block px-3 py-2 text-gray-300 hover:text-white">Pricing</a>
            <a href="#testimonials" className="block px-3 py-2 text-gray-300 hover:text-white">Testimonials</a>
            <Link to="/signin" className="block px-3 py-2 text-gray-300 hover:text-white">Sign In</Link>
            <Link
              to="/signup"
              className="block px-3 py-2 text-white bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-lg font-medium"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}