import React, { useState, useEffect } from 'react';

const Taskbar = ({ onStartClick, isStartMenuOpen }) => {
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
    <div className="fixed bottom-0 left-0 right-0 h-10 md:h-8 bg-win95-gray border-t-2 border-win95-light-gray flex items-center justify-between px-1 z-50">
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
          className="h-8 md:h-6"
          style={{imageRendering: 'pixelated'}}
        />
      </button>

      {/* Clock */}
      <div className="bg-win95-gray border-2 border-inset px-3 py-2 md:px-2 md:py-1 text-sm md:text-xs font-mono">
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default Taskbar;
