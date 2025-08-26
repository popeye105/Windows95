import React from 'react';

const ResumeWindow = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'resume.pdf';
    link.click();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-4 bg-white border-2 border-inset">
        {/* Intentionally left blank */}
      </div>
    </div>
  );
};

export default ResumeWindow;
