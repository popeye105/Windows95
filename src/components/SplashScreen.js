import React, { useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 overflow-hidden relative">
      <img
        src="/windows95-splash.jpeg"
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
