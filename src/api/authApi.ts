import axios from "axios";


const baseURL = `${import.meta.env.VITE_API_URL}/auth`;

export const authApi = axios.create({
    baseURL
})
