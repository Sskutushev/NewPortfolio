import { HashRouter as Router } from 'react-router-dom';
import { useTheme } from './hooks/useTheme';
import Header from './components/Header/Header';
import Hero from './sections/Hero/Hero';
import AboutStack from './sections/AboutStack/AboutStack';
import Portfolio from './sections/Portfolio/Portfolio';
import ContactSection from './sections/Contact/Contact';
import './styles/globals.css';

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
  const { theme, toggleTheme } = useTheme();

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <Header onThemeToggle={toggleTheme} currentTheme={theme} />
        <main>
          <Hero />
          <AboutStack />
          <Portfolio />
          <ContactSection />
        </main>
      </div>
    </Router>
  );
}

export default App;
