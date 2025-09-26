import React, { useState, useEffect } from 'react';

const DrawingsWindow = () => {
  const [drawings, setDrawings] = useState([]);

  useEffect(() => {
    // Load the actual drawings from the drawings folder
    const actualDrawings = [
      { id: 1, name: 'AOT', filename: 'AOT.jpg', description: 'Attack on Titan' },
      { id: 2, name: 'TVD', filename: 'TVD.jpg', description: 'Damon from TVD' },
      { id: 3, name: 'SG', filename: 'SG.jpg', description: 'Selena Gomez' },
      { id: 4, name: 'SL', filename: 'SL.jpg', description: 'Solo Leveling' },
    ];
    setDrawings(actualDrawings);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-full overflow-auto p-2 m-2">
        <div className="grid grid-cols-2 gap-2">
          {drawings.map((drawing) => (
            <div
              key={drawing.id}
              className="p-2 border border-black"
            >
              <div className="aspect-square bg-win95-light-gray flex items-center justify-center mb-2">
                <img
                  src={`/drawings/${drawing.filename}`}
                  alt={drawing.name}
                  className="max-w-full max-h-full object-cover border border-black"
                  style={{
                    imageRendering: 'auto',
                    transform: 'scale(1)',
                    transformOrigin: 'center',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="text-xs text-win95-dark-gray hidden">
                  🎨 {drawing.name}
                </div>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-600">{drawing.description}</div>
              </div>
            </div>
          ))}
        </div>
        
        {drawings.length === 0 && (
          <div className="text-center text-win95-dark-gray mt-8">
            <div className="text-4xl mb-2">🎨</div>
            <p>No drawings found.</p>
            <p className="text-xs mt-2">Add images to /public/drawings/ folder</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrawingsWindow;
