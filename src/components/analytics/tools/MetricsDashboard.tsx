import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, ShoppingCart, Clock } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-rose-500/30 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400">{title}</span>
        <div className="text-rose-500">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-white mb-2">{value}</div>
      <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
        <span className="ml-1">{Math.abs(change)}%</span>
      </div>
    </div>
  );
};

const MetricsDashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Total Users',
      value: '12,345',
      change: 8.2,
      icon: <Users size={20} />
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: 12.5,
      icon: <DollarSign size={20} />
    },
    {
      title: 'Orders',
      value: '892',
      change: -3.1,
      icon: <ShoppingCart size={20} />
    },
    {
      title: 'Avg. Time',
      value: '24m',
      change: 5.7,
      icon: <Clock size={20} />
    }
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Key Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsDashboard;
