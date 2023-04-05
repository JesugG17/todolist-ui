import { Route, Routes } from 'react-router';
import { LoginPage } from '../auth/pages/LoginPage';
import { TodoMain } from '../todos/components/TodoMain';
import { AuthProvider } from '../auth';

export const AppRouter = () => {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path='/' element={ <LoginPage /> }/>
          <Route path='/todos' element={ <TodoMain /> } />
        </Routes>

    </AuthProvider>
  )
}
