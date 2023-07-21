import axios from "axios";

export const taskApi = axios.create({
    baseURL: 'http://localhost:8080/api'
})

axios.interceptors.request.use((config) => {

    const token = localStorage.getItem('token');

    config.headers['x-token'] = token;

    return config;
})