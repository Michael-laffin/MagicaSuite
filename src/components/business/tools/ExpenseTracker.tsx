import React from 'react';
import { DollarSign, CreditCard, Wallet, TrendingUp, Calendar } from 'lucide-react';

const ExpenseTracker: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          { title: 'Total Expenses', value: '$12,450', icon: DollarSign },
          { title: 'Monthly Budget', value: '$15,000', icon: Wallet },
          { title: 'Remaining', value: '$2,550', icon: CreditCard },
          { title: 'Trend', value: '+8.3%', icon: TrendingUp }
        ].map((stat, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex items-center space-x-3">
              <stat.icon className="w-5 h-5 text-cyan-400" />
              <div>
                <div className="text-gray-400 text-sm">{stat.title}</div>
                <div className="text-white font-medium">{stat.value}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white font-medium">Recent Expenses</div>
          <button className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded text-white text-sm transition-colors">
            Add Expense
          </button>
        </div>
        <div className="space-y-3">
          {[
            {
              title: 'Office Supplies',
              amount: 234.50,
              date: '2024-01-15',
              category: 'Supplies'
            },
            {
              title: 'Software Subscription',
              amount: 499.99,
              date: '2024-01-14',
              category: 'Software'
            },
            {
              title: 'Team Lunch',
              amount: 156.80,
              date: '2024-01-13',
              category: 'Meals'
            }
          ].map((expense, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white">{expense.title}</div>
                  <div className="text-sm text-gray-400">{expense.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-white">${expense.amount.toFixed(2)}</div>
                <div className="text-sm text-gray-400 flex items-center justify-end">
                  <Calendar className="w-3 h-3 mr-1" />
                  {expense.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
          Generate Report
        </button>
        <button className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 rounded-lg text-cyan-400 transition-colors">
          Export Data
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
