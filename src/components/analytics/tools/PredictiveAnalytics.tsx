import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, Target, AlertTriangle } from 'lucide-react';

const historicalData = [
  { month: 'Jan', actual: 4000, predicted: null },
  { month: 'Feb', actual: 3000, predicted: null },
  { month: 'Mar', actual: 2000, predicted: null },
  { month: 'Apr', actual: 2780, predicted: null },
  { month: 'May', actual: 1890, predicted: null },
  { month: 'Jun', actual: 2390, predicted: null },
  { month: 'Jul', actual: null, predicted: 2500 },
  { month: 'Aug', actual: null, predicted: 2700 },
  { month: 'Sep', actual: null, predicted: 2900 },
];

const confidenceScores = [
  { metric: 'Revenue', score: 85 },
  { metric: 'User Growth', score: 92 },
  { metric: 'Churn Rate', score: 78 },
];

const PredictiveAnalytics: React.FC = () => {
  const [metric, setMetric] = useState('revenue');
  const [timeframe, setTimeframe] = useState('6m');
  const [modelType, setModelType] = useState('linear');

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Predictive Analytics</h3>

        {/* Controls */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <select
            value={metric}
            onChange={(e) => setMetric(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
          >
            <option value="revenue">Revenue</option>
            <option value="users">Users</option>
            <option value="churn">Churn Rate</option>
          </select>

          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
          >
            <option value="3m">Next 3 Months</option>
            <option value="6m">Next 6 Months</option>
            <option value="12m">Next 12 Months</option>
          </select>

          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
          >
            <option value="linear">Linear Regression</option>
            <option value="ml">Machine Learning</option>
            <option value="ai">AI Model</option>
          </select>
        </div>

        {/* Prediction Chart */}
        <div className="bg-gray-800/50 p-4 rounded-lg mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={historicalData}>
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
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={{ fill: '#f43f5e' }}
                name="Historical"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#60a5fa"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#60a5fa' }}
                name="Predicted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Confidence Scores */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {confidenceScores.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">{item.metric}</span>
                <Brain size={16} className="text-rose-500" />
              </div>
              <div className="text-xl font-bold text-white">{item.score}%</div>
              <div className="text-sm text-gray-400">confidence</div>
            </div>
          ))}
        </div>

        {/* Insights and Warnings */}
        <div className="grid grid-cols-2 gap-4">
          {/* Key Predictions */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center mb-3">
              <Target size={16} className="text-rose-500 mr-2" />
              <h4 className="text-gray-300 font-semibold">Key Predictions</h4>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li>• Expected 15% growth in Q3</li>
              <li>• Peak revenue in August</li>
              <li>• Stable user retention</li>
            </ul>
          </div>

          {/* Risk Factors */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <div className="flex items-center mb-3">
              <AlertTriangle size={16} className="text-rose-500 mr-2" />
              <h4 className="text-gray-300 font-semibold">Risk Factors</h4>
            </div>
            <ul className="space-y-2 text-gray-300">
              <li>• Market volatility</li>
              <li>• Seasonal variations</li>
              <li>• Competition impact</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
