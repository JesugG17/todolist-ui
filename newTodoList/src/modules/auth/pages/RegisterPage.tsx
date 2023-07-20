import { Link } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout"
import { useId } from 'react';

export const RegisterPage = () => {

  const userNameInputId = useId();
  const emailInputId = useId();
  const passwordInputId = useId();
  
  return (
    <AuthLayout title="Sign Up">
      <form
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-5"
      >
        <div className="text-orange-400 flex flex-col gap-2">
          <label htmlFor={userNameInputId}>Username</label>
          <input
            id={userNameInputId}
            className="bg-primary p-2 text-sm rounded text-white"
            placeholder="John Doe" 
            type="text"
          />
        </div>
        <div className="text-orange-400 flex flex-col gap-2">
          <label htmlFor={emailInputId}>Email</label>
          <input
            id={emailInputId}
            className="bg-primary p-2 text-sm rounded text-white"
            placeholder="example@gmail.com" 
            type="text"
          />
        </div>
        <div className="text-orange-400 flex flex-col gap-2">
          <label htmlFor={passwordInputId}>Password</label>
          <input
            id={passwordInputId}
            className="bg-primary p-2 text-sm rounded text-white"
            placeholder="Enter password" 
            type="text"
          />
        </div>
        <button className="bg-orange-500 p-2 text-white font-medium rounded hover:bg-orange-400 transition-all duration-200 mt-2 shadow-sm shadow-orange-400">Sign up!</button>
        <div className='text-slate-300 text-center text-xs flex flex-col gap-1 md:flex-row justify-center md:text-sm'>
          <p>You already have an account?</p>
          <Link className='text-blue-500 font-medium' to='/auth/login'>Sign in!</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
