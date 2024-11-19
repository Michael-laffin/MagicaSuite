import React from 'react';

const SocialMediaManager: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <select className="flex-1 px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50">
          <option value="facebook">Facebook</option>
          <option value="twitter">Twitter</option>
          <option value="instagram">Instagram</option>
          <option value="linkedin">LinkedIn</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors">
          Post
        </button>
      </div>
      <textarea 
        placeholder="Write your post..." 
        className="w-full h-[100px] px-3 py-2 rounded-lg bg-gray-800/50 border border-blue-500/20 text-white focus:outline-none focus:border-blue-500/50 resize-none"
      ></textarea>
      <div className="flex justify-between items-center">
        <button className="text-blue-400 hover:text-blue-300">
          Schedule
        </button>
        <div className="flex space-x-2">
          <button className="text-blue-400 hover:text-blue-300">Image</button>
          <button className="text-blue-400 hover:text-blue-300">Link</button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaManager;
