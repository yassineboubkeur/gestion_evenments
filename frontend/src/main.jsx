import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { LikesProvider } from './context/LikesContext.jsx';
import { StyleProvider } from './context/StyleContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyleProvider>
      <LikesProvider>
        <App />
      </LikesProvider>
    </StyleProvider>
  </StrictMode>
);