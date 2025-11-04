import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Trash2, Calendar, Flag, Brain } from 'lucide-react';
import { AIChat, useAIChat, getQuickActionsForTool } from '../ai';

interface Task {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  dueDate?: string;
  aiGenerated?: boolean;
  subtasks?: string[];
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ai_tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const { messages, isTyping, sendMessage } = useAIChat(
    "👋 I'm your AI Task Orchestrator! I can help you create, organize, and prioritize tasks using natural language. Try saying: 'Create a task to finish the project report by Friday'"
  );

  useEffect(() => {
    localStorage.setItem('ai_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleMessage = async (message: string) => {
    await sendMessage(message, { tasks });

    // Simulate AI task creation
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('create') || lowerMessage.includes('add')) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: extractTaskTitle(message),
        priority: detectPriority(message),
        completed: false,
        aiGenerated: true,
        dueDate: extractDate(message),
        subtasks: generateSubtasks(message),
      };
      setTasks(prev => [newTask, ...prev]);
    } else if (lowerMessage.includes('complete') || lowerMessage.includes('done')) {
      // Mark tasks as complete
      if (tasks.length > 0) {
        setTasks(prev => prev.map((t, i) => i === 0 ? { ...t, completed: true } : t));
      }
    } else if (lowerMessage.includes('delete') || lowerMessage.includes('remove')) {
      // Delete completed tasks
      setTasks(prev => prev.filter(t => !t.completed));
    }
  };

  const extractTaskTitle = (message: string): string => {
    const patterns = [
      /create (?:a )?(?:task|todo) (?:to |for )?(.+?)(?:\s+by|\s+due|\s+for|\s*$)/i,
      /add (?:a )?(?:task|todo) (?:to |for )?(.+?)(?:\s+by|\s+due|\s+for|\s*$)/i,
      /remind me to (.+?)(?:\s+by|\s+due|\s+for|\s*$)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) return match[1].trim();
    }

    return message.length > 50 ? message.substring(0, 50) + '...' : message;
  };

  const detectPriority = (message: string): 'low' | 'medium' | 'high' => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('urgent') || lowerMessage.includes('asap') || lowerMessage.includes('critical')) {
      return 'high';
    }
    if (lowerMessage.includes('important') || lowerMessage.includes('priority')) {
      return 'high';
    }
    if (lowerMessage.includes('low priority') || lowerMessage.includes('when possible')) {
      return 'low';
    }
    return 'medium';
  };

  const extractDate = (message: string): string | undefined => {
    const today = new Date();
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('today')) {
      return today.toISOString().split('T')[0];
    }
    if (lowerMessage.includes('tomorrow')) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return tomorrow.toISOString().split('T')[0];
    }
    if (lowerMessage.includes('next week')) {
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().split('T')[0];
    }

    // Try to match day names
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    for (let i = 0; i < days.length; i++) {
      if (lowerMessage.includes(days[i])) {
        const targetDay = i;
        const currentDay = today.getDay();
        const daysUntil = (targetDay + 7 - currentDay) % 7 || 7;
        const targetDate = new Date(today);
        targetDate.setDate(targetDate.getDate() + daysUntil);
        return targetDate.toISOString().split('T')[0];
      }
    }

    return undefined;
  };

  const generateSubtasks = (message: string): string[] | undefined => {
    const lowerMessage = message.toLowerCase();
    const subtaskKeywords = ['project', 'report', 'presentation', 'website'];

    for (const keyword of subtaskKeywords) {
      if (lowerMessage.includes(keyword)) {
        return [
          'Research and gather information',
          'Create outline/structure',
          'Draft content',
          'Review and refine',
          'Final submission',
        ];
      }
    }

    return undefined;
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const quickActions = getQuickActionsForTool('Task Manager');

  return (
    <div className="flex gap-4 h-[600px]">
      {/* AI Chat Interface - Left Side */}
      <div className="w-1/2">
        <AIChat
          messages={messages}
          onSendMessage={handleMessage}
          quickActions={quickActions}
          placeholder="E.g., 'Create a task to review pull requests by tomorrow'"
          categoryColor="#10b981"
          isTyping={isTyping}
        />
      </div>

      {/* Task Board - Right Side */}
      <div className="w-1/2 bg-gray-900/50 rounded-lg border border-gray-700/50 p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Smart Task Board
          </h3>
          <span className="text-sm text-gray-400">
            {tasks.filter(t => !t.completed).length} active
          </span>
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No tasks yet. Use AI to create some!</p>
              <p className="text-sm mt-2">Try: "Create a task to finish the report"</p>
            </div>
          ) : (
            tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-3 rounded-lg border transition-all ${
                  task.completed
                    ? 'bg-gray-800/30 border-gray-700/30 opacity-60'
                    : 'bg-gray-800/50 border-gray-700/50 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-1 flex-shrink-0"
                  >
                    {task.completed ? (
                      <Check className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-500 hover:text-emerald-400 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                        {task.title}
                      </p>
                      {task.aiGenerated && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          AI
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                        <Flag className="w-3 h-3" />
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {task.subtasks && task.subtasks.length > 0 && !task.completed && (
                      <div className="mt-2 ml-2 space-y-1">
                        {task.subtasks.map((subtask, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-400">
                            <Circle className="w-2 h-2" />
                            <span>{subtask}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex-shrink-0 p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-400" />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
