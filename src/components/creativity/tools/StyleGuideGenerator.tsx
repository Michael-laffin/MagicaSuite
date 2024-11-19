import React, { useState } from 'react';

const StyleGuideGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState('');

  return (
    <div className="h-full">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Brand Name"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          className="w-full p-2 bg-gray-800 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-orange-500/20 rounded-lg">Colors</div>
        <div className="p-4 bg-orange-500/20 rounded-lg">Typography</div>
        <div className="p-4 bg-orange-500/20 rounded-lg">Logo Usage</div>
        <div className="p-4 bg-orange-500/20 rounded-lg">Components</div>
      </div>
    </div>
  );
};

export default StyleGuideGenerator;
