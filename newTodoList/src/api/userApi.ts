import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URL}/user`;

export const userApi = axios.create({
    baseURL
});

userApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})