import React from 'react';

interface DefaultToolProps {
  toolName: string;
}

const DefaultTool: React.FC<DefaultToolProps> = ({ toolName }) => {
  return (
    <div className="flex items-center justify-center h-full p-4">
      <p className="text-gray-400 text-lg">
        {toolName} content coming soon...
      </p>
    </div>
  );
};

export default DefaultTool;
