import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { UserProvider } from './UserContext.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
      <App></App>
  </UserProvider>
);

reportWebVitals();
