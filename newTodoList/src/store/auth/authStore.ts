import { create } from "zustand";
import { taskApi } from "../../api/taskApi";
import { TaskApi } from "../../modules/auth/types/TaskApiResponse";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

interface State {
    status: string;
    checking: boolean;
    messages: string[];
    code: number;
    login: (email: string, password: string) => Promise<void>;
    register: (userName: string, email: string, password: string) => Promise<void>
    logout: () => void;
    setChecking: () => void;
}

export const useAuthStore = create<State>((set, get) => ({
    status: 'non-authorized',
    checking: false,
    messages: [],
    code: 0,
    login: async(email: string, password: string) => {
        
        
    },
    register: async(userName: string, email: string, password: string) => {
        const { data } = await taskApi.post<TaskApi>('/auth/register', {
            userName, email, password
        });
        
        if (data.code === 201) {
            toast.success(data.messages[0]);
        }

        if (data.code >= 400) {
            set({ checking: false });
            throw new Error('An error was ocurred while registering');
        }

        console.log(data);
        set({
            checking: false,
            messages: data.messages,
            code: data.code
        });
    },
    logout: () => {

    },
    setChecking: () => {
        set({ checking: true });
    }
}))
