import axios from 'axios';
import { IS_DEVELOPMENT } from '../isDevelopment';

const baseURL = IS_DEVELOPMENT
  ? 'http://localhost:8080/api/upload'
  : `${import.meta.env.VITE_API_URL}/upload`;

export const uploadApi = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  validateStatus: () => true,
});

uploadApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  config.headers['x-token'] = token;

  return config;
});
