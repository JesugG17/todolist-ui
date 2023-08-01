import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster  } from 'react-hot-toast';

import './styles/index.css'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { IS_DEVELOPMENT } from './isDevelopment';


/* 
  When app is in production, I have to use HashRouter
  due problems with routes, but in development, use
  HashRouter give me problems, so I must to switch
  to BrowserRouter again. To "solve" this, I created
  the HOC below, it is development returns BrowserRouter
  otherwhise HashRouter 
*/
const Router = ({children}: { children: React.ReactNode}) => {
  return (
    <>
      {
        IS_DEVELOPMENT
        ? (
          <BrowserRouter>
            { children }
          </BrowserRouter>
        )
        : (
          <HashRouter>
            { children }
          </HashRouter>
        )
      }
    </>
  )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId='669859534983-n7t6t1sdjerndk0tlkrgvqhkbjlqs21c.apps.googleusercontent.com'>
      <Router>
        <Toaster />
        <AppRouter />
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
