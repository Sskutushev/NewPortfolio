import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import levitatingVector from '../../assets/images/levitating-vector.svg';

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className="container">
        <div className={styles.aboutGrid}>
          {/* Left Column - Text */}
          <motion.div
            className={styles.aboutLeft}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className={styles.aboutTextCard}>
              <p>
                Мой путь в разработке начался с автоматизации сложных торговых
                систем в финтехе. Это научило меня ответственности за
                архитектуру, производительность и чистоту данных. Сейчас я
                переношу этот опыт во фронтенд, создавая решения от PWA до
                Web3-сервисов.
              </p>

              <ul className={styles.aboutList}>
                <li>
                  Создаю быстрые интерфейсы, опираясь на общий опыт 10+ лет
                  работы с бизнесом и IT
                </li>
                <li>Разрабатываю резвые продукты в сфере Fintech и Web3</li>
                <li>
                  Проектирую архитектуру, пишу чистый код и соблюдаю сроки
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Right Column - Main Card */}
          <motion.div
            className={styles.aboutRight}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className={styles.aboutCardMain}>
              <h3>Обо мне</h3>
              <p className={styles.subtitle}>
                Frontend-разработчик с пониманием бизнес-логики
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      {/* Levitating Vector Image */}
      <motion.div
        className={styles.levitatingVector}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.8,
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        }}
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.img
          src={levitatingVector}
          alt="Levitating decorative element"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </section>
  );
};

export default About;
