import React, { useState } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import styles from './AboutStack.module.css';
import TechCarousel from './TechCarousel';
import levitatingVector from '../../assets/images/levitating-vector.svg';

const AboutStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState('typescript');

  const tabs = [
    { id: 'javascript', label: 'JS' },
    { id: 'typescript', label: 'TS' },
    { id: 'react', label: 'Front' },
    { id: 'nodejs', label: 'Backend' },
    { id: 'styles', label: 'Styles' },
    { id: 'web3', label: 'Web3' },
  ];

  const handleNextSectionClick = () => {
    const nextSection = document.getElementById('portfolio');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.aboutStackSection} id="about">
      <div className="container">
        <div className={styles.aboutStackGrid}>
          {/* LEFT COLUMN - About Me */}
          <motion.div
            className={styles.leftColumn}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: cubicBezier(0.22, 1, 0.36, 1) }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionTitle}>Обо мне</h2>
            <p className={styles.subtitle}>
              Frontend-разработчик с пониманием бизнес-логики
            </p>

            <div className={styles.aboutCard}>
              <p className={styles.aboutText}>
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
                <li>
                  Разрабатываю резвые продукты в сфере Fintech и Web3
                </li>
                <li>
                  Проектирую архитектуру, пишу чистый код и соблюдаю сроки
                </li>
              </ul>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Tech Stack */}
          <motion.div
            className={styles.rightColumn}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: cubicBezier(0.22, 1, 0.36, 1) }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionTitle}>Технологический стек</h2>

            {/* Tabs (Roadmap) */}
            <div className={styles.tabsRoadmap}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${
                    activeTab === tab.id ? styles.tabActive : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Carousel */}
            <TechCarousel activeTab={activeTab} />
          </motion.div>
        </div>
      </div>

      {/* Levitating Vector */}
      <motion.div
        className={styles.levitatingVector}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.8,
          duration: 1,
          ease: cubicBezier(0.22, 1, 0.36, 1),
        }}
        viewport={{ once: true, margin: '-100px' }}
        onClick={handleNextSectionClick}
        style={{ cursor: 'pointer' }}
      >
        <motion.img
          src={levitatingVector}
          alt="Scroll to next section"
          animate={{ y: [0, -15, 0] }}
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

export default AboutStack;