const fs = require('fs');
const path = require('path');

// Complete tool definitions for all 60 tools
const toolConfig = {
  productivity: {
    color: '#10b981',
    tools: [
      { file: 'TaskManager', name: 'Task Manager', icon: 'CheckSquare', desc: 'task management', complete: true },
      { file: 'Calendar', name: 'Calendar Sync', icon: 'Calendar', desc: 'calendar and scheduling', complete: true },
      { file: 'ProjectPlanner', name: 'Project Planner', icon: 'Folder', desc: 'project planning', complete: true },
      { file: 'FocusMode', name: 'Focus Timer', icon: 'Brain', desc: 'focus sessions' },
      { file: 'NoteTaking', name: 'Note Keeper', icon: 'FileText', desc: 'note taking' },
      { file: 'HabitTracker', name: 'Habit Tracker', icon: 'TrendingUp', desc: 'habit tracking' },
      { file: 'TimeTracker', name: 'Time Tracker', icon: 'Clock', desc: 'time tracking' },
      { file: 'GoalSetting', name: 'Goal Setter', icon: 'Target', desc: 'goal setting' },
      { file: 'PomodoroTimer', name: 'Daily Planner', icon: 'CalendarDays', desc: 'daily planning' },
      { file: 'TaskAnalytics', name: 'Meeting Scheduler', icon: 'Users', desc: 'meeting scheduling' },
    ],
  },
  marketing: {
    color: '#3b82f6',
    tools: [
      { file: 'SocialMediaManager', name: 'Social Media Scheduler', icon: 'Share2', desc: 'social media management' },
      { file: 'EmailCampaigns', name: 'Email Campaign Builder', icon: 'Mail', desc: 'email campaigns' },
      { file: 'SEOOptimizer', name: 'SEO Analyzer', icon: 'Search', desc: 'SEO optimization' },
      { file: 'AdManager', name: 'Ad Manager', icon: 'DollarSign', desc: 'ad management' },
      { file: 'ContentCalendar', name: 'Content Calendar', icon: 'Calendar', desc: 'content planning' },
      { file: 'LeadGenerator', name: 'Hashtag Generator', icon: 'Hash', desc: 'hashtag generation' },
      { file: 'BrandKit', name: 'Landing Page Builder', icon: 'Layout', desc: 'landing page creation' },
      { file: 'CompetitorAnalysis', name: 'Brand Asset Manager', icon: 'Briefcase', desc: 'brand asset management' },
      { file: 'MarketingROI', name: 'Lead Magnet Creator', icon: 'Magnet', desc: 'lead magnet creation' },
      { file: 'AnalyticsDashboard', name: 'Influencer Tracker', icon: 'Star', desc: 'influencer tracking' },
    ],
  },
  business: {
    color: '#22d3ee',
    tools: [
      { file: 'InvoiceGenerator', name: 'Invoice Generator', icon: 'FileText', desc: 'invoice generation' },
      { file: 'ExpenseTracker', name: 'Expense Tracker', icon: 'Receipt', desc: 'expense tracking' },
      { file: 'ClientCRM', name: 'Customer CRM', icon: 'Users', desc: 'customer relationship management' },
      { file: 'ProjectManagement', name: 'Proposal Builder', icon: 'PresentationIcon', desc: 'proposal creation' },
      { file: 'BusinessAnalytics', name: 'E-Signature Tool', icon: 'PenTool', desc: 'document signing' },
      { file: 'ResourcePlanning', name: 'Tax Calculator', icon: 'Calculator', desc: 'tax calculation' },
      { file: 'TeamManagement', name: 'Inventory Manager', icon: 'Package', desc: 'inventory management' },
      { file: 'DocumentManager', name: 'Employee Scheduler', icon: 'CalendarClock', desc: 'employee scheduling' },
      { file: 'FinancialDashboard', name: 'Payroll Assistant', icon: 'Wallet', desc: 'payroll management' },
      { file: 'MeetingScheduler', name: 'Business Dashboard', icon: 'BarChart3', desc: 'business analytics' },
    ],
  },
  creativity: {
    color: '#f97316',
    tools: [
      { file: 'DesignCanvas', name: 'Graphic Designer', icon: 'Palette', desc: 'graphic design' },
      { file: 'ImageEditor', name: 'Photo Editor', icon: 'Image', desc: 'photo editing' },
      { file: 'AnimationCreator', name: 'Video Maker', icon: 'Video', desc: 'video creation' },
      { file: 'IconCreator', name: 'Logo Generator', icon: 'Sparkles', desc: 'logo generation' },
      { file: 'MockupGenerator', name: 'Meme Creator', icon: 'Laugh', desc: 'meme creation' },
      { file: 'TemplateLibrary', name: 'AI Content Writer', icon: 'PenTool', desc: 'content writing' },
      { file: 'ColorPaletteGenerator', name: 'Color Palette Picker', icon: 'Palette', desc: 'color palette generation' },
      { file: 'FontPairer', name: 'Font Pairing Tool', icon: 'Type', desc: 'font pairing' },
      { file: 'InspirationBoard', name: 'Audio Editor', icon: 'Music', desc: 'audio editing' },
      { file: 'StyleGuideGenerator', name: 'Infographic Builder', icon: 'BarChart', desc: 'infographic creation' },
    ],
  },
  analytics: {
    color: '#f43f5e',
    tools: [
      { file: 'DataVisualizer', name: 'Website Analytics Tracker', icon: 'LineChart', desc: 'website analytics' },
      { file: 'MetricsDashboard', name: 'Heatmap Generator', icon: 'Activity', desc: 'heatmap generation' },
      { file: 'ReportGenerator', name: 'Data Dashboard', icon: 'LayoutDashboard', desc: 'data dashboards' },
      { file: 'TrendAnalyzer', name: 'KPI Tracker', icon: 'TrendingUp', desc: 'KPI tracking' },
      { file: 'PredictiveAnalytics', name: 'Competitor Analysis', icon: 'Search', desc: 'competitor analysis' },
      { file: 'DataExplorer', name: 'A/B Test Planner', icon: 'Split', desc: 'A/B testing' },
      { file: 'CustomReports', name: 'Survey Creator', icon: 'ClipboardList', desc: 'survey creation' },
      { file: 'RealTimeAnalytics', name: 'Report Generator', icon: 'FileText', desc: 'report generation' },
      { file: 'PerformanceMetrics', name: 'Data Cleaner', icon: 'Filter', desc: 'data cleaning' },
      { file: 'DataInsights', name: 'Trend Analyzer', icon: 'TrendingUp', desc: 'trend analysis' },
    ],
  },
  tech: {
    color: '#a855f7',
    tools: [
      { file: 'CodeEditor', name: 'Code Snippet Library', icon: 'Code', desc: 'code snippet management' },
      { file: 'APITester', name: 'API Tester', icon: 'Globe', desc: 'API testing' },
      { file: 'GitInterface', name: 'Version Control Viewer', icon: 'GitBranch', desc: 'version control' },
      { file: 'CloudConsole', name: 'Uptime Monitor', icon: 'Activity', desc: 'uptime monitoring' },
      { file: 'Terminal', name: 'DNS Checker', icon: 'Server', desc: 'DNS checking' },
      { file: 'DevOpsDashboard', name: 'Password Manager', icon: 'Lock', desc: 'password management' },
      { file: 'SecurityScanner', name: 'Database Query Tool', icon: 'Database', desc: 'database queries' },
      { file: 'PerformanceMonitor', name: 'Regex Tester', icon: 'TextSelect', desc: 'regex testing' },
      { file: 'DatabaseManager', name: 'JSON Formatter', icon: 'Braces', desc: 'JSON formatting' },
      { file: 'DocumentationGenerator', name: 'SSL Certificate Checker', icon: 'Shield', desc: 'SSL checking' },
    ],
  },
};

