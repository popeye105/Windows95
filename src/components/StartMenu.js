import React, { useState, useEffect } from 'react';
import MusicWindow from './MusicWindow';
import GameWindow from './GameWindow';

// Simple Date & Time Widget
const DateTimeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simple calendar grid
  const getDaysInMonth = () => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = currentTime.getDate();
    
    const days = [];
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return { days, today };
  };

  const { days, today } = getDaysInMonth();

  // Simple analog clock
  const getClockHands = () => {
    const hours = currentTime.getHours() % 12;
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    return {
      hour: (hours * 30) + (minutes * 0.5), // 30 degrees per hour + minute adjustment
      minute: minutes * 6, // 6 degrees per minute
      second: seconds * 6  // 6 degrees per second
    };
  };

  const { hour, minute, second } = getClockHands();

  return (
    <div className="flex flex-col space-y-4">
      {/* Calendar */}
      <div className="text-center">
        <div className="font-bold mb-2">Date</div>
        <div className="bg-win95-gray border-2 border-inset p-2">
          <div className="grid grid-cols-7 gap-1 text-xs">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-center font-bold p-1 bg-win95-light-gray">{day}</div>
            ))}
            {days.map((day, i) => (
              <div key={i} className={`text-center p-1 ${day === today ? 'bg-blue-600 text-white' : 'bg-white'}`}>
                {day || ''}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analog Clock */}
      <div className="text-center">
        <div className="font-bold mb-2">Time</div>
        <div className="relative w-32 h-32 mx-auto bg-gray-200 rounded-full border-2 border-inset">
          {/* Clock face dots */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-black"
              style={{
                top: '10px',
                left: '50%',
                transformOrigin: '0 54px',
                transform: `translateX(-50%) rotate(${i * 30}deg)`
              }}
            />
          ))}
          
          {/* Hour hand */}
          <div
            className="absolute w-1 bg-black rounded"
            style={{
              height: '25px',
              top: '39px',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${hour}deg)`
            }}
          />
          
          {/* Minute hand */}
          <div
            className="absolute w-0.5 bg-black rounded"
            style={{
              height: '35px',
              top: '29px',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${minute}deg)`
            }}
          />
          
          {/* Second hand */}
          <div
            className="absolute w-px bg-red-500 rounded"
            style={{
              height: '40px',
              top: '24px',
              left: '50%',
              transformOrigin: 'bottom center',
              transform: `translateX(-50%) rotate(${second}deg)`
            }}
          />
          
          {/* Center dot */}
          <div className="absolute w-2 h-2 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    </div>
  );
};

