import React, { createContext, useEffect, useState } from 'react';
import { useStoredTheme } from '../hooks/useStoredTheme';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [storedTheme, saveTheme] = useStoredTheme();

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Check for saved theme in localStorage, fallback to system preference, then to 'light'
    if (storedTheme) return storedTheme as 'light' | 'dark';

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    saveTheme(theme);
  }, [theme, saveTheme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
