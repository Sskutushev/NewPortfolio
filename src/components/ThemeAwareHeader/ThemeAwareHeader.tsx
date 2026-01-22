import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ThemeAwareHeader.module.css';

const ThemeAwareHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`${styles.header} ${isMenuOpen ? styles.headerOpen : ''}`}>
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : styles.navClosed}`}>
        <Link
          to="/"
          className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
            setIsMenuOpen(false); // Закрыть меню после клика
          }}
        >
          Главная
        </Link>
        <Link
          to="/portfolio"
          className={`${styles.navLink} ${location.pathname === '/portfolio' ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(false)} // Закрыть меню после клика
        >
          Портфолио
        </Link>
        <a
          href="/resume.pdf"
          download="resume.pdf"
          className={styles.navLink}
          onClick={(e) => {
            // Предотвращаем стандартное поведение для корректной работы в браузерах
            e.preventDefault();
            // Создаем элемент ссылки и кликаем по нему программно
            const link = document.createElement('a');
            link.href = '/resume.pdf';
            link.download = 'resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setIsMenuOpen(false); // Закрыть меню после клика
          }}
        >
          Резюме
        </a>
      </nav>

      <motion.button
        className={styles.themeToggle}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {theme === 'dark' ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </motion.button>

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" className={styles.skipLink}>
        Перейти к основному контенту
      </a>
    </header>
  );
};

export default ThemeAwareHeader;