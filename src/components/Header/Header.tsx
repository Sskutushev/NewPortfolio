import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import motion and AnimatePresence
import { Sun, Moon, Menu, X } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  onThemeToggle: () => void;
  currentTheme: string;
}

const Header: React.FC<HeaderProps> = ({ onThemeToggle, currentTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState<'ru' | 'en'>('ru'); // Language state

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Function to toggle language
  const toggleLanguage = () => {
    setCurrentLang((prevLang) => (prevLang === 'ru' ? 'en' : 'ru'));
  };

  const navLinks = [
    { name: 'Обо мне', href: '#about' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Контакты', href: '#contact' },
  ];

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <div className={styles.headerContent}>
        {/* Logo */}
        <div
          className={styles.logo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className={styles.logoCircle}>SK</div>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.navDesktop}>
          <ul className={styles.navList}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={styles.navLink}
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button and Theme Toggle */}
        <div className={styles.headerActions}>
          <button
            className={styles.btnResume}
            onClick={() => window.open('/resume.pdf', '_blank')}
            aria-label="Открыть резюме в формате PDF"
          >
            Резюме
          </button>

          <div className={styles.themeToggleContainer}>
            <button
              className={styles.themeToggle}
              onClick={onThemeToggle}
              aria-label={
                currentTheme === 'dark'
                  ? 'Переключить на светлую тему'
                  : 'Переключить на темную тему'
              }
              aria-pressed={currentTheme === 'dark'}
            >
              {currentTheme === 'dark' ? (
                <Sun size={20} color="black" />
              ) : (
                <Moon size={20} color="#3A6DC2" />
              )}
            </button>
          </div>

          {/* Language Toggle */}
          <div className={styles.langToggleContainer}>
            <button
              className={styles.langToggle}
              onClick={toggleLanguage}
              aria-label={`Переключить на ${currentLang === 'ru' ? 'английский' : 'русский'} язык`}
            >
              <img
                src={currentLang === 'ru' ? '/RU.svg' : '/EN.svg'}
                alt={currentLang === 'ru' ? 'Русский флаг' : 'Английский флаг'}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.menuToggle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Открыть меню навигации"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={styles.mobileMenuOverlay}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className={styles.mobileMenuContent}>
              <button
                className={styles.closeMenu}
                onClick={() => setIsMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <X size={24} />
              </button>

              <nav className={styles.mobileNav}>
                <ul className={styles.mobileNavList}>
                  {navLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className={styles.mobileNavLink}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Actions at the bottom */}
                <div className={styles.mobileMenuActions}>
                  <button
                    className={`${styles.btnResume} ${styles.mobileResumeBtn}`}
                    onClick={() => {
                      window.open('/resume.pdf', '_blank');
                      setIsMenuOpen(false);
                    }}
                  >
                    Резюме
                  </button>

                  <div className={styles.mobileThemeLang}>
                    <div className={styles.themeToggleContainer}>
                      <button
                        className={styles.themeToggle}
                        onClick={onThemeToggle}
                        aria-label={
                          currentTheme === 'dark'
                            ? 'Переключить на светлую тему'
                            : 'Переключить на темную тему'
                        }
                        aria-pressed={currentTheme === 'dark'}
                      >
                        {currentTheme === 'dark' ? (
                          <Sun size={20} color="black" />
                        ) : (
                          <Moon size={20} color="#3A6DC2" />
                        )}
                      </button>
                    </div>
                    {/* Language Toggle (Mobile) */}
                    <div className={styles.langToggleContainer}>
                      <button
                        className={styles.langToggle}
                        onClick={toggleLanguage}
                        aria-label={`Переключить на ${currentLang === 'ru' ? 'английский' : 'русский'} язык`}
                      >
                        <img
                          src={currentLang === 'ru' ? '/RU.svg' : '/EN.svg'}
                          alt={
                            currentLang === 'ru'
                              ? 'Русский флаг'
                              : 'Английский флаг'
                          }
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;