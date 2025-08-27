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
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
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
    setIsMinimized(!isMinimized);
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

  const windowStyle = isMaximized 
    ? { left: 0, top: 0, width: '100vw', height: 'calc(100vh - 32px)' }
    : { left: position.x, top: position.y, width: width, height: height };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-win95-gray border-2 border-outset shadow-lg ${isActive ? 'z-10' : 'z-0'}`}
      style={windowStyle}
      onClick={() => onFocus && onFocus()}
    >
      {/* Title Bar */}
      <div
        className={`${isActive ? 'bg-win95-blue' : 'bg-gray-500'} text-white px-2 py-1 flex justify-between items-center cursor-move select-none`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-xs font-bold">{title}</span>
        <div className="window-controls flex gap-0">
          {/* Minimize Button */}
          <button
            onClick={handleMinimize}
            className="window-control-btn"
            title="Minimize"
          >
            _
          </button>
          
          {/* Maximize/Restore Button */}
          <button
            onClick={handleMaximize}
            className="window-control-btn"
            title={isMaximized ? "Restore" : "Maximize"}
          >
            {isMaximized ? "❐" : "□"}
          </button>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="window-control-btn"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="p-2 h-full overflow-auto bg-win95-gray" style={{ height: isMaximized ? 'calc(100vh - 56px)' : height - 24 }}>
        {children}
      </div>
    </div>
  );
};

export default Window;
