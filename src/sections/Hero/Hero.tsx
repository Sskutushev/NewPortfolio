import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  const scrollToPortfolio = () => {
    document.getElementById('portfolio')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({
      behavior: 'smooth',
    });
  };

  return (
    <section
      className={styles.heroSection}
      id="hero"
      data-auto-scroll-section
      aria-labelledby="hero-title"
    >
      <div className="container">
        <div className={styles.heroGrid}>
          {/* Левая колонка - Текст */}
          <div className={styles.heroLeft}>
            <motion.h1
              className={styles.heroTitle}
              id="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Создаю производительные интерфейсы на{' '}
              <span className={styles.gradientText}>
                React &amp; TypeScript
              </span>
            </motion.h1>
            <div className={styles.buttonContainer}>
              <motion.button
                className={styles.btnPortfolio}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToPortfolio}
                aria-label="Перейти к разделу Портфолио"
              >
                Портфолио
              </motion.button>
              <motion.button
                className={styles.btnOutline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToAbout}
                aria-label="Перейти к разделу Обо мне"
              >
                <span className={styles.gradientText}>Обо мне</span>
              </motion.button>
            </div>
          </div>

          {/* Правая колонка - Фото */}
          <div className={styles.heroRight}>
            <motion.img
              src="/hero-me.svg"
              alt="Фотография Сергея Кутушева, frontend разработчика"
              className={styles.heroImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
