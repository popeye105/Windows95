import React, { useState } from 'react';

const StartMenu = ({ isOpen, onClose, onOpenWindow }) => {
  const [showGamesSubmenu, setShowGamesSubmenu] = useState(false);

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
            className="relative flex items-center justify-between px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer"
            onClick={() => setShowGamesSubmenu(!showGamesSubmenu)}
          >
            <div className="flex items-center">
              <span className="mr-2">🎮</span>
              Games
            </div>
            <span>▶</span>
            
            {showGamesSubmenu && (
              <div className="absolute left-full top-0 ml-1 w-44 bg-win95-gray border-2 border-outset shadow-lg z-60">
                <div className="p-1">
                  {games.map((game, index) => (
                    <div
                      key={index}
                      className="flex items-center px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer"
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
            className="flex items-center px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer"
            onClick={() => {
              onOpenWindow({
                id: 'music',
                title: 'My Music',
                component: () => {
                  const MusicWindow = require('./MusicWindow').default;
                  return <MusicWindow />;
                }
              });
              onClose();
            }}
          >
            <span className="mr-2">🎵</span>
            My Music
          </div>
          
          <div className="flex items-center px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer">
            <span className="mr-2">⚙️</span>
            Settings
          </div>
          
          <hr className="my-1 border-win95-dark-gray" />
          
          <div className="px-2 py-1 text-xs font-bold text-win95-dark-gray">
            Connect
          </div>
          
          <div 
            className="flex items-center px-2 py-1 text-xs hover:bg-win95-light-gray cursor-pointer"
            onClick={handleLinkedInClick}
          >
            <img src="/linkedin-logo.svg" alt="LinkedIn" className="w-4 h-4 mr-2" />
            LinkedIn
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
