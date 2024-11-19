import React from 'react';
import { Calendar, Clock, Users, Video, MapPin } from 'lucide-react';

const MeetingScheduler: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Search meetings..." 
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
        />
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
          Schedule Meeting
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-gray-400 text-sm py-2">
            {day}
          </div>
        ))}
        {Array.from({ length: 35 }, (_, i) => (
          <div 
            key={i} 
            className={`aspect-square p-1 border border-cyan-500/10 rounded-lg ${
              i % 7 === 0 || i % 7 === 6 ? 'bg-gray-800/20' : 'bg-gray-800/30 hover:bg-gray-800/40'
            }`}
          >
            <div className="text-sm text-gray-400">{i + 1}</div>
            {i === 15 && (
              <div className="mt-1 text-[10px] p-0.5 bg-cyan-500/20 text-cyan-400 rounded">
                2 meetings
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <div className="text-white font-medium">Upcoming Meetings</div>
        {[
          {
            title: 'Project Review',
            time: '10:00 AM - 11:00 AM',
            date: 'Jan 16, 2024',
            attendees: 5,
            type: 'video',
            location: 'Zoom Meeting'
          },
          {
            title: 'Client Presentation',
            time: '2:00 PM - 3:30 PM',
            date: 'Jan 16, 2024',
            attendees: 8,
            type: 'in-person',
            location: 'Conference Room A'
          }
        ].map((meeting, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-white font-medium">{meeting.title}</div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {meeting.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {meeting.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Users className="w-4 h-4 mr-2" />
                    {meeting.attendees} attendees
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    {meeting.type === 'video' ? (
                      <Video className="w-4 h-4 mr-2" />
                    ) : (
                      <MapPin className="w-4 h-4 mr-2" />
                    )}
                    {meeting.location}
                  </div>
                </div>
              </div>
              <button className="px-3 py-1.5 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 rounded text-sm transition-colors">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetingScheduler;
