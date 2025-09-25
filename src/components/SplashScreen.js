import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState('loading'); // 'loading', 'fadeToBlack', 'complete'

  useEffect(() => {
    // Show loading screen for 2 seconds
    const fadeToBlackTimer = setTimeout(() => {
      setPhase('fadeToBlack');
    }, 2000);

    // Complete after black screen (0.5 second later)
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
      {/* Loading Screen */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        phase === 'loading' ? 'opacity-100' : 'opacity-0'
      }`}>
        <img
          src="/Loading Screen.jpg"
          alt="Loading Screen"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Black Screen Transition */}
      <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${
        phase === 'fadeToBlack' ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default SplashScreen;
