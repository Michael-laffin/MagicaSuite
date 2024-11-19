import React from 'react';
import { File, FileText, FilePlus, FolderOpen, Download, Share2, Trash2, Search } from 'lucide-react';

const DocumentManager: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-800/50 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-500/50"
          />
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors flex items-center">
          <FilePlus className="w-4 h-4 mr-2" />
          Upload
        </button>
      </div>

      <div className="flex space-x-4">
        {[
          { title: 'All Files', count: 125, icon: File },
          { title: 'Documents', count: 84, icon: FileText },
          { title: 'Folders', count: 12, icon: FolderOpen }
        ].map((category, i) => (
          <button 
            key={i}
            className="flex-1 p-3 rounded-lg bg-gray-800/30 border border-cyan-500/10 hover:bg-gray-800/40 transition-colors"
          >
            <category.icon className="w-5 h-5 text-cyan-400 mb-2" />
            <div className="text-white font-medium">{category.title}</div>
            <div className="text-sm text-gray-400">{category.count} items</div>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div className="text-white font-medium">Recent Documents</div>
          <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
            View All
          </button>
        </div>
        {[
          {
            name: 'Q4 Financial Report.pdf',
            size: '2.4 MB',
            modified: '2024-01-15',
            type: 'PDF'
          },
          {
            name: 'Project Proposal.docx',
            size: '1.8 MB',
            modified: '2024-01-14',
            type: 'Word'
          },
          {
            name: 'Marketing Strategy.pptx',
            size: '4.2 MB',
            modified: '2024-01-13',
            type: 'PowerPoint'
          }
        ].map((doc, i) => (
          <div key={i} className="p-4 rounded-lg bg-gray-800/30 border border-cyan-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded bg-cyan-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-white">{doc.name}</div>
                  <div className="text-sm text-gray-400">
                    {doc.size} • {doc.type} • Modified {doc.modified}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Share2 className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
                <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-gray-400 hover:text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white transition-colors">
          Create Folder
        </button>
        <button className="px-4 py-2 bg-cyan-600/20 hover:bg-cyan-600/30 rounded-lg text-cyan-400 transition-colors">
          Bulk Actions
        </button>
      </div>
    </div>
  );
};

export default DocumentManager;
