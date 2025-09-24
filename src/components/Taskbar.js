import React, { useState, useEffect } from 'react';

const Taskbar = ({ onStartClick, isStartMenuOpen, minimizedWindows = [], onWindowRestore }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-11 md:h-9 bg-win95-gray border-t-2 border-win95-light-gray flex items-center px-1 z-50 overflow-hidden">
      {/* Start Button */}
      <button
        onClick={onStartClick}
        className={`${
          isStartMenuOpen 
            ? 'border-2 border-inset' 
            : 'border-2 border-outset hover:brightness-110'
        }`}
      >
        <img 
          src="https://github.com/ariz17/Windows95/raw/060561348c25c2f4d58f176f4205ac1a01c456b0/sm%20logo.png"
          alt="Start"
          className="h-9 md:h-7"
          style={{imageRendering: 'pixelated'}}
        />
      </button>

      {/* Taskbar Buttons for Minimized Windows */}
      <div className="flex-1 flex items-center gap-1 px-2 overflow-hidden min-w-0">
        {minimizedWindows.map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowRestore && onWindowRestore(window.id)}
            className="bg-win95-gray border-2 border-outset hover:bg-win95-light-gray px-1 py-1 text-xs font-bold text-black flex-shrink min-w-0 w-24 truncate flex items-center gap-1"
            title={window.title}
            style={{ maxWidth: '96px', minWidth: '60px' }}
          >
            <span className="text-sm flex-shrink-0">{window.icon}</span>
            <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis min-w-0">{window.title}</span>
          </button>
        ))}
      </div>

      {/* Clock */}
      <div className="bg-win95-gray border-2 border-inset px-3 py-2 md:px-2 md:py-1 text-xl md:text-lg font-mono">
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default Taskbar;
