import React, { useState } from 'react';

const AnimationCreator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-full">
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setIsPlaying(true)}
          className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300"
        >
          ▶ Play
        </button>
        <button
          onClick={() => setIsPlaying(false)}
          className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300"
        >
          ■ Stop
        </button>
      </div>
      <div className="border border-gray-600 rounded-lg h-40 flex items-center justify-center">
        Animation Preview {isPlaying ? '▶' : '■'}
      </div>
    </div>
  );
};

export default AnimationCreator;
