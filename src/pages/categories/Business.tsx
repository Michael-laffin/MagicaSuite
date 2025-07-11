// src/Components/business/Business.tsx

import React, { useState } from 'react';
import { Zap, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import MagicalToolWindow
import MagicalToolWindow from "../../components/shared/MagicalToolWindow";

// Import all tool components
import FinancialDashboard from "../../components/business/tools/FinancialDashboard";
import InvoiceGenerator from "../../components/business/tools/InvoiceGenerator";
import ClientCRM from "../../components/business/tools/ClientCRM";
import ProjectManagement from "../../components/business/tools/ProjectManagement";
import BusinessAnalytics from "../../components/business/tools/BusinessAnalytics";
import ResourcePlanning from "../../components/business/tools/ResourcePlanning";
import TeamManagement from "../../components/business/tools/TeamManagement";
import ExpenseTracker from "../../components/business/tools/ExpenseTracker";
import MeetingScheduler from "../../components/business/tools/MeetingScheduler";
import DocumentManager from "../../components/business/tools/DocumentManager";

const Business: React.FC = () => {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const tools = [
    {
      name: 'Financial Dashboard',
      description: 'Track revenue and expenses.'
    },
    {
      name: 'Invoice Generator',
      description: 'Create professional invoices.'
    },
    {
      name: 'Client CRM',
      description: 'Manage customer relationships.'
    },
    {
      name: 'Project Management',
      description: 'Plan and track projects.'
    },
    {
      name: 'Business Analytics',
      description: 'Analyze business performance.'
    },
    {
      name: 'Resource Planning',
      description: 'Manage business resources.'
    },
    {
      name: 'Team Management',
      description: 'Manage team members.'
    },
    {
      name: 'Expense Tracker',
      description: 'Track business expenses.'
    },
    {
      name: 'Meeting Scheduler',
      description: 'Organize business meetings.'
    },
    {
      name: 'Document Manager',
      description: 'Store and organize files.'
    }
  ];

  // Mapping tool names to their respective components
  const toolComponents: { [key: string]: React.FC } = {
    'Financial Dashboard': FinancialDashboard,
    'Invoice Generator': InvoiceGenerator,
    'Client CRM': ClientCRM,
    'Project Management': ProjectManagement,
    'Business Analytics': BusinessAnalytics,
    'Resource Planning': ResourcePlanning,
    'Team Management': TeamManagement,
    'Expense Tracker': ExpenseTracker,
    'Meeting Scheduler': MeetingScheduler,
    'Document Manager': DocumentManager
    // Add more mappings as you create new tools
  };

  const renderToolContent = (toolName: string) => {
    const ToolComponent = toolComponents[toolName];
    if (ToolComponent) {
      return <ToolComponent />;
    }
    return <div>Tool not found: {toolName}</div>;
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden">
      {/* Magical Background with category-specific color */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-cyan-800/10 to-cyan-900/20 backdrop-blur-md" />
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
              color: 'rgba(34, 211, 238, 0.3)',
              animationDelay: `${Math.random() * 2}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Content Container with glass effect */}
      <div className="relative">
        {/* Header with magical effects */}
        <div className="flex items-center mb-8 relative">
          <div className="absolute -left-3 -top-3 w-16 h-16 bg-cyan-500/10 rounded-full blur-xl animate-pulse" />
          <div className="relative flex items-center">
            <Zap className="h-10 w-10 text-cyan-400 mr-4 animate-float" />
            <div>
              <h1 className="text-3xl font-bold text-white mb-1 relative group">
                Business Tools
                <span className="absolute -top-1 -right-2">
                  <Sparkles className="h-4 w-4 text-cyan-400 animate-sparkle" />
                </span>
              </h1>
              <p className="text-cyan-300/60">Streamline your business operations</p>
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
                bg-gradient-to-br from-cyan-900/30 via-cyan-800/20 to-cyan-900/30
                p-6 rounded-xl
                border border-purple-500/20
                transition-all duration-500
                cursor-pointer
                overflow-hidden
                hover:border-cyan-400/40
                ${hoveredTool === tool.name ? 'magic-border-glow' : ''}
              `}
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-cyan-400/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
　　 　　　　　
              {/* Content */}
              <div className="relative">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:magic-text-glow transition-all duration-500">
                  {tool.name}
                </h3>
                <p className="text-cyan-100/70 group-hover:text-cyan-50/90 transition-colors duration-500">
                  {tool.description}
                </p>
              </div>

              {/* Magical effects */}
              {hoveredTool === tool.name && (
                <>
                  <div className="absolute -top-2 -right-2 animate-sparkle">
                    <Sparkles className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div className="absolute bottom-0 right-1/4 translate-y-1/2 animate-sparkle animation-delay-2000">
                    <Sparkles className="h-3 w-3 text-cyan-400" />
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>

        {/* Magical Tool Window */}
        <MagicalToolWindow
          isOpen={activeTool !== null}
          onClose={() => setActiveTool(null)}
          title={activeTool || ''}
          variant="business"
        >
          {activeTool && renderToolContent(activeTool)}
        </MagicalToolWindow>
      </div>
    </div>
  );
};

export default Business;
