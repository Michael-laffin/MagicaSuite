import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, Lightbulb, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react';

const mockInsightsData = [
  { date: '2024-01', users: 1200, engagement: 78, conversion: 5.2 },
  { date: '2024-02', users: 1350, engagement: 82, conversion: 5.8 },
  { date: '2024-03', users: 1500, engagement: 85, conversion: 6.1 },
  { date: '2024-04', users: 1800, engagement: 88, conversion: 6.5 },
  { date: '2024-05', users: 2100, engagement: 86, conversion: 6.8 },
  { date: '2024-06', users: 2400, engagement: 89, conversion: 7.2 },
];

const insights = [
  {
    type: 'trend',
    title: 'User Growth Acceleration',
    description: 'User growth rate increased by 100% in the last 6 months',
    icon: TrendingUp,
    severity: 'success',
  },
  {
    type: 'opportunity',
    title: 'Engagement Optimization',
    description: 'Potential to improve user engagement through personalized content',
    icon: Lightbulb,
    severity: 'info',
  },
  {
    type: 'risk',
    title: 'Conversion Rate Plateau',
    description: 'Conversion rate growth is showing signs of slowing down',
    icon: AlertTriangle,
    severity: 'warning',
  },
];

const DataInsights: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState('users');
  const [timeRange, setTimeRange] = useState('6m');

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'users':
        return '#10b981';
      case 'engagement':
        return '#3b82f6';
      case 'conversion':
        return '#f43f5e';
      default:
        return '#6b7280';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'success':
        return 'text-emerald-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Brain className="text-emerald-500 mr-2" size={20} />
            <h3 className="text-lg font-semibold text-white">Data Insights</h3>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
            >
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
        </div>

        {/* Metrics Chart */}
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold">Trend Analysis</h4>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
            >
              <option value="users">Users</option>
              <option value="engagement">Engagement</option>
              <option value="conversion">Conversion</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockInsightsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
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
                stroke={getMetricColor(selectedMetric)}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Key Insights */}
        <div className="grid gap-4">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:border-emerald-500/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className={`${getSeverityColor(insight.severity)} mr-3 mt-1`}>
                    <insight.icon size={16} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">{insight.title}</h4>
                    <p className="text-gray-400 text-sm">{insight.description}</p>
                  </div>
                </div>
                <ChevronRight className="text-gray-500 group-hover:text-emerald-500 transition-colors" size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="mt-6 bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
          <div className="flex items-center mb-3">
            <Lightbulb className="text-emerald-500 mr-2" size={16} />
            <h4 className="text-white font-semibold">Recommended Actions</h4>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
              Implement personalized content recommendations
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
              Optimize user onboarding flow
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2" />
              Launch targeted engagement campaigns
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DataInsights;
