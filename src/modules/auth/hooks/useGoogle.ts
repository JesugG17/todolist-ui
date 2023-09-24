import { useGoogleLogin } from '@react-oauth/google';
import { useAuthUserStore } from '../../../store/auth/authUserStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

export const useGoogle = () => {
  const { googleSignIn, setChecking } = useAuthUserStore();
  const navigate = useNavigate();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (response) => {
      try {
        await googleSignIn(response.code);
        navigate('/task', {
          replace: true,
        });
      } catch (error) {
        setChecking(false);
      }
    },
    onError: () => toast.error('Login failed'),
    onNonOAuthError: () => setChecking(false),
  });

  return login;
};
