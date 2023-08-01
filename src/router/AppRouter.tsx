import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../modules/auth/routes/AuthRoutes";
import { TaskPage } from "../modules/task/pages/TaskPage";
import { useAuthUserStore } from "../store/auth/authUserStore";

export const AppRouter = () => {
  const status = useAuthUserStore((state) => state.status);
  console.log(status);
  return (
    <Routes>
      {status === "authorized" ? (
        <Route path="/task" element={<TaskPage />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}
      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
