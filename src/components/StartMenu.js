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
  useEffect(() => {
    if (!isOpen) {
      setShowGamesSubmenu(false);
      setShowSettingsSubmenu(false);
    }
  }, [isOpen]);

  const handleGameClick = (game) => {
    onOpenWindow({
      id: `game-${game.name.toLowerCase()}`,
      title: game.name,
      icon: game.icon,
      component: () => <GameWindow gameUrl={game.url} gameName={game.name} />,
      isMaximized: true,
      noPadding: true
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
    console.log(`Rendering submenu for ${menuKey}:`, menu.show, menu.items);
    if (!menu.show) return null;
    
    return (
      <>
        {/* Invisible bridge to prevent submenu from disappearing */}
        <div className="absolute left-full top-0 w-2 h-full z-[60]"></div>
        <div 
          className="absolute left-full top-0 ml-1 w-44 bg-gradient-to-b from-gray-200 to-gray-300 shadow-xl z-[60] border border-gray-600 rounded-sm" 
          style={{
            marginTop: '-4px'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 rounded-sm pointer-events-none"></div>
          <div className="p-1 relative z-10">
            {menu.items.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer rounded-sm"
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
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          />
          
          <div className="fixed bottom-9 left-1 z-50 win95-start-menu flex rounded-sm shadow-xl border border-gray-600">
        {/* Modern Sidebar */}
        <div className="text-white flex items-center justify-center w-8 min-h-full relative" style={{
          background: 'linear-gradient(to bottom, #1d4ed8, #1e40af)'
        }}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          <div className="transform -rotate-90 whitespace-nowrap text-base font-bold tracking-widest relative z-10 drop-shadow-lg">
            Vintage 2.0
          </div>
        </div>
        
        {/* Modern Menu Background */}
        <div className="w-44 bg-gradient-to-b from-gray-200 to-gray-300 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 pointer-events-none"></div>
          <div className="p-1 relative z-10">
          <div 
            className="relative z-10"
            onMouseEnter={() => {
              console.log('Games hover enter');
              setShowGamesSubmenu(true);
            }}
            onMouseLeave={() => {
              console.log('Games hover leave');
              setShowGamesSubmenu(false);
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
                icon: '🎧',
                component: MusicWindow
              });
              onClose();
            }}
          >
            <span className="mr-2">🎧</span>
            My Music
          </div>
          
          <div 
            className="relative z-10"
            onMouseEnter={() => {
              console.log('Settings hover enter');
              setShowSettingsSubmenu(true);
            }}
            onMouseLeave={() => {
              console.log('Settings hover leave');
              setShowSettingsSubmenu(false);
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
            onClick={() => handleExternalLink('https://github.com/ariz17')}
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 w-80 border border-gray-400 shadow-xl rounded-sm overflow-hidden" style={{
            background: 'linear-gradient(to bottom, #f0f0f0, #e8e8e8)'
          }}>
            <div className="text-white px-3 py-1 flex justify-between items-center cursor-move select-none" style={{
              background: 'linear-gradient(to bottom, #1d4ed8, #1e40af)'
            }}>
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
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 w-96 border border-gray-400 shadow-xl rounded-sm overflow-hidden" style={{
            background: 'linear-gradient(to bottom, #f0f0f0, #e8e8e8)'
          }}>
            <div className="text-white px-3 py-1 flex justify-between items-center cursor-move select-none" style={{
              background: 'linear-gradient(to bottom, #1d4ed8, #1e40af)'
            }}>
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
