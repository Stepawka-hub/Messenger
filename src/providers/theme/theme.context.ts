import { createContext } from "react";
import { TThemeState } from "./types";

const initialState: TThemeState = {
  theme: "light",
  setTheme: () => null,
};

export const ThemeContext = createContext<TThemeState>(initialState);
