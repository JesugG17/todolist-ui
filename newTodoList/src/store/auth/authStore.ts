import { create } from "zustand";
import { authApi } from "../../api/authApi";
import { AuthResponse } from "../../modules/auth/types/authResponse";
import { toast } from "react-hot-toast";

interface Store {
    status: string;
    user: User;
    checking: boolean;
    message: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>
    googleSignIn: (token: string) => Promise<void>;
    logout: () => void;
    setChecking: (value?: boolean) => void;
    clearMessage: () => void;
}

export const useAuthStore = create<Store>((set) => ({
    status: 'non-authorized',
    user: {} as User,
    checking: false,
    message: null,
    login: async(email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/login', {
            email, password
        });
        
        const photo = data.data.user.photo ?? '/img/user.png';

        if (data.code === 200) {
            toast.success('Login successfully')
            localStorage.setItem('token', data.data.token);
            set({ status: 'authorized', user: {...data.data.user, photo}, checking: false });
        }

        if (data.code >= 400) {
            set({ checking: false, message: data.message });
            throw new Error('An error has ocurred while login');
        }
    },
    register: async(userName: string, email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/register', {
            userName, email, password
        });
        
        if (data.code === 201) {
            toast.success(data.message);
        }

        if (data.code >= 400) {
            set({ checking: false, message: data.message });
            throw new Error('An error has ocurred while registering');
        }

        set({
            checking: false,
            message: data.message,
        });
    },
    googleSignIn: async(code: string) => {
        const { data } = await authApi.post<AuthResponse>('/google', {
            code
        });

        if (data.code === 200) {
            localStorage.setItem('token', data.data.token);
            set({ 
                status: 'authorized', 
                user: data.data.user, 
                checking: false,
            });
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error has ocurred while login');
        }
    },
    logout: () => {

        localStorage.clear();
        set({
            status: 'not-authorized',
            user: {} as User,
            message: null,
        })
    },
    setChecking: (value: boolean = true) => {
        set({ checking: value });
    },
    clearMessage: () => {
        set({ message: null });
    }
}))
