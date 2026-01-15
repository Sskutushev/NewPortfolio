import React, { useState, useEffect } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import styles from './AboutStack.module.css';
import TechCarousel from './TechCarousel';
import levitatingVector from '../../assets/images/levitating-vector.svg';

const AboutStack: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1); // Default to typescript's index
  const [isPaused, setIsPaused] = useState(false);

  const techData = {
    javascript: {
      title: 'JavaScript',
      icon: 'js',
      description:
        'Глубокое понимание базы и «ванильного» стека. Позволяет мне создавать производительные интерфейсы с нуля и эффективно решать задачи там, где готовые библиотеки избыточны.',
    },
    typescript: {
      title: 'TypeScript',
      icon: 'ts',
      description:
        'Основной инструмент последние 2+ года. Использую во всех проектах для обеспечения строгой типизации, безопасности кода и легкой масштабируемости сложных систем.',
    },
    react: {
      title: 'React + Next.js',
      icon: 'react',
      description:
        'Специализируюсь на создании SPA и MPA приложений. Глубоко знаком с экосистемой: от управления состоянием (Zustand/Redux) до серверного рендеринга и оптимизации Web Vitals.',
    },
    nodejs: {
      title: 'Node.js (Fullstack)',
      icon: 'nodejs',
      description:
        'Уверенно владею базой Node.js и Express. Пишу простые бэкенд-сервисы и API-заглушки, планомерно развиваясь в сторону полноценного Fullstack-разработчика.',
    },
    styles: {
      title: 'Infrastructure & Styles',
      icon: 'styles',
      description:
        'Повсеместно использую Tailwind CSS для быстрой верстки и Vitest для тестирования. Настраиваю CI/CD процессы и Docker-окружение для стабильных релизов.',
    },
    web3: {
      title: 'Web3 & Fintech',
      icon: 'web3',
      description:
        'Опыт интеграции крипто-кошельков, работы с DeFi/DEX и разработки Mini Apps для Telegram. Понимаю специфику работы с блокчейн-данными на стороне фронтенда.',
    },
  };

  const techArray = Object.keys(techData);
  const activeTab = techArray[currentIndex]; // Derive activeTab from currentIndex

  const tabs = [
    { id: 'javascript', label: 'JS' },
    { id: 'typescript', label: 'TS' },
    { id: 'react', label: 'Front' },
    { id: 'nodejs', label: 'Backend' },
    { id: 'styles', label: 'Styles' },
    { id: 'web3', label: 'Web3' },
  ];

  // Auto-rotation logic
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % techArray.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentIndex, isPaused, techArray.length]); // Re-run when currentIndex changes or isPaused changes

  const handleTabClick = (tabId: string) => {
    const index = techArray.indexOf(tabId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const handleNextSectionClick = () => {
    const nextSection = document.getElementById('portfolio');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.aboutStackSection} id="about">
      <div className={`container ${styles.aboutStackContainer}`}>
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
                <li>Разрабатываю резвые продукты в сфере Fintech и Web3</li>
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
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: cubicBezier(0.22, 1, 0.36, 1),
            }}
            viewport={{ once: true, margin: '-100px' }}
          >
            <h2 className={styles.sectionTitle}>Технологический стек</h2>
            <div className={styles.tabsRoadmap}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <TechCarousel
                currentIndex={currentIndex}
                techData={techData}
                techArray={techArray}
                onIndicatorClick={setCurrentIndex}
              />
            </div>
          </motion.div>
        </div>
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
      </div>
    </section>
  );
};

export default AboutStack;
