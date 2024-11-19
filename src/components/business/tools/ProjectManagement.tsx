import React from 'react';
import { Calendar, CheckSquare, Clock } from 'lucide-react';

const ProjectManagement: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Search projects..." 
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
        />
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
          New Project
        </button>
      </div>
      <div className="space-y-3">
        {[
          { 
            name: 'Website Redesign', 
            progress: 75, 
            dueDate: '2024-02-15',
            tasks: 12,
            completed: 9
          },
          { 
            name: 'Mobile App Development', 
            progress: 30, 
            dueDate: '2024-03-01',
            tasks: 20,
            completed: 6
          }
        ].map((project, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-white font-medium">{project.name}</div>
                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.dueDate}
                  </div>
                  <div className="flex items-center">
                    <CheckSquare className="w-4 h-4 mr-1" />
                    {project.completed}/{project.tasks}
                  </div>
                </div>
              </div>
              <div className="text-cyan-400">
                {project.progress}%
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-cyan-500 rounded-full h-2 transition-all duration-300"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManagement;
