import React from 'react';

const CodeEditor: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-4 p-4">
      <div className="flex space-x-2 text-sm">
        <button className="px-3 py-1 bg-purple-500/20 rounded-md hover:bg-purple-500/30">File</button>
        <button className="px-3 py-1 bg-purple-500/20 rounded-md hover:bg-purple-500/30">Edit</button>
        <button className="px-3 py-1 bg-purple-500/20 rounded-md hover:bg-purple-500/30">View</button>
      </div>
      <div className="flex-grow bg-gray-900 rounded-md p-4 font-mono text-sm">
        <div className="text-purple-400">// Write your code here</div>
        <div className="text-gray-300">function hello() {'{'}</div>
        <div className="text-gray-300 ml-4">console.log("Hello, World!");</div>
        <div className="text-gray-300">{'}'}</div>
      </div>
    </div>
  );
};

export default CodeEditor;
