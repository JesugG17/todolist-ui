import { useNavigate } from 'react-router';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm'
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
    });
  }

  return (
    <div className='auth_container'>

        <div className='card_auth'>
          <div className='inputs_container'>
            <h3 className='text-center border-bottom mb-2'>Login</h3>
            <form onSubmit={handleLogIn}>
                <h4>Email:</h4>
                <input
                  className='form-control' 
                  type="email"
                  name='correo' 
                  placeholder='correo@gmail.com'
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

    </div>
  )
}
