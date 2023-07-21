import { useId, useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout"
import { useAuthStore } from '../../../store/auth/authStore';

export const RegisterPage = () => {

  const userNameInputId = useId();
  const emailInputId = useId();
  const passwordInputId = useId();
  const [formState, setFormState] = useState({
    userName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { register, setChecking, checking } = useAuthStore();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  }

  const onSubmit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userName, email, password } = formState;
    if (userName.length === 0 || email.length === 0 || password.length === 0) return;
    setChecking();
    try {
      await register(userName, email, password);
      navigate('/auth/login', {
        replace: true
      });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <AuthLayout title="Sign Up">
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-5"
      >
        <div className="text-orange-400 flex flex-col gap-2">
          <label htmlFor={userNameInputId}>Username</label>
          <input
            id={userNameInputId}
            className="bg-primary p-2 text-sm rounded text-white"
            placeholder="John Doe" 
            type="text"
            name='userName'
            value={formState.userName}
            onChange={ onChange }
            disabled={ checking }
          />
        </div>
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
            disabled={ checking }
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
            disabled={ checking }
          />
        </div>
        <button disabled={checking} className="bg-orange-500 p-2 text-white font-medium rounded hover:bg-orange-400 transition-all duration-200 mt-2 shadow-sm shadow-orange-400">Sign up!</button>
        <div className='text-slate-300 text-center text-xs flex flex-col gap-1 md:flex-row justify-center md:text-sm'>
          <p>You already have an account?</p>
          <Link className='text-blue-500 font-medium' to='/auth/login'>Sign in!</Link>
        </div>
      </form>
    </AuthLayout>
  )
}
