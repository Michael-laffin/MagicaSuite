import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

type WindowVariant = 'tech' | 'business' | 'creativity' | 'analytics' | 'productivity' | 'marketing' | 'default';
type WindowSize = 'small' | 'medium' | 'large' | 'fullscreen';

interface MagicalToolWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  variant?: WindowVariant;
  size?: WindowSize;
  draggable?: boolean;
}

const variantStyles = {
  tech: {
    border: 'border-emerald-500/20',
    borderHeader: 'border-emerald-500/20',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
      </>
    )
  },
  business: {
    border: 'border-blue-500/20',
    borderHeader: 'border-blue-500/20',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl" />
      </>
    )
  },
  creativity: {
    border: 'border-purple-500/20',
    borderHeader: 'border-purple-500/20',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
      </>
    )
  },
  analytics: {
    border: 'border-orange-500/20',
    borderHeader: 'border-orange-500/20',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-red-500/20 rounded-full blur-3xl" />
      </>
    )
  },
  productivity: {
    border: 'border-green-500/20',
    borderHeader: 'border-green-500/20',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-lime-500/20 rounded-full blur-3xl" />
      </>
    )
  },
  marketing: {
    border: 'border-pink-500/20',
    borderHeader: 'border-pink-500/20',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-rose-500/20 rounded-full blur-3xl" />
      </>
    )
  },
  default: {
    border: 'border-gray-700/50',
    borderHeader: 'border-gray-700/50',
    gradient: 'from-gray-900/95 via-gray-800/95 to-gray-900/95',
    effects: (
      <>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
      </>
    )
  }
};

const sizeStyles = {
  small: 'w-[70vw] max-w-[400px] h-[60vh] max-h-[400px]',
  medium: 'w-[80vw] max-w-[600px] h-[70vh] max-h-[500px]',
  large: 'w-[90vw] max-w-[800px] h-[80vh] max-h-[600px]',
  fullscreen: 'w-[95vw] h-[90vh]'
};

export default function MagicalToolWindow({
  isOpen,
  onClose,
  children,
  title,
  variant = 'default',
  size = 'medium',
  draggable = true
}: MagicalToolWindowProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  // Focus trap and keyboard handling
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      // Focus trap implementation
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
      // Store the last focused element before opening modal
      lastFocusedElement.current = document.activeElement as HTMLElement;
      document.addEventListener('keydown', handleKeyDown);

      // Focus the modal after a brief delay
      setTimeout(() => {
        modalRef.current?.focus();
      }, 0);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the last focused element when closing
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
          {/* Backdrop with blur effect */}
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
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
              y: 20,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            drag={draggable}
            dragConstraints={draggable ? { top: -1000, left: -1000, right: 1000, bottom: 1000 } : undefined}
            className={`fixed top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2 ${currentSize}
                       bg-gradient-to-br ${currentVariant.gradient}
                       rounded-xl ${currentVariant.border} shadow-2xl z-50 overflow-hidden`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 border-b ${currentVariant.borderHeader}`}>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6 text-gray-400" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-4 text-gray-300 overflow-y-auto h-[calc(100%-5rem)]">
              {children}
            </div>

            {/* Magical corner effects */}
            {currentVariant.effects}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
