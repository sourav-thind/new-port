import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const MediaQueryContext = createContext<boolean>(false);

export const useMediaQuery = () => {
  return useContext(MediaQueryContext);
};

export const MediaQueryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 840px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);

    return () => mediaQuery.removeListener(handleMediaQueryChange);
  }, []);

  return (
    <MediaQueryContext.Provider value={isMobile}>
      {children}
    </MediaQueryContext.Provider>
  );
};
