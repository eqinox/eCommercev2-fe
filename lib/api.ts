import axios from 'axios';
import { LoginFormData, RegisterFormData } from './validations/auth';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  login: async (data: LoginFormData) => {
    const response = await api.post('/auth/signin', data);
    return response.data;
  },
  register: async (data: RegisterFormData) => {
    const { confirmPassword, ...payload } = data;
    const response = await api.post('/auth/signup', payload);
    return response.data;
  },
  logout: async () => {
    const token = localStorage.getItem('access_token');
    // const response = await api.post('/auth/logout', {}, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    // return response.data;
  },
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};
