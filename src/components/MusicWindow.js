import React, { useState, useRef } from 'react';

const MusicWindow = () => {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const songs = [
    { id: 1, name: 'Praise The Lord - A$AP Rocky', file: '/songs/Praise The Lord - A$AP Rocky.mp3' },
    { id: 2, name: 'My Mind & Me - Selena Gomez', file: '/songs/My Mind & Me - Selena Gomez.mp3' },
    { id: 3, name: 'Night Changes - One Direction', file: '/songs/Night Changes - One Direction.mp3' },
    { id: 4, name: 'Demons - Imagine Dragons', file: '/songs/Demons - Imagine Dragons.mp3' },
    { id: 5, name: 'Running Away From Home - SP', file: '/songs/Running Away From Home - SP.mp3' }
  ];

  const playSong = (song) => {
    if (currentSong?.id === song.id && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (currentSong?.id !== song.id) {
        setCurrentSong(song);
        audioRef.current.src = song.file;
      }
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const stopSong = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="h-full flex flex-col bg-win95-gray overflow-hidden">
      <div className="flex-shrink-0 p-2 border-b border-win95-dark-gray">
        <h2 className="text-sm font-bold text-center">🎵 My Music</h2>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 bg-white border-2 border-inset m-2 overflow-auto">
          <div className="divide-y divide-gray-200">
            {songs.map((song) => (
              <div
                key={song.id}
                className={`flex items-center justify-between p-2 hover:bg-win95-light-gray cursor-pointer ${
                  currentSong?.id === song.id ? 'bg-win95-blue text-white' : ''
                }`}
                onClick={() => playSong(song)}
              >
                <div className="flex items-center min-w-0 flex-1">
                  <span className="mr-2 flex-shrink-0">
                    {currentSong?.id === song.id && isPlaying ? '🔊' : '🎵'}
                  </span>
                  <span className="text-xs truncate">{song.name}</span>
                </div>
                {currentSong?.id === song.id && isPlaying && (
                  <span className="text-xs flex-shrink-0 ml-2">Playing...</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {currentSong && (
          <div className="flex-shrink-0 mx-2 mb-2 p-2 bg-white border-2 border-inset">
            <div className="text-center mb-2">
              <div className="text-xs font-bold truncate">{currentSong.name}</div>
              <div className="text-xs text-gray-600">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            <div className="flex justify-center gap-1">
              <button onClick={() => playSong(currentSong)} className="win95-button px-2 py-1 text-xs">
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              <button onClick={stopSong} className="win95-button px-2 py-1 text-xs">
                ⏹️
              </button>
            </div>
          </div>
        )}
      </div>

      <audio
        ref={audioRef}
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
        onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
      />
    </div>
  );
};

export default MusicWindow;
