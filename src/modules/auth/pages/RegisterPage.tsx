import { useId, useEffect } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout"
import { useAuthUserStore } from '../../../store/auth/authUserStore';
import { validateRegisterForm } from '../utils/validate-forms';
import { ShowError } from '../components/ShowError';

export const RegisterPage = () => {

  const userNameInputId = useId();
  const emailInputId = useId();
  const passwordInputId = useId();

  const { register, setChecking, checking, message, clearMessage } = useAuthUserStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: ''
    },
    validate: validateRegisterForm,
    onSubmit: async(values) => {
      try {
        setChecking();
        await register(values.userName, values.email, values.password);
        navigate('/auth/login', {
          replace: true
        })
      } catch (error) {
        console.log(error);
      }
    }
  });

  useEffect(() => {
    clearMessage();
  }, [formik.values]);

  return (
    <AuthLayout title="Sign Up">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5"
      >
        <div className="text-violet-400 flex flex-col gap-2">
          <label htmlFor={userNameInputId}>Username</label>
          <input
            autoComplete='off'
            id={userNameInputId}
            className={`bg-primary p-2 text-sm rounded text-white ${ formik.errors.userName && 'border-2 border-red-400 focus:outline-red-400'}`}
            placeholder="John Doe" 
            type="text"
            name='userName'
            value={formik.values.userName}
            onChange={ formik.handleChange }
            onBlur={formik.handleBlur}
            disabled={ checking }
          />
          {
            (formik.errors.userName && formik.touched.userName) && 
            (
              <span className="text-red-400">{formik.errors.userName}</span>
            )
          }
        </div>
        <div className="text-violet-400 flex flex-col gap-2">
          <label htmlFor={emailInputId}>Email</label>
          <input
            autoComplete='off'
            id={emailInputId}
            className={`bg-primary p-2 text-sm rounded text-white ${ formik.errors.email && 'border-2 border-red-400 focus:outline-red-400'}`}
            placeholder="example@gmail.com" 
            type="email"
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={ checking }
          />
          {
            (formik.errors.email && formik.touched.email) && 
            (
              <span className="text-red-400">{formik.errors.email}</span>
            )
          }
        </div>
        <div className="text-violet-400 flex flex-col gap-2">
          <label htmlFor={passwordInputId}>Password</label>
          <input
            autoComplete='off'
            id={passwordInputId}
            className={`bg-primary p-2 text-sm rounded text-white ${ formik.errors.password && 'border-2 border-red-400 focus:outline-red-400'}`}
            placeholder="Enter password" 
            type="password"
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={ checking }
          />
          {
            (formik.errors.password && formik.touched.password) && 
            (
              <span className="text-red-400">{formik.errors.password}</span>
            )
          }
        </div>
        {
          message &&
          ( <ShowError error={ message }/>)
        }
        <button disabled={checking} className="bg-violet-500 p-2 text-white font-medium rounded hover:brightness-105 transition-all duration-200 mt-2 shadow-sm shadow-violet-400">Sign up!</button>
        <div className='text-slate-300 text-center text-xs flex flex-col gap-1 md:flex-row justify-center md:text-sm'>
          <p>You already have an account?</p>
          <Link className='text-blue-500 font-medium' to='/auth/login'>Sign in!</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
