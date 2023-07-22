import { create } from "zustand";
import { authApi } from "../../api/authApi";
import { AuthResponse } from "../../modules/auth/types/authResponse";
import { toast } from "react-hot-toast";

interface State {
    status: string;
    userName: string | null;
    photo: string | null,
    checking: boolean;
    messages: string[];
    code: number;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>
    googleSignIn: (token: string) => Promise<void>;
    logout: () => void;
    setChecking: (value?: boolean) => void;
}

export const useAuthStore = create<State>((set) => ({
    status: 'non-authorized',
    userName: null,
    photo: null,
    checking: false,
    messages: [],
    code: 0,
    login: async(email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/login', {
            email, password
        });
        
        if (data.code === 200) {
            localStorage.setItem('token', data.data.token);
            set({ status: 'authorized', userName: data.data.user as string, checking: false });
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error has ocurred while login');
        }
    },
    register: async(userName: string, email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/register', {
            userName, email, password
        });
        
        if (data.code === 201) {
            toast.success(data.messages[0]);
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error has ocurred while registering');
        }

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

        const user = data.data.user as { userName: string, photo: string };

        console.log(data);
        if (data.code === 200) {
            localStorage.setItem('token', data.data.token);
            set({ 
                status: 'authorized', 
                userName: user.userName, 
                checking: false,
                photo: user.photo 
            });
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error has ocurred while login');
        }
    },
    logout: () => {

        set({
            status: 'not-authorized',
            userName: null,
            messages: [],
            code: 0
        })
    },
    setChecking: (value: boolean = true) => {
        set({ checking: value });
    }
}))
