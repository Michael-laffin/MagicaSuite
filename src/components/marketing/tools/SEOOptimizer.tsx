import React from 'react';

const SEOOptimizer: React.FC = () => {
  return (
    <div className="space-y-4">
      <input 
        type="text" 
        placeholder="Enter URL to analyze..." 
        className="w-full px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50"
      />
      <div className="space-y-2">
        {[
          { aspect: 'Meta Title', status: 'Good' },
          { aspect: 'Meta Description', status: 'Needs Improvement' },
          { aspect: 'Keywords', status: 'Good' }
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-blue-500/10">
            <span className="text-white">{item.aspect}</span>
            <span className={item.status === 'Good' ? 'text-green-400' : 'text-yellow-400'}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SEOOptimizer;
