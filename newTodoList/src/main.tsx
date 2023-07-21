import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster  } from 'react-hot-toast';

import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Toaster />
      <AppRouter />
    </BrowserRouter>
  </React.StrictMode>,
)
