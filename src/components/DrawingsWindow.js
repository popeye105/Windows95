import React, { useState, useEffect } from 'react';

const DrawingsWindow = () => {
  const [drawings, setDrawings] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const openImage = (drawing) => {
    setSelectedImage(drawing);
  };

  const closeImageViewer = () => {
    setSelectedImage(null);
  };

  return (
    <div className="h-full flex flex-col">
      {selectedImage ? (
        // Image Viewer
        <div className="h-full flex flex-col">
          <div className="p-2 border-b border-win95-dark-gray flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">{selectedImage.description}</span>
            </div>
            <button
              onClick={closeImageViewer}
              className="win95-button text-xs px-2 py-1"
            >
              ← Back
            </button>
          </div>
          <div className="flex-1 bg-white border-2 border-inset flex items-center justify-center overflow-hidden" style={{ minHeight: 0 }}>
            <img
              src={`/drawings/${selectedImage.filename}`}
              alt={selectedImage.name}
              className="object-contain border border-win95-dark-gray"
              style={{ 
                maxWidth: 'calc(100% - 8px)', 
                maxHeight: 'calc(100% - 8px)',
                width: 'auto',
                height: 'auto'
              }}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjY2NjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
              }}
            />
          </div>
        </div>
      ) : (
        // Gallery Grid
        <div className="h-full overflow-auto p-2">
          <div className="grid grid-cols-2 gap-2">
            {drawings.map((drawing) => (
              <div
                key={drawing.id}
                className="bg-white border-2 border-outset p-2 cursor-pointer hover:bg-win95-light-gray"
                onClick={() => openImage(drawing)}
              >
                <div className="aspect-square bg-win95-light-gray border border-win95-dark-gray flex items-center justify-center mb-2">
                  <img
                    src={`/drawings/${drawing.filename}`}
                    alt={drawing.name}
                    className="max-w-full max-h-full object-cover"
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
                  <div className="text-xs text-gray-600">{drawing.description}</div>
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
      )}
    </div>
  );
};

export default DrawingsWindow;
