import React, { createContext } from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const token = localStorage.getItem('token');

  return (
    <UserContext.Provider value={ token }>
      { children }
    </UserContext.Provider>
  )
}
