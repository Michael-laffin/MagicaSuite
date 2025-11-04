import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Sparkles, Loader2 } from 'lucide-react';
import { Message, QuickAction } from './types';

interface AIChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onQuickAction?: (action: QuickAction) => void;
  quickActions?: QuickAction[];
  placeholder?: string;
  categoryColor: string;
  isTyping?: boolean;
}

export const AIChat: React.FC<AIChatProps> = ({
  messages,
  onSendMessage,
  onQuickAction,
  quickActions = [],
  placeholder = "Ask me anything...",
  categoryColor,
  isTyping = false,
}) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real implementation, this would use Web Speech API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    if (onQuickAction) {
      onQuickAction(action);
    } else {
      onSendMessage(action.prompt);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-900/50 rounded-lg border border-gray-700/50">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? `bg-${categoryColor}-600/20 border border-${categoryColor}-500/30`
                    : 'bg-gray-800/50 border border-gray-700/50'
                }`}
                style={
                  message.role === 'user'
                    ? {
                        backgroundColor: `${categoryColor}20`,
                        borderColor: `${categoryColor}50`,
                      }
                    : undefined
                }
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4" style={{ color: categoryColor }} />
                    <span className="text-xs font-medium text-gray-400">AI Assistant</span>
                  </div>
                )}
                <p className="text-sm text-gray-200 whitespace-pre-wrap">{message.content}</p>
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => onSendMessage(suggestion)}
                        className="text-xs px-2 py-1 rounded border border-gray-600 hover:border-gray-500 transition-colors"
                        style={{ borderColor: `${categoryColor}40` }}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" style={{ color: categoryColor }} />
                <span className="text-sm text-gray-400">AI is thinking...</span>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {quickActions.length > 0 && messages.length === 0 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-gray-400 mb-2">Quick actions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action)}
                className="text-xs px-3 py-1.5 rounded-lg bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 transition-colors"
                style={{ borderColor: `${categoryColor}30` }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700/50">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleVoiceInput}
            className={`p-2 rounded-lg transition-colors ${
              isListening
                ? 'bg-red-500/20 text-red-400'
                : 'bg-gray-800/50 text-gray-400 hover:text-gray-300'
            }`}
          >
            <Mic className="w-5 h-5" />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-600"
            style={{ borderColor: input ? categoryColor + '40' : undefined }}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: input.trim() ? `${categoryColor}30` : 'rgb(31, 41, 55, 0.5)',
              color: input.trim() ? categoryColor : 'rgb(156, 163, 175)',
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};
