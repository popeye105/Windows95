import React, { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import ResumeWindow from './components/ResumeWindow';
import ProjectsWindow from './components/ProjectsWindow';
import DrawingsWindow from './components/DrawingsWindow';
import MiniBrowserWindow from './components/MiniBrowserWindow';
import GamesWindow from './components/GamesWindow';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [openWindows, setOpenWindows] = useState([]);
  const [activeWindow, setActiveWindow] = useState(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const desktopIcons = [
    { id: 'resume', icon: '📄', label: 'Resume', component: ResumeWindow },
    { id: 'projects', icon: '💼', label: 'Projects', component: ProjectsWindow },
    { id: 'drawings', icon: '🎨', label: 'Drawings', component: DrawingsWindow },
    { id: 'games', icon: '🎮', label: 'Games', component: GamesWindow },
    { id: 'browser', icon: '🌐', label: 'Browser', component: MiniBrowserWindow },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Prevent zoom on double tap for mobile
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });
    
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleSplashComplete = () => {
    setIsLoading(false);
  };

  const handleIconSelect = (iconId) => {
    setSelectedIcon(iconId);
  };

  const handleIconDoubleClick = (iconId) => {
    const icon = desktopIcons.find(i => i.id === iconId);
    if (!icon) return;

    // Check if window is already open
    const existingWindow = openWindows.find(w => w.id === iconId);
    if (existingWindow) {
      setActiveWindow(iconId);
      return;
    }

    // Create new window
    const newWindow = {
      id: iconId,
      title: icon.label,
      component: icon.component,
      position: { 
        x: 50 + openWindows.length * 30, 
        y: 50 + openWindows.length * 30 
      }
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setActiveWindow(iconId);
  };

  const handleWindowClose = (windowId) => {
    setOpenWindows(prev => prev.filter(w => w.id !== windowId));
    if (activeWindow === windowId) {
      const remainingWindows = openWindows.filter(w => w.id !== windowId);
      setActiveWindow(remainingWindows.length > 0 ? remainingWindows[remainingWindows.length - 1].id : null);
    }
  };

  const handleWindowFocus = (windowId) => {
    setActiveWindow(windowId);
  };

  const handleStartClick = () => {
    setIsStartMenuOpen(!isStartMenuOpen);
  };

  const handleStartMenuClose = () => {
    setIsStartMenuOpen(false);
  };

  const handleDesktopClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedIcon(null);
      setIsStartMenuOpen(false);
    }
  };

  if (isLoading) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="h-screen bg-win95-desktop overflow-hidden" onClick={handleDesktopClick}>
      <div className={`${isMobile ? 'grid grid-cols-2 gap-6 justify-items-center pt-8' : 'flex flex-col space-y-2'} p-4`}>
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

      {openWindows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          initialPosition={isMobile ? { x: 10, y: 10 } : window.position}
          width={isMobile ? Math.min(window.innerWidth - 20, 350) : 500}
          height={isMobile ? Math.min(window.innerHeight - 120, 450) : 400}
          isActive={activeWindow === window.id}
          onClose={() => handleWindowClose(window.id)}
          onFocus={() => handleWindowFocus(window.id)}
        >
          <window.component />
        </Window>
      ))}
      <StartMenu isOpen={isStartMenuOpen} onClose={handleStartMenuClose} />
      <Taskbar 
        onStartClick={handleStartClick} 
        isStartMenuOpen={isStartMenuOpen}
      />
    </div>
  );
}

export default App;
