import { useState, useEffect } from 'react';

export const useStoredTheme = (): [string | null, (theme: string) => void] => {
  const [storedTheme, setStoredTheme] = useState<string | null>(() => {
    // Получаем сохраненную тему при инициализации состояния
    return localStorage.getItem('theme') || null;
  });

  useEffect(() => {
    // Дополнительная логика может быть здесь при необходимости
  }, []);

  const saveTheme = (theme: string) => {
    localStorage.setItem('theme', theme);
    setStoredTheme(theme);
  };

  return [storedTheme, saveTheme];
};
