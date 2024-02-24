import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App.jsx';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { ReduxProviders } from './redux/reduxProvider.jsx';

ReactDOM.createRoot(document.getElementById('ecowiser-verified')).render(
  <React.StrictMode>
    <ReduxProviders>
      <App />
      <ToastContainer autoClose={1000} hideProgressBar />
    </ReduxProviders>
  </React.StrictMode>,
)
