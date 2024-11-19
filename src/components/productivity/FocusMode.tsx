import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FocusMode: React.FC = () => {
  const [isFocusMode, setIsFocusMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('isFocusMode');
    return saved ? JSON.parse(saved) : false;
  });
  const [options, setOptions] = useState({
    blockNotifications: localStorage.getItem('blockNotifications') === 'true',
    whiteNoise: localStorage.getItem('whiteNoise') === 'true',
  });

  useEffect(() => {
    localStorage.setItem('isFocusMode', JSON.stringify(isFocusMode));
    if (options.blockNotifications) {
      // Request permission if not already granted
      if (Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
      // Block notifications by overriding the Notification API
      if (isFocusMode) {
        const originalNotify = window.Notification;
        (window as any).Notification = function () {
          console.log('Notification blocked by Focus Mode.');
        };
        return () => {
          window.Notification = originalNotify;
        };
      }
    } else {
      // Restore original Notification API
      const originalNotify = window.Notification;
      (window as any).Notification = originalNotify;
    }
  }, [isFocusMode, options.blockNotifications]);

  useEffect(() => {
    localStorage.setItem('blockNotifications', options.blockNotifications.toString());
    if (options.whiteNoise) {
      const audio = new Audio('/white-noise.mp3'); // Ensure this file exists in your public folder
      audio.loop = true;
      audio.volume = 0.2;
      audio.play();
      return () => {
        audio.pause();
      };
    }
  }, [options.whiteNoise]);

  const toggleFocusMode = () => setIsFocusMode(!isFocusMode);
  const toggleOption = (option: keyof typeof options) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-emerald-500/10">
        <span className="text-white">Focus Mode</span>
        <button
          onClick={toggleFocusMode}
          className="w-12 h-6 bg-emerald-600 rounded-full relative cursor-pointer transition-colors"
        >
          <motion.div
            className="absolute w-5 h-5 bg-white rounded-full top-0.5 left-0.5"
            animate={{ x: isFocusMode ? 36 : 0 }}
            transition={{ type: 'spring', stiffness: 700, damping: 30 }}
          />
        </button>
      </div>
      {isFocusMode && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-gray-300">
            <span>Block Notifications</span>
            <input
              type="checkbox"
              checked={options.blockNotifications}
              onChange={() => toggleOption('blockNotifications')}
              className="accent-emerald-500"
              aria-label="Block Notifications"
            />
          </div>
          <div className="flex items-center justify-between text-gray-300">
            <span>White Noise</span>
            <input
              type="checkbox"
              checked={options.whiteNoise}
              onChange={() => toggleOption('whiteNoise')}
              className="accent-emerald-500"
              aria-label="White Noise"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusMode;
