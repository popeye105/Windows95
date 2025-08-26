import React, { useState, useRef } from 'react';

const isProbablyUrl = (text) => {
  try {
    // If it parses as URL with protocol, treat as URL
    const u = new URL(text);
    return !!u.protocol;
  } catch {
    // If it contains a dot and no spaces, assume domain
    return /^[^\s]+\.[^\s]+$/.test(text);
  }
};

const toNavigableUrl = (input) => {
  if (isProbablyUrl(input)) {
    // Prepend https if missing
    if (!/^https?:\/\//i.test(input)) return `https://${input}`;
    return input;
  }
  // Fallback to Google search URL
  const q = encodeURIComponent(input);
  return `https://www.google.com/search?q=${q}&igu=1`;
};

const MiniBrowserWindow = () => {
  const [address, setAddress] = useState('');
  const [src, setSrc] = useState(null); // null means show Win95 homepage
  const [isHome, setIsHome] = useState(true);
  const inputRef = useRef(null);

  const navigate = (value) => {
    const url = toNavigableUrl(value.trim());
    setSrc(url);
    setAddress(value);
    setIsHome(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(address);
  };

  const openInNewTab = () => {
    const url = toNavigableUrl(address.trim());
    window.open(url, '_blank');
  };

  const goHome = () => {
    setIsHome(true);
    setSrc(null);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Toolbar */}
      <div className="bg-win95-gray border-b-2 border-win95-dark-gray p-2">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-xs">Address:</span>
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="flex-1 text-xs px-2 py-1 border border-win95-dark-gray bg-white outline-none"
            placeholder="Type a URL or search..."
          />
          <button type="submit" className="win95-button text-xs px-3 py-1">Go</button>
          <button type="button" onClick={openInNewTab} className="win95-button text-xs px-3 py-1">Open</button>
          <button type="button" onClick={goHome} className="win95-button text-xs px-3 py-1">Home</button>
        </form>
        {src && (src.includes('google.com')) && (
          <div className="mt-1 text-[10px] text-win95-dark-gray">
            Google may block in-window viewing. If the page looks blank, click "Open" to view results in a new tab.
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 bg-white border-2 border-inset overflow-hidden">
        {isHome ? (
          <div className="h-full w-full flex flex-col items-center justify-center p-6 select-none">
            <div className="text-2xl font-bold mb-1">Windows 95</div>
            <div className="text-xs text-win95-dark-gray mb-4">Mini Browser</div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!address.trim()) return;
                navigate(address);
              }}
              className="w-full max-w-md flex items-center gap-2"
            >
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="flex-1 text-sm px-2 py-2 border border-win95-dark-gray bg-white outline-none"
                placeholder="Search the web or type a URL"
              />
              <button className="win95-button text-xs px-3 py-2" type="submit">Search</button>
            </form>
            <div className="mt-3 text-[10px] text-win95-dark-gray text-center max-w-md">
              Uses Google for real-time results. Some pages may open in a new tab if embedding is blocked.
            </div>
          </div>
        ) : (
          <iframe title="mini-browser" src={src || ''} className="w-full h-full" />
        )}
      </div>
    </div>
  );
};

export default MiniBrowserWindow;
