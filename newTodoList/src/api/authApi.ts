import axios from "axios";

export const authApi = axios.create({
    baseURL: 'http://localhost:8080/api/auth'
})

axios.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})