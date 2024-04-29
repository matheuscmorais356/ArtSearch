import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Context
import { LoadingContextProvider } from './context/LoadingContext';
import { ModalContextProvider } from './context/ModalContext';
import { ArtistContextProvider } from './context/ArtistContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LoadingContextProvider>
      <ArtistContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </ArtistContextProvider>
    </LoadingContextProvider>
  </React.StrictMode>
);

