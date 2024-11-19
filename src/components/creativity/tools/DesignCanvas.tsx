import React, { useRef, useEffect } from 'react';

const DesignCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Example: Simple drawing setup
    let drawing = false;

    const startDrawing = (e: MouseEvent) => {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };

    const draw = (e: MouseEvent) => {
      if (!drawing) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.strokeStyle = '#F97316'; // Orange color
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const stopDrawing = () => {
      drawing = false;
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseout', stopDrawing);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <canvas
        ref={canvasRef}
        className="border border-gray-600 rounded-lg w-full h-48 mb-4 bg-white/10"
      />
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300">
          Draw
        </button>
        <button
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
              }
            }
          }}
          className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 rounded-md text-orange-300"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default DesignCanvas;
