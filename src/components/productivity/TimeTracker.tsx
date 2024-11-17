import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Clock, RotateCcw, Save } from 'lucide-react';

interface TimeEntry {
  id: string;
  task: string;
  duration: number;
  isRunning: boolean;
  startTime?: number;
}

export default function TimeTracker({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setEntries(currentEntries =>
        currentEntries.map(entry => {
          if (entry.isRunning && entry.startTime) {
            return {
              ...entry,
              duration: entry.duration + (Date.now() - entry.startTime),
              startTime: Date.now(),
            };
          }
          return entry;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addEntry = () => {
    if (newTask.trim()) {
      setEntries([
        ...entries,
        {
          id: Date.now().toString(),
          task: newTask,
          duration: 0,
          isRunning: false,
        },
      ]);
      setNewTask('');
    }
  };

  const toggleTimer = (id: string) => {
    setEntries(entries.map(entry => {
      if (entry.id === id) {
        return {
          ...entry,
          isRunning: !entry.isRunning,
          startTime: !entry.isRunning ? Date.now() : undefined,
        };
      }
      return entry;
    }));
  };

  const resetTimer = (id: string) => {
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, duration: 0, isRunning: false, startTime: undefined } : entry
    ));
  };

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-500/20"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold text-white flex items-center gap-2"
              >
                <Clock className="h-6 w-6 text-blue-400" />
                Time Tracker
              </motion.h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-white" />
              </motion.button>
            </div>

            {/* Add Entry Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex gap-2 mb-6"
            >
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="What are you working on?"
                className="flex-1 bg-gray-700/50 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && addEntry()}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addEntry}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 transition-colors"
              >
                <Save className="h-5 w-5" />
              </motion.button>
            </motion.div>

            {/* Time Entries List */}
            <motion.div 
              className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <AnimatePresence mode="popLayout">
                {entries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-gray-700/30 rounded-lg p-3 group hover:bg-gray-700/50 transition-colors"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleTimer(entry.id)}
                      className={`text-gray-400 hover:text-blue-400 transition-colors ${entry.isRunning ? 'text-green-400' : ''}`}
                    >
                      {entry.isRunning ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </motion.button>
                    <div className="flex-1">
                      <p className="text-white">{entry.task}</p>
                      <p className="text-sm text-blue-400">{formatDuration(entry.duration)}</p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => resetTimer(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-yellow-400 transition-all"
                      >
                        <RotateCcw className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all"
                      >
                        <X className="h-5 w-5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
