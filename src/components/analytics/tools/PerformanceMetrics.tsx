import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Zap, ArrowUp, ArrowDown, Target, Award, TrendingUp } from 'lucide-react';

const performanceData = [
  { metric: 'Page Load', value: 2.3, target: 2.0, unit: 's' },
  { metric: 'API Response', value: 180, target: 200, unit: 'ms' },
  { metric: 'Database Query', value: 45, target: 50, unit: 'ms' },
  { metric: 'Error Rate', value: 0.8, target: 1.0, unit: '%' },
  { metric: 'CPU Usage', value: 65, target: 80, unit: '%' },
  { metric: 'Memory Usage', value: 75, target: 85, unit: '%' },
];

const historicalData = [
  { month: 'Jan', pageLoad: 2.5, apiResponse: 190, errorRate: 1.2 },
  { month: 'Feb', pageLoad: 2.4, apiResponse: 185, errorRate: 1.0 },
  { month: 'Mar', pageLoad: 2.3, apiResponse: 175, errorRate: 0.9 },
  { month: 'Apr', pageLoad: 2.2, apiResponse: 170, errorRate: 0.8 },
  { month: 'May', pageLoad: 2.4, apiResponse: 180, errorRate: 0.7 },
  { month: 'Jun', pageLoad: 2.3, apiResponse: 175, errorRate: 0.8 },
];

const PerformanceMetrics: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('pageLoad');
  const [timeframe, setTimeframe] = useState('6m');

  const getStatusColor = (value: number, target: number) => {
    const ratio = value / target;
    if (ratio <= 0.8) return 'text-green-500';
    if (ratio <= 0.9) return 'text-yellow-500';
    return 'text-rose-500';
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Performance Metrics</h3>
          <div className="flex items-center space-x-2">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
            </select>
          </div>
        </div>

        {/* Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {performanceData.map((metric, index) => {
            const isGood = metric.value <= metric.target;
            return (
              <div
                key={index}
                className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">{metric.metric}</span>
                  <Zap className="text-rose-500" size={16} />
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-2xl font-bold text-white">
                    {metric.value}
                    <span className="text-sm ml-1">{metric.unit}</span>
                  </div>
                  <div className={`flex items-center ${isGood ? 'text-green-500' : 'text-rose-500'}`}>
                    {isGood ? <ArrowDown size={16} /> : <ArrowUp size={16} />}
                    <span className="ml-1 text-sm">
                      {Math.abs(((metric.value - metric.target) / metric.target) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <Target size={12} className="mr-1" />
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
            );
          })}
        </div>

        {/* Historical Chart */}
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">Historical Performance</h4>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
            >
              <option value="pageLoad">Page Load Time</option>
              <option value="apiResponse">API Response Time</option>
              <option value="errorRate">Error Rate</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="month" stroke="#fff" />
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
              <Bar
                dataKey={selectedMetric}
                fill="#f43f5e"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Achievements */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center mb-3">
              <Award className="text-rose-500 mr-2" size={16} />
              <h4 className="text-white font-semibold">Performance Achievements</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                API response time improved by 15%
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Error rate reduced to under 1%
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Memory usage optimized by 20%
              </li>
            </ul>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center mb-3">
              <TrendingUp className="text-rose-500 mr-2" size={16} />
              <h4 className="text-white font-semibold">Optimization Suggestions</h4>
            </div>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2" />
                Implement page load optimization
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2" />
                Review database query performance
              </li>
              <li className="flex items-center text-gray-300">
                <div className="w-2 h-2 bg-rose-500 rounded-full mr-2" />
                Consider CDN implementation
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;
