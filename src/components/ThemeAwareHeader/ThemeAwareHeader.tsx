import React, { useState } from 'react';
import { useTheme } from '../../hooks/useThemeHook';
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* КОНТЕЙНЕР 1: ЛОГОТИП (СЛЕВА) - СКРЫТ НА МОБИЛКЕ */}
      <div className={styles.logoContainer}>
        <Link
          to="/"
          className={styles.logo}
          onClick={(e) => {
            if (location.pathname === '/') {
              e.preventDefault();
              scrollToTop();
            }
          }}
          aria-label="На главную"
        >
          <span className={styles.logoText}>Sskutushev</span>
        </Link>
      </div>

      {/* КОНТЕЙНЕР 2: НАВИГАЦИЯ (ЦЕНТР) / БУРГЕР НА МОБИЛКЕ */}
      <header className={styles.navContainer}>
        <button
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav
          className={`${styles.nav} ${isMenuOpen ? styles.navOpen : styles.navClosed}`}
        >
          {/* ЛОГОТИП ВНУТРИ МОБИЛЬНОГО МЕНЮ */}
          <div className={styles.mobileMenuLogo}>
            <span className={styles.mobileLogoText}>Sskutushev</span>
          </div>

          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === '/' ? styles.active : ''}`}
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                scrollToTop();
              }
              setIsMenuOpen(false);
            }}
          >
            Главная
          </Link>
          <a
            href="/resume.pdf"
            download="resume.pdf"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              const link = document.createElement('a');
              link.href = '/resume.pdf';
              link.download = 'resume.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setIsMenuOpen(false);
            }}
          >
            Резюме
          </a>
        </nav>
      </header>

      {/* КОНТЕЙНЕР 3: ТЕМА (СПРАВА) */}
      <div className={styles.themeContainer}>
        <motion.button
          className={styles.themeToggle}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={
            theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
          }
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>
      </div>

      {/* SKIP LINK */}
      <a href="#main-content" className={styles.skipLink}>
        Перейти к основному контенту
      </a>
    </>
  );
};

export default ThemeAwareHeader;
