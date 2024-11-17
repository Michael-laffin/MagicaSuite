import React, { useState } from 'react';
import { Calendar, Clock, Tag, Trash2, Plus, CheckCircle2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  category?: string;
  priority: 'low' | 'medium' | 'high';
}

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      completed: false,
      dueDate: '2024-02-20T14:00',
      category: 'Work',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Review documentation',
      completed: false,
      dueDate: '2024-02-20T16:30',
      category: 'Work',
      priority: 'medium'
    }
  ]);
  const [newTask, setNewTask] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [dueDate, setDueDate] = useState('');

  const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health'];
  const priorities = ['low', 'medium', 'high'] as const;

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
        dueDate: dueDate || undefined,
        category: selectedCategory === 'All' ? undefined : selectedCategory,
        priority: 'medium'
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setDueDate('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskPriority = (id: string, priority: Task['priority']) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    selectedCategory === 'All' || task.category === selectedCategory
  );

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6 text-white">
      {/* Quick Add Task Section */}
      <div className="bg-gray-700 rounded-lg p-4 space-y-4">
        <h4 className="font-medium text-lg flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Quick Add Task
        </h4>
        <div className="space-y-3">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="w-full bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <div className="flex gap-3">
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="flex-1 bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 bg-gray-600 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <button
              onClick={addTask}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No tasks found. Add some tasks to get started!</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center gap-3 bg-gray-700 p-4 rounded-lg ${
                task.completed ? 'opacity-50' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 rounded border-gray-500"
              />
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${task.completed ? 'line-through' : ''}`}>
                  {task.title}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                  {task.dueDate && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(task.dueDate).toLocaleString()}
                    </span>
                  )}
                  {task.category && (
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {task.category}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={task.priority}
                  onChange={(e) => updateTaskPriority(task.id, e.target.value as Task['priority'])}
                  className={`bg-gray-600 rounded px-2 py-1 text-sm ${getPriorityColor(task.priority)}`}
                >
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
