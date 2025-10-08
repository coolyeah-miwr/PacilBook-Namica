// contexts/LocalizationContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { translations } from '../lib/translations';

interface LocalizationContextType {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    try {
      const storedLang = localStorage.getItem('pacil-book-lang');
      return storedLang && translations[storedLang] ? storedLang : 'id';
    } catch (error) {
      return 'id';
    }
  });

  const setLanguage = (langCode: string) => {
    try {
      localStorage.setItem('pacil-book-lang', langCode);
      setLanguageState(langCode);
    } catch (error) {
      console.error("Failed to save language to localStorage", error);
      setLanguageState(langCode); // Still update state even if localStorage fails
    }
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};