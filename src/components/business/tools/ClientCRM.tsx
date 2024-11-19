import React from 'react';

const ClientCRM: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Search clients..." 
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
        />
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
          Add Client
        </button>
      </div>
      <div className="space-y-2">
        {[
          { name: 'Acme Corp', status: 'Active', value: '$50,000' },
          { name: 'TechStart', status: 'Prospect', value: '$25,000' }
        ].map((client, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white">{client.name}</div>
                <div className="text-gray-400 text-sm">{client.status}</div>
              </div>
              <div className="text-cyan-400">{client.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientCRM;
