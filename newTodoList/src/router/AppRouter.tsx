import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { TaskPage } from "../modules/task/pages/TaskPage";

export const AppRouter = () => {
  return (
    <Routes>
        <Route path="/auth/*" element={ <AuthRoutes /> }/>
        <Route path="/task" element={ <TaskPage /> } />
        <Route path="/*" element={ <Navigate to='/auth/login' />} />
    </Routes>
  )
}
