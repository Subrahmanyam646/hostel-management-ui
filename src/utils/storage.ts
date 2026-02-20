const TOKEN_KEY = 'hms_token';
const THEME_KEY = 'hms_theme';

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
  clearToken: () => localStorage.removeItem(TOKEN_KEY),
  getTheme: () => localStorage.getItem(THEME_KEY),
  setTheme: (theme: 'light' | 'dark') => localStorage.setItem(THEME_KEY, theme),
};
