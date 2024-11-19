import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicalToolWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const MagicalToolWindow: React.FC<MagicalToolWindowProps> = ({ isOpen, onClose, children, title }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (isOpen) {
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      lastFocusedElement.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with lighter blur effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
            onClick={onClose}
          />
          {/* Tool Window */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25,
              },
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 20,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25,
              },
            }}
            drag
            dragConstraints={{ top: -1000, left: -1000, right: 1000, bottom: 1000 }}
            className="fixed top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[80vh] max-h-[600px] 
                       bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 
                       rounded-xl border border-gray-700/50 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-emerald-500/20">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            {/* Content */}
            <div className="p-4 text-gray-300 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MagicalToolWindow;
