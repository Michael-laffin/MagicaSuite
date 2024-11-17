import { Tool, Category } from './types';

export const categories: Category[] = [
  {
    id: 'productivity',
    name: 'Productivity Boosters',
    description: 'Tools to help users manage their time, tasks, and workflows.',
    icon: 'Clock'
  },
  {
    id: 'marketing',
    name: 'Marketing Wizards',
    description: 'Tools designed to elevate marketing efforts for businesses.',
    icon: 'Megaphone'
  },
  {
    id: 'business',
    name: 'Business Builders',
    description: 'Essential tools for entrepreneurs and small businesses.',
    icon: 'Building'
  },
  {
    id: 'creativity',
    name: 'Creativity Enhancers',
    description: 'Tools to ignite creativity and streamline content creation.',
    icon: 'Palette'
  },
  {
    id: 'data',
    name: 'Data & Analytics',
    description: 'Tools for analyzing and leveraging data effectively.',
    icon: 'BarChart'
  },
  {
    id: 'tech',
    name: 'Tech Toolbox',
    description: 'Tools for developers, IT professionals, and tech-savvy users.',
    icon: 'Code'
  }
];

export const tools: Tool[] = [
  // Productivity Boosters
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
  {
    id: 'goal-setter',
    name: 'Goal Setter',
    description: 'Break down big goals into manageable milestones.',
    category: 'productivity',
    icon: 'Target'
  },
  {
    id: 'daily-planner',
    name: 'Daily Planner',
    description: 'Generate personalized daily schedules based on priorities.',
    category: 'productivity',
    icon: 'CalendarDays'
  },

  // Marketing Wizards
  {
    id: 'social-scheduler',
    name: 'Social Media Scheduler',
    description: 'Schedule and post to multiple platforms.',
    category: 'marketing',
    icon: 'Share2'
  },
  {
    id: 'email-campaign',
    name: 'Email Campaign Builder',
    description: 'Design and send professional email campaigns.',
    category: 'marketing',
    icon: 'Mail'
  },
  {
    id: 'seo-analyzer',
    name: 'SEO Analyzer',
    description: 'Evaluate and improve website SEO performance.',
    category: 'marketing',
    icon: 'Search'
  },
  {
    id: 'ad-manager',
    name: 'Ad Manager',
    description: 'Track and optimize ad campaigns across platforms.',
    category: 'marketing',
    icon: 'LineChart'
  },
  {
    id: 'content-calendar',
    name: 'Content Calendar',
    description: 'Plan and organize content across teams.',
    category: 'marketing',
    icon: 'Calendar'
  },
  {
    id: 'hashtag-generator',
    name: 'Hashtag Generator',
    description: 'Discover trending hashtags for social posts.',
    category: 'marketing',
    icon: 'Hash'
  },
  {
    id: 'landing-builder',
    name: 'Landing Page Builder',
    description: 'Quickly create high-converting landing pages.',
    category: 'marketing',
    icon: 'Layout'
  },
  {
    id: 'brand-manager',
    name: 'Brand Asset Manager',
    description: 'Organize and store brand assets like logos and fonts.',
    category: 'marketing',
    icon: 'Folder'
  },
  {
    id: 'lead-magnet',
    name: 'Lead Magnet Creator',
    description: 'Generate forms and downloadables to capture leads.',
    category: 'marketing',
    icon: 'Download'
  },
  {
    id: 'influencer-tracker',
    name: 'Influencer Tracker',
    description: 'Find and manage collaborations with influencers.',
    category: 'marketing',
    icon: 'Users'
  },

  // Business Builders
  {
    id: 'invoice-generator',
    name: 'Invoice Generator',
    description: 'Create, send, and track invoices with ease.',
    category: 'business',
    icon: 'Receipt'
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
  {
    id: 'inventory-manager',
    name: 'Inventory Manager',
    description: 'Track stock levels and manage inventory.',
    category: 'business',
    icon: 'Package'
  },
  {
    id: 'employee-scheduler',
    name: 'Employee Scheduler',
    description: 'Manage team schedules and shifts.',
    category: 'business',
    icon: 'CalendarRange'
  },
  {
    id: 'payroll-assistant',
    name: 'Payroll Assistant',
    description: 'Simplify payroll calculations and reporting.',
    category: 'business',
    icon: 'DollarSign'
  },
  {
    id: 'business-dashboard',
    name: 'Business Dashboard',
    description: 'View KPIs, reports, and analytics in one place.',
    category: 'business',
    icon: 'LayoutDashboard'
  },

  // Creativity Enhancers
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
  {
    id: 'infographic-builder',
    name: 'Infographic Builder',
    description: 'Create data visualizations and infographics.',
    category: 'creativity',
    icon: 'BarChart2'
  },

  // Data & Analytics
  {
    id: 'website-analytics',
    name: 'Website Analytics Tracker',
    description: 'Monitor website traffic and user behavior.',
    category: 'data',
    icon: 'Activity'
  },
  {
    id: 'heatmap-generator',
    name: 'Heatmap Generator',
    description: 'Visualize user interaction on webpages.',
    category: 'data',
    icon: 'Flame'
  },
  {
    id: 'data-dashboard',
    name: 'Data Dashboard',
    description: 'Compile data from multiple sources into one view.',
    category: 'data',
    icon: 'LayoutDashboard'
  },
  {
    id: 'kpi-tracker',
    name: 'KPI Tracker',
    description: 'Set and track key performance indicators for projects.',
    category: 'data',
    icon: 'Target'
  },
  {
    id: 'competitor-analysis',
    name: 'Competitor Analysis',
    description: 'Compare your metrics to industry competitors.',
    category: 'data',
    icon: 'TrendingUp'
  },
  {
    id: 'ab-test',
    name: 'A/B Test Planner',
    description: 'Test variations of ads, designs, and content.',
    category: 'data',
    icon: 'SplitSquare'
  },
  {
    id: 'survey-creator',
    name: 'Survey Creator',
    description: 'Build and distribute surveys to collect user feedback.',
    category: 'data',
    icon: 'ClipboardList'
  },
  {
    id: 'report-generator',
    name: 'Report Generator',
    description: 'Create and share detailed analytics reports.',
    category: 'data',
    icon: 'FileBarChart'
  },
  {
    id: 'data-cleaner',
    name: 'Data Cleaner',
    description: 'Organize, sort, and clean messy data sets.',
    category: 'data',
    icon: 'Filter'
  },
  {
    id: 'trend-analyzer',
    name: 'Trend Analyzer',
    description: 'Discover emerging trends in your industry.',
    category: 'data',
    icon: 'LineChart'
  },

  // Tech Toolbox
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
    id: 'version-control',
    name: 'Version Control Viewer',
    description: 'Monitor changes in Git repositories visually.',
    category: 'tech',
    icon: 'GitBranch'
  },
  {
    id: 'uptime-monitor',
    name: 'Uptime Monitor',
    description: 'Track the status and uptime of websites and servers.',
    category: 'tech',
    icon: 'Activity'
  },
  {
    id: 'dns-checker',
    name: 'DNS Checker',
    description: 'Analyze and debug DNS settings.',
    category: 'tech',
    icon: 'Network'
  },
  {
    id: 'password-manager',
    name: 'Password Manager',
    description: 'Securely store and generate passwords.',
    category: 'tech',
    icon: 'Key'
  },
  {
    id: 'database-query',
    name: 'Database Query Tool',
    description: 'Run and visualize SQL queries.',
    category: 'tech',
    icon: 'Database'
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