import React, { useContext } from 'react';
import BackgroundContext from '../BackgroundContext';

const wallpapers = [
  { name: 'Mario', src: '/wallpapers/Mario.jpeg' },
  { name: 'Sunset', src: '/wallpapers/Sunset.jpeg' },
  { name: 'Spiderman', src: '/wallpapers/Spiderman.jpeg' },
];

const ChangeBackgroundWindow = () => {
  const { wallpaperUrl, setWallpaperUrl } = useContext(BackgroundContext);

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
      <div className="p-2 border-b border-win95-dark-gray flex items-center justify-between">
        <span className="text-sm font-bold">Select a Wallpaper</span>
        <div className="flex gap-2">
          <button className="win95-button text-xs px-2 py-1" onClick={clear}>Default Color</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {wallpapers.map((w) => (
            <button key={w.src} className="bg-white border-2 border-inset p-2 text-left" onClick={() => apply(w.src)}>
              <div className="mb-2 text-xs font-bold">{w.name}{wallpaperUrl === w.src ? ' (Selected)' : ''}</div>
              <img src={w.src} alt={w.name} className="w-full h-32 object-cover border" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeBackgroundWindow;
