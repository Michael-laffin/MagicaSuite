import React from 'react';

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Page Views', value: '12.5K', change: '+8%' },
          { label: 'Conversions', value: '234', change: '+12%' },
          { label: 'Engagement', value: '67%', change: '+5%' },
          { label: 'Click Rate', value: '3.2%', change: '+2%' }
        ].map((metric, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-blue-500/10">
            <div className="text-gray-400 text-sm">{metric.label}</div>
            <div className="text-white text-lg font-bold">{metric.value}</div>
            <div className="text-blue-400 text-sm">{metric.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