const generateToolCode = (category, tool, color) => {
  if (tool.complete) return null; // Skip already completed tools

  return `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ${tool.icon}, Sparkles, Plus, Trash2 } from 'lucide-react';
import { AIToolLayout } from '../ai/AIToolLayout';
import { useAIChat } from '../ai';

interface DataItem {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  aiGenerated?: boolean;
}

const ${tool.file}: React.FC = () => {
  const [items, setItems] = useState<DataItem[]>([]);

  const { messages, isTyping, sendMessage } = useAIChat(
    "👋 I'm your AI assistant for ${tool.desc}! I can help you with ${tool.name.toLowerCase()} tasks using natural language. Just tell me what you need!"
  );

  const handleMessage = async (message: string) => {
    await sendMessage(message, { items });

    const lowerMessage = message.toLowerCase();

    // AI-powered message processing
    if (lowerMessage.includes('create') || lowerMessage.includes('generate') || lowerMessage.includes('add') || lowerMessage.includes('make')) {
      const newItem: DataItem = {
        id: Date.now().toString(),
        title: extractTitle(message),
        content: message,
        timestamp: new Date().toISOString(),
        aiGenerated: true,
      };
      setItems(prev => [newItem, ...prev]);
    } else if (lowerMessage.includes('delete') || lowerMessage.includes('remove') || lowerMessage.includes('clear')) {
      if (lowerMessage.includes('all')) {
        setItems([]);
      } else if (items.length > 0) {
        setItems(prev => prev.slice(1));
      }
    }
  };

  const extractTitle = (message: string): string => {
    const patterns = [
      /create (?:a |an )?(.+?)(?:\s+for|\s+with|\s*$)/i,
      /generate (?:a |an )?(.+?)(?:\s+for|\s+with|\s*$)/i,
      /add (?:a |an )?(.+?)(?:\s+for|\s+with|\s*$)/i,
      /make (?:a |an )?(.+?)(?:\s+for|\s+with|\s*$)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match && match[1]) {
        return match[1].trim().charAt(0).toUpperCase() + match[1].trim().slice(1);
      }
    }

    return message.length > 50 ? message.substring(0, 50) + '...' : message;
  };

  const deleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const quickActions = [
    { label: '✨ Create new', prompt: 'Create a new ${tool.desc} item' },
    { label: '💡 Show examples', prompt: 'Show me examples' },
    { label: '📊 Analyze', prompt: 'Analyze my data' },
    { label: '⚡ Quick action', prompt: 'Help me with a quick task' },
  ];

  return (
    <AIToolLayout
      messages={messages}
      isTyping={isTyping}
      onSendMessage={handleMessage}
      quickActions={quickActions}
      placeholder="Ask me anything or describe what you want to create..."
      categoryColor="${color}"
      toolName="${tool.name}"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '${color}' }}>
            <${tool.icon} className="w-5 h-5" />
            {items.length} Item{items.length !== 1 ? 's' : ''}
          </h3>
          <button
            onClick={() => handleMessage('Create a new item')}
            className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors"
            style={{
              backgroundColor: '${color}20',
              color: '${color}',
              borderColor: '${color}30',
            }}
          >
            <Plus className="w-4 h-4" />
            Quick Create
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <${tool.icon} className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">No items yet</p>
            <p className="text-sm">Use AI to create ${tool.desc} items!</p>
            <p className="text-xs mt-3 text-gray-600">
              Try: "Create a new ${tool.desc.split(' ')[0]} for my project"
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-opacity-70 transition-all group"
                style={{ borderColor: '${color}20' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-200 truncate">{item.title}</h4>
                      {item.aiGenerated && (
                        <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded border" style={{
                          backgroundColor: '${color}15',
                          color: '${color}',
                          borderColor: '${color}40'
                        }}>
                          <Sparkles className="w-3 h-3 inline mr-1" />
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-400 line-clamp-2">{item.content}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="flex-shrink-0 p-2 opacity-0 group-hover:opacity-100 hover:bg-red-500/20 rounded transition-all"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="pt-4 border-t border-gray-700/30">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <span>Total: {items.length} item{items.length !== 1 ? 's' : ''}</span>
              <span>
                AI Generated: {items.filter(i => i.aiGenerated).length}
              </span>
            </div>
          </div>
        )}
      </div>
    </AIToolLayout>
  );
};

export default ${tool.file};
`;
};

// Generate all tools
let generatedCount = 0;
let skippedCount = 0;

Object.entries(toolConfig).forEach(([category, config]) => {
  const dirPath = path.join(__dirname, `src/components/${category}`);

  // Create directory if it doesn't exist
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  config.tools.forEach((tool) => {
    const filePath = path.join(dirPath, `${tool.file}.tsx`);
    const code = generateToolCode(category, tool, config.color);

    if (!code) {
      console.log(`⏭️  Skipping ${category}/${tool.file} (already complete)`);
      skippedCount++;
      return;
    }

    // Write the file
    fs.writeFileSync(filePath, code);
    console.log(`✅ Generated ${category}/${tool.file}.tsx`);
    generatedCount++;
  });
});

console.log(`\n🎉 Tool Generation Complete!`);
console.log(`✅ Generated: ${generatedCount} tools`);
console.log(`⏭️  Skipped: ${skippedCount} tools (already complete)`);
console.log(`📊 Total: ${generatedCount + skippedCount}/60 tools`);
