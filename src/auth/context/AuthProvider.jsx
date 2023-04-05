import { useReducer } from 'react';
import { AuthContext, authReducer, types } from './';

export const AuthProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {logged: false});

    const login = async(correo, password) => {
        const action = {
            type: types.login,
            payload: {correo, password}
        };

        dispatch(action);
    }

  return (
    <AuthContext.Provider value={{ authState, login }}>
        { children }
    </AuthContext.Provider>
  )
}
