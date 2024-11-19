import React from 'react';

const GitInterface: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="grid grid-cols-2 gap-2">
        <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">Pull</button>
        <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">Push</button>
        <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">Commit</button>
        <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">Branch</button>
      </div>
      <div className="bg-gray-900 rounded-md p-4 h-32 border border-purple-500/20">
        <p className="text-purple-400 mb-2">Current Branch: main</p>
        <p className="text-gray-400">Modified files: 0</p>
        <p className="text-gray-400">Staged changes: 0</p>
      </div>
    </div>
  );
};

export default GitInterface;
