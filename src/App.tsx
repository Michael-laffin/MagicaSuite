import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import { Sparkles, ArrowRight, CheckCircle2, Star, Users, Wand2, Check } from 'lucide-react';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import ParticleBackground from './components/ParticleBackground';

function HomePage() {
  const features = [
    {
      icon: Wand2,
      title: "60+ Magical Tools",
      description: "Access our complete suite of productivity, marketing, and business tools."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team members across all tools."
    },
    {
      icon: Star,
      title: "Premium Support",
      description: "Get 24/7 support from our expert team whenever you need help."
    }
  ];

  const testimonials = [
    {
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Sarah Thompson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "MagicaSuite has transformed how we handle our marketing tasks. The tools are intuitive and powerful."
    },
    {
      avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Michael Chen",
      role: "Startup Founder",
      company: "InnovateLab",
      content: "The all-in-one solution we've been looking for. Worth every penny and more."
    },
    {
      avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      name: "Emily Rodriguez",
      role: "Product Manager",
      company: "DesignPro",
      content: "The productivity tools alone have saved us countless hours. Highly recommended!"
    }
  ];

  const faqs = [
    {
      question: "What's included in my subscription?",
      answer: "Your subscription includes unlimited access to all 60+ tools across our six categories, premium support, and regular updates with new features."
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! We offer a 7-day free trial so you can explore all our tools and features without any commitment."
    },
    {
      question: "Do you offer team accounts?",
      answer: "Currently, each subscription is for individual use. Team and enterprise plans are coming soon!"
    }
  ];

  return (
    <>
      <Navigation />
      <ParticleBackground />
      
      {/* Hero Section */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animated-gradient opacity-20" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 floating">
              <Sparkles className="h-4 w-4 text-purple-400 mr-2" />
              <span className="text-sm font-medium">Unlock the Magic of Productivity</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text animate-pulse">
              60 Tools. Endless Possibilities.
            </h1>
            
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Transform your workflow with our comprehensive suite of magical tools. 
              All for just $20/month.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="group px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white font-medium relative overflow-hidden transform hover:scale-105 transition-all duration-300 glow"
              >
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative flex items-center">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
              <a
                href="#features"
                className="px-8 py-4 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium transition-all duration-300 hover:scale-105"
              >
                Explore Features
              </a>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
              {[
                { label: 'Magical Tools', value: '60+', gradient: 'from-blue-400 to-purple-400' },
                { label: 'Happy Users', value: '10k+', gradient: 'from-purple-400 to-green-400' },
                { label: 'Support', value: '24/7', gradient: 'from-green-400 to-blue-400' }
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative border border-white/10 rounded-lg p-6 backdrop-blur-sm transform group-hover:scale-105 transition-transform duration-300">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-400 mt-2">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our powerful suite of tools designed to enhance your productivity and streamline your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8 glow">
                  <feature.icon className="h-12 w-12 text-purple-400 mb-6 transform group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              One plan, all features. Start your 7-day free trial today.
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-2xl transform rotate-1 scale-105 opacity-20 blur-xl" />
              <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h3 className="text-2xl font-bold text-white">Pro Plan</h3>
                    <p className="text-gray-400">All features included</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">$20</div>
                    <div className="text-gray-400">per month</div>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {[
                    'Access to all 60+ tools',
                    'Unlimited usage',
                    'Premium support',
                    'Regular updates',
                    '7-day free trial'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-3" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="/signup"
                  className="block w-full text-center px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 text-white font-medium relative overflow-hidden transform hover:scale-105 transition-all duration-300"
                >
                  Start Your Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text mb-4">
              Loved by Professionals
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what our users have to say about MagicaSuite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-8">
                  <div className="flex items-center mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</div>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 text-transparent bg-clip-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="group relative transform hover:scale-105 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-green-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-900 text-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/dashboard/*"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;