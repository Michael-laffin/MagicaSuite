import React from 'react';

const InspirationBoard: React.FC = () => {
  return (
    <div className="h-full grid grid-cols-3 gap-2">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="aspect-square bg-orange-500/20 rounded-lg flex items-center justify-center hover:bg-orange-500/30 cursor-pointer"
        >
          + Add Image
        </div>
      ))}
    </div>
  );
};

export default InspirationBoard;
