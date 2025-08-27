import React, { useState, useEffect } from 'react';
import MusicWindow from './MusicWindow';

const StartMenu = ({ isOpen, onClose, onOpenWindow }) => {
  const [showGamesSubmenu, setShowGamesSubmenu] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);

  // Reset submenu state when start menu closes (but keep dialog state)
  useEffect(() => {
    if (!isOpen) {
      setShowGamesSubmenu(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const games = [
    { name: 'Snake', icon: '🐍', url: '/games/snake.html' },
    { name: 'Minesweeper', icon: '💣', url: '/games/minesweeper.html' },
    { name: 'Cooking Game', icon: '🍳', url: '/games/cooking/index.html' }
  ];

  const handleGameClick = (game) => {
    onOpenWindow({
      id: `game-${game.name.toLowerCase()}`,
      title: game.name,
      component: () => <iframe src={game.url} className="w-full h-full border-none" title={game.name} />
    });
    onClose();
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/arbab-rizvi-3217b9366?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', '_blank');
    onClose();
  };

  const handleGitHubClick = () => {
    window.open('https://github.com/ariz-24', '_blank');
    onClose();
  };

  const handleSettingsClick = () => {
    setShowSettingsDialog(true);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className="fixed bottom-8 left-1 w-48 bg-win95-gray border-2 border-outset shadow-lg z-50 win95-start-menu">
        <div className="bg-win95-blue text-white px-2 py-1 win95-titlebar-text">
          Windows 95
        </div>
        
        <div className="p-1">
          <div 
            className="relative flex items-center justify-between px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={() => setShowGamesSubmenu(!showGamesSubmenu)}
          >
            <div className="flex items-center">
              <span className="mr-2">🎮</span>
              Games
            </div>
            <span>▶</span>
            
            {showGamesSubmenu && (
              <div className="absolute left-full top-0 ml-1 w-44 bg-win95-gray border-2 border-outset shadow-lg z-60 win95-start-menu">
                <div className="p-1">
                  {games.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
                      onClick={() => handleGameClick(game)}
                    >
                      <span className="mr-2">{game.icon}</span>
                      {game.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div 
            className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={() => {
              onOpenWindow({
                id: 'music',
                title: 'My Music',
                component: () => <MusicWindow />
              });
              onClose();
            }}
          >
            <span className="mr-2">🎵</span>
            My Music
          </div>
          
          <div 
            className="flex items-center px-2 py-1 win95-start-menu-item cursor-pointer"
            onClick={handleSettingsClick}
          >
            <span className="mr-2">⚙️</span>
            Settings
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

      {/* Settings Dialog */}
      {showSettingsDialog && (
        <>
          <div 
            className="fixed inset-0 z-60 bg-black bg-opacity-50"
            onClick={() => setShowSettingsDialog(false)}
          />
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-70 bg-win95-gray border-2 border-outset shadow-lg">
            <div className="bg-win95-blue text-white px-2 py-1 win95-titlebar-text">
              <span>Settings</span>
            </div>
            <div className="p-4 win95-text">
              <div className="flex items-center mb-3">
                <span className="mr-2 text-lg">⚠️</span>
                <span className="font-bold">Information</span>
              </div>
              <p className="mb-4">Functionality under development</p>
              <div className="flex justify-center">
                <button 
                  className="win95-button px-4 py-1"
                  onClick={() => setShowSettingsDialog(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default StartMenu;
