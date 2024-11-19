import React from 'react';

const ContentCalendar: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <select className="px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50">
          <option>This Week</option>
          <option>Next Week</option>
          <option>This Month</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
          Add Event
        </button>
      </div>
      <div className="space-y-2">
        {[
          { day: 'Mon', content: 'Blog Post: Marketing Tips' },
          { day: 'Wed', content: 'Social Media Campaign' },
          { day: 'Fri', content: 'Email Newsletter' }
        ].map((item, i) => (
          <div key={i} className="flex items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
            <div className="w-16 text-blue-400">{item.day}</div>
            <div className="text-white">{item.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentCalendar;
