import React from 'react'
import { UserProvider } from '../context/UserProvider'
import { TodoApp } from './TodoApp'

export const TodoMain = () => {
  return (
    <UserProvider>
        <TodoApp />
    </UserProvider>
  )
}
