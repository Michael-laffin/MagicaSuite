import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PomodoroTimer: React.FC = () => {
  type TimerMode = 'work' | 'shortBreak' | 'longBreak';

  interface TimerSettings {
    work: number;
    shortBreak: number;
    longBreak: number;
  }

  interface TimerStats {
    completedPomodoros: number;
    totalWorkTime: number;
  }

  const defaultSettings: TimerSettings = {
    work: 25 * 60, // 25 minutes in seconds
    shortBreak: 5 * 60, // 5 minutes in seconds
    longBreak: 15 * 60, // 15 minutes in seconds
  };

  const [settings, setSettings] = useState<TimerSettings>(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  const [stats, setStats] = useState<TimerStats>(() => {
    const saved = localStorage.getItem('pomodoroStats');
    return saved
      ? JSON.parse(saved)
      : {
          completedPomodoros: 0,
          totalWorkTime: 0,
        };
  });

  const [timeLeft, setTimeLeft] = useState(settings.work);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<TimerMode>('work');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const handleTimerComplete = () => {
    setIsRunning(false);
    playNotificationSound();
    showNotification();

    if (mode === 'work') {
      setStats((prev) => ({
        completedPomodoros: prev.completedPomodoros + 1,
        totalWorkTime: prev.totalWorkTime + settings.work,
      }));
      
      if (stats.completedPomodoros % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(settings.longBreak);
      } else {
        setMode('shortBreak');
        setTimeLeft(settings.shortBreak);
      }
    } else {
      setMode('work');
      setTimeLeft(settings.work);
    }
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification-sound.mp3'); // Make sure this file exists
    audio.play().catch((error) => console.log('Error playing sound:', error));
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: `${mode === 'work' ? 'Take a break!' : 'Back to work!'}`,
        icon: '/favicon.ico', // Make sure this file exists
      });
    }
  };

  const toggleTimer = () => {
    if (!isRunning && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(settings[newMode]);
  };

  const updateSettings = (key: keyof TimerSettings, minutes: number) => {
    setSettings((prev) => ({
      ...prev,
      [key]: Math.max(1, minutes) * 60,
    }));
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Timer Display */}
      <div className="text-center">
        <motion.div
          className="text-6xl font-bold text-white mb-4"
          key={timeLeft}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatTime(timeLeft)}
        </motion.div>

        {/* Mode Selector */}
        <div className="flex justify-center space-x-2 mb-4">
          {(['work', 'shortBreak', 'longBreak'] as TimerMode[]).map((timerMode) => (
            <button
              key={timerMode}
              onClick={() => switchMode(timerMode)}
              className={`px-4 py-2 rounded-lg ${
                mode === timerMode
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {timerMode === 'work'
                ? 'Work'
                : timerMode === 'shortBreak'
                ? 'Short Break'
                : 'Long Break'}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-2">
          <button
            onClick={toggleTimer}
            className={`px-6 py-2 rounded-lg ${
              isRunning
                ? 'bg-red-600 hover:bg-red-500'
                : 'bg-emerald-600 hover:bg-emerald-500'
            } text-white`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetTimer}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
          >
            Reset
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg text-white"
          >
            Settings
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-2 p-4 rounded-lg bg-gray-800/30 border border-emerald-500/10"
        >
          <h3 className="text-lg font-semibold text-white mb-2">Timer Settings</h3>
          <div className="space-y-2">
            {Object.entries(settings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-white">
                  {key === 'work'
                    ? 'Work Time'
                    : key === 'shortBreak'
                    ? 'Short Break'
                    : 'Long Break'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={Math.floor(value / 60)}
                  onChange={(e) =>
                    updateSettings(key as keyof TimerSettings, parseInt(e.target.value))
                  }
                  className="w-20 px-2 py-1 rounded bg-gray-700 text-white border border-emerald-500/20"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <div className="text-center space-y-1">
        <p className="text-emerald-100/70">
          Completed Pomodoros: {stats.completedPomodoros}
        </p>
        <p className="text-emerald-100/70">
          Total Work Time: {Math.floor(stats.totalWorkTime / 3600)}h{' '}
          {Math.floor((stats.totalWorkTime % 3600) / 60)}m
        </p>
      </div>
    </div>
  );
};

export default PomodoroTimer;
