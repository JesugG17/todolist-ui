import { useNavigate } from 'react-router';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm'
import { AuthContext } from '../context';
import { Link } from 'react-router-dom';


export const LoginPage = () => {

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { email, password, onResetForm, onInputChange, formState } = useForm({
    email: '',
    password: ''
  });

  const onSubmit = async(event) => {
    event.preventDefault();
    
    await login(email, password);
    onResetForm();
    navigate('/todos', {
      replace: true
    });
  }

  return (
    <div className='login-container'>
      <div className='auth_container'>

          <div className='card_auth'>
            <div className='inputs_container'>
              <h3 className='text-center border-bottom mb-2'>Login</h3>
              <form onSubmit={onSubmit}>
                  <h4>Email:</h4>
                  <input
                    className='form-control' 
                    type="email"
                    name='email' 
                    placeholder='email@gmail.com'
                    value={ email }
                    onChange={onInputChange} 
                  />
                  <h4>Password:</h4>
                  <input 
                    className='form-control input'
                    type="password"
                    name='password'
                    placeholder='your password'
                    value={ password } 
                    onChange={onInputChange}
                  /> 
              </form>
            </div>
            <div className='buttons-container'>
              <button
                  type='submit'
                  className='btn btn-primary mt-3 form-button'
                  onClick={onSubmit}
                >
                  Loguearse
              </button>

              <Link to='/auth/register'>
                Crear una cuenta
              </Link>

            </div>

          </div>

      </div>
    </div>
  )
}
