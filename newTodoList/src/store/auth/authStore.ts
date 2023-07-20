import { create } from "zustand";

interface State {
    status: string;
    checking: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>
    setChecking: () => void;
}

export const useAuthStore = create<State>((set, get) => ({
    status: 'non-authorized',
    checking: false,
    login: async(email: string, password: string) => {

    },
    register: async(userName: string, email: string, password: string) => {

    },
    setChecking: () => {
        set({ checking: true });
    }
}))
