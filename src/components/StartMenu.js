import React from 'react';

const StartMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const menuItems = [];

  const handleItemClick = (url) => {
    window.open(url, '_blank');
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed bottom-8 left-1 w-48 bg-win95-gray border-2 border-outset shadow-lg z-50">
        <div className="bg-win95-blue text-white px-2 py-1 text-xs font-bold">
          Windows 95
        </div>
        
        <div className="p-1">
          {menuItems.length === 0 && (
            <div className="px-2 py-2 text-xs text-win95-dark-gray">No shortcuts yet</div>
          )}
          
          <hr className="my-1 border-win95-dark-gray" />
          
          <div className="flex items-center px-2 py-1 text-xs text-win95-dark-gray">
            <span className="mr-2">⚙️</span>
            Settings
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
