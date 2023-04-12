
import { useNavigate } from 'react-router';
import { useContext } from 'react';

import { useForm } from '../../hooks/useForm'
import { AuthContext } from '../context';
import { Link } from 'react-router-dom';


export const RegisterPage = () => {

  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const { name, email, password, onResetForm, onInputChange, formState } = useForm({
    name: '',
    email: '',
    password: ''
  });

  const onSubmit = async(event) => {
    event.preventDefault();
    
    await register(name, email, password);
    onResetForm();
    navigate('/auth/login', {
      replace: true
    });
  }

  return (
    <div className='auth_container'>

        <div className='card_auth_register'>
          <div className='inputs_container'>
            <h3 className='text-center border-bottom mb-2'>Register</h3>
            <form onSubmit={onSubmit}>
                <h4>Name:</h4>
                  <input
                    className='form-control' 
                    type="text"
                    name='name' 
                    placeholder='John doe'
                    value={ name }
                    onChange={onInputChange} 
                />
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
                Crear cuenta
            </button>

            <Link to='/auth/login'>
              ¿Ya tienes una?, ingresa!
            </Link>

          </div>

        </div>

    </div>
  )
}
