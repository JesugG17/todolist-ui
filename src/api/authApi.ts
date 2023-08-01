import axios from "axios";
import { IS_DEVELOPMENT } from "../isDevelopment";


const baseURL = IS_DEVELOPMENT
                ? 'http://localhost:8080/api/auth'
                : `${import.meta.env.VITE_API_URL}/auth`;

export const authApi = axios.create({
    baseURL
})
