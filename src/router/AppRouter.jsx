import { Route, Routes } from 'react-router';
import { AuthProvider, AuthRoutes } from '../auth';
import { TodosRoutes } from '../todos';
import { PublicRoutes } from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

export const AppRouter = () => {
  return (
    <AuthProvider>
      
        <Routes>
          {/* RUTAS PUBLICAS */}
          <Route path='/auth/*' element={
            <PublicRoutes>
              <AuthRoutes />
            </PublicRoutes>
          }/>
          {/* RUTAS PRIVADAS */}
          <Route path='/todos/*' element={
            <PrivateRoutes>
              <TodosRoutes />
            </PrivateRoutes>
          } />
        </Routes>

    </AuthProvider>
  )
}
