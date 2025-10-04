import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const fadeToBlackTimer = setTimeout(() => setPhase('fadeToBlack'), 2000);
    const completeTimer = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(fadeToBlackTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  if (phase === 'complete') return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        phase === 'loading' ? 'opacity-100' : 'opacity-0'
      }`}>
        <img
          src="/Loading Screen.jpg"
          alt="Loading Screen"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
        phase === 'fadeToBlack' ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default SplashScreen;
