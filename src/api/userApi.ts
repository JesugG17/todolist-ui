import axios from 'axios';
import { IS_DEVELOPMENT } from '../isDevelopment';

const baseURL = IS_DEVELOPMENT
  ? 'http://localhost:8080/api/user'
  : `${import.meta.env.VITE_API_URL}/user`;

export const userApi = axios.create({
  baseURL,
  validateStatus: () => true,
});

userApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  config.headers['x-token'] = token;

  return config;
});
