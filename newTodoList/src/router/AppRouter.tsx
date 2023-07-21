import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { TaskPage } from "../modules/task/pages/TaskPage";
import { useAuthStore } from "../store/auth/authStore";

export const AppRouter = () => {
  
  const status = useAuthStore(state => state.status);
  
  return (
    <Routes>
        {
          status === 'non-authorized' &&
          (
            <Route path="/auth/*" element={ <AuthRoutes /> }/>
          )
        }
        {
          status === 'authorized' &&
          (
            <Route path="/task" element={ <TaskPage /> } />
          )
        }
        <Route path="/*" element={ <Navigate to='/auth/login' />} />
    </Routes>
  )
}
