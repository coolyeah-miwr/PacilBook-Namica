// contexts/ThemeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem('pacil-book-theme') as Theme | null;
      // Default to 'light' if no theme is stored
      return storedTheme || 'light';
    } catch (error) {
      // Default to 'light' on error
      return 'light';
    }
  });

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem('pacil-book-theme', newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error("Failed to save theme to localStorage", error);
      setThemeState(newTheme);
    }
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};