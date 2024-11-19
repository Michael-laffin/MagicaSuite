import React from 'react';

const PerformanceMonitor: React.FC = () => {
  const metrics = [
    { label: 'Load Time', value: '1.2s' },
    { label: 'Error Rate', value: '0.1%' },
    { label: 'Uptime', value: '99.9%' },
    { label: 'CPU Usage', value: '45%' },
  ];

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-gray-900 p-3 rounded-md border border-purple-500/20">
            <p className="text-gray-400 text-sm">{metric.label}</p>
            <p className="text-xl text-white">{metric.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceMonitor;