const StartMenu = ({ isOpen, onClose, onOpenWindow }) => {
  const [showGamesSubmenu, setShowGamesSubmenu] = useState(false);
  const [showSettingsSubmenu, setShowSettingsSubmenu] = useState(false);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [showDateTimeDialog, setShowDateTimeDialog] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);

  // Reset submenu state when start menu closes (but keep dialog state)
  useEffect(() => {
    if (!isOpen) {
      setShowGamesSubmenu(false);
      setShowSettingsSubmenu(false);
    }
  }, [isOpen]);

  const handleGameClick = (game) => {
    // Check if it's cooking game on mobile
    if (game.name === 'Cook it' && window.innerWidth <= 768 && 'ontouchstart' in window) {
      // Show mobile warning popup
      const popup = document.createElement('div');
      popup.className = 'fixed top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 border-2 border-gray-400 px-4 py-3 z-50 rounded shadow-lg text-center';
      popup.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: lightyellow;
        border: 2px outset silver;
        padding: 12px 16px;
        z-index: 10001;
        font-family: 'MS Sans Serif', sans-serif;
        box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        text-align: center;
        animation: slideDown 0.5s ease-out;
      `;
      popup.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span style="font-size: 16px;">⚠️</span>
          <span style="font-size: 11px; color: black; line-height: 1.3;">Cook it :- Playable on PC</span>
        </div>
      `;
      
      // Add animation keyframes if not already present
      if (!document.querySelector('#slideDownKeyframes')) {
        const style = document.createElement('style');
        style.id = 'slideDownKeyframes';
        style.textContent = `
          @keyframes slideDown {
            from { top: -100px; opacity: 0; }
            to { top: 20px; opacity: 1; }
          }
        `;
        document.head.appendChild(style);
      }
      
      document.body.appendChild(popup);
      
      // Auto-remove after 3 seconds
      setTimeout(() => {
        if (popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 3000);
      
      onClose();
      return;
    }
    
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    onOpenWindow({
      id: `game-${game.name.toLowerCase()}`,
      title: game.name,
      icon: game.icon,
      component: () => <GameWindow gameUrl={game.url} gameName={game.name} />,
      isMaximized: isMobile ? (game.name === 'Snake' || game.name === 'Minesweeper') : true
    });
    onClose();
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/mohd-arbab-rizvi-3217b9366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
    onClose();
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/ariz-17', '_blank');
    onClose();
  };

  const handleInfoClick = () => {
    onClose();
    setShowInfoDialog(true);
  };

  const handleDateTimeClick = () => {
    onClose();
    setShowDateTimeDialog(true);
  };

  // Menu data configuration
  const menuData = {
    games: {
      items: [
        { name: 'Snake', icon: '🐍', url: '/games/snake.html' },
        { name: 'Minesweeper', icon: '💣', url: '/games/minesweeper.html' },
        { name: 'Cook it', icon: '🍳', url: '/games/cooking/index.html' }
      ],
      show: showGamesSubmenu,
      onClick: handleGameClick
    },
    settings: {
      items: [
        { name: 'Date & Time', icon: '🕐' },
        { name: 'Info', icon: 'ℹ️' }
      ],
      show: showSettingsSubmenu,
      onClick: (item) => {
        if (item.name === 'Date & Time') {
          handleDateTimeClick();
        } else if (item.name === 'Info') {
          handleInfoClick();
        }
      }
    }
  };

  // Unified submenu renderer
  const renderSubmenu = (menuKey) => {
    const menu = menuData[menuKey];
    return menu.show && (
      <>
        <div className="absolute left-full top-0 w-1 h-full z-60"></div>
        <div className="absolute left-full top-0 ml-1 w-44 bg-win95-gray border-2 border-outset shadow-lg z-60 win95-start-menu">
          <div className="p-1">
            {menu.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
                onClick={() => menu.onClick(item)}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  };

  if (!isOpen && !showInfoDialog && !showDateTimeDialog && !isShuttingDown) return null;

  return (
    <>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          {/* Menu */}
          <div className="fixed bottom-8 left-1 bg-win95-gray border-2 border-outset shadow-lg z-50 win95-start-menu flex">
        {/* Vertical Windows 95 branding */}
        <div className="bg-win95-dark-gray text-white flex items-center justify-center w-8 min-h-full border-r border-win95-dark-gray">
          <div className="transform -rotate-90 whitespace-nowrap text-base font-bold tracking-widest">
            Vintage 2.0
          </div>
        </div>
        
        {/* Menu content */}
        <div className="w-44">
          <div className="p-1">
          <div 
            className="relative"
            onMouseEnter={() => setShowGamesSubmenu(true)}
            onMouseLeave={() => setShowGamesSubmenu(false)}
          >
            <div className="flex items-center justify-between px-2 py-1 win95-start-menu-item cursor-pointer">
              <div className="flex items-center">
                <span className="mr-2">🎮</span>
                Games
              </div>
              <span className="win95-submenu-arrow">▶</span>
            </div>
            {renderSubmenu('games')}
          </div>
          
          <div 
            className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={() => {
              onOpenWindow({
                id: 'music',
                title: 'My Music',
                icon: '🎵',
                component: MusicWindow
              });
              onClose();
            }}
          >
            <span className="mr-2">🎵</span>
            My Music
          </div>
          
          <div 
            className="relative"
            onMouseEnter={() => setShowSettingsSubmenu(true)}
            onMouseLeave={() => setShowSettingsSubmenu(false)}
          >
            <div className="flex items-center justify-between px-2 py-1 win95-start-menu-item cursor-pointer">
              <div className="flex items-center">
                <span className="mr-2">⚙️</span>
                Settings
              </div>
              <span className="win95-submenu-arrow">▶</span>
            </div>
            {renderSubmenu('settings')}
          </div>
          
          <hr className="my-1 border-win95-dark-gray" />
          
          <div className="px-2 py-1 win95-text-bold text-win95-dark-gray">
            Connect
          </div>
          
          <div 
            className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={handleLinkedInClick}
          >
            <img src="/linkedin-logo.svg" alt="LinkedIn" className="w-4 h-4 mr-2" />
            LinkedIn
          </div>
          
          <div 
            className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={handleGitHubClick}
          >
            <div className="w-4 h-4 mr-2 bg-black rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 16 16" className="w-2.5 h-2.5 fill-black">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
              </div>
            </div>
            GitHub
          </div>
          </div>
        </div>
        </div>
        </>
      )}

      {/* Info Dialog */}
      {showInfoDialog && (
        <>
          <div 
            className="fixed inset-0 z-60 bg-black bg-opacity-50"
            onClick={() => setShowInfoDialog(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 bg-win95-gray border-2 border-outset shadow-lg w-80">
            <div className="bg-win95-blue text-white px-2 py-1 flex justify-between items-center cursor-move select-none">
              <span className="text-sm font-bold tracking-wide">ℹ️ About</span>
              <div className="window-controls flex gap-0">
                {/* Minimize button */}
                <button className="window-control-btn" title="Minimize">
                  _
                </button>
                {/* Maximize button (non-functional) */}
                <button className="window-control-btn" title="Maximize">
                  □
                </button>
                {/* Close button */}
                <button 
                  className="window-control-btn"
                  onClick={() => setShowInfoDialog(false)}
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 win95-text">
              <div className="flex items-center">
                <img 
                  src="/Menu.png" 
                  alt="Vintage 2.0 Logo" 
                  className="w-8 h-8 mr-1.5"
                  style={{imageRendering: 'auto'}}
                />
                <h2 className="text-2xl font-bold text-black">Vintage 2.0</h2>
              </div>
              <p>
                Welcome to a retro desktop experience that recreates the classic Windows 95 interface with modern feel. Features interactive games, music player and much more.
              </p>
              
              <div className="text-center mt-4 pt-3 border-t border-gray-300">
                <p className="text-sm text-gray-600">Made by: Arbab Rizvi</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Date & Time Dialog */}
      {showDateTimeDialog && (
        <>
          <div 
            className="fixed inset-0 z-60 bg-black bg-opacity-50"
            onClick={() => setShowDateTimeDialog(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 bg-win95-gray border-2 border-outset shadow-lg w-96">
            <div className="bg-win95-blue text-white px-2 py-1 flex justify-between items-center cursor-move select-none">
              <span className="text-sm font-bold tracking-wide">🕐 Date & Time Properties</span>
              <div className="window-controls flex gap-0">
                {/* Minimize button */}
                <button className="window-control-btn" title="Minimize">
                  _
                </button>
                {/* Maximize button (non-functional) */}
                <button className="window-control-btn" title="Maximize">
                  □
                </button>
                {/* Close button */}
                <button 
                  className="window-control-btn"
                  onClick={() => setShowDateTimeDialog(false)}
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4 win95-text">
              <DateTimeWidget />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StartMenu;
