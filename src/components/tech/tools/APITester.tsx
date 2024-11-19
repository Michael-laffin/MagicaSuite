import React from 'react';

const APITester: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-2">
        <select className="bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40">
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
        </select>
        <input
          type="text"
          placeholder="Enter API endpoint"
          className="flex-grow bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40"
        />
      </div>
      <div className="bg-gray-900 rounded-md p-4 h-32 border border-purple-500/20">
        <p className="text-gray-400">Response Preview</p>
      </div>
      <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">
        Send Request
      </button>
    </div>
  );
};

export default APITester;
