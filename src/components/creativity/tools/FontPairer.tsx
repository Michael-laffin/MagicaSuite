import React, { useState } from 'react';

const FontPairer: React.FC = () => {
  const [selectedFont, setSelectedFont] = useState('Arial');

  return (
    <div className="h-full">
      <select
        value={selectedFont}
        onChange={(e) => setSelectedFont(e.target.value)}
        className="w-full p-2 mb-4 bg-gray-800 rounded-md"
      >
        <option value="Arial">Arial</option>
        <option value="Times New Roman">Times New Roman</option>
        <option value="Helvetica">Helvetica</option>
        <option value="Courier New">Courier New</option>
        <option value="Georgia">Georgia</option>
      </select>
      <p style={{ fontFamily: selectedFont }} className="text-lg">
        Sample Text in {selectedFont}
      </p>
    </div>
  );
};

export default FontPairer;
