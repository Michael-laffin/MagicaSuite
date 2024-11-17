import { useState, useEffect } from 'react';

// All tools from different categories
const allTools = [
  {
    name: 'Task Manager',
    category: 'Productivity',
    description: 'Create, organize, and prioritize tasks with deadlines and reminders.',
    icon: 'Clock',
    bgColor: 'from-blue-500 to-indigo-600',
    stats: { users: '2.3k', rating: '4.8', tasks: '15k+' }
  },
  {
    name: 'Social Media Scheduler',
    category: 'Marketing',
    description: 'Schedule and post to multiple platforms with smart recommendations.',
    icon: 'Megaphone',
    bgColor: 'from-purple-500 to-pink-600',
    stats: { posts: '5k+', platforms: '8', users: '1.2k' }
  },
  {
    name: 'Invoice Generator',
    category: 'Business',
    description: 'Create professional invoices with customizable templates and tracking.',
    icon: 'Briefcase',
    bgColor: 'from-emerald-500 to-teal-600',
    stats: { invoices: '10k+', templates: '25+', saved: '$500k' }
  },
  {
    name: 'AI Content Writer',
    category: 'Creativity',
    description: 'Generate engaging content with advanced AI technology.',
    icon: 'Palette',
    bgColor: 'from-orange-500 to-red-600',
    stats: { words: '1M+', topics: '100+', users: '3.2k' }
  },
  {
    name: 'Website Analytics',
    category: 'Analytics',
    description: 'Track and analyze your website performance with real-time insights.',
    icon: 'BarChart',
    bgColor: 'from-cyan-500 to-blue-600',
    stats: { sites: '5k+', metrics: '50+', reports: '100k+' }
  },
  {
    name: 'Code Snippet Library',
    category: 'Tech',
    description: 'Store and organize your code snippets with smart search and sharing.',
    icon: 'Code',
    bgColor: 'from-gray-700 to-gray-900',
    stats: { snippets: '25k+', languages: '30+', shares: '10k+' }
  }
];

// Function to get random tools
const getRandomTools = (count: number = 3) => {
  const shuffled = [...allTools].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const useFeaturedTools = () => {
  const [featuredTools, setFeaturedTools] = useState(getRandomTools());

  useEffect(() => {
    // Update featured tools every hour
    const interval = setInterval(() => {
      setFeaturedTools(getRandomTools(3)); // Return only three featured tools
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    return () => clearInterval(interval);
  }, []);

  return featuredTools;
};