import React from 'react';

const DesktopIcon = ({ icon, label, onDoubleClick, isSelected, onSelect }) => {
  const handleClick = () => {
    onSelect();
    onDoubleClick(); // Single click now opens the app
  };

  return (
    <div
      className="win95-desktop-icon flex flex-col items-center p-2 w-20 text-white cursor-pointer select-none"
      onClick={handleClick}
    >
      <div className="text-3xl -mb-1">{icon}</div>
      <span className="text-sm text-center leading-tight -mt-1">{label}</span>
    </div>
  );
};

export default DesktopIcon;
