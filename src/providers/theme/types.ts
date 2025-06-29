import { ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';

export type ThemeProviderState = {
  theme: Theme,
  setTheme: (theme: Theme) => void
}

export type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme: Theme;
  storageKey?: string;
}