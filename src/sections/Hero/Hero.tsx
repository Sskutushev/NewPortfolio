import React from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
  return (
    <section className={styles.heroSection} id="hero">
      {/* Background Layers */}
      <div className={styles.bgLayer1}></div>
      <div className={styles.bgLayer2}>
        <img src="/background2-3.svg" alt="" />
        <img src="/background2-3.svg" alt="" />
      </div>
      <div className={styles.bgLayer3}></div>

      <div className={`container ${styles.contentContainer}`}>
        <div className={styles.heroGrid}>
          {/* Left Column - Text Content */}
          <div className={styles.heroLeft}>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              Создаю производительные
              <br />
              интерфейсы на{' '}
              <span className={styles.gradientText}>
                React
                <br />& TypeScript
              </span>
            </motion.h1>

            <motion.button
              className={styles.btnPrimary}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() =>
                document
                  .getElementById('portfolio')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Портфолио
            </motion.button>
          </div>

          {/* Right Column - Photo with Text Overlay */}
          <div className={styles.heroRight}>
            <img
              src="/hero-me.svg"
              alt="Sergey Kutushev"
              className={styles.heroPhoto}
              style={{ width: '900px', height: '915px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
