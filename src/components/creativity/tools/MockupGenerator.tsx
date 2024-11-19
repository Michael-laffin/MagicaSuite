import React, { useState } from 'react';

const MockupGenerator: React.FC = () => {
  const [selectedDevice, setSelectedDevice] = useState<'Desktop' | 'Mobile' | 'Tablet'>('Desktop');

  return (
    <div className="h-full">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setSelectedDevice('Desktop')}
          className={`px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300 ${
            selectedDevice === 'Desktop' ? 'bg-orange-500/30' : ''
          }`}
        >
          Desktop
        </button>
        <button
          onClick={() => setSelectedDevice('Mobile')}
          className={`px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300 ${
            selectedDevice === 'Mobile' ? 'bg-orange-500/30' : ''
          }`}
        >
          Mobile
        </button>
        <button
          onClick={() => setSelectedDevice('Tablet')}
          className={`px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300 ${
            selectedDevice === 'Tablet' ? 'bg-orange-500/30' : ''
          }`}
        >
          Tablet
        </button>
      </div>
      <div className="border border-gray-600 rounded-lg h-40 flex items-center justify-center">
        Preview Area - {selectedDevice}
      </div>
    </div>
  );
};

export default MockupGenerator;
