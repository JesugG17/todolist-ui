import { RouterProvider } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'


export const TodoApp = () => {
  return (
    <>
      <RouterProvider 
        router={ AppRouter }
      />
    </>
  )
}
