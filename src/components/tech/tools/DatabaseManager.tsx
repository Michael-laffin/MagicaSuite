import React from 'react';

const DatabaseManager: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-2">
        <select className="bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40">
          <option>MySQL</option>
          <option>PostgreSQL</option>
          <option>MongoDB</option>
        </select>
        <input
          type="text"
          placeholder="Connection string"
          className="flex-grow bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40"
        />
      </div>
      <textarea
        placeholder="Enter SQL query"
        className="bg-gray-900 text-white p-4 rounded-md h-32 border border-purple-500/20 focus:border-purple-400/40"
      />
      <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">
        Execute Query
      </button>
    </div>
  );
};

export default DatabaseManager;
