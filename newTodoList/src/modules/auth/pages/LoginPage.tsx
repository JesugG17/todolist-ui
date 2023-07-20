import { useId } from 'react'
import { Google } from "../../ui/Icons"
import { AuthLayout } from "../layout/AuthLayout"
import { Link } from 'react-router-dom';

export const LoginPage = () => {

  const emailInputId = useId();
  const passwordInputId = useId();

  return (
    <AuthLayout title="Sign In">
      <form 
        onSubmit={(event) => event.preventDefault()}
        className='flex flex-col gap-5'
      >
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
        <button className="bg-orange-400 p-1 rounded text-white font-medium hover:bg-orange-300 transition-all duration-200">Sign up</button>
        <h4 className="text-white text-center">OR</h4>
        <button className="bg-slate-100 p-1 font-medium rounded flex gap-2 items-center justify-center hover:bg-white transition-all duration-200">
          <Google/>
          Google
        </button>
        <div className='text-slate-300 text-center text-xs flex flex-col gap-1 md:flex-row justify-center text-sm'>
          <p>You don't have an account?</p>
          <Link className='text-blue-500 font-medium' to='/auth/register'>Sign up!</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
