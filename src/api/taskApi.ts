import axios from "axios";
import { IS_DEVELOPMENT } from "../isDevelopment";

const baseURL = IS_DEVELOPMENT
                ? 'http://localhost:8080/api/task'
                : `${import.meta.env.VITE_API_URL}/task`;

export const taskApi = axios.create({
    baseURL,
    validateStatus: () => true,
});

taskApi.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})