import React from 'react';

const EmailCampaigns: React.FC = () => {
  return (
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Campaign Name" 
        className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50"
      />
      <div className="space-y-2">
        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
          <span className="text-white">Welcome Series</span>
          <div className="text-blue-400">32% Open Rate</div>
        </div>
        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
          <span className="text-white">Newsletter</span>
          <div className="text-blue-400">28% Open Rate</div>
        </div>
      </div>
      <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
        Create Campaign
      </button>
    </div>
  );
};

export default EmailCampaigns;
