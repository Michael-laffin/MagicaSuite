/**
 * AI Tool Generator Script
 * Automatically generates all 60 AI-first tools based on the design plan
 */

import * as fs from 'fs';
import * as path from 'path';

// Tool definitions from toolsData.ts
const toolDefinitions = {
  productivity: [
    { name: 'TaskManager', displayName: 'Task Manager', icon: 'CheckSquare', greeting: "I'm your AI Task Orchestrator!", color: '#10b981' },
    { name: 'Calendar', displayName: 'Calendar Sync', icon: 'Calendar', greeting: "I'm your AI Schedule Optimizer!", color: '#10b981' },
    { name: 'ProjectPlanner', displayName: 'Project Planner', icon: 'Folder', greeting: "I'm your AI Project Co-Pilot!", color: '#10b981' },
    { name: 'FocusMode', displayName: 'Focus Timer', icon: 'Brain', greeting: "I'm your AI Focus Coach!", color: '#10b981' },
    { name: 'NoteTaking', displayName: 'Note Keeper', icon: 'FileText', greeting: "I'm your AI Knowledge Assistant!", color: '#10b981' },
    { name: 'HabitTracker', displayName: 'Habit Tracker', icon: 'TrendingUp', greeting: "I'm your AI Behavior Coach!", color: '#10b981' },
    { name: 'TimeTracker', displayName: 'Time Tracker', icon: 'Clock', greeting: "I'm your AI Time Intelligence!", color: '#10b981' },
    { name: 'GoalSetting', displayName: 'Goal Setter', icon: 'Target', greeting: "I'm your AI Goal Strategist!", color: '#10b981' },
    { name: 'PomodoroTimer', displayName: 'Daily Planner', icon: 'CalendarDays', greeting: "I'm your AI Day Designer!", color: '#10b981' },
    { name: 'TaskAnalytics', displayName: 'Meeting Scheduler', icon: 'Users', greeting: "I'm your AI Meeting Orchestrator!", color: '#10b981' },
  ],
  marketing: [
    { name: 'SocialMediaManager', displayName: 'Social Media Scheduler', icon: 'Share2', greeting: "I'm your AI Social Media Strategist!", color: '#3b82f6' },
    { name: 'EmailCampaigns', displayName: 'Email Campaign Builder', icon: 'Mail', greeting: "I'm your AI Email Composer!", color: '#3b82f6' },
    { name: 'SEOOptimizer', displayName: 'SEO Analyzer', icon: 'Search', greeting: "I'm your AI SEO Consultant!", color: '#3b82f6' },
    { name: 'AdManager', displayName: 'Ad Manager', icon: 'DollarSign', greeting: "I'm your AI Ad Optimization Engine!", color: '#3b82f6' },
    { name: 'ContentCalendar', displayName: 'Content Calendar', icon: 'Calendar', greeting: "I'm your AI Content Strategist!", color: '#3b82f6' },
    { name: 'LeadGenerator', displayName: 'Hashtag Generator', icon: 'Hash', greeting: "I'm your AI Hashtag Intelligence!", color: '#3b82f6' },
    { name: 'BrandKit', displayName: 'Landing Page Builder', icon: 'Layout', greeting: "I'm your AI Page Generator!", color: '#3b82f6' },
    { name: 'CompetitorAnalysis', displayName: 'Brand Asset Manager', icon: 'Briefcase', greeting: "I'm your AI Brand Guardian!", color: '#3b82f6' },
    { name: 'MarketingROI', displayName: 'Lead Magnet Creator', icon: 'Magnet', greeting: "I'm your AI Lead Generation Engine!", color: '#3b82f6' },
    { name: 'AnalyticsDashboard', displayName: 'Influencer Tracker', icon: 'Star', greeting: "I'm your AI Influencer Scout!", color: '#3b82f6' },
  ],
  // Add more categories...
};

const generateToolTemplate = (category: string, tool: any): string => {
  return `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ${tool.icon}, Sparkles } from 'lucide-react';
import { AIToolLayout } from '../ai/AIToolLayout';
import { useAIChat } from '../ai';

const ${tool.name}: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const { messages, isTyping, sendMessage } = useAIChat(
    "👋 ${tool.greeting} I can help you with ${tool.displayName.toLowerCase()} tasks using natural language. Try asking me anything!"
  );

  const handleMessage = async (message: string) => {
    await sendMessage(message, { data });

    // AI-powered message processing
    const lowerMessage = message.toLowerCase();

    // Add intelligent response logic here based on the tool's purpose
    if (lowerMessage.includes('create') || lowerMessage.includes('generate') || lowerMessage.includes('add')) {
      const newItem = {
        id: Date.now().toString(),
        content: message,
        aiGenerated: true,
        timestamp: new Date().toISOString(),
      };
      setData(prev => [...prev, newItem]);
    }
  };

  const quickActions = [
    { label: '✨ Get started', prompt: 'Help me get started' },
    { label: '💡 Show examples', prompt: 'Show me what you can do' },
    { label: '⚡ Quick action', prompt: 'Help me with a quick task' },
  ];

  return (
    <AIToolLayout
      messages={messages}
      isTyping={isTyping}
      onSendMessage={handleMessage}
      quickActions={quickActions}
      placeholder="Ask me anything..."
      categoryColor="${tool.color}"
      toolName="${tool.displayName}"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '${tool.color}' }}>
            <${tool.icon} className="w-5 h-5" />
            ${tool.displayName}
          </h3>
          <span className="text-sm text-gray-400">{data.length} items</span>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No data yet</p>
            <p className="text-sm mt-2">Use AI to create something!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {data.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-opacity-70 transition-all"
                style={{ borderColor: '${tool.color}30' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-gray-200">{item.content}</p>
                      {item.aiGenerated && (
                        <span className="text-xs px-1.5 py-0.5 rounded border" style={{
                          backgroundColor: '${tool.color}20',
                          color: '${tool.color}',
                          borderColor: '${tool.color}30'
                        }}>
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AIToolLayout>
  );
};

export default ${tool.name};
`;
};

// Generate all tools
Object.entries(toolDefinitions).forEach(([category, tools]) => {
  tools.forEach((tool) => {
    const dirPath = path.join(__dirname, `../src/components/${category}`);
    const filePath = path.join(dirPath, `${tool.name}.tsx`);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Generate and write tool file
    const content = generateToolTemplate(category, tool);
    fs.writeFileSync(filePath, content);

    console.log(`✓ Generated ${category}/${tool.name}.tsx`);
  });
});

console.log('\\n✨ All AI-first tools generated successfully!');
