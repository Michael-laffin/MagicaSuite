import React from 'react';
import { User, Mail, Phone, MapPin, Star } from 'lucide-react';

const TeamManagement: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Search team members..." 
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
        />
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
          Add Member
        </button>
      </div>

      <div className="space-y-3">
        {[
          {
            name: 'Sarah Johnson',
            role: 'Senior Developer',
            email: 'sarah.j@company.com',
            phone: '+1 234-567-8901',
            location: 'San Francisco, CA',
            rating: 4.8
          },
          {
            name: 'Michael Chen',
            role: 'UI/UX Designer',
            email: 'michael.c@company.com',
            phone: '+1 234-567-8902',
            location: 'New York, NY',
            rating: 4.5
          }
        ].map((member, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div>
                  <div className="text-white font-medium">{member.name}</div>
                  <div className="text-cyan-400 text-sm">{member.role}</div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    {member.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    {member.location}
                  </div>
                </div>
              </div>
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 mr-1" />
                <span className="text-sm">{member.rating}</span>
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 px-3 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded text-sm transition-colors">
                View Profile
              </button>
              <button className="flex-1 px-3 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded text-sm transition-colors">
                Send Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManagement;
