import { useId, useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Google } from "../../ui/Icons"
import { AuthLayout } from "../layout/AuthLayout"
import { useAuthStore } from '../../../store/auth/authStore';
import { useGoogle } from '../hooks/useGoogle';

export const LoginPage = () => {

  const emailInputId = useId();
  const passwordInputId = useId();
  const { login, status } = useAuthStore();
  const googleSignIn = useGoogle();

  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    if (status === 'authorized') {
      navigate('/task', {
        replace: true
      });
    }
  }, [status])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formState;

    if (email.length === 0 || password.length === 0) return;

    try {
      await login(email, password);

    } catch (error) {
      console.log(error);      
    }
  }

  
  return (
    <AuthLayout title="Sign In">
      <form 
        onSubmit={onSubmit}
        className='flex flex-col gap-5'
      >
        <div className="text-orange-400 flex flex-col gap-2">
          <label htmlFor={emailInputId}>Email</label>
          <input
            id={emailInputId}
            className="bg-primary p-2 text-sm rounded text-white"
            placeholder="example@gmail.com" 
            type="text"
            name='email'
            value={formState.email}
            onChange={onChange}
          />
        </div>
        <div className="text-orange-400 flex flex-col gap-2">
          <label htmlFor={passwordInputId}>Password</label>
          <input
            id={passwordInputId}
            className="bg-primary p-2 text-sm rounded text-white"
            placeholder="Enter password" 
            type="password"
            name='password'
            value={formState.password}
            onChange={onChange}
          />
        </div>
        <button className="bg-orange-500 p-2 rounded text-white font-medium hover:bg-orange-400 transition-all duration-200 shadow-sm shadow-orange-400">Sign up</button>
        <h4 className="text-white text-center flex items-center before:content-[''] before:mr-4 before:flex-1 before:border-b-2 before:border-gray-500 after:content-[''] after:flex-1 after:border-b-2 after:border-gray-500 after:ml-4 ">OR</h4>

        
        <button onClick={() => googleSignIn()} className="bg-slate-100 p-1 font-medium rounded flex gap-2 items-center justify-center hover:bg-white transition-all duration-200">
          <Google/>
          Google
        </button>
        <div className='text-slate-300 text-center text-xs flex flex-col gap-1 md:flex-row justify-center md:text-sm'>
          <p>You don't have an account?</p>
          <Link className='text-blue-500 font-medium' to='/auth/register'>Sign up!</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
