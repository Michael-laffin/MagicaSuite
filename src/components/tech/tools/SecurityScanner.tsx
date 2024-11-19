import React from 'react';

const SecurityScanner: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex justify-between items-center bg-gray-900 p-4 rounded-md border border-purple-500/20">
        <div>
          <p className="text-gray-400">Last Scan</p>
          <p className="text-white">2 hours ago</p>
        </div>
        <div>
          <p className="text-gray-400">Vulnerabilities</p>
          <p className="text-green-400">0 Critical</p>
        </div>
      </div>
      <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">
        Start New Scan
      </button>
      <div className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
        <p className="text-gray-400">Security Score</p>
        <p className="text-2xl text-green-400">A+</p>
      </div>
    </div>
  );
};

export default SecurityScanner;
