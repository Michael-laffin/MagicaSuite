import React from 'react';

const BrandKit: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
          <div className="text-white mb-2">Colors</div>
          <div className="flex space-x-2">
            <div className="w-6 h-6 rounded-full bg-blue-500"></div>
            <div className="w-6 h-6 rounded-full bg-blue-600"></div>
            <div className="w-6 h-6 rounded-full bg-blue-700"></div>
          </div>
        </div>
        <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
          <div className="text-white mb-2">Fonts</div>
          <div className="text-gray-300 text-sm">Inter, Roboto</div>
        </div>
      </div>
      <div className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
        <div className="text-white mb-2">Logo</div>
        <div className="h-16 bg-gray-700/50 rounded flex items-center justify-center">
          <span className="text-blue-400">Upload Logo</span>
        </div>
      </div>
    </div>
  );
};

export default BrandKit;
