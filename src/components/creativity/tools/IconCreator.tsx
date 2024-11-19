import React from 'react';

const IconCreator: React.FC = () => {
  const shapes = ['square', 'circle', 'triangle'];

  return (
    <div className="h-full grid grid-cols-3 gap-4">
      {shapes.map((shape) => (
        <div
          key={shape}
          className="aspect-square bg-orange-500/20 rounded-lg flex items-center justify-center hover:bg-orange-500/30 cursor-pointer"
        >
          {shape.charAt(0).toUpperCase() + shape.slice(1)}
        </div>
      ))}
    </div>
  );
};

export default IconCreator;
