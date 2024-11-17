import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <Sparkles
          key={i}
          className={`
            particle text-purple-400/30
            absolute
            ${Math.random() > 0.5 ? 'animate-[particle_3s_ease-in_infinite]' : 'animate-[particle_4s_ease-in_infinite]'}
          `}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}