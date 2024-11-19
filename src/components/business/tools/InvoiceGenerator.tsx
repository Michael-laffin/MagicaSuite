import React from 'react';

const InvoiceGenerator: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input 
          type="text" 
          placeholder="Client Name" 
          className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
        />
        <input 
          type="text" 
          placeholder="Invoice #" 
          className="w-32 px-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
        />
      </div>
      <div className="space-y-2">
        {[
          { item: 'Consulting Services', amount: 1500 },
          { item: 'Project Management', amount: 2000 }
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center p-2 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <span className="text-white">{item.item}</span>
            <span className="text-cyan-400">${item.amount}</span>
          </div>
        ))}
      </div>
      <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
        Generate Invoice
      </button>
    </div>
  );
};

export default InvoiceGenerator;
