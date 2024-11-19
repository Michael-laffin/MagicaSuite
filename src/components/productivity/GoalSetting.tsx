import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GoalSetting: React.FC = () => {
  interface Goal {
    id: number;
    title: string;
    description?: string;
    deadline?: string;
    status: 'pending' | 'in-progress' | 'completed';
    progress: number;
    subgoals: SubGoal[];
  }

  interface SubGoal {
    id: number;
    title: string;
    completed: boolean;
  }

  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('goals');
    return saved ? JSON.parse(saved) : [];
  });
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalDescription, setNewGoalDescription] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [newSubGoalTitle, setNewSubGoalTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (newGoalTitle.trim() === '') return;
    const newGoal: Goal = {
      id: Date.now(),
      title: newGoalTitle.trim(),
      description: newGoalDescription.trim(),
      deadline: newGoalDeadline,
      status: 'pending',
      progress: 0,
      subgoals: [],
    };
    setGoals([...goals, newGoal]);
    setNewGoalTitle('');
    setNewGoalDescription('');
    setNewGoalDeadline('');
  };

  const deleteGoal = (id: number) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id));
    if (selectedGoal?.id === id) {
      setSelectedGoal(null);
    }
  };

  const addSubGoal = () => {
    if (!selectedGoal || newSubGoalTitle.trim() === '') return;
    const newSubGoal: SubGoal = {
      id: Date.now(),
      title: newSubGoalTitle.trim(),
      completed: false,
    };
    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === selectedGoal.id
          ? { ...goal, subgoals: [...goal.subgoals, newSubGoal] }
          : goal
      )
    );
    setNewSubGoalTitle('');
  };

  const toggleSubGoalCompletion = (goalId: number, subGoalId: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;

        const updatedSubgoals = goal.subgoals.map((subgoal) =>
          subgoal.id === subGoalId ? { ...subgoal, completed: !subgoal.completed } : subgoal
        );

        const completedSubgoals = updatedSubgoals.filter((subgoal) => subgoal.completed).length;
        const progress = (completedSubgoals / updatedSubgoals.length) * 100;
        const status =
          progress === 0 ? 'pending' : progress === 100 ? 'completed' : 'in-progress';

        return {
          ...goal,
          subgoals: updatedSubgoals,
          progress,
          status,
        };
      })
    );
  };

  const deleteSubGoal = (goalId: number, subGoalId: number) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id !== goalId) return goal;

        const updatedSubgoals = goal.subgoals.filter((subgoal) => subgoal.id !== subGoalId);
        const completedSubgoals = updatedSubgoals.filter((subgoal) => subgoal.completed).length;
        const progress =
          updatedSubgoals.length > 0 ? (completedSubgoals / updatedSubgoals.length) * 100 : 0;
        const status =
          progress === 0 ? 'pending' : progress === 100 ? 'completed' : 'in-progress';

        return {
          ...goal,
          subgoals: updatedSubgoals,
          progress,
          status,
        };
      })
    );
  };

  const getStatusColor = (status: Goal['status']) => {
    switch (status) {
      case 'pending':
        return 'text-gray-400';
      case 'in-progress':
        return 'text-emerald-400';
      case 'completed':
        return 'text-emerald-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Add New Goal */}
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Goal title..."
          value={newGoalTitle}
          onChange={(e) => setNewGoalTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
        />
        <textarea
          placeholder="Goal description (optional)..."
          value={newGoalDescription}
          onChange={(e) => setNewGoalDescription(e.target.value)}
          className="w-full h-20 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white resize-none"
        ></textarea>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={newGoalDeadline}
            onChange={(e) => setNewGoalDeadline(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
          />
          <button
            onClick={addGoal}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-2">
        {goals.length === 0 ? (
          <p className="text-center text-gray-400">No goals added yet.</p>
        ) : (
          goals.map((goal) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 rounded-lg bg-gray-800/30 border border-emerald-500/10"
            >
              <div className="flex items-center justify-between">
                <div
                  onClick={() => setSelectedGoal(selectedGoal?.id === goal.id ? null : goal)}
                  className="flex-1 cursor-pointer"
                >
                  <h4 className="text-white font-medium">{goal.title}</h4>
                  {goal.description && (
                    <p className="text-emerald-100/70 mt-1">{goal.description}</p>
                  )}
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`text-sm ${getStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                    {goal.deadline && (
                      <span className="text-sm text-gray-400">• due {goal.deadline}</span>
                    )}
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-2 bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 rounded-full h-2 transition-all duration-300"
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="ml-4 text-red-400 hover:text-red-300"
                  aria-label="Delete Goal"
                  title="Delete Goal"
                >
                  ✕
                </button>
              </div>

              {/* Subgoals */}
              {selectedGoal?.id === goal.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 space-y-2"
                >
                  {/* Add Subgoal */}
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="New subgoal..."
                      value={newSubGoalTitle}
                      onChange={(e) => setNewSubGoalTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') addSubGoal();
                      }}
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-emerald-500/20 text-white"
                    />
                    <button
                      onClick={addSubGoal}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white"
                    >
                      Add
                    </button>
                  </div>

                  {/* Subgoals List */}
                  <div className="space-y-1">
                    {goal.subgoals.length === 0 ? (
                      <p className="text-gray-400">No subgoals added yet.</p>
                    ) : (
                      goal.subgoals.map((subgoal) => (
                        <div
                          key={subgoal.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-800/30"
                        >
                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={subgoal.completed}
                              onChange={() => toggleSubGoalCompletion(goal.id, subgoal.id)}
                              className="accent-emerald-500"
                            />
                            <span
                              className={`text-white ${
                                subgoal.completed ? 'line-through text-gray-500' : ''
                              }`}
                            >
                              {subgoal.title}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteSubGoal(goal.id, subgoal.id)}
                            className="text-red-400 hover:text-red-300"
                            aria-label="Delete Subgoal"
                            title="Delete Subgoal"
                          >
                            ✕
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default GoalSetting;
