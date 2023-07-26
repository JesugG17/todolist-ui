import axios from 'axios';

export const userApi = axios.create({
    baseURL: 'http://localhost:8080/api/user'
});

userApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})