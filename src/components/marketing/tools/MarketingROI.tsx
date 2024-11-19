import React from 'react';

const MarketingROI: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
          <div className="text-gray-400">Total Spend</div>
          <div className="text-white text-lg">$12,500</div>
          <div className="text-sm text-blue-400">This Month</div>
        </div>
        <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
          <div className="text-gray-400">Revenue</div>
          <div className="text-white text-lg">$45,000</div>
          <div className="text-sm text-blue-400">This Month</div>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
        <div className="flex justify-between items-center">
          <span className="text-white">ROI</span>
          <span className="text-green-400">360%</span>
        </div>
        <div className="mt-2 bg-gray-700 h-2 rounded-full">
          <div className="bg-blue-500 h-full rounded-full" style={{width: '78%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default MarketingROI;
