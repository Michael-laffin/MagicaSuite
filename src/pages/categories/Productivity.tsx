import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import MagicalToolWindow from '../../components/shared/MagicalToolWindow';

// Import the individual tools
import TaskManager from '../../components/productivity/TaskManager';
import TimeTracker from '../../components/productivity/TimeTracker';
import FocusMode from '../../components/productivity/FocusMode';
import ProjectPlanner from '../../components/productivity/ProjectPlanner';
import NoteTaking from '../../components/productivity/NoteTaking';
import Calendar from '../../components/productivity/Calendar';
import HabitTracker from '../../components/productivity/HabitTracker';
import GoalSetting from '../../components/productivity/GoalSetting';
import PomodoroTimer from '../../components/productivity/PomodoroTimer';
import TaskAnalytics from '../../components/productivity/TaskAnalytics';

export default function Productivity() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    { name: 'Task Manager', description: 'Organize and track your tasks efficiently.' },
    { name: 'Time Tracker', description: 'Monitor and optimize your time usage.' },
    { name: 'Focus Mode', description: 'Eliminate distractions and stay focused.' },
    { name: 'Project Planner', description: 'Plan and manage your projects effectively.' },
    { name: 'Note Taking', description: 'Take and organize notes seamlessly.' },
    { name: 'Calendar', description: 'Schedule and manage your time.' },
    { name: 'Habit Tracker', description: 'Build and maintain productive habits.' },
    { name: 'Goal Setting', description: 'Set and track your goals.' },
    { name: 'Pomodoro Timer', description: 'Work in focused time intervals.' },
    { name: 'Task Analytics', description: 'Analyze your productivity patterns.' },
  ];

  const renderToolContent = (toolName: string) => {
    switch (toolName) {
      case 'Task Manager':
        return <TaskManager />;
      case 'Time Tracker':
        return <TimeTracker />;
      case 'Focus Mode':
        return <FocusMode />;
      case 'Project Planner':
        return <ProjectPlanner />;
      case 'Note Taking':
        return <NoteTaking />;
      case 'Calendar':
        return <Calendar />;
      case 'Habit Tracker':
        return <HabitTracker />;
      case 'Goal Setting':
        return <GoalSetting />;
      case 'Pomodoro Timer':
        return <PomodoroTimer />;
      case 'Task Analytics':
        return <TaskAnalytics />;
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-lg">{toolName} content coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden">
      {/* Background and floating particles (same as your original code) */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-emerald-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Productivity Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-emerald-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-emerald-300/60">Boost your efficiency and focus</p>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              onClick={() => setActiveTool(tool.name)}
              onMouseEnter={() => setHoveredTool(tool.name)}
              onMouseLeave={() => setHoveredTool(null)}
              whileHover={{ scale: 1.02 }}
              className={`
                relative group
                glass-effect
                bg-gradient-to-br from-emerald-900/30 via-emerald-800/20 to-emerald-900/30
                p-6 rounded-xl
                border border-emerald-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-emerald-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-emerald-400/10 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-emerald-100/70 group-hover:text-emerald-50/90 transition-colors duration-500">
                  {tool.description}
                </p>
              </div>
              {/* Magical effects */}
              {hoveredTool === tool.name && (
                <>
                  <div className="absolute -top-2 -right-2 animate-sparkle">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                    <Sparkles className="h-3 w-3 text-emerald-400" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Magical Tool Window */}
        <MagicalToolWindow isOpen={activeTool !== null} onClose={() => setActiveTool(null)} title={activeTool || ''} variant="productivity">
          {activeTool && renderToolContent(activeTool)}
        </MagicalToolWindow>
      </div>
    </div>
  );
}
