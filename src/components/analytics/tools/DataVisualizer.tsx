import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const sampleData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const DataVisualizer: React.FC = () => {
  const [chartType, setChartType] = useState('line');

  return (
    <div className="p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">Data Visualization</h3>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
          className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
        >
          <option value="line">Line Chart</option>
          <option value="bar">Bar Chart</option>
        </select>
      </div>
      
      <div className="bg-gray-800/50 p-4 rounded-lg">
        <LineChart width={500} height={300} data={sampleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '0.375rem',
              color: '#fff'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#f43f5e"
            strokeWidth={2}
            dot={{ fill: '#f43f5e' }}
          />
        </LineChart>
      </div>
    </div>
  );
};

export default DataVisualizer;
