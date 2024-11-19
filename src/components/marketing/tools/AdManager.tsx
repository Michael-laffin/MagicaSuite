import React from 'react';

const AdManager: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <select className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50">
          <option>Facebook Ads</option>
          <option>Google Ads</option>
          <option>LinkedIn Ads</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
          Create Ad
        </button>
      </div>
      <div className="space-y-2">
        {[
          { campaign: 'Summer Sale', budget: '$500', status: 'Active' },
          { campaign: 'Product Launch', budget: '$1000', status: 'Scheduled' }
        ].map((ad, i) => (
          <div key={i} className="p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
            <div className="flex justify-between items-center">
              <span className="text-white">{ad.campaign}</span>
              <span className="text-blue-400">{ad.budget}</span>
            </div>
            <div className="text-sm text-gray-400 mt-1">{ad.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdManager;
