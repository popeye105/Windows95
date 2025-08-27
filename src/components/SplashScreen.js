import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in immediately
    setIsVisible(true);
    
    // Complete exactly at 3 seconds without fade out
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden relative" style={{backgroundColor: '#008080'}}>
      <img
        src="https://github.com/ariz17/Windows95/raw/060561348c25c2f4d58f176f4205ac1a01c456b0/Windows%2095%20theme.jpeg"
        alt="Windows 95"
        className="w-[100vw] h-[100dvh] object-cover"
      />
      <div className="absolute bottom-16 left-0 right-0 text-center text-black text-sm md:text-base font-bold opacity-90 tracking-widest select-none">
        LOADING...
      </div>
    </div>
  );
};

export default SplashScreen;
