import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TaskManager: React.FC = () => {
  interface Task {
    id: number;
    name: string;
    priority: 'Low' | 'Medium' | 'High';
    dueDate?: string;
    category?: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
  }

  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            name: 'Complete project proposal',
            priority: 'High',
            dueDate: '2023-12-31',
            category: 'Work',
            completed: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Review documentation',
            priority: 'Medium',
            dueDate: '2023-11-30',
            category: 'Work',
            completed: false,
            createdAt: new Date().toISOString(),
          },
          {
            id: 3,
            name: 'Team meeting',
            priority: 'Low',
            dueDate: '2023-11-15',
            category: 'Meetings',
            completed: false,
            createdAt: new Date().toISOString(),
          },
        ];
  });
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'Incomplete'>('All');
  const [filterPriority, setFilterPriority] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [filterCategory, setFilterCategory] = useState<'All' | string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addOrUpdateTask = () => {
    if (newTask.trim() !== '') {
      if (editingTask) {
        setTasks((prev) =>
          prev.map((task) =>
            task.id === editingTask.id
              ? {
                  ...task,
                  name: newTask.trim(),
                  priority,
                  dueDate: dueDate || undefined,
                  category: category || undefined,
                }
              : task
          )
        );
        setEditingTask(null);
      } else {
        const newT: Task = {
          id: Date.now(),
          name: newTask.trim(),
          priority,
          dueDate: dueDate || undefined,
          category: category || undefined,
          completed: false,
          createdAt: new Date().toISOString(),
        };
        setTasks([...tasks, newT]);
      }
      setNewTask('');
      setPriority('Medium');
      setDueDate('');
      setCategory('');
    }
  };

  const toggleCompleteTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
              completedAt: !task.completed ? new Date().toISOString() : undefined,
            }
          : task
      )
    );
  };

  const editTask = (task: Task) => {
    setEditingTask(task);
    setNewTask(task.name);
    setPriority(task.priority);
    setDueDate(task.dueDate || '');
    setCategory(task.category || '');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setNewTask('');
    setPriority('Medium');
    setDueDate('');
    setCategory('');
  };

  const confirmDeleteTask = (id: number) => {
    setDeleteTaskId(id);
  };

  const deleteTask = () => {
    if (deleteTaskId !== null) {
      setTasks((prev) => prev.filter((task) => task.id !== deleteTaskId));
      setDeleteTaskId(null);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    // Filter by status
    if (filterStatus === 'Completed' && !task.completed) return false;
    if (filterStatus === 'Incomplete' && task.completed) return false;

    // Filter by priority
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;

    // Filter by category
    if (filterCategory !== 'All' && task.category !== filterCategory) return false;

    // Search by name
    if (searchTerm && (!task?.name || !task.name.toLowerCase().includes(searchTerm.toLowerCase()))) return false;

    return true;
  });

  // Get unique categories for filter options
  const categories = Array.from(new Set(tasks.map((task) => task.category).filter(Boolean)));

  return (
    <div className="space-y-4">
      {/* Task Form */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Task name..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <div className="flex space-x-2">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
          />
        </div>
        <input
          type="text"
          placeholder="Category..."
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <div className="flex justify-end space-x-2">
          {editingTask && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            onClick={addOrUpdateTask}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors"
          >
            {editingTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="space-y-2">
        <div className="flex space-x-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as 'All' | 'Completed' | 'Incomplete')}
            className="px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value as 'All' | 'Low' | 'Medium' | 'High')}
            className="px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as 'All' | string)}
            className="px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
      </div>

      {/* Task List */}
      <div className="space-y-2 max-h-[250px] overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400">No tasks match your criteria.</p>
        ) : (
          <AnimatePresence>
            {filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className={`flex items-center justify-between p-2 rounded-lg bg-gray-800/50 border ${
                  task.completed ? 'border-gray-500' : 'border-emerald-500/20'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompleteTask(task.id)}
                      className="accent-emerald-500"
                    />
                    <span className={`text-white ${task.completed ? 'line-through text-gray-500' : ''}`}>
                      {task.name}
                    </span>
                  </div>
                  <div className="text-sm text-emerald-100/70 ml-6">
                    <p>Priority: {task.priority}</p>
                    {task.dueDate && <p>Due: {task.dueDate}</p>}
                    {task.category && <p>Category: {task.category}</p>}
                    <p>Created At: {task.createdAt}</p>
                    {task.completedAt && <p>Completed At: {task.completedAt}</p>}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => editTask(task)}
                    className="text-yellow-400 hover:text-yellow-300"
                    aria-label="Edit Task"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => confirmDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-400"
                    aria-label="Delete Task"
                  >
                    🗑️
                  </button>
                  <button
                    onClick={() => toggleCompleteTask(task.id)}
                    className="text-emerald-400 hover:text-emerald-300"
                    aria-label={task.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
                  >
                    {task.completed ? '↺' : '✓'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTaskId !== null && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg text-white"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg mb-4">Confirm Deletion</h3>
              <p>Are you sure you want to delete this task?</p>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setDeleteTaskId(null)}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={deleteTask}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-white transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskManager;
