import { useState, useEffect } from 'react';
import { getRandomTools } from '../data/tools';

export const useFeaturedTools = () => {
  const [featuredTools, setFeaturedTools] = useState(getRandomTools());

  useEffect(() => {
    // Update featured tools every hour
    const interval = setInterval(() => {
      setFeaturedTools(getRandomTools(3)); // Return only three featured tools
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    return () => clearInterval(interval);
  }, []);

  return featuredTools;
};