import { createContext } from 'react';

const BackgroundContext = createContext({
  wallpaperUrl: null,
  setWallpaperUrl: () => {},
});

export default BackgroundContext;
