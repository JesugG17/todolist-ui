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

    const [authState, dispatch] = useReducer(authReducer, {logged: false}, init);
    const axiosInstance = axios.create({
      baseURL: 'http://localhost:8080/v2/api/',
      timeout: 5000
    });

    const login = async(correo, password) => {

        const user = { correo, password };

        const { data, status } = await axiosInstance.post('auth/login',{
          ...user
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

  return (
    <AuthContext.Provider value={{ ...authState, login }}>
        { children }
    </AuthContext.Provider>
  )
}
