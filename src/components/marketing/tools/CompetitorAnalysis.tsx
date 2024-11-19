import React from 'react';

const CompetitorAnalysis: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Add competitor URL..." 
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50"
        />
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
          Add
        </button>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Competitor A', traffic: '50K', ranking: 12 },
          { name: 'Competitor B', traffic: '35K', ranking: 15 }
        ].map((competitor, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
            <div className="flex justify-between items-center">
              <span className="text-white">{competitor.name}</span>
              <span className="text-blue-400">Rank #{competitor.ranking}</span>
            </div>
            <div className="text-gray-400 text-sm mt-1">
              Monthly Traffic: {competitor.traffic}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitorAnalysis;
