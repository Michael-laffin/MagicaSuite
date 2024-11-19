import React from 'react';

const CloudConsole: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-2">
        <select className="bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40">
          <option>AWS</option>
          <option>Azure</option>
          <option>GCP</option>
        </select>
        <select className="bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40">
          <option>Region: US-East</option>
          <option>Region: US-West</option>
          <option>Region: EU</option>
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
          <p className="text-gray-400">Active Services</p>
          <p className="text-xl text-white">4</p>
        </div>
        <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
          <p className="text-gray-400">Resources</p>
          <p className="text-xl text-white">12</p>
        </div>
      </div>
    </div>
  );
};

export default CloudConsole;
