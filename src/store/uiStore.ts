import { create } from 'zustand';
import { storage } from '@/utils/storage';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface UiState {
  theme: 'light' | 'dark';
  toasts: ToastItem[];
  toggleTheme: () => void;
  addToast: (message: string, type?: ToastItem['type']) => void;
  removeToast: (id: string) => void;
}

const initialTheme = (storage.getTheme() as 'light' | 'dark' | null) || 'light';

document.documentElement.classList.toggle('dark', initialTheme === 'dark');

export const useUiStore = create<UiState>((set) => ({
  theme: initialTheme,
  toasts: [],
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      storage.setTheme(next);
      return { theme: next };
    }),
  addToast: (message, type = 'info') =>
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), message, type }],
    })),
  removeToast: (id) => set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
