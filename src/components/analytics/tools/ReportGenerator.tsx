import React, { useState } from 'react';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

const ReportGenerator: React.FC = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('last7days');
  const [format, setFormat] = useState('pdf');
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = () => {
    setLoading(true);
    // Simulate report generation
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Generate Report</h3>
        <div className="space-y-4">
          {/* Report Type */}
          <div>
            <label className="block text-gray-300 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
            >
              <option value="sales">Sales Report</option>
              <option value="users">User Analytics</option>
              <option value="performance">Performance Metrics</option>
              <option value="custom">Custom Report</option>
            </select>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-gray-300 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="lastQuarter">Last Quarter</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Format */}
          <div>
            <label className="block text-gray-300 mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="excel">Excel</option>
              <option value="csv">CSV</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button className="flex items-center justify-center space-x-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-rose-500/30 transition-colors">
          <Calendar size={16} className="text-rose-500" />
          <span className="text-gray-300">Schedule</span>
        </button>
        <button className="flex items-center justify-center space-x-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700/50 hover:border-rose-500/30 transition-colors">
          <Filter size={16} className="text-rose-500" />
          <span className="text-gray-300">Filters</span>
        </button>
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerateReport}
        disabled={loading}
        className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg ${
          loading
            ? 'bg-gray-700 cursor-not-allowed'
            : 'bg-rose-500 hover:bg-rose-600'
        } transition-colors`}
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : (
          <>
            <FileText size={16} />
            <span>Generate Report</span>
          </>
        )}
      </button>

      {/* Recent Reports */}
      <div className="mt-6">
        <h4 className="text-gray-300 mb-3">Recent Reports</h4>
        <div className="space-y-2">
          {['Sales Report - Last Week', 'User Analytics - June', 'Performance Review - Q2'].map(
            (report, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <FileText size={16} className="text-rose-500" />
                  <span className="text-gray-300">{report}</span>
                </div>
                <button className="text-rose-500 hover:text-rose-400">
                  <Download size={16} />
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;
