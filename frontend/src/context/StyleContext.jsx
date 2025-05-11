import React, { createContext, useContext, useState } from 'react';

const StyleContext = createContext();

export const StyleProvider = ({ children }) => {
    const [sharedString, setSharedString] = useState('');
  

  const updateSharedString = (newString) => {
    setSharedString(newString);
  };

  const value = {
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