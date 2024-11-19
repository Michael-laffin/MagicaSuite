import React, { useState } from 'react';
import { Plus, X, Save, Eye, Copy, Trash2 } from 'lucide-react';

interface ReportTemplate {
  id: number;
  name: string;
  description: string;
  metrics: string[];
  schedule: string;
}

const sampleTemplates: ReportTemplate[] = [
  {
    id: 1,
    name: 'Monthly Performance',
    description: 'Key performance metrics for monthly review',
    metrics: ['Revenue', 'Users', 'Engagement'],
    schedule: 'Monthly'
  },
  {
    id: 2,
    name: 'User Activity',
    description: 'Detailed user behavior analysis',
    metrics: ['Active Users', 'Session Duration', 'Features Used'],
    schedule: 'Weekly'
  },
  {
    id: 3,
    name: 'Revenue Analysis',
    description: 'In-depth revenue and sales metrics',
    metrics: ['Sales', 'Subscriptions', 'Churn Rate'],
    schedule: 'Daily'
  }
];

const availableMetrics = [
  'Revenue',
  'Users',
  'Engagement',
  'Active Users',
  'Session Duration',
  'Features Used',
  'Sales',
  'Subscriptions',
  'Churn Rate',
  'Conversion Rate',
  'Customer Satisfaction',
  'Support Tickets'
];

const CustomReports: React.FC = () => {
  const [templates, setTemplates] = useState<ReportTemplate[]>(sampleTemplates);
  const [showNewTemplate, setShowNewTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<ReportTemplate>>({
    name: '',
    description: '',
    metrics: [],
    schedule: 'Monthly'
  });

  const handleAddMetric = (metric: string) => {
    if (newTemplate.metrics?.includes(metric)) return;
    setNewTemplate({
      ...newTemplate,
      metrics: [...(newTemplate.metrics || []), metric]
    });
  };

  const handleRemoveMetric = (metric: string) => {
    setNewTemplate({
      ...newTemplate,
      metrics: newTemplate.metrics?.filter(m => m !== metric) || []
    });
  };

  const handleSaveTemplate = () => {
    if (!newTemplate.name || !newTemplate.description) return;

    setTemplates([
      ...templates,
      {
        id: templates.length + 1,
        name: newTemplate.name,
        description: newTemplate.description,
        metrics: newTemplate.metrics || [],
        schedule: newTemplate.schedule || 'Monthly'
      }
    ]);

    setShowNewTemplate(false);
    setNewTemplate({
      name: '',
      description: '',
      metrics: [],
      schedule: 'Monthly'
    });
  };

  return (
    <div className="p-4">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Custom Reports</h3>
          <button
            onClick={() => setShowNewTemplate(true)}
            className="flex items-center space-x-2 px-3 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600"
          >
            <Plus size={16} />
            <span>New Template</span>
          </button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white font-semibold">{template.name}</h4>
                <div className="flex space-x-2">
                  <button className="text-gray-400 hover:text-white">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-white">
                    <Copy size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-rose-500">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-3">{template.description}</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {template.metrics.map((metric, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs"
                  >
                    {metric}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                Schedule: {template.schedule}
              </div>
            </div>
          ))}
        </div>

        {/* New Template Modal */}
        {showNewTemplate && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">New Report Template</h4>
                <button
                  onClick={() => setShowNewTemplate(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Template Name</label>
                  <input
                    type="text"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Description</label>
                  <textarea
                    value={newTemplate.description}
                    onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Schedule</label>
                  <select
                    value={newTemplate.schedule}
                    onChange={(e) => setNewTemplate({ ...newTemplate, schedule: e.target.value })}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Metrics</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newTemplate.metrics?.map((metric, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs flex items-center"
                      >
                        {metric}
                        <button
                          onClick={() => handleRemoveMetric(metric)}
                          className="ml-1 text-gray-400 hover:text-white"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <select
                    onChange={(e) => handleAddMetric(e.target.value)}
                    className="w-full bg-gray-800 text-white border border-gray-700 rounded px-3 py-2"
                    value=""
                  >
                    <option value="" disabled>Add metric...</option>
                    {availableMetrics.filter(m => !newTemplate.metrics?.includes(m)).map((metric) => (
                      <option key={metric} value={metric}>
                        {metric}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setShowNewTemplate(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTemplate}
                    className="flex items-center space-x-2 px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                  >
                    <Save size={16} />
                    <span>Save Template</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomReports;
