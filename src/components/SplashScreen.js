import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Fade in immediately
    setIsVisible(true);
    
    // Start fade out after 2.5 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Complete after fade out animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden relative transition-opacity duration-500 ${
      isVisible && !isExiting ? 'opacity-100' : 'opacity-0'
    }`}>
      <img
        src="https://github.com/ariz17/Windows95/raw/060561348c25c2f4d58f176f4205ac1a01c456b0/Windows%2095%20theme.jpeg"
        alt="Windows 95"
        className={`w-[100vw] h-[100dvh] object-cover transition-all duration-1000 ${
          isVisible && !isExiting ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        }`}
      />
      <div className={`absolute bottom-16 left-0 right-0 text-center text-black text-sm md:text-base font-bold tracking-widest select-none transition-all duration-700 ${
        isVisible && !isExiting ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        LOADING...
      </div>
    </div>
  );
};

export default SplashScreen;
