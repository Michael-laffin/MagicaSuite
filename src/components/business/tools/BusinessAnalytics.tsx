import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingCart } from 'lucide-react';

const BusinessAnalytics: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { 
            title: 'Revenue', 
            value: '$125,430', 
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign
          },
          { 
            title: 'Customers', 
            value: '1,234', 
            change: '+8.2%',
            trend: 'up',
            icon: Users
          },
          { 
            title: 'Sales', 
            value: '856', 
            change: '-3.1%',
            trend: 'down',
            icon: ShoppingCart
          },
          { 
            title: 'Growth', 
            value: '23.5%', 
            change: '+2.4%',
            trend: 'up',
            icon: TrendingUp
          }
        ].map((metric, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-gray-400 text-sm">{metric.title}</div>
                <div className="text-white text-lg font-medium mt-1">{metric.value}</div>
              </div>
              <metric.icon className="w-5 h-5 text-cyan-400" />
            </div>
            <div className={`flex items-center mt-2 text-sm ${
              metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
            }`}>
              {metric.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              {metric.change}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
        <div className="text-white font-medium mb-3">Revenue Trend</div>
        <div className="h-40 flex items-end space-x-2">
          {[65, 45, 75, 55, 80, 62, 70].map((height, i) => (
            <div key={i} className="flex-1 bg-cyan-500/20 rounded-t-sm hover:bg-cyan-500/30 transition-colors">
              <div 
                className="bg-cyan-500 rounded-t-sm transition-all duration-300"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-400">
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
          <span>Sun</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessAnalytics;
