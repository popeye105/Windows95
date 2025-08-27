import React, { useEffect, useRef, useState } from 'react';

const GamesWindow = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const playerRef = useRef(null);

  // Fullscreen helpers
  const enterFullscreen = (el) => {
    if (!el) return;
    const anyEl = el;
    (anyEl.requestFullscreen || anyEl.webkitRequestFullscreen || anyEl.msRequestFullscreen || anyEl.mozRequestFullScreen)?.call(anyEl);
  };

  const exitFullscreen = () => {
    const d = document;
    (d.exitFullscreen || d.webkitExitFullscreen || d.msExitFullscreen || d.mozCancelFullScreen)?.call(d);
  };

  const isFullscreen = () => {
    const d = document;
    return !!(d.fullscreenElement || d.webkitFullscreenElement || d.msFullscreenElement || d.mozFullScreenElement);
  };

  // Games now open in windowed mode by default - no auto-fullscreen
  // useEffect(() => {
  //   if (selectedGame && playerRef.current && !isFullscreen()) {
  //     // small delay to ensure element is in DOM
  //     const id = setTimeout(() => enterFullscreen(playerRef.current), 0);
  //     return () => clearTimeout(id);
  //   }
  // }, [selectedGame]);

  const games = [
    {
      id: 1,
      title: 'Snake Game',
      description: 'Classic snake game built with vanilla JavaScript',
      type: 'iframe',
      url: '/games/snake.html',
      icon: '🐍'
    },
    {
      id: 3,
      title: 'Minesweeper',
      description: 'Classic Windows Minesweeper',
      type: 'iframe',
      url: '/games/minesweeper.html',
      icon: '🧨'
    }
    ,
    {
      id: 4,
      title: 'Cooking Game',
      description: 'HTML5 cooking game',
      type: 'iframe',
      url: '/games/cooking/index.html',
      icon: '🍳'
    }
  ];

  const playGame = (game) => {
    if (game.type === 'iframe') {
      setSelectedGame(game);
    } else {
      window.open(game.url, '_blank');
    }
  };

  const closeGame = () => {
    setSelectedGame(null);
  };

  return (
    <div className="h-full flex flex-col">
      {selectedGame ? (
        <div className="h-full flex flex-col" ref={playerRef}>
          <div className="p-2 border-b border-win95-dark-gray flex justify-between items-center">
            <span className="text-sm font-bold">{selectedGame.title}</span>
            <button
              onClick={closeGame}
              className="win95-button text-xs px-2 py-1"
            >
              ← Back to Games
            </button>
            <button
              onClick={() => (isFullscreen() ? exitFullscreen() : enterFullscreen(playerRef.current))}
              className="win95-button text-xs px-2 py-1 ml-2"
              title="Toggle Fullscreen"
            >
              ⛶ Fullscreen
            </button>
          </div>
          <div className="flex-1">
            <iframe
              src={selectedGame.url}
              className="w-full h-full"
              title={selectedGame.title}
              allow="fullscreen"
              allowFullScreen
              onError={() => {
                console.log('Game failed to load');
              }}
            />
          </div>
        </div>
      ) : (
        <div className="h-full overflow-auto p-2">
          <div className="grid gap-3">
            {games.map((game) => (
              <div key={game.id} className="bg-white border-2 border-inset p-3">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">{game.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm">{game.title}</h3>
                    <p className="text-xs text-gray-700">{game.description}</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => playGame(game)}
                    className="win95-button text-xs px-3 py-1"
                  >
                    {game.type === 'iframe' ? '🎮 Play' : '🌐 View on GitHub'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      )}
    </div>
  );
};

export default GamesWindow;
