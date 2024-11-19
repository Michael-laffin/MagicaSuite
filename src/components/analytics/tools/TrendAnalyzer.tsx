import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, ArrowRight } from 'lucide-react';

const sampleData = [
  { date: '2023-01', users: 4000, revenue: 2400, engagement: 2400 },
  { date: '2023-02', users: 3000, revenue: 1398, engagement: 2210 },
  { date: '2023-03', users: 2000, revenue: 9800, engagement: 2290 },
  { date: '2023-04', users: 2780, revenue: 3908, engagement: 2000 },
  { date: '2023-05', users: 1890, revenue: 4800, engagement: 2181 },
  { date: '2023-06', users: 2390, revenue: 3800, engagement: 2500 },
  { date: '2023-07', users: 3490, revenue: 4300, engagement: 2100 },
];

const insights = [
  {
    metric: 'Users',
    trend: '+12.5%',
    description: 'User growth is accelerating in Q3',
  },
  {
    metric: 'Revenue',
    trend: '+8.3%',
    description: 'Revenue shows steady increase',
  },
  {
    metric: 'Engagement',
    trend: '-2.1%',
    description: 'Slight decrease in user engagement',
  },
];

const TrendAnalyzer: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('users');
  const [timeframe, setTimeframe] = useState('7d');

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Trend Analysis</h3>
        
        {/* Controls */}
        <div className="flex space-x-4 mb-6">
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
          >
            <option value="users">Users</option>
            <option value="revenue">Revenue</option>
            <option value="engagement">Engagement</option>
          </select>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>

        {/* Chart */}
        <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                  color: '#fff',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke="#f43f5e"
                strokeWidth={2}
                dot={{ fill: '#f43f5e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insights */}
        <div className="space-y-4">
          <h4 className="text-gray-300 font-semibold">Key Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">{insight.metric}</span>
                  <div className="flex items-center text-green-500">
                    <TrendingUp size={16} className="mr-1" />
                    <span>{insight.trend}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{insight.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-6">
          <h4 className="text-gray-300 font-semibold mb-3">Recommendations</h4>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center text-gray-300 mb-2">
              <ArrowRight size={16} className="text-rose-500 mr-2" />
              <span>Focus on user engagement initiatives</span>
            </div>
            <div className="flex items-center text-gray-300 mb-2">
              <ArrowRight size={16} className="text-rose-500 mr-2" />
              <span>Optimize revenue streams showing growth</span>
            </div>
            <div className="flex items-center text-gray-300">
              <ArrowRight size={16} className="text-rose-500 mr-2" />
              <span>Monitor user retention metrics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalyzer;
