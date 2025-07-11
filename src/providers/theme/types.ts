import { PropsWithChildren } from "react";

export type Theme = "light" | "dark" | "system";

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type ThemeProviderProps = PropsWithChildren & {
  defaultTheme?: Theme;
  storageKey?: string;
};
