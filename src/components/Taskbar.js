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
    }).toUpperCase();
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 md:h-9 z-50 overflow-hidden taskbar-container">
      {/* Taskbar Background - Balanced Modern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300 border-t-2 border-white shadow-lg"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      
      {/* Taskbar Content */}
      <div className="relative flex items-center h-full px-1">
        {/* Enhanced Modern Start Button */}
        <button
          onClick={onStartClick}
          className={`start-button inline-flex items-center gap-1 px-3 py-0 rounded cursor-pointer text-xs font-semibold ${
            isStartMenuOpen 
              ? 'start-button-pressed'
              : 'start-button-normal'
          }`}
        >
          <img 
            src="/Menu.png"
            alt="Start"
            className="w-5 h-5"
            style={{imageRendering: 'pixelated'}}
          />
          <span className="text-black font-bold">Start</span>
        </button>

        {/* Window Buttons Area */}
        <div className="flex-1 flex items-center gap-1 px-2 overflow-hidden min-w-0">
          {minimizedWindows.map((window) => (
            <button
              key={window.id}
              onClick={() => onWindowRestore && onWindowRestore(window.id)}
              className="window-button bg-gradient-to-b from-gray-200 to-gray-300 border border-gray-400 hover:from-gray-300 hover:to-gray-400 px-2 py-1 text-xs font-semibold text-black flex-shrink min-w-0 w-28 truncate flex items-center gap-1 rounded-sm transition-all duration-150 shadow-sm"
              title={window.title}
              style={{ maxWidth: '112px', minWidth: '80px' }}
            >
              <span className="text-sm flex-shrink-0 drop-shadow-sm">{window.icon}</span>
              <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis min-w-0">{window.title}</span>
            </button>
          ))}
        </div>

        {/* System Tray Area */}
        <div className="flex items-center">
          {/* Modern Clock Widget */}
          <div className="clock-widget bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-0.5 rounded-sm shadow-inner" style={{
            border: '0.25px solid #888'
          }}>
            <div className="text-base font-semibold text-gray-800 leading-tight">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </div>
      {/* Taskbar Styles */}
      <style jsx>{`
        .taskbar-container {
          backdrop-filter: blur(1px);
        }
        
        .start-button-normal {
          background: linear-gradient(to bottom, #f0f0f0, #d8d8d8);
          border: 1px solid #999;
          border-radius: 3px;
          box-shadow: 
            inset 0 1px 0 rgba(255,255,255,0.8),
            0 1px 3px rgba(0,0,0,0.1);
        }
        
        .start-button-normal:hover {
          background: linear-gradient(to bottom, #f8f8f8, #e0e0e0);
          border: 1px solid #999;
        }
        
        .start-button-pressed {
          background: linear-gradient(to bottom, #c8c8c8, #d8d8d8);
          border: 1px solid #999;
          border-radius: 3px;
          box-shadow: 
            inset 0 1px 2px rgba(0,0,0,0.2),
            0 1px 1px rgba(0,0,0,0.05);
          transform: translateY(0.5px);
        }
        
        .start-icon-container {
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2));
        }
        
        .window-button:hover {
          transform: translateY(-0.5px);
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        
        .window-button:active {
          transform: translateY(0);
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
        }
        
        .clock-widget {
          min-width: 65px;
          transition: all 0.15s ease;
        }
        
        .clock-widget:hover {
          cursor: default;
        }
      `}</style>
    </div>
  );
};

export default Taskbar;
