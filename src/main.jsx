import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.jsx';

import { ReduxProviders } from './redux/reduxProvider.jsx';

ReactDOM.createRoot(document.getElementById(1 ? "root" : "ecowiser-verified")).render(
  <React.StrictMode>
    <ReduxProviders>
      <App />
    </ReduxProviders>
  </React.StrictMode>,
)
