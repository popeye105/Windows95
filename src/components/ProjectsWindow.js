import React from 'react';

const ProjectsWindow = () => {
  const openLink = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="h-full overflow-auto p-2 border border-gray-400 bg-white m-2">
      <div className="p-6 text-xs text-win95-dark-gray">
        {/* Projects will be added later */}
      </div>
    </div>
  );
};

export default ProjectsWindow;
