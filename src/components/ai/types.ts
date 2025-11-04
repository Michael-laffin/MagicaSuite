export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  suggestions?: string[];
}

export interface AIToolProps {
  categoryColor: string;
}

export interface QuickAction {
  label: string;
  prompt: string;
  icon?: string;
}

export interface AIResponse {
  message: string;
  suggestions?: string[];
  data?: any;
}
