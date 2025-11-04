import { AIResponse } from './types';

/**
 * Simulates AI response with typing delay
 */
export const simulateAIResponse = async (
  userMessage: string,
  context: any = {}
): Promise<AIResponse> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

  // This is a mock implementation. In production, this would call an actual AI API
  return {
    message: generateContextualResponse(userMessage, context),
    suggestions: generateSuggestions(userMessage, context),
  };
};

/**
 * Generates a contextual response based on the user message
 */
const generateContextualResponse = (message: string, context: any): string => {
  const lowerMessage = message.toLowerCase();

  // Generic helpful responses based on keywords
  if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
    return "I'm here to help! I can assist you with various tasks using natural language. Just tell me what you'd like to do, and I'll guide you through it.";
  }

  if (lowerMessage.includes('create') || lowerMessage.includes('generate')) {
    return "I'll help you create that! Based on what you've described, I can generate a comprehensive solution. Let me process that for you...";
  }

  if (lowerMessage.includes('analyze') || lowerMessage.includes('review')) {
    return "I've analyzed the information. Here's what I found:\n\n• Key insights have been identified\n• Patterns and trends are visible\n• Recommendations are ready\n\nWould you like me to elaborate on any specific aspect?";
  }

  if (lowerMessage.includes('schedule') || lowerMessage.includes('plan')) {
    return "I've optimized the schedule based on your requirements. The plan takes into account priorities, time constraints, and best practices. Everything is organized for maximum efficiency.";
  }

  if (lowerMessage.includes('optimize') || lowerMessage.includes('improve')) {
    return "I've identified several optimization opportunities:\n\n1. Enhanced efficiency in key areas\n2. Streamlined workflows\n3. Better resource allocation\n\nImplementing these changes could improve performance by up to 30%.";
  }

  // Default intelligent response
  return `I understand you want to ${message}. I've processed your request and prepared a solution. The AI has analyzed the context and generated an optimized approach tailored to your needs.`;
};

/**
 * Generates contextual suggestions based on the conversation
 */
const generateSuggestions = (message: string, context: any): string[] => {
  const suggestions: string[] = [];
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('create') || lowerMessage.includes('generate')) {
    suggestions.push('Show me examples', 'Customize this', 'Generate another version');
  } else if (lowerMessage.includes('analyze')) {
    suggestions.push('Show detailed breakdown', 'Export results', 'Compare with previous');
  } else if (lowerMessage.includes('schedule')) {
    suggestions.push('Adjust timing', 'Add reminders', 'Share schedule');
  } else {
    suggestions.push('Tell me more', 'Show options', 'Start over');
  }

  return suggestions;
};

/**
 * Generates unique message ID
 */
export const generateMessageId = (): string => {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Formats timestamp for display
 */
export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
  return date.toLocaleDateString();
};

/**
 * Extracts entities from user message (mock implementation)
 */
export const extractEntities = (message: string): Record<string, any> => {
  const entities: Record<string, any> = {};

  // Extract dates
  const datePatterns = [
    /tomorrow/i,
    /today/i,
    /next week/i,
    /monday|tuesday|wednesday|thursday|friday|saturday|sunday/i,
  ];
  datePatterns.forEach((pattern) => {
    if (pattern.test(message)) {
      entities.hasDate = true;
    }
  });

  // Extract times
  const timePattern = /(\d{1,2}):?(\d{2})?\s*(am|pm)?/i;
  const timeMatch = message.match(timePattern);
  if (timeMatch) {
    entities.hasTime = true;
    entities.time = timeMatch[0];
  }

  // Extract numbers
  const numberPattern = /\b\d+\b/g;
  const numbers = message.match(numberPattern);
  if (numbers) {
    entities.numbers = numbers.map(Number);
  }

  return entities;
};

/**
 * Generates quick actions based on tool type
 */
export const getQuickActionsForTool = (toolName: string) => {
  const actionMap: Record<string, Array<{ label: string; prompt: string }>> = {
    'Task Manager': [
      { label: '📝 Create task', prompt: 'Create a new task for me' },
      { label: '📊 Show my tasks', prompt: 'Show all my tasks' },
      { label: '⚡ Priority tasks', prompt: 'What are my high priority tasks?' },
      { label: '📅 Today\'s plan', prompt: 'What should I focus on today?' },
    ],
    'Calendar Sync': [
      { label: '📅 Schedule meeting', prompt: 'Schedule a meeting for me' },
      { label: '🔍 Find time', prompt: 'Find me available time slots' },
      { label: '📊 Today\'s schedule', prompt: 'What\'s on my calendar today?' },
      { label: '⏰ Reschedule', prompt: 'Help me reschedule a meeting' },
    ],
    'SEO Analyzer': [
      { label: '🔍 Analyze site', prompt: 'Analyze SEO for my website' },
      { label: '🎯 Keyword research', prompt: 'Find keyword opportunities' },
      { label: '📊 Competitor analysis', prompt: 'Compare with competitors' },
      { label: '✨ Optimize content', prompt: 'Help me optimize my content' },
    ],
    'Invoice Generator': [
      { label: '📄 New invoice', prompt: 'Create a new invoice' },
      { label: '💰 Calculate total', prompt: 'Help me calculate invoice total' },
      { label: '📤 Send invoice', prompt: 'Prepare invoice for sending' },
      { label: '📊 View pending', prompt: 'Show unpaid invoices' },
    ],
  };

  return actionMap[toolName] || [
    { label: '✨ Get started', prompt: 'How can you help me?' },
    { label: '💡 Show examples', prompt: 'Show me what you can do' },
    { label: '⚡ Quick action', prompt: 'Help me get started quickly' },
  ];
};
