import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

interface ToolCardProps {
  name: string;
  description: string;
  children?: React.ReactNode;
}

export function ToolCard({ name, description, children }: ToolCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
      >
        <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
        <p className="text-gray-400">{description}</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-gray-800 rounded-xl w-full max-w-2xl mx-4 relative overflow-hidden shadow-2xl transform transition-all animate-modalEntry"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">{name}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-gray-700 rounded-full"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
