// src/context/RefreshContext.js
import { createContext, useState, useContext } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const refresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  return (
    <RefreshContext.Provider value={{ refresh, refreshKey }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  return useContext(RefreshContext);
};