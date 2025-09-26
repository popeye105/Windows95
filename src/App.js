import React, { useState, useEffect } from 'react';
import BackgroundContext from './BackgroundContext';
import SplashScreen from './components/SplashScreen';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import ResumeWindow from './components/ResumeWindow';
import ProjectsWindow from './components/ProjectsWindow';
import DrawingsWindow from './components/DrawingsWindow';
import ChangeBackgroundWindow from './components/ChangeBackgroundWindow';
import MailWindow from './components/MailWindow';
import MusicWindow from './components/MusicWindow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [wallpaperUrl, setWallpaperUrl] = useState(null);
  const [wallpaperLoaded, setWallpaperLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const desktopIcons = [
    { id: 'resume', icon: '📄', label: 'Resume', component: ResumeWindow },
    { id: 'projects', icon: '💼', label: 'Projects', component: ProjectsWindow },
    { id: 'drawings', icon: '🎨', label: 'Drawings', component: DrawingsWindow },
    { id: 'bg', icon: '🖼️', label: 'Change Background', component: ChangeBackgroundWindow },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) event.preventDefault();
    }, { passive: false });
    
    ['gesturestart', 'gesturechange', 'gestureend'].forEach(event => {
      document.addEventListener(event, e => e.preventDefault(), false);
    });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wallpaperUrl');
      if (saved) setWallpaperUrl(saved);
      setWallpaperLoaded(true);
    } catch {
      setWallpaperLoaded(true);
    }
  }, []);

  const handleSplashComplete = () => setIsLoading(false);


  const handleIconSelect = (iconId) => setSelectedIcon(iconId);

  const handleIconDoubleClick = (iconId) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    if (!icon) return;

    const existingWindow = openWindows.find(w => w.id === iconId);
    if (existingWindow) {
      setActiveWindow(iconId);
      return;
    }

    const newWindow = {
      id: iconId,
      title: icon.label,
      icon: icon.icon,
      component: icon.component,
      position: { 
        x: 50 + openWindows.length * 30, 
        y: 50 + openWindows.length * 30 
      }
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindow(iconId);
  };

  const handleOpenWindow = (windowConfig) => {
    const existingWindow = openWindows.find(w => w.id === windowConfig.id);
    if (existingWindow) {
      setActiveWindow(windowConfig.id);
      return;
    }

    const newWindow = {
      ...windowConfig,
      position: { 
        x: 50 + openWindows.length * 30, 
        y: 50 + openWindows.length * 30 
      },
      isMaximized: windowConfig.isMaximized || false
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindow(windowConfig.id);
  };

  const handleWindowClose = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(w => w.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const handleWindowMinimize = (windowId) => {
    const window = openWindows.find(w => w.id === windowId);
    if (window && !minimizedWindows.find(w => w.id === windowId)) {
      setMinimizedWindows(prev => [...prev, window]);
    }
    if (activeWindow === windowId) {
      const visibleWindows = openWindows.filter(w => w.id !== windowId && !minimizedWindows.find(m => m.id === w.id));
      setActiveWindow(visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1].id : null);
    }
  };

  const handleWindowRestore = (windowId) => {
    setMinimizedWindows(prev => prev.filter(w => w.id !== windowId));
    setActiveWindow(windowId);
  };

  const handleWindowFocus = (windowId) => setActiveWindow(windowId);

  const handleStartClick = () => setIsStartMenuOpen(!isStartMenuOpen);

  const handleStartMenuClose = () => setIsStartMenuOpen(false);

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      setIsStartMenuOpen(false);
    }
  };

  return (
    <BackgroundContext.Provider value={{ wallpaperUrl, setWallpaperUrl }}>
      <div
        className={`h-screen overflow-hidden ${wallpaperLoaded && wallpaperUrl && !isLoading ? '' : 'bg-win95-desktop'}`}
        onClick={handleDesktopClick}
        style={wallpaperLoaded && wallpaperUrl && !isLoading ? {
          backgroundImage: `url(${wallpaperUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        {isLoading && <SplashScreen onComplete={handleSplashComplete} />}
        {!isLoading && (
          <>
            <div className="flex flex-col space-y-2 p-4">
              {desktopIcons.map((icon) => (
                <DesktopIcon
                  key={icon.id}
                  icon={icon.icon}
                  label={icon.label}
                  isSelected={selectedIcon === icon.id}
                  onSelect={() => handleIconSelect(icon.id)}
                  onDoubleClick={() => handleIconDoubleClick(icon.id)}
                />
              ))}
            </div>

            {openWindows.map((window) => {
              const isMinimized = minimizedWindows.find(w => w.id === window.id);
              return (
                <Window
                  key={window.id}
                  title={window.title}
                  icon={window.icon}
                  initialPosition={isMobile ? { x: 5, y: 5 } : window.position}
                  width={isMobile ? Math.min(window.innerWidth - 20, 350) : 500}
                  height={isMobile ? Math.min(window.innerHeight - 80, 400) : (window.id === 'mail' ? 500 : 400)}
                  isActive={activeWindow === window.id}
                  isMinimized={!!isMinimized}
                  isMaximized={window.isMaximized}
                  onClose={() => handleWindowClose(window.id)}
                  onFocus={() => handleWindowFocus(window.id)}
                  onMinimize={() => handleWindowMinimize(window.id)}
                >
                  <window.component />
                </Window>
              );
            })}
            <StartMenu isOpen={isStartMenuOpen} onClose={handleStartMenuClose} onOpenWindow={handleOpenWindow} />
            <Taskbar 
              onStartClick={handleStartClick} 
              isStartMenuOpen={isStartMenuOpen}
              minimizedWindows={minimizedWindows}
              onWindowRestore={handleWindowRestore}
            />
          </>
        )}
      </div>
    </BackgroundContext.Provider>
  );
}

export default App;
