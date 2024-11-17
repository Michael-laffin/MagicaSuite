export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
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