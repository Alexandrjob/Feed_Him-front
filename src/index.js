﻿import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('content'));
root.render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
);