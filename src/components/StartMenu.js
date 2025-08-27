import React, { useState } from 'react';

const StartMenu = ({ isOpen, onClose }) => {
  const [showGamesSubmenu, setShowGamesSubmenu] = useState(false);

  if (!isOpen) return null;

  const games = [
    { name: 'Snake', url: '/games/snake.html' },
    { name: 'Minesweeper', url: '/games/minesweeper.html' },
    { name: 'Cooking Game', url: '/games/cooking/index.html' }
  ];

  const handleGameClick = (url) => {
    window.open(url, '_blank');
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
      <div className="fixed bottom-8 left-1 w-48 bg-win95-gray border-2 border-outset shadow-lg z-50">
        <div className="bg-win95-blue text-white px-2 py-1 text-xs font-bold">
          Windows 95
        </div>
        
        <div className="p-1">
          <div 
            className="flex items-center justify-between px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer"
            onMouseEnter={() => setShowGamesSubmenu(true)}
            onMouseLeave={() => setShowGamesSubmenu(false)}
          >
            <div className="flex items-center">
              <span className="mr-2">🎮</span>
              Games
            </div>
            <span>▶</span>
          </div>
          
          {/* Games Submenu */}
          {showGamesSubmenu && (
            <div 
              className="absolute left-full top-0 ml-1 w-40 bg-win95-gray border-2 border-outset shadow-lg z-60"
              onMouseEnter={() => setShowGamesSubmenu(true)}
              onMouseLeave={() => setShowGamesSubmenu(false)}
            >
              <div className="p-1">
                {games.map((game, index) => (
                  <div
                    key={index}
                    className="flex items-center px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer"
                    onClick={() => handleGameClick(game.url)}
                  >
                    <span className="mr-2">🎯</span>
                    {game.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StartMenu;
