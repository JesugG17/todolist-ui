import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}/task`;

export const taskApi = axios.create({
    baseURL
});

taskApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})