import React, { useState, useRef } from 'react';
import { Zap, Sparkles, Palette, Type, Image, Box, Play, Layout, Lightbulb, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MagicalToolWindowProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const MagicalToolWindow: React.FC<MagicalToolWindowProps> = ({ isOpen, onClose, children, title }) => {
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
            className="fixed top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[40vh] max-h-[400px] 
                     bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 
                     rounded-xl border border-blue-500/20 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-4 text-gray-300">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default function Creativity() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [selectedFont, setSelectedFont] = useState('Arial');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const tools = [
    {
      name: 'Design Canvas',
      description: 'Create beautiful designs easily.'
    },
    {
      name: 'Color Palette Generator',
      description: 'Generate harmonious color schemes.'
    },
    {
      name: 'Font Pairer',
      description: 'Find perfect font combinations.'
    },
    {
      name: 'Image Editor',
      description: 'Edit and enhance images.'
    },
    {
      name: 'Icon Creator',
      description: 'Design custom icons.'
    },
    {
      name: 'Mockup Generator',
      description: 'Create realistic mockups.'
    },
    {
      name: 'Animation Creator',
      description: 'Design smooth animations.'
    },
    {
      name: 'Template Library',
      description: 'Access pre-made designs.'
    },
    {
      name: 'Inspiration Board',
      description: 'Collect and organize ideas.'
    },
    {
      name: 'Style Guide Generator',
      description: 'Create brand style guides.'
    }
  ];

  const renderToolContent = (toolName: string) => {
    switch (toolName) {
      case 'Design Canvas':
        return (
          <div className="h-full flex flex-col">
            <canvas
              ref={canvasRef}
              className="border border-gray-600 rounded-lg w-full h-48 mb-4 bg-white/10"
            />
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                Draw
              </button>
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                Clear
              </button>
            </div>
          </div>
        );

      case 'Color Palette Generator':
        return (
          <div className="h-full">
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="mb-4"
            />
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 rounded-lg"
                  style={{
                    backgroundColor: selectedColor,
                    opacity: (i + 1) * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'Font Pairer':
        return (
          <div className="h-full">
            <select
              value={selectedFont}
              onChange={(e) => setSelectedFont(e.target.value)}
              className="w-full p-2 mb-4 bg-gray-800 rounded-md"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Helvetica">Helvetica</option>
            </select>
            <p style={{ fontFamily: selectedFont }} className="text-lg">
              Sample Text in {selectedFont}
            </p>
          </div>
        );

      case 'Image Editor':
        return (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center w-full">
              <p className="mb-2">Drop an image here or</p>
              <button className="px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                Browse Files
              </button>
            </div>
          </div>
        );

      case 'Icon Creator':
        return (
          <div className="h-full grid grid-cols-3 gap-4">
            {['square', 'circle', 'triangle'].map((shape) => (
              <div
                key={shape}
                className="aspect-square bg-orange-500/20 rounded-lg flex items-center justify-center hover:bg-orange-500/30 cursor-pointer"
              >
                {shape}
              </div>
            ))}
          </div>
        );

      case 'Mockup Generator':
        return (
          <div className="h-full">
            <div className="flex gap-4 mb-4">
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                Desktop
              </button>
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                Mobile
              </button>
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                Tablet
              </button>
            </div>
            <div className="border border-gray-600 rounded-lg h-40 flex items-center justify-center">
              Preview Area
            </div>
          </div>
        );

      case 'Animation Creator':
        return (
          <div className="h-full">
            <div className="flex gap-4 mb-4">
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                ▶ Play
              </button>
              <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
                ■ Stop
              </button>
            </div>
            <div className="border border-gray-600 rounded-lg h-40 flex items-center justify-center">
              Animation Preview
            </div>
          </div>
        );

      case 'Template Library':
        return (
          <div className="h-full grid grid-cols-2 gap-4">
            {['Blog', 'Social Media', 'Presentation', 'Business Card'].map((template) => (
              <div
                key={template}
                className="p-4 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 cursor-pointer"
              >
                {template}
              </div>
            ))}
          </div>
        );

      case 'Inspiration Board':
        return (
          <div className="h-full grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-orange-500/20 rounded-lg flex items-center justify-center hover:bg-orange-500/30 cursor-pointer"
              >
                + Add Image
              </div>
            ))}
          </div>
        );

      case 'Style Guide Generator':
        return (
          <div className="h-full">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Brand Name"
                className="w-full p-2 bg-gray-800 rounded-md"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-500/20 rounded-lg">Colors</div>
              <div className="p-4 bg-orange-500/20 rounded-lg">Typography</div>
              <div className="p-4 bg-orange-500/20 rounded-lg">Logo Usage</div>
              <div className="p-4 bg-orange-500/20 rounded-lg">Components</div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400 text-lg">
              {toolName} content coming soon...
            </p>
          </div>
        );
    }
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden">
      {/* Magical Background with category-specific color */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-orange-800/10 to-orange-900/20 backdrop-blur-md" />
      <div className="absolute inset-0 animated-gradient opacity-10" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="magic-particle"
            style={{
              '--x': Math.random() * 2 - 1,
              '--y': -(Math.random() * 2),
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              color: 'rgba(249, 115, 22, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as any}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-orange-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-orange-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Creativity Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-orange-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-orange-300/60">Unleash your creative potential</p>
            </div>
          </div>
        </div>

        {/* Tools grid with enhanced magical styling */}
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
                bg-gradient-to-br from-orange-900/30 via-orange-800/20 to-orange-900/30
                p-6 rounded-xl
                border border-orange-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-orange-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-orange-400/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-orange-100/70 group-hover:text-orange-50/90 transition-colors duration-500">
                  {tool.description}
                </p>
              </div>

              {/* Magical effects */}
              {hoveredTool === tool.name && (
                <>
                  <div className="absolute -top-2 -right-2 animate-sparkle">
                    <Sparkles className="h-4 w-4 text-orange-400" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                    <Sparkles className="h-3 w-3 text-orange-400" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Magical Tool Window */}
        <AnimatePresence>
          {activeTool !== null && (
            <>
              {/* Backdrop with lighter blur effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
                onClick={() => setActiveTool(null)}
              />

              {/* Tool Window */}
              <motion.div
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
                className="fixed top-[30%] left-[40%] -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[500px] h-[40vh] max-h-[400px] 
                       bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 
                       rounded-xl border border-blue-500/20 shadow-2xl z-50 overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-blue-500/20">
                  <h3 className="text-lg font-semibold text-white">{activeTool}</h3>
                  <button
                    onClick={() => setActiveTool(null)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="p-4 text-gray-300">
                  {activeTool && renderToolContent(activeTool)}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
