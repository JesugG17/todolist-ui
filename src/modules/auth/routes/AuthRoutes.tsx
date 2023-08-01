import { Navigate, Route, Routes } from "react-router"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { ResetPasswordPage } from "../pages/ResetPasswordPage"


export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path="/login" element={ <LoginPage />}/>
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/reset-password" element={ <ResetPasswordPage /> }/>
        <Route path="/reset-password/verify"/>
        {/* Route for reset password verification */}
        <Route path="/reset-password/:id" />
        <Route path="/*" element={ <Navigate to='/auth/login' />} />
    </Routes>
  )
}
