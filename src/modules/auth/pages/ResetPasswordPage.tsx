import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useFormik } from "formik";
import { validateResetPasswordForm } from "../utils/validate-forms";
import { useState } from 'react';
import { ShowError } from "../components/ShowError";
import { toast } from "react-hot-toast";
import { authApi } from "../../../api/authApi";
import { AuthResponse } from "../types/authResponse";

export const ResetPasswordPage = () => {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
    validate: validateResetPasswordForm,
    onSubmit: async(values) => {
      if (values.password !== values.confirmPassword){
        setErrorMessage('Both password must be the same!');
        return;
      }

      const { data } = await authApi.post<AuthResponse>('/reset-password', {
        email: values.email,
        newPassword: values.password
      })

      toast.success(data.message);

      navigate('/auth/login', {
        replace: true
      })
    }
  })

  return (
    <AuthLayout title="Reset password">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-violet-400">Email</label>
          <input
            autoComplete="off"
            className={`bg-primary p-2 text-sm rounded text-white disabled:opacity-40 ${
              formik.errors.email &&
              "border-2 border-red-400 focus:outline-red-400"
            }`}
            type="email"
            name="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Example@gmail.com"

          />
            {formik.errors.email && formik.touched.email && (
            <span className="text-red-400">{formik.errors.email}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-violet-400">New password</label>
          <input
            autoComplete="off"
            className={`bg-primary p-2 text-sm rounded text-white disabled:opacity-40 ${
              formik.errors.password &&
              "border-2 border-red-400 focus:outline-red-400"
            }`}
            type="password"
            name="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter password"
          />
            {formik.errors.password && formik.touched.password && (
            <span className="text-red-400">{formik.errors.password}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-violet-400">Confirm password</label>
          <input
            autoComplete="off"
            className={`bg-primary p-2 text-sm rounded text-white disabled:opacity-40 ${
              formik.errors.confirmPassword &&
              "border-2 border-red-400 focus:outline-red-400"
            }`}
            type="password"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter password"
          />
            {formik.errors.confirmPassword && formik.touched.confirmPassword && (
            <span className="text-red-400">{formik.errors.confirmPassword}</span>
          )}
        </div>
        {
          errorMessage.length > 0 &&
          (
            <ShowError error={errorMessage} />
          )
        }
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
