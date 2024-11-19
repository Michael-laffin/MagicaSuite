import React from 'react';

const TemplateLibrary: React.FC = () => {
  const templates = ['Blog', 'Social Media', 'Presentation', 'Business Card'];

  return (
    <div className="h-full grid grid-cols-2 gap-4">
      {templates.map((template) => (
        <div
          key={template}
          className="p-4 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 cursor-pointer"
        >
          {template}
        </div>
      ))}
    </div>
  );
};

export default TemplateLibrary;
