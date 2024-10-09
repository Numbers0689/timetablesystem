import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // Make sure to import the CSS file here if it's in the root

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
