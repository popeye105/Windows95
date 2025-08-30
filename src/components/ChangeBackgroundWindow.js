import React, { useContext } from 'react';
import BackgroundContext from '../BackgroundContext';

const wallpapers = [
  { name: 'Mario', src: '/wallpapers/Mario.jpeg' },
  { name: 'Sunset', src: '/wallpapers/Sunset.jpeg' },
  { name: 'Spiderman', src: '/wallpapers/Spiderman.jpeg' },
];

const ChangeBackgroundWindow = () => {
  const { wallpaperUrl, setWallpaperUrl } = useContext(BackgroundContext);
  const isMobile = window.innerWidth <= 768;

  const apply = (src) => {
    setWallpaperUrl(src);
    try { localStorage.setItem('wallpaperUrl', src); } catch {}
  };

  const clear = () => {
    setWallpaperUrl(null);
    try { localStorage.removeItem('wallpaperUrl'); } catch {}
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 border-b border-win95-dark-gray flex justify-between items-center">
        <span className="text-sm font-bold">Select a Wallpaper</span>
        <button className="win95-button text-xs px-2 py-1" onClick={clear}>Default Color</button>
      </div>
      <div className="flex-1 overflow-y-auto p-3" style={{ maxHeight: isMobile ? 'calc(100vh - 200px)' : 'auto' }}>
        <div className={`grid gap-3 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {wallpapers.map((w) => (
            <button key={w.src} className="bg-white border-2 border-inset p-2 hover:bg-gray-50" onClick={() => apply(w.src)}>
              <div className="mb-2 text-xs font-bold">{w.name}{wallpaperUrl === w.src ? ' (Selected)' : ''}</div>
              <div className="w-full h-32 bg-gray-100 border flex items-center justify-center">
                <img src={w.src} alt={w.name} className="max-w-full max-h-full object-contain" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeBackgroundWindow;
