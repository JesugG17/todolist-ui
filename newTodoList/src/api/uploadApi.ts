import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}/upload`;

export const uploadApi = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
})

uploadApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})