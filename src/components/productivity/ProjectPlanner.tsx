import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Folder, CheckCircle, Circle, TrendingUp } from 'lucide-react';
import { AIToolLayout } from '../ai/AIToolLayout';
import { useAIChat } from '../ai';

interface Project {
  id: string;
  name: string;
  description: string;
  progress: number;
  timeline: string;
  aiGenerated?: boolean;
  milestones?: string[];
}

const ProjectPlanner: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { messages, isTyping, sendMessage } = useAIChat(
    "👋 I'm your AI Project Co-Pilot! I can help you plan projects, create timelines, and break down complex work. Try: 'Plan a website redesign project'"
  );

  const handleMessage = async (message: string) => {
    await sendMessage(message, { projects });

    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('plan') || lowerMessage.includes('create project') || lowerMessage.includes('start')) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: extractProjectName(message),
        description: `AI-generated project plan based on: "${message}"`,
        progress: 0,
        timeline: calculateTimeline(message),
        aiGenerated: true,
        milestones: generateMilestones(message),
      };
      setProjects(prev => [...prev, newProject]);
    }
  };

  const extractProjectName = (message: string): string => {
    const patterns = [
      /plan (?:a |an )?(.+?)(?:\s+project|\s*$)/i,
      /create (?:a |an )?(.+?)(?:\s+project|\s*$)/i,
      /start (?:a |an )?(.+?)(?:\s+project|\s*$)/i,
    ];

    for (const pattern of patterns) {
      const match = message.match(pattern);
      if (match) return match[1].trim() + ' Project';
    }
    return 'New Project';
  };

  const calculateTimeline = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('quick') || lowerMessage.includes('simple')) return '2-4 weeks';
    if (lowerMessage.includes('complex') || lowerMessage.includes('large')) return '3-6 months';
    return '1-2 months';
  };

  const generateMilestones = (message: string): string[] => {
    return [
      'Project kick-off and planning',
      'Research and requirements gathering',
      'Design and architecture',
      'Development phase',
      'Testing and QA',
      'Launch and deployment',
    ];
  };

  const quickActions = [
    { label: '📊 Plan project', prompt: 'Plan a mobile app development project' },
    { label: '📅 Create timeline', prompt: 'Create a timeline for a website redesign' },
    { label: '🎯 Set milestones', prompt: 'Help me set milestones for my project' },
  ];

  return (
    <AIToolLayout
      messages={messages}
      isTyping={isTyping}
      onSendMessage={handleMessage}
      quickActions={quickActions}
      placeholder="E.g., 'Plan a marketing campaign project'"
      categoryColor="#10b981"
      toolName="AI Project Co-Pilot"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
            <Folder className="w-5 h-5" />
            Active Projects
          </h3>
          <span className="text-sm text-gray-400">{projects.length} projects</span>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>No projects yet</p>
            <p className="text-sm mt-2">Use AI to plan a project!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-200">{project.name}</h4>
                      {project.aiGenerated && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          AI
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{project.description}</p>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>

                <div className="text-xs text-gray-400 mb-3">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  Timeline: {project.timeline}
                </div>

                {project.milestones && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-400 mb-2">Milestones:</p>
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-500">
                        {idx < project.progress / 20 ? (
                          <CheckCircle className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Circle className="w-3 h-3" />
                        )}
                        <span>{milestone}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AIToolLayout>
  );
};

export default ProjectPlanner;
