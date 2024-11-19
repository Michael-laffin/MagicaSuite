import React from 'react';
import { Users, Calendar, Clock, Briefcase } from 'lucide-react';

const ResourcePlanning: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: 'Team Members', value: '12', icon: Users },
          { title: 'Active Projects', value: '8', icon: Briefcase },
          { title: 'Hours Allocated', value: '320', icon: Clock },
          { title: 'Available Hours', value: '160', icon: Calendar }
        ].map((stat, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex items-center space-x-3">
              <stat.icon className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-gray-400 text-sm">{stat.title}</div>
                <div className="text-white font-medium">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {[
          {
            name: 'Development Team',
            allocation: 85,
            members: ['John D.', 'Sarah M.', 'Mike R.'],
            projects: ['Website Redesign', 'Mobile App']
          },
          {
            name: 'Design Team',
            allocation: 70,
            members: ['Emma S.', 'Chris P.'],
            projects: ['Brand Refresh', 'UI/UX Update']
          }
        ].map((team, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-white font-medium">{team.name}</div>
                <div className="text-sm text-gray-400 mt-1">
                  {team.members.join(', ')}
                </div>
              </div>
              <div className="text-cyan-400">{team.allocation}%</div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className="bg-cyan-500 rounded-full h-2 transition-all duration-300"
                style={{ width: `${team.allocation}%` }}
              />
            </div>
            <div className="text-sm text-gray-400">
              Projects: {team.projects.join(', ')}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
        Manage Resources
      </button>
    </div>
  );
};

export default ResourcePlanning;
