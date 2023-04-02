import React from 'react'
import { useForm } from '../../hooks/useForm'

export const LoginPage = () => {

  const { correo, password, onResetForm, onInputChange } = useForm({
    correo: '',
    password: ''
  });

  const handleLogIn = async(event) => {
    event.preventDefault();
    const url = 'http://localhost:8080/v2/api/auth/login';
    const user = {
      correo,
      password
    }

    console.log(user);
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, password })
    });

    const { token } = resp.json();

    onResetForm();
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
