import { Suspense } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import AppWrapper from './AppWrapper';

// Глобальные стили для классов, используемых в компонентах
declare global {
  interface Window {
    __theme: string;
  }
}

// Добавляем стили для плавного скролла
document.documentElement.style.setProperty('--scroll-behavior', 'smooth');

export {};

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <AppWrapper />
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
