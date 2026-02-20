import { AuthResponse } from '@/types';
import { http } from './http';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: 'STUDENT' | 'WARDEN';
}

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const { data } = await http.post<AuthResponse>('/auth/login', payload);
    return data;
  },
  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const { data } = await http.post<AuthResponse>('/auth/register', payload);
    return data;
  },
  me: async () => {
    const { data } = await http.get<AuthResponse['user']>('/auth/me');
    return data;
  },
};
