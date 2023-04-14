import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext, authReducer, types } from './';

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user
  }
  
}

export const AuthProvider = ({ children }) => {
  
    const navigate = useNavigate();
    const [authState, dispatch] = useReducer(authReducer, {}, init);
    const [token, setToken] = useState('');
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/v2/api/',
      timeout: 5000
    });

    const login = async(correo, password) => {


        const { data, status } = await axiosInstance.post('auth/login',{
          correo, password
        });
        
        if (status !== 200) {
          return;
        }

        const action = {
            type: types.login,
            payload: data
        };

        // setToken(data.token)
        localStorage.setItem('user', JSON.stringify(data));

        dispatch(action);
    }

    const register = async(nombre, correo, password) => {
    
      await axiosInstance.post('auth/register', {
        nombre, correo, password
      });
      
    }


    const logout = () => {
        localStorage.clear('user');

        dispatch({ type: types.logout })
        navigate('auth/login', {
            replace: true
        })
    }

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout}}>
        { children }
    </AuthContext.Provider>
  )
}
