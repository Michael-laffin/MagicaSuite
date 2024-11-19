import React from 'react';

const DevOpsDashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
          <p className="text-gray-400">Build Status</p>
          <p className="text-green-400">Passing</p>
        </div>
        <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
          <p className="text-gray-400">Deployments</p>
          <p className="text-purple-400">3/3 Success</p>
        </div>
        <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
          <p className="text-gray-400">Tests</p>
          <p className="text-purple-400">100% Pass</p>
        </div>
        <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
          <p className="text-gray-400">Pipeline</p>
          <p className="text-green-400">Active</p>
        </div>
      </div>
    </div>
  );
};

export default DevOpsDashboard;
