import { create } from 'zustand';
import { authApi } from '../../api/authApi';
import { AuthResponse } from '../../modules/auth/types/authResponse';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from 'zustand/middleware';
import { uploadApi } from '../../api/uploadApi';
import { UploadResponse } from '../../modules/task/types/uploadResponse';
import { userApi } from '../../api/userApi';
import { UserResponse } from '../../modules/task/types/userResponse';
import { HTTP_CODES } from '../../modules/task/constants/http-codes';

interface State {
  status: string;
  user: User;
  checking: boolean;
  message: string | null;
}

interface Action {
  login: (email: string, password: string) => Promise<void>;
  register: (userName: string, email: string, password: string) => Promise<void>;
  googleSignIn: (token: string) => Promise<void>;
  logout: () => void;
  updateProfilePhoto: (file: File) => Promise<void>;
  deleteProfile: () => Promise<void>;
  updateUserName: (newUserName: string) => Promise<void>;
  extendSession: () => Promise<void>;
  setChecking: (value?: boolean) => void;
  clearMessage: () => void;
}

export const useAuthUserStore = create<State & Action>()(
  persist(
    (set, get) => ({
      status: 'non-authorized',
      user: {} as User,
      checking: false,
      message: null,
      login: async (email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/login', {
          email,
          password,
        });

        if (data.code >= 400) {
          set({ checking: false, message: data.message });
          throw new Error('An error has ocurred while login');
        }

        const photo = data.data.user.photo ?? '/img/user.png';
        toast.success(data.message);
        sessionStorage.setItem('token', data.data.token);
        set({
          status: 'authorized',
          user: { ...data.data.user, photo },
          checking: false,
        });
      },
      register: async (userName: string, email: string, password: string) => {
        const { data } = await authApi.post<AuthResponse>('/register', {
          userName,
          email,
          password,
        });

        if (data.code >= 400) {
          set({ checking: false, message: data.message });
          throw new Error('An error has ocurred while registering');
        }

        toast.success(data.message);
        set({
          checking: false,
          message: data.message,
        });
      },
      googleSignIn: async (code: string) => {
        const { data } = await authApi.post<AuthResponse>('/google', {
          code,
        });

        if (data.code >= 400) {
          set({ checking: false });
          toast.error(data.message);
          throw new Error('An error has ocurred while login');
        }

        toast.success(data.message);
        sessionStorage.setItem('token', data.data.token);
        set({
          status: 'authorized',
          user: data.data.user,
          checking: false,
        });
      },
      logout: () => {
        sessionStorage.clear();
        set({
          status: 'non-authorized',
          user: {} as User,
          message: null,
        });
      },
      updateProfilePhoto: async (file: File) => {
        const { user } = get();
        const formData = new FormData();
        formData.append('photo', file);

        const { data } = await uploadApi.post<UploadResponse>('/profile', formData);

        if (data.code === 200) {
          toast.success(data.message);
          set({
            user: {
              ...user,
              photo: data.data,
            },
            checking: false,
          });
        }

        if (data.code >= 400) {
          set({ checking: false });
        }
      },
      deleteProfile: async () => {
        const { data } = await userApi.delete<UserResponse>('/delete');

        if (data.code === 200) {
          toast.success(data.message);
          localStorage.removeItem('token');
          set({
            user: {} as User,
            status: 'non-authorized',
          });
        }

        if (data.code >= 400) {
          toast.error(data.message);
        }
      },
      updateUserName: async (newUserName: string) => {
        const { user } = get();

        const { data } = await userApi.put<UserResponse>('/update', {
          userName: newUserName,
        });

        if (data.code === 200) {
          toast.success(data.message);
          set({
            user: {
              ...user,
              userName: data.data.userName,
            },
          });
        }

        if (data.code >= 400) {
          toast.error(data.message);
        }
      },
      extendSession: async () => {
        const { user } = get();
        const { data } = await authApi.post<AuthResponse>('/extend-session', {
          email: user.email,
        });

        if (data.code === HTTP_CODES.OK) {
          sessionStorage.setItem('token', data.data.token);
        }
      },
      setChecking: (value: boolean = true) => {
        set({ checking: value });
      },
      clearMessage: () => {
        set({ message: null });
      },
    }),
    {
      name: 'authStore',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
