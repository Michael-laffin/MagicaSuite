// Consolidated tool metadata and interfaces

export type CategoryId = 'productivity' | 'marketing' | 'business' | 'creativity' | 'analytics' | 'tech';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  icon: string;
}

export interface FeaturedToolStats {
  [key: string]: string;
}

export interface FeaturedTool {
  name: string;
  category: string;
  description: string;
  icon: string;
  bgColor: string;
  stats: FeaturedToolStats;
}

export interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export interface ToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}

// Categories data
export const categories: Category[] = [
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Tools to help users manage their time, tasks, and workflows.',
    icon: 'Clock'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Tools designed to elevate marketing efforts for businesses.',
    icon: 'Megaphone'
  },
  {
    id: 'business',
    name: 'Business',
    description: 'Essential tools for entrepreneurs and small businesses.',
    icon: 'Briefcase'
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'Tools to ignite creativity and streamline content creation.',
    icon: 'Palette'
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Tools for analyzing and leveraging data effectively.',
    icon: 'BarChart'
  },
  {
    id: 'tech',
    name: 'Tech',
    description: 'Tools for developers, IT professionals, and tech-savvy users.',
    icon: 'Code'
  }
];

// Featured tools data
export const featuredTools: FeaturedTool[] = [
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

// All tools data - Productivity tools
export const tools: Tool[] = [
  // Productivity
  {
    id: 'task-manager',
    name: 'Task Manager',
    description: 'Create, organize, and prioritize tasks with deadlines and reminders.',
    category: 'productivity',
    icon: 'CheckSquare'
  },
  {
    id: 'calendar-sync',
    name: 'Calendar Sync',
    description: 'Sync multiple calendars and manage schedules in one place.',
    category: 'productivity',
    icon: 'Calendar'
  },
  {
    id: 'project-planner',
    name: 'Project Planner',
    description: 'Visualize projects with Gantt charts and timelines.',
    category: 'productivity',
    icon: 'GanttChart'
  },
  {
    id: 'focus-timer',
    name: 'Focus Timer',
    description: 'A Pomodoro timer with customizable work and break intervals.',
    category: 'productivity',
    icon: 'Timer'
  },
  {
    id: 'note-keeper',
    name: 'Note Keeper',
    description: 'Take and organize notes with markdown support.',
    category: 'productivity',
    icon: 'FileText'
  },
  {
    id: 'habit-tracker',
    name: 'Habit Tracker',
    description: 'Track daily habits and set long-term goals.',
    category: 'productivity',
    icon: 'ListChecks'
  },
  {
    id: 'meeting-scheduler',
    name: 'Meeting Scheduler',
    description: 'Simplify scheduling by syncing availability with others.',
    category: 'productivity',
    icon: 'CalendarClock'
  },
  {
    id: 'time-tracker',
    name: 'Time Tracker',
    description: 'Log time spent on tasks and projects for better efficiency.',
    category: 'productivity',
    icon: 'Clock'
  },

  // Marketing
  {
    id: 'social-scheduler',
    name: 'Social Media Scheduler',
    description: 'Schedule posts across multiple social platforms.',
    category: 'marketing',
    icon: 'Calendar'
  },
  {
    id: 'email-campaigns',
    name: 'Email Campaign Manager',
    description: 'Create and send targeted email marketing campaigns.',
    category: 'marketing',
    icon: 'Mail'
  },
  {
    id: 'seo-optimizer',
    name: 'SEO Optimizer',
    description: 'Analyze and improve your website\'s search engine ranking.',
    category: 'marketing',
    icon: 'Search'
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'Plan and organize your content strategy.',
    category: 'marketing',
    icon: 'Calendar'
  },
  {
    id: 'lead-generator',
    name: 'Lead Generator',
    description: 'Find and capture potential customers.',
    category: 'marketing',
    icon: 'Target'
  },
  {
    id: 'ad-creator',
    name: 'Ad Creator',
    description: 'Design compelling advertisements for various platforms.',
    category: 'marketing',
    icon: 'Image'
  },
  {
    id: 'influencer-finder',
    name: 'Influencer Finder',
    description: 'Discover and connect with relevant influencers.',
    category: 'marketing',
    icon: 'Users'
  },
  {
    id: 'brand-monitor',
    name: 'Brand Monitor',
    description: 'Track mentions and sentiment about your brand.',
    category: 'marketing',
    icon: 'Eye'
  },

  // Business
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create professional invoices and track payments.',
    category: 'business',
    icon: 'FileText'
  },
  {
    id: 'expense-tracker',
    name: 'Expense Tracker',
    description: 'Manage and categorize business expenses.',
    category: 'business',
    icon: 'Wallet'
  },
  {
    id: 'customer-crm',
    name: 'Customer CRM',
    description: 'Track customer interactions and manage leads.',
    category: 'business',
    icon: 'Users'
  },
  {
    id: 'proposal-builder',
    name: 'Proposal Builder',
    description: 'Create visually appealing business proposals.',
    category: 'business',
    icon: 'FileText'
  },
  {
    id: 'e-signature',
    name: 'E-Signature Tool',
    description: 'Securely sign and share documents online.',
    category: 'business',
    icon: 'PenTool'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    description: 'Estimate taxes based on income and expenses.',
    category: 'business',
    icon: 'Calculator'
  },

  // Creativity
  {
    id: 'graphic-designer',
    name: 'Graphic Designer',
    description: 'Create simple designs with templates and drag-and-drop tools.',
    category: 'creativity',
    icon: 'Paintbrush'
  },
  {
    id: 'photo-editor',
    name: 'Photo Editor',
    description: 'Edit and enhance images with filters and adjustments.',
    category: 'creativity',
    icon: 'Image'
  },
  {
    id: 'video-maker',
    name: 'Video Maker',
    description: 'Combine clips, add music, and export professional videos.',
    category: 'creativity',
    icon: 'Video'
  },
  {
    id: 'logo-generator',
    name: 'Logo Generator',
    description: 'Generate logo ideas and customize them for branding.',
    category: 'creativity',
    icon: 'Shapes'
  },
  {
    id: 'meme-creator',
    name: 'Meme Creator',
    description: 'Easily create shareable memes with custom text.',
    category: 'creativity',
    icon: 'Sticker'
  },
  {
    id: 'ai-writer',
    name: 'AI Content Writer',
    description: 'Generate blog posts, social captions, and ad copy.',
    category: 'creativity',
    icon: 'Bot'
  },
  {
    id: 'color-palette',
    name: 'Color Palette Picker',
    description: 'Find and save the perfect color combinations.',
    category: 'creativity',
    icon: 'Palette'
  },
  {
    id: 'font-pairing',
    name: 'Font Pairing Tool',
    description: 'Discover great font combinations for designs.',
    category: 'creativity',
    icon: 'Type'
  },
  {
    id: 'audio-editor',
    name: 'Audio Editor',
    description: 'Trim, mix, and edit audio files effortlessly.',
    category: 'creativity',
    icon: 'Music'
  },

  // Analytics
  {
    id: 'web-analytics',
    name: 'Website Analytics',
    description: 'Track website traffic and user behavior.',
    category: 'analytics',
    icon: 'BarChart'
  },
  {
    id: 'kpi-tracker',
    name: 'KPI Tracker',
    description: 'Set and track key performance indicators for projects.',
    category: 'analytics',
    icon: 'Target'
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Compare your metrics to industry competitors.',
    category: 'analytics',
    icon: 'TrendingUp'
  },
  {
    id: 'ab-test',
    name: 'A/B Test Planner',
    description: 'Test variations of ads, designs, and content.',
    category: 'analytics',
    icon: 'SplitSquare'
  },
  {
    id: 'survey-creator',
    name: 'Survey Creator',
    description: 'Build and distribute surveys to collect user feedback.',
    category: 'analytics',
    icon: 'ClipboardList'
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    description: 'Create and share detailed analytics reports.',
    category: 'analytics',
    icon: 'FileBarChart'
  },
  {
    id: 'data-cleaner',
    name: 'Data Cleaner',
    description: 'Organize, sort, and clean messy data sets.',
    category: 'analytics',
    icon: 'Filter'
  },
  {
    id: 'trend-analyzer',
    name: 'Trend Analyzer',
    description: 'Discover emerging trends in your industry.',
    category: 'analytics',
    icon: 'LineChart'
  },

  // Tech
  {
    id: 'code-snippets',
    name: 'Code Snippet Library',
    description: 'Save and reuse frequently used code snippets.',
    category: 'tech',
    icon: 'Code'
  },
  {
    id: 'api-tester',
    name: 'API Tester',
    description: 'Test and debug API endpoints with ease.',
    category: 'tech',
    icon: 'Webhook'
  },
  {
    id: 'database-manager',
    name: 'Database Manager',
    description: 'Manage databases with a visual interface.',
    category: 'tech',
    icon: 'Database'
  },
  {
    id: 'git-interface',
    name: 'Git Interface',
    description: 'Simplified Git operations with a visual interface.',
    category: 'tech',
    icon: 'GitBranch'
  },
  {
    id: 'cloud-console',
    name: 'Cloud Console',
    description: 'Manage cloud resources from a unified dashboard.',
    category: 'tech',
    icon: 'Cloud'
  },
  {
    id: 'terminal',
    name: 'Terminal',
    description: 'Access command line tools directly in your browser.',
    category: 'tech',
    icon: 'Terminal'
  },
  {
    id: 'devops-dashboard',
    name: 'DevOps Dashboard',
    description: 'Monitor deployments and infrastructure health.',
    category: 'tech',
    icon: 'Activity'
  },
  {
    id: 'security-scanner',
    name: 'Security Scanner',
    description: 'Scan code and infrastructure for vulnerabilities.',
    category: 'tech',
    icon: 'Shield'
  },
  {
    id: 'performance-monitor',
    name: 'Performance Monitor',
    description: 'Track application performance and optimize bottlenecks.',
    category: 'tech',
    icon: 'Zap'
  },
  {
    id: 'documentation-generator',
    name: 'Documentation Generator',
    description: 'Auto-generate documentation from code comments.',
    category: 'tech',
    icon: 'Book'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and refine regular expressions.',
    category: 'tech',
    icon: 'FileCode'
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format and validate JSON data.',
    category: 'tech',
    icon: 'Braces'
  },
  {
    id: 'ssl-checker',
    name: 'SSL Certificate Checker',
    description: 'Verify SSL certificates and their expiration.',
    category: 'tech',
    icon: 'Shield'
  }
];

// Utility functions
export const getRandomTools = (count: number = 3): FeaturedTool[] => {
  const shuffled = [...featuredTools].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const getToolsByCategory = (categoryId: CategoryId): Tool[] => {
  return tools.filter(tool => tool.category === categoryId);
};

export const searchTools = (query: string, categoryId?: CategoryId): Tool[] => {
  return tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(query.toLowerCase()) ||
      tool.description.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = categoryId ? tool.category === categoryId : true;
    return matchesSearch && matchesCategory;
  });
};
