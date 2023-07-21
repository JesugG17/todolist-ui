import { useGoogleLogin } from '@react-oauth/google'
import { useAuthStore } from '../../../store/auth/authStore';
import { toast } from 'react-hot-toast';

export const useGoogle = () => {

    const { googleSignIn, setChecking } = useAuthStore();

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async(response) => await googleSignIn(response.code),
        onError: ()  => toast.error('Login failed'),
        onNonOAuthError: () => setChecking(false),
    })

    return login;
}
