import React, { useState, useRef, useEffect } from 'react';

const Window = ({ 
  title, 
  icon,
  children, 
  onClose, 
  initialPosition = { x: 100, y: 100 },
  width = 400,
  height = 300,
  isActive = true,
  isMinimized = false,
  onFocus,
  onMinimize,
  isMaximized: initialMaximized = false
}) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(initialMaximized);
  const [originalPosition, setOriginalPosition] = useState(initialPosition);
  const [originalSize, setOriginalSize] = useState({ width, height });
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

  const handleMinimize = () => {
    onMinimize && onMinimize();
  };

  const handleMaximize = () => {
    if (isMaximized) {
      // Restore
      setPosition(originalPosition);
      setIsMaximized(false);
    } else {
      // Maximize
      setOriginalPosition(position);
      setOriginalSize({ width, height });
      setPosition({ x: 0, y: 0 });
      setIsMaximized(true);
    }
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

  if (isMinimized) {
    return null; // Hide window when minimized
  }

  // Mobile detection for taskbar spacing
  const isMobile = window.innerWidth <= 768;
  const mobileTaskbarHeight = isMobile ? 80 : 40;
  
  const windowStyle = isMaximized 
    ? { left: 0, top: 0, width: '100vw', height: `calc(100vh - ${mobileTaskbarHeight}px)` }
    : { left: position.x, top: position.y, width: width, height: height };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-win95-gray shadow-lg ${isActive ? 'z-10' : 'z-0'}`}
      style={windowStyle}
      onClick={() => onFocus && onFocus()}
    >
      {/* Title Bar */}
      <div
        className={`${isActive ? 'bg-win95-blue' : 'bg-gray-500'} text-white px-2 py-1 flex justify-between items-center cursor-move select-none`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center">
          {icon && <span className="mr-2 text-sm">{icon}</span>}
          <span className="text-sm font-bold tracking-wide">{title}</span>
        </div>
        <div className="window-controls flex gap-0">
          <button
            onClick={handleMinimize}
            className="window-control-btn"
          >
            _
          </button>
          
          <button
            onClick={handleMaximize}
            className="window-control-btn"
          >
            {isMaximized ? "❐" : "□"}
          </button>
          
          <button
            onClick={onClose}
            className="window-control-btn"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="p-2 bg-win95-gray flex flex-col" style={{ height: isMaximized ? `calc(100vh - ${mobileTaskbarHeight + 24}px)` : height - 24 }}>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;
