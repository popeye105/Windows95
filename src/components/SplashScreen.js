import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start fade out after 2.8 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2800);

    // Complete exactly at 3 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-opacity duration-200 ${
      !isExiting ? 'opacity-100' : 'opacity-0'
    }`}>
      <img
        src="https://github.com/ariz17/Windows95/raw/060561348c25c2f4d58f176f4205ac1a01c456b0/Windows%2095%20theme.jpeg"
        alt="Windows 95"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-16 left-0 right-0 text-center text-black text-2xl md:text-3xl font-bold opacity-90 tracking-widest select-none">
        LOADING...
      </div>
    </div>
  );
};

export default SplashScreen;
