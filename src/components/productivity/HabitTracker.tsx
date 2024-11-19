import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HabitTracker: React.FC = () => {
  interface HabitCompletion {
    date: string;
    completed: boolean;
  }

  interface Habit {
    id: number;
    name: string;
    frequency: 'daily' | 'weekly';
    streak: number;
    completions: HabitCompletion[];
  }

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem('habits');
    return saved ? JSON.parse(saved) : [];
  });
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitFrequency, setNewHabitFrequency] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabitName.trim() === '') return;
    const newHabit: Habit = {
      id: Date.now(),
      name: newHabitName.trim(),
      frequency: newHabitFrequency,
      streak: 0,
      completions: [], // Ensure completions is initialized as empty array
    };
    setHabits([...habits, newHabit]);
    setNewHabitName('');
  };

  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
  };

  const toggleHabitCompletion = (habitId: number) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;

        // Initialize completions array if it doesn't exist
        const completions = habit.completions || [];
        const existingCompletion = completions.find((c) => c.date === today);
        let newCompletions;
        let newStreak;

        if (existingCompletion) {
          // Toggle existing completion
          newCompletions = completions.map((c) =>
            c.date === today ? { ...c, completed: !c.completed } : c
          );
        } else {
          // Add new completion
          newCompletions = [...completions, { date: today, completed: true }];
        }
        newStreak = calculateStreak(newCompletions, habit.frequency);

        return {
          ...habit,
          completions: newCompletions,
          streak: newStreak,
        };
      })
    );
  };

  const calculateStreak = (completions: HabitCompletion[], frequency: 'daily' | 'weekly') => {
    if (completions.length === 0) return 0;

    const sortedCompletions = completions
      .filter((c) => c.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (sortedCompletions.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    const latestCompletion = new Date(sortedCompletions[0].date);

    // Check if the latest completion is from today or yesterday (for daily)
    // or within the current or last week (for weekly)
    const isRecent =
      frequency === 'daily'
        ? Math.abs(today.getTime() - latestCompletion.getTime()) <= 86400000 * 2 // 2 days in milliseconds
        : Math.abs(today.getTime() - latestCompletion.getTime()) <= 86400000 * 14; // 2 weeks in milliseconds

    if (!isRecent) return 0;

    for (let i = 1; i < sortedCompletions.length; i++) {
      const current = new Date(sortedCompletions[i].date);
      const prev = new Date(sortedCompletions[i - 1].date);

      const daysDiff = Math.floor((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

      if (
        (frequency === 'daily' && daysDiff === 1) ||
        (frequency === 'weekly' && daysDiff <= 7)
      ) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const isHabitCompletedToday = (habit: Habit) => {
    if (!habit || !habit.completions) return false;
    const today = new Date().toISOString().split('T')[0];
    return habit.completions.some((c) => c.date === today && c.completed);
  };

  return (
    <div className="space-y-4">
      {/* Add New Habit */}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="New habit..."
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') addHabit();
          }}
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <select
          value={newHabitFrequency}
          onChange={(e) => setNewHabitFrequency(e.target.value as 'daily' | 'weekly')}
          className="px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button
          onClick={addHabit}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
        >
          Add
        </button>
      </div>

      {/* Habits List */}
      <div className="space-y-2">
        {habits.length === 0 ? (
          <p className="text-center text-gray-400">No habits added yet.</p>
        ) : (
          habits.map((habit) => (
            <motion.div
              key={habit.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-lg bg-gray-800/30 border border-emerald-500/10 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleHabitCompletion(habit.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isHabitCompletedToday(habit)
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-500 hover:border-emerald-500'
                  }`}
                >
                  {isHabitCompletedToday(habit) && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </button>
                <div>
                  <h4 className="text-white font-medium">{habit.name}</h4>
                  <p className="text-sm text-emerald-100/70">
                    {habit.frequency} • streak: {habit.streak}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteHabit(habit.id)}
                className="text-red-400 hover:text-red-300"
                aria-label="Delete Habit"
                title="Delete Habit"
              >
                ✕
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitTracker;
