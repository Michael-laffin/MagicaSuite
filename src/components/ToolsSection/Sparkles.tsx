import React from 'react';

interface SparklesProps {
  className?: string;
}

const Sparkles: React.FC<SparklesProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 3l1.912 5.813a2 2 0 001.273 1.273L21 12l-5.815 1.912a2 2 0 00-1.273 1.273L12 21l-1.912-5.815a2 2 0 00-1.273-1.273L3 12l5.815-1.912a2 2 0 001.273-1.273L12 3z" />
  </svg>
);

export default Sparkles;
