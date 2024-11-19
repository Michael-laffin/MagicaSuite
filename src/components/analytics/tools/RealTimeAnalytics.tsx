import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, Users, Globe, Clock, Zap, AlertCircle } from 'lucide-react';

// Simulated real-time data generation
const generateRealtimeData = () => ({
  timestamp: new Date().toLocaleTimeString(),
  activeUsers: Math.floor(Math.random() * 100) + 50,
  requests: Math.floor(Math.random() * 200) + 100,
  responseTime: Math.floor(Math.random() * 500) + 100,
});

const RealTimeAnalytics: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Initialize with some data
    const initialData = Array.from({ length: 10 }, () => generateRealtimeData());
    setData(initialData);

    // Update data every second
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = [...prevData.slice(1), generateRealtimeData()];
        
        // Generate alerts based on thresholds
        const latestPoint = newData[newData.length - 1];
        if (latestPoint.activeUsers > 120) {
          setAlerts((prev) => [
            `High user activity detected: ${latestPoint.activeUsers} active users`,
            ...prev.slice(0, 4),
          ]);
        }
        if (latestPoint.responseTime > 500) {
          setAlerts((prev) => [
            `High response time detected: ${latestPoint.responseTime}ms`,
            ...prev.slice(0, 4),
          ]);
        }

        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'Active Users',
      value: data[data.length - 1]?.activeUsers || 0,
      change: '+12%',
      icon: <Users className="text-rose-500" size={20} />,
    },
    {
      label: 'Requests/min',
      value: data[data.length - 1]?.requests || 0,
      change: '+5%',
      icon: <Globe className="text-rose-500" size={20} />,
    },
    {
      label: 'Avg Response Time',
      value: `${data[data.length - 1]?.responseTime || 0}ms`,
      change: '-8%',
      icon: <Clock className="text-rose-500" size={20} />,
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Real-Time Analytics</h3>
          <div className="flex items-center space-x-2 text-rose-500">
            <Activity size={16} />
            <span className="text-sm">Live</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">{metric.label}</span>
                {metric.icon}
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </div>
              <div className="text-green-500 text-sm">{metric.change} from last hour</div>
            </div>
          ))}
        </div>

        {/* Real-time Chart */}
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 mb-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="timestamp"
                stroke="#fff"
                tick={{ fill: '#fff' }}
              />
              <YAxis stroke="#fff" tick={{ fill: '#fff' }} />
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
                dataKey="activeUsers"
                name="Active Users"
                stroke="#f43f5e"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="requests"
                name="Requests"
                stroke="#60a5fa"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="responseTime"
                name="Response Time"
                stroke="#34d399"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Real-time Alerts */}
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
          <div className="flex items-center mb-3">
            <AlertCircle size={16} className="text-rose-500 mr-2" />
            <h4 className="text-white font-semibold">Real-time Alerts</h4>
          </div>
          <div className="space-y-2">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-gray-300 bg-gray-700/30 p-2 rounded"
                >
                  <Zap size={14} className="text-rose-500" />
                  <span>{alert}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No active alerts</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeAnalytics;
