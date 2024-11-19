import React from 'react';

const DocumentationGenerator: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Project name"
          className="flex-grow bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40"
        />
        <select className="bg-gray-800 text-white px-3 py-1 rounded-md border border-purple-500/20 focus:border-purple-400/40">
          <option>Markdown</option>
          <option>HTML</option>
          <option>PDF</option>
        </select>
      </div>
      <div className="bg-gray-900 rounded-md p-4 h-32 border border-purple-500/20">
        <p className="text-purple-400 mb-2"># Documentation Preview</p>
        <p className="text-gray-400">Project overview and setup instructions will appear here.</p>
      </div>
      <button className="px-4 py-2 bg-purple-500/20 text-white rounded-md hover:bg-purple-500/30 transition border border-purple-500/20">
        Generate Docs
      </button>
    </div>
  );
};

export default DocumentationGenerator;
