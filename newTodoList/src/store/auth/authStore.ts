import { create } from "zustand";
import { authApi } from "../../api/authApi";
import { AuthResponse } from "../../modules/auth/types/authResponse";
import { toast } from "react-hot-toast";

interface State {
    status: string;
    userName: string | null;
    checking: boolean;
    messages: string[];
    code: number;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>
    googleSignIn: (token: string) => Promise<void>;
    logout: () => void;
    setChecking: () => void;
}

export const useAuthStore = create<State>((set) => ({
    status: 'non-authorized',
    userName: null,
    checking: false,
    messages: [],
    code: 0,
    login: async(email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/login', {
            email, password
        });
        
        if (data.code === 200) {
            localStorage.setItem('token', data.data.token);
            set({ status: 'authorized', userName: data.data.user });
        }

        if (data.code >= 400) {
            throw new Error('An error has ocurred while login');
        }
    },
    register: async(userName: string, email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/register', {
            userName, email, password
        });
        
        console.log(data);

        if (data.code === 201) {
            toast.success(data.messages[0]);
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error has ocurred while registering');
        }

        console.log(data);
        set({
            checking: false,
            messages: data.messages,
            code: data.code
        });
    },
    googleSignIn: async(code: string) => {
        const { data } = await authApi.post<AuthResponse>('/google', {
            code
        });

        if (data.code === 200) {
            localStorage.setItem('token', data.data.token);
            set({ status: 'authorized', userName: data.data.user });
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error has ocurred while login');
        }
    },
    logout: () => {

    },
    setChecking: () => {
        set({ checking: true });
    }
}))
