import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster  } from 'react-hot-toast';

import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
    <GoogleOAuthProvider clientId='669859534983-n7t6t1sdjerndk0tlkrgvqhkbjlqs21c.apps.googleusercontent.com'>
      <BrowserRouter>
        <Toaster />
        <AppRouter />
      </BrowserRouter>
    </GoogleOAuthProvider>
  // </React.StrictMode>,
)
