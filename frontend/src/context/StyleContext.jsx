import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
    const [sharedString, setSharedString] = useState('');
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const [glassStyle, setGlassStyle] = useState({
    light: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.18)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
    },
    dark: {
      background: 'rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
    }
  });

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const updateGlassStyle = (newStyle) => {
    setGlassStyle(prev => ({
      ...prev,
      [theme]: {
        ...prev[theme],
        ...newStyle
      }
    }));
  };

  const updateSharedString = (newString) => {
    setSharedString(newString);
  };

  const value = {
    theme,
    glassStyle: glassStyle[theme],
    toggleTheme,
    updateGlassStyle,

    sharedString,          
    updateSharedString,
  };

  return (
    <StyleContext.Provider value={value}>
      {children}
    </StyleContext.Provider>
  );
};

export const useStyle = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider');
  }
  return context;
};