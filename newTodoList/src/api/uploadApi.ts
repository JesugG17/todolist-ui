import axios from "axios";

export const uploadApi = axios.create({
    baseURL: 'http://localhost:8080/api/upload',
    headers: {
        'Content-Type': 'multipart/form-data'
    },
})

uploadApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})