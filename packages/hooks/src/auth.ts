import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from './api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
        set({ token });
      },
      logout: () => {
        localStorage.removeItem('token');
        set({ token: null });
      },
    }),
    { name: 'auth-storage' }
  )
);

export const useLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  
  return useMutation({
    mutationFn: async (data: any) => {
      const formData = new URLSearchParams();
      formData.append('username', data.email);
      formData.append('password', data.password);
      
      const response = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return response.data;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
    },
  });
};

export const useRegister = () => {
  const setToken = useAuthStore((state) => state.setToken);
  
  return useMutation({
    mutationFn: async (data: any) => {
      // 1. Register the user
      await api.post('/auth/register', data);
      
      // 2. Automatically login after successful registration
      const formData = new URLSearchParams();
      formData.append('username', data.email);
      formData.append('password', data.password);
      
      const loginResponse = await api.post('/auth/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      return loginResponse.data;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
    },
  });
};
