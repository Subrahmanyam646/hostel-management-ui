import { useAuthStore } from '@/store/authStore';

export const useAuth = () => {
  const store = useAuthStore();
  return {
    ...store,
    isAuthenticated: Boolean(store.token),
    role: store.user?.role,
  };
};
