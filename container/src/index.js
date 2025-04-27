import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Ensure React is loaded after Module Federation is ready
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);