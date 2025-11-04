import React from 'react';
import { AIChat } from './AIChat';
import { Message, QuickAction } from './types';

interface AIToolLayoutProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  quickActions?: QuickAction[];
  placeholder: string;
  categoryColor: string;
  toolName: string;
  children: React.ReactNode;
}

/**
 * Standard AI-first tool layout with chat on left, interactive UI on right
 */
export const AIToolLayout: React.FC<AIToolLayoutProps> = ({
  messages,
  isTyping,
  onSendMessage,
  quickActions,
  placeholder,
  categoryColor,
  toolName,
  children,
}) => {
  return (
    <div className="flex gap-4 h-[600px]">
      {/* AI Chat Interface - Left Side */}
      <div className="w-1/2">
        <AIChat
          messages={messages}
          onSendMessage={onSendMessage}
          quickActions={quickActions}
          placeholder={placeholder}
          categoryColor={categoryColor}
          isTyping={isTyping}
        />
      </div>

      {/* Interactive UI - Right Side */}
      <div className="w-1/2 bg-gray-900/50 rounded-lg border border-gray-700/50 p-4 overflow-y-auto">
        {children}
      </div>
    </div>
  );
};
