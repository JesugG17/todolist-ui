import { useId, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Google } from "../../ui/Icons";
import { AuthLayout } from "../layout/AuthLayout";
import { useAuthUserStore } from "../../../store/auth/authUserStore";
import { useGoogle } from "../hooks/useGoogle";
import { useFormik } from "formik";
import { validateLoginForm } from "../utils/validate-forms";
import { ShowError } from "../components/ShowError";

export const LoginPage = () => {
  const emailInputId = useId();
  const passwordInputId = useId();
  const { login, status, setChecking, checking, message, clearMessage } =
    useAuthUserStore();

  const googleSignIn = useGoogle();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: validateLoginForm,
    onSubmit: async (values) => {
      try {
        setChecking();
        await login(values.email, values.password);
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    if (status === "authorized") {
      console.log("here");
      navigate("/task", {
        replace: true,
      });
    }
  }, [status]);

  useEffect(() => {
    clearMessage();
  }, [formik.values]);

  return (
    <AuthLayout title="Sign In">
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
        <div className="text-violet-400 flex flex-col gap-2">
          <label htmlFor={emailInputId}>Email</label>
          <input
            id={emailInputId}
            autoComplete="off"
            disabled={checking}
            className={`bg-primary p-2 text-sm rounded text-white disabled:opacity-40 ${
              formik.errors.email &&
              "border-2 border-red-400 focus:outline-red-400"
            }`}
            placeholder="example@gmail.com"
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <span className="text-red-400">{formik.errors.email}</span>
          )}
        </div>
        <div className="text-violet-400 flex flex-col gap-2">
          <label htmlFor={passwordInputId}>Password</label>
          <input
            id={passwordInputId}
            disabled={checking}
            className={`bg-primary p-2 text-sm rounded text-white disabled:opacity-40 ${
              formik.errors.password &&
              "border-2 border-red-400 focus:outline-red-400"
            } `}
            placeholder="Enter password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <span className="text-red-400">{formik.errors.password}</span>
          )}
        </div>
        {message && <ShowError error={message} />}
        <button
          type="submit"
          onClick={() => formik.handleSubmit()}
          disabled={checking}
          className="bg-violet-500 p-2 rounded text-white font-medium hover:bg-violet-400 transition-all duration-200 shadow-sm shadow-violet-400 disabled:pointer-events-none disabled:opacity-40"
        >
          Sign up
        </button>
        <h4 className="text-gray-500 text-center flex items-center before:content-[''] before:mr-4 before:flex-1 before:border-b-2 before:border-gray-500 after:content-[''] after:flex-1 after:border-b-2 after:border-gray-500 after:ml-4 ">
          OR
        </h4>

        <button
          disabled={checking}
          onClick={() => {
            setChecking();
            googleSignIn();
          }}
          className="bg-slate-100 p-1 font-medium rounded flex gap-2 items-center justify-center hover:bg-white transition-all duration-200 disabled:pointer-events-none disabled:opacity-40"
        >
          <Google />
          Google
        </button>
        <div className="text-slate-300 text-center text-xs flex flex-col gap-1 md:flex-row justify-center md:text-sm">
          <p>You don't have an account?</p>
          <Link className="text-blue-500 font-medium" to="/auth/register">
            Sign up!
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
