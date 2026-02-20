import { create } from 'zustand';
import { authService, LoginPayload, RegisterPayload } from '@/services/auth.service';
import { AuthUser } from '@/types';
import { storage } from '@/utils/storage';

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: storage.getToken(),
  loading: false,
  login: async (payload) => {
    set({ loading: true });
    const data = await authService.login(payload);
    storage.setToken(data.token);
    set({ user: data.user, token: data.token, loading: false });
  },
  register: async (payload) => {
    set({ loading: true });
    const data = await authService.register(payload);
    storage.setToken(data.token);
    set({ user: data.user, token: data.token, loading: false });
  },
  hydrate: async () => {
    const token = storage.getToken();
    if (!token) return;
    try {
      const user = await authService.me();
      set({ user, token });
    } catch {
      storage.clearToken();
      set({ user: null, token: null });
    }
  },
  logout: () => {
    storage.clearToken();
    set({ user: null, token: null });
  },
}));
