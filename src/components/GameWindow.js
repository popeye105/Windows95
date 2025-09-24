import React from 'react';

const GameWindow = ({ gameUrl, gameName }) => {
  return (
    <div className="w-full h-full bg-black flex items-center justify-center">
      <iframe 
        src={gameUrl} 
        className="w-full h-full border-none" 
        title={gameName}
        style={{ minHeight: '400px' }}
      />
    </div>
  );
};

export default GameWindow;
