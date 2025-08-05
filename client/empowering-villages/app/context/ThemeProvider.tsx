"use client";
import { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark" | "green" | "red" | "orange";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "dark", "green", "red", "orange");
    html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isSidebarCollapsed, setIsSidebarCollapsed }}>
      {children}
    </ThemeContext.Provider>
  );
};
