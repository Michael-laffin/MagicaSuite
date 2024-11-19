import React from 'react';

const FinancialDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: 'Revenue', value: '$45,000', change: '+12%' },
          { label: 'Expenses', value: '$28,500', change: '-5%' },
          { label: 'Profit', value: '$16,500', change: '+15%' },
          { label: 'Cash Flow', value: '$8,200', change: '+8%' }
        ].map((metric, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="text-gray-400 text-sm">{metric.label}</div>
            <div className="text-white text-lg font-bold">{metric.value}</div>
            <div className="text-cyan-400 text-sm">{metric.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinancialDashboard;
