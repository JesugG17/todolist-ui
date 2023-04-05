import React from 'react'
import { useForm } from '../../hooks/useForm'
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../context';


export const LoginPage = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { correo, password, onResetForm, onInputChange } = useForm({
    correo: '',
    password: ''
  });

  const handleLogIn = async(event) => {
    event.preventDefault();
    
    await login(correo, password);
    onResetForm();
    navigate('/todos', {
      replace: true
    })
  }


  return (
    <>
        <h1 className='text-center'>LoginPage</h1>
        <hr className='mb-5'/>

        <div className='login-container'>
          <div className='d-flex flex-column align-items-center'>
            <form onSubmit={handleLogIn}>
                <h4>Email:</h4>
                <input
                  className='form-control' 
                  type="email"
                  name='correo' 
                  value={ correo }
                  onChange={onInputChange} 
                />
                <h4>Password:</h4>
                <input 
                  className='form-control input'
                  type="password"
                  name='password'
                  value={ password } 
                  onChange={onInputChange}
                /> 
                <button
                  type='submit'
                  className='btn btn-primary mt-2'
                  onClick={handleLogIn}
                >
                  Loguearse
                </button>
            </form>
              
          </div>
        </div>

    </>
  )
}
