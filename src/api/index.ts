import axios from 'axios';

export const instance = axios.create({
  withCredentials: false,
  baseURL: import.meta.env.VITE_BASE_URL,
});
