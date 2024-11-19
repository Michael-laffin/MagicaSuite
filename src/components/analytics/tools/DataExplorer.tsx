import React, { useState } from 'react';
import { Search, Filter, Download, Table, BarChart2, RefreshCw } from 'lucide-react';

const sampleData = [
  { id: 1, user: 'John Doe', revenue: '$1,200', status: 'Active', lastActive: '2023-07-01' },
  { id: 2, user: 'Jane Smith', revenue: '$980', status: 'Inactive', lastActive: '2023-06-28' },
  { id: 3, user: 'Bob Johnson', revenue: '$2,340', status: 'Active', lastActive: '2023-07-02' },
  { id: 4, user: 'Alice Brown', revenue: '$1,670', status: 'Active', lastActive: '2023-07-01' },
  { id: 5, user: 'Charlie Wilson', revenue: '$890', status: 'Inactive', lastActive: '2023-06-25' },
];

const DataExplorer: React.FC = () => {
  const [view, setView] = useState<'table' | 'chart'>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('user');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Data Explorer</h3>

        {/* Controls Bar */}
        <div className="flex items-center space-x-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search data..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded pl-10 pr-4 py-2"
            />
          </div>

          {/* View Toggle */}
          <div className="flex bg-gray-800 rounded border border-gray-700">
            <button
              onClick={() => setView('table')}
              className={`p-2 ${view === 'table' ? 'bg-rose-500 text-white' : 'text-gray-400'}`}
            >
              <Table size={16} />
            </button>
            <button
              onClick={() => setView('chart')}
              className={`p-2 ${view === 'chart' ? 'bg-rose-500 text-white' : 'text-gray-400'}`}
            >
              <BarChart2 size={16} />
            </button>
          </div>

          {/* Actions */}
          <button className="p-2 text-gray-400 hover:text-white">
            <Filter size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <Download size={16} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white">
            <RefreshCw size={16} />
          </button>
        </div>

        {/* Filters */}
        <div className="flex space-x-4 mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
          >
            <option value="user">Sort by User</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="status">Sort by Status</option>
            <option value="lastActive">Sort by Last Active</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded px-3 py-1"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Data View */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700/50">
          {view === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="p-4 text-gray-400">User</th>
                    <th className="p-4 text-gray-400">Revenue</th>
                    <th className="p-4 text-gray-400">Status</th>
                    <th className="p-4 text-gray-400">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row) => (
                    <tr key={row.id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="p-4 text-white">{row.user}</td>
                      <td className="p-4 text-white">{row.revenue}</td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            row.status === 'Active'
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-white">{row.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-400">
              Chart view coming soon...
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-gray-400">
            Showing 1-5 of 5 results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 hover:bg-gray-700">
              Previous
            </button>
            <button className="px-3 py-1 bg-gray-800 text-white rounded border border-gray-700 hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExplorer;
