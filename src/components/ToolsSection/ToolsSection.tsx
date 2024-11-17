import React, { useState } from 'react';
import { Search, Grid, List, ChevronDown } from 'lucide-react';
import { categories, tools } from './toolsData';
import ToolCard from './ToolCard';
import ToolModal from './ToolModal';
import { Tool, CategoryId } from './types';

export default function ToolsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('productivity');
  const [isGridView, setIsGridView] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const filteredTools = tools.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <div className="p-6 space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Category Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className={`
              w-full sm:w-48 px-4 py-2 
              bg-white/5 border border-white/10 rounded-lg 
              text-white flex items-center justify-between 
              hover:bg-white/10 transition-colors
              ${isCategoryOpen ? 'ring-2 ring-purple-500' : ''}
            `}
          >
            <span>{currentCategory?.name || 'Select Category'}</span>
            <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${isCategoryOpen ? 'transform rotate-180' : ''}`} />
          </button>
          
          {isCategoryOpen && (
            <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-white/10 rounded-lg shadow-xl overflow-hidden">
              <div className="py-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsCategoryOpen(false);
                    }}
                    className={`
                      w-full px-4 py-2 text-left 
                      ${category.id === selectedCategory ? 'bg-purple-500 text-white' : 'text-white hover:bg-white/5'}
                      transition-colors duration-200
                    `}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <button
            onClick={() => setIsGridView(true)}
            className={`p-2 rounded transition-colors duration-200 ${isGridView ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsGridView(false)}
            className={`p-2 rounded transition-colors duration-200 ${!isGridView ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Tools Grid/List */}
      {filteredTools.length > 0 ? (
        <div
          className={`
            ${isGridView 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }
          `}
        >
          {filteredTools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onClick={() => setSelectedTool(tool)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">No tools found. Try adjusting your search or selecting a different category.</p>
        </div>
      )}

      {/* Tool Modal */}
      <ToolModal
        tool={selectedTool}
        isOpen={!!selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </div>
  );
} );
}