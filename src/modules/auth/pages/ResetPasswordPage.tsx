import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";

export const ResetPasswordPage = () => {
  return (
    <AuthLayout title="Reset password">
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-violet-400">Email</label>
          <input
            className="p-2 bg-primary rounded text-sm text-white"
            type="email"
            placeholder="Example@gmail.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-violet-400">New password</label>
          <input
            className="p-2 bg-primary rounded text-sm text-white"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-violet-400">Confirm password</label>
          <input
            className="p-2 bg-primary rounded text-sm text-white"
            type="password"
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col gap-2">
          <button className="bg-violet-500 p-2 rounded text-sm text-white font-medium hover:brightness-105 transition-all duration-200">
            Change password
          </button>
          <Link to="/auth/login" className="text-center text-slate-300 text-xs md:text-sm">
            You already know the password?{" "}
            <strong className="text-blue-500 underline hover:brightness-110 transition-all duration-200">
              Sign in!
            </strong>
          </Link>

        </div>
      </form>
    </AuthLayout>
  );
};
