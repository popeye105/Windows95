import React, { useState, useRef, useEffect } from 'react';

const Window = ({ 
  title, 
  children, 
  onClose, 
  initialPosition = { x: 100, y: 100 },
  width = 400,
  height = 300,
  isActive = true,
  onFocus
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.target.closest('.window-controls')) return;
    
    setIsDragging(true);
    const rect = windowRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    onFocus && onFocus();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;
    
    // Keep window within viewport bounds
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    
    setPosition({
      x: Math.max(0, Math.min(newX, maxX)),
      y: Math.max(0, Math.min(newY, maxY))
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={windowRef}
      className={`absolute bg-win95-gray border-2 ${isActive ? 'border-win95-dark-gray' : 'border-gray-400'} shadow-lg`}
      style={{
        left: position.x,
        top: position.y,
        width: width,
        height: height,
        zIndex: isActive ? 1000 : 999
      }}
      onClick={() => onFocus && onFocus()}
    >
      {/* Title Bar */}
      <div
        className={`${isActive ? 'bg-win95-blue' : 'bg-gray-500'} text-white px-2 py-1 flex justify-between items-center cursor-move select-none`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-xs font-bold">{title}</span>
        <div className="window-controls flex gap-1">
          <button
            onClick={onClose}
            className="bg-win95-gray text-black px-2 py-0 text-xs border border-win95-dark-gray hover:bg-win95-light-gray"
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="p-2 h-full overflow-auto bg-win95-gray" style={{ height: height - 24 }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
