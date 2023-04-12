import { useReducer } from 'react';
import { AuthContext, authReducer, types } from './';
import axios from 'axios';

const init = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  return {
    logged: !!user,
    user
  }

}

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {}, init);
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

        localStorage.setItem('user', JSON.stringify(data));

        dispatch(action);
    }

    const register = async(nombre, correo, password) => {
      
      const { status } = await axiosInstance.post('auth/register', {
        nombre, correo, password
      });

      if (status !== 200) {
        return false;
      }

      return true;
    }

  return (
    <AuthContext.Provider value={{ ...authState, login, register }}>
        { children }
    </AuthContext.Provider>
  )
}
