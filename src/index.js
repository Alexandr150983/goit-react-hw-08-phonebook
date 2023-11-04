import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from 'redux/store';

import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'App';
import { ToastContainer } from 'react-toastify';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <ToastContainer />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
