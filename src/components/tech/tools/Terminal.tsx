import React from 'react';

const Terminal: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-2 p-4">
      <div className="flex-grow bg-gray-900 rounded-md p-4 font-mono text-sm border border-purple-500/20">
        <p className="text-purple-400">$ _</p>
        <p className="text-gray-400 text-sm mt-2">Type commands here...</p>
      </div>
      <div className="flex space-x-2">
        <button className="px-3 py-1 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">Clear</button>
        <button className="px-3 py-1 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">History</button>
      </div>
    </div>
  );
};

export default Terminal;
