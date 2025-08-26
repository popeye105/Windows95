import React from 'react';

const ProjectsWindow = () => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="h-full overflow-auto p-4">
      <div className="bg-white border-2 border-inset p-6 text-xs text-win95-dark-gray">
        {/* Projects will be added later */}
      </div>
    </div>
  );
};

export default ProjectsWindow;
