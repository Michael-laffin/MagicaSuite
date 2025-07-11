import React, { useState, useRef } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import MagicalToolWindow
import MagicalToolWindow from '../../components/shared/MagicalToolWindow';

// Import all tool components
import DesignCanvas from '../../components/creativity/tools/DesignCanvas';
import ColorPaletteGenerator from '../../components/creativity/tools/ColorPaletteGenerator';
import FontPairer from '../../components/creativity/tools/FontPairer';
import ImageEditor from '../../components/creativity/tools/ImageEditor';
import IconCreator from '../../components/creativity/tools/IconCreator';
import MockupGenerator from '../../components/creativity/tools/MockupGenerator';
import AnimationCreator from '../../components/creativity/tools/AnimationCreator';
import TemplateLibrary from '../../components/creativity/tools/TemplateLibrary';
import InspirationBoard from '../../components/creativity/tools/InspirationBoard';
import StyleGuideGenerator from '../../components/creativity/tools/StyleGuideGenerator';
import DefaultTool from '../../components/creativity/tools/DefaultTool';

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

  // Mapping tool names to their respective components
  const toolComponents: { [key: string]: React.FC } = {
    'Design Canvas': DesignCanvas,
    'Color Palette Generator': ColorPaletteGenerator,
    'Font Pairer': FontPairer,
    'Image Editor': ImageEditor,
    'Icon Creator': IconCreator,
    'Mockup Generator': MockupGenerator,
    'Animation Creator': AnimationCreator,
    'Template Library': TemplateLibrary,
    'Inspiration Board': InspirationBoard,
    'Style Guide Generator': StyleGuideGenerator
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
            <MagicalToolWindow
              isOpen={true}
              onClose={() => setActiveTool(null)}
              title={activeTool}
              variant="creativity"
            >
              {activeTool && toolComponents[activeTool] && 
                React.createElement(toolComponents[activeTool])
              }
            </MagicalToolWindow>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
