import { useState, useCallback } from 'react';
import { Message } from './types';
import { simulateAIResponse, generateMessageId } from './aiUtils';

export const useAIChat = (initialSystemMessage?: string) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const msgs: Message[] = [];
    if (initialSystemMessage) {
      msgs.push({
        id: generateMessageId(),
        role: 'assistant',
        content: initialSystemMessage,
        timestamp: Date.now(),
      });
    }
    return msgs;
  });
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (content: string, context?: any) => {
    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const response = await simulateAIResponse(content, context);

      // Add AI message
      const aiMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: response.message,
        timestamp: Date.now(),
        suggestions: response.suggestions,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: "I apologize, but I encountered an error. Please try again.",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const addSystemMessage = useCallback((content: string) => {
    const systemMessage: Message = {
      id: generateMessageId(),
      role: 'system',
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  }, []);

  return {
    messages,
    isTyping,
    sendMessage,
    clearMessages,
    addSystemMessage,
  };
};
