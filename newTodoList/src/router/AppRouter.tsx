import { createBrowserRouter } from "react-router-dom";
import { AuthPage } from "../modules/auth/pages/AuthPage";


export const AppRouter = createBrowserRouter([
    {
        path: '/auth',
        element: <AuthPage />
    },
    {
        path: '/*',
        element: <AuthPage />
    }
]);