import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import './styles.css';
import { AuthBootstrap } from './features/auth/AuthBootstrap';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthBootstrap>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthBootstrap>
  </React.StrictMode>,
);
