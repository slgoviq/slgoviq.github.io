import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('slgoviq_theme') as Theme | null;
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const themeStore = atom<Theme>('light');

export const initTheme = () => {
  if (typeof window === 'undefined') return;
  const initial = getInitialTheme();
  themeStore.set(initial);
  applyThemeToDOM(initial);
};

export const applyThemeToDOM = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  localStorage.setItem('slgoviq_theme', theme);
};

export const toggleTheme = () => {
  const next: Theme = themeStore.get() === 'dark' ? 'light' : 'dark';
  themeStore.set(next);
  applyThemeToDOM(next);
};
