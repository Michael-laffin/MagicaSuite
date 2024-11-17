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

export interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export interface ToolModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
}