import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Sparkles, Plus, Trash2 } from 'lucide-react';
import { AIToolLayout } from '../ai/AIToolLayout';
import { useAIChat } from '../ai';

interface DataItem {
  id: string;
  title: string;
  content: string;
  timestamp: string;
  aiGenerated?: boolean;
}

const GitInterface: React.FC = () => {
  const [items, setItems] = useState<DataItem[]>([]);

  const { messages, isTyping, sendMessage } = useAIChat(
    "👋 I'm your AI assistant for version control! I can help you with version control viewer tasks using natural language. Just tell me what you need!"
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
      /create (?:a |an )?(.+?)(?:s+for|s+with|s*$)/i,
      /generate (?:a |an )?(.+?)(?:s+for|s+with|s*$)/i,
      /add (?:a |an )?(.+?)(?:s+for|s+with|s*$)/i,
      /make (?:a |an )?(.+?)(?:s+for|s+with|s*$)/i,
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
    { label: '✨ Create new', prompt: 'Create a new version control item' },
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
      categoryColor="#a855f7"
      toolName="Version Control Viewer"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: '#a855f7' }}>
            <GitBranch className="w-5 h-5" />
            {items.length} Item{items.length !== 1 ? 's' : ''}
          </h3>
          <button
            onClick={() => handleMessage('Create a new item')}
            className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors"
            style={{
              backgroundColor: '#a855f720',
              color: '#a855f7',
              borderColor: '#a855f730',
            }}
          >
            <Plus className="w-4 h-4" />
            Quick Create
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">No items yet</p>
            <p className="text-sm">Use AI to create version control items!</p>
            <p className="text-xs mt-3 text-gray-600">
              Try: "Create a new version for my project"
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
                style={{ borderColor: '#a855f720' }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-gray-200 truncate">{item.title}</h4>
                      {item.aiGenerated && (
                        <span className="flex-shrink-0 text-xs px-2 py-0.5 rounded border" style={{
                          backgroundColor: '#a855f715',
                          color: '#a855f7',
                          borderColor: '#a855f740'
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

export default GitInterface;
