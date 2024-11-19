import React from 'react';

const LeadGenerator: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-gray-800/30 border border-blue-500/10">
        <h3 className="text-white font-semibold mb-2">Active Forms</h3>
        <div className="space-y-2">
          {[
            { name: 'Newsletter Signup', conversions: 45 },
            { name: 'Free Trial', conversions: 23 },
            { name: 'Contact Form', conversions: 12 }
          ].map((form, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-gray-300">{form.name}</span>
              <span className="text-blue-400">{form.conversions} leads</span>
            </div>
          ))}
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
        Create New Form
      </button>
    </div>
  );
};

export default LeadGenerator;
