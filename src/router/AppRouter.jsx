import { Route, Routes } from 'react-router'
import { LoginPage } from '../auth/pages/LoginPage'
import { TodoMain } from '../todos/components/TodoMain'

export const AppRouter = () => {
  return (
    <>
        <Routes>
          <Route path='/' element={ <LoginPage /> }/>
            <Route path='/todos' element={ <TodoMain /> } />
        </Routes>

    </>
  )
}
