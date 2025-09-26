import React, { useState, useEffect } from 'react';
import MusicWindow from './MusicWindow';
import GameWindow from './GameWindow';

const DateTimeWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getDaysInMonth = () => {
    const year = currentTime.getFullYear();
    const month = currentTime.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = currentTime.getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    return { days, today };
  };

  const { days, today } = getDaysInMonth();

  const getClockHands = () => {
    const hours = currentTime.getHours() % 12;
    const minutes = currentTime.getMinutes();
    const seconds = currentTime.getSeconds();
    
    return {
      hour: (hours * 30) + (minutes * 0.5),
      minute: minutes * 6,
      second: seconds * 6
    };
  };

  const { hour, minute, second } = getClockHands();

  return (
    <div className="flex flex-col space-y-4">
      <div className="text-center">
        <div className="font-bold mb-2">Date</div>
        <div className="bg-win95-gray border border-gray-400 p-2">
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

      <div className="text-center">
        <div className="font-bold mb-2">Time</div>
        <div className="relative w-32 h-32 mx-auto bg-gray-200 rounded-full border border-gray-400">
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setShowGamesSubmenu(false);
      setShowSettingsSubmenu(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window && window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGameClick = (game) => {
    if (game.name === 'Cook it' && window.innerWidth <= 768 && 'ontouchstart' in window) {
      const popup = document.createElement('div');
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
      `;
      popup.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <span style="font-size: 16px;">⚠️</span>
          <span style="font-size: 11px; color: black; line-height: 1.3;">Cook it :- Playable on PC</span>
        </div>
      `;
      
      
      document.body.appendChild(popup);
      
      setTimeout(() => {
        if (popup.parentNode) {
          popup.parentNode.removeChild(popup);
        }
      }, 3000);
      
      onClose();
      return;
    }
    
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

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
    onClose();
  };

  const handleDialogOpen = (dialogSetter) => {
    onClose();
    dialogSetter(true);
  };

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
          handleDialogOpen(setShowDateTimeDialog);
        } else if (item.name === 'Info') {
          handleDialogOpen(setShowInfoDialog);
        }
      }
    }
  };

  const renderSubmenu = (menuKey) => {
    const menu = menuData[menuKey];
    return menu.show && (
      <>
        <div className="absolute left-full top-0 w-1 h-full z-60"></div>
        <div className="absolute left-full top-0 ml-1 w-44 bg-win95-gray shadow-lg z-60 win95-start-menu" style={{
          border: '2px outset #c0c0c0',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
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

  if (!isOpen && !showInfoDialog && !showDateTimeDialog) return null;

  return (
    <>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={onClose}
          />
          
          <div className="fixed bottom-8 left-1 bg-win95-gray shadow-lg z-50 win95-start-menu flex">
        <div className="bg-win95-dark-gray text-white flex items-center justify-center w-8 min-h-full border-r border-win95-dark-gray">
          <div className="transform -rotate-90 whitespace-nowrap text-base font-bold tracking-widest">
            Vintage 2.0
          </div>
        </div>
        
        <div className="w-44">
          <div className="p-1">
          <div 
            className="relative"
            onMouseEnter={() => !isMobile && setShowGamesSubmenu(true)}
            onMouseLeave={() => !isMobile && setShowGamesSubmenu(false)}
            onClick={() => {
              if (isMobile) {
                // Close settings if open, then toggle games
                if (showSettingsSubmenu) {
                  setShowSettingsSubmenu(false);
                }
                setShowGamesSubmenu(!showGamesSubmenu);
              }
            }}
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
            onMouseEnter={() => !isMobile && setShowSettingsSubmenu(true)}
            onMouseLeave={() => !isMobile && setShowSettingsSubmenu(false)}
            onClick={() => {
              if (isMobile) {
                // Close games if open, then toggle settings
                if (showGamesSubmenu) {
                  setShowGamesSubmenu(false);
                }
                setShowSettingsSubmenu(!showSettingsSubmenu);
              }
            }}
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
            onClick={() => handleExternalLink('https://www.linkedin.com/in/mohd-arbab-rizvi-3217b9366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app')}
          >
            <img src="/linkedin-logo.svg" alt="LinkedIn" className="w-4 h-4 mr-2" />
            LinkedIn
          </div>
          
          <div 
            className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={() => handleExternalLink('https://github.com/ariz-17')}
          >
            <img src="/github-logo.svg" alt="GitHub" className="w-4 h-4 mr-2" />
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 bg-win95-gray shadow-lg w-80 border border-white" style={{
            border: '2px outset #c0c0c0',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            <div className="bg-win95-blue text-white px-2 py-1 flex justify-between items-center cursor-move select-none">
              <span className="text-sm font-bold tracking-wide">ℹ️ About</span>
              <div className="window-controls flex gap-0">
                {/* Close button */}
                <button 
                  className="window-control-btn"
                  onClick={() => setShowInfoDialog(false)}
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center">
                <img 
                  src="/Menu.png" 
                  alt="Vintage 2.0 Logo" 
                  className="w-10 h-10 mr-2"
                  style={{imageRendering: 'auto'}}
                />
                <h2 className="text-5xl font-bold text-black" style={{fontSize: '48px'}}>Vintage 2.0</h2>
              </div>
              <p>
                Welcome to a retro desktop experience that recreates the classic Windows 95 like interface with modern feel. Features interactive games, music player and much more.
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 bg-win95-gray shadow-lg w-96 border border-white" style={{
            border: '2px outset #c0c0c0',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            <div className="bg-win95-blue text-white px-2 py-1 flex justify-between items-center cursor-move select-none">
              <span className="text-sm font-bold tracking-wide">🕐 Date & Time Properties</span>
              <div className="window-controls flex gap-0">
                {/* Close button */}
                <button 
                  className="window-control-btn"
                  onClick={() => setShowDateTimeDialog(false)}
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
