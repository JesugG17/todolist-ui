import { Navigate, Route, Routes } from 'react-router';
import { LoginPage, RegisterPage, ResetPasswordPage, VerifyPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path='/login'
        element={<LoginPage />}
      />
      <Route
        path='/register'
        element={<RegisterPage />}
      />
      <Route
        path='/reset-password'
        element={<ResetPasswordPage />}
      />
      {/* Route for reset password verification */}
      <Route
        path='/reset-password/verify'
        element={<VerifyPage />}
      />
      {/* <Route path="/reset-password/:id" /> */}
      <Route
        path='/*'
        element={<Navigate to='/auth/login' />}
      />
    </Routes>
  );
};
