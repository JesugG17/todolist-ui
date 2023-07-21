import { useGoogleLogin } from '@react-oauth/google'

export const useGoogle = () => {
    const login = useGoogleLogin({
        onSuccess: (token) => console.log(token),
        onError: ()  => console.log('error')
    })

    return  login;
}
