import React from 'react'
import ReactDOM from 'react-dom/client'
// import { Board } from './components/Board';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  // </React.StrictMode>,
)