import { useGoogleLogin } from '@react-oauth/google'
import { useAuthUserStore } from '../../../store/auth/authUserStore';
import { toast } from 'react-hot-toast';

export const useGoogle = () => {

    const { googleSignIn, setChecking } = useAuthUserStore();

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async(response) => await googleSignIn(response.code),
        onError: ()  => toast.error('Login failed'),
        onNonOAuthError: () => setChecking(false),
    })

    return login;
}
