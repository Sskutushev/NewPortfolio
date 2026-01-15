import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import styles from './TechCarousel.module.css';

interface TechCarouselProps {
  activeTab: string;
}

const TechCarousel: React.FC<TechCarouselProps> = ({ activeTab }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

    const techData = {

      javascript: {

        title: 'JavaScript',

        icon: 'js', // Identifier for CSS

        description:

          'Глубокое понимание базы и «ванильного» стека. Позволяет мне создавать производительные интерфейсы с нуля и эффективно решать задачи там, где готовые библиотеки избыточны.',

      },

      typescript: {

        title: 'TypeScript',

        icon: 'ts', // Identifier for CSS

        description:

          'Основной инструмент последние 2+ года. Использую во всех проектах для обеспечения строгой типизации, безопасности кода и легкой масштабируемости сложных систем.',

      },

      react: {

        title: 'React + Next.js',

        icon: 'react', // Identifier for CSS

        description:

          'Специализируюсь на создании SPA и MPA приложений. Глубоко знаком с экосистемой: от управления состоянием (Zustand/Redux) до серверного рендеринга и оптимизации Web Vitals.',

      },

      nodejs: {

        title: 'Node.js (Fullstack)',

        icon: 'nodejs', // Identifier for CSS

        description:

          'Уверенно владею базой Node.js и Express. Пишу простые бэкенд-сервисы и API-заглушки, планомерно развиваясь в сторону полноценного Fullstack-разработчика.',

      },

      styles: {

        title: 'Infrastructure & Styles',

        icon: 'styles', // Identifier for CSS

        description:

          'Повсеместно использую Tailwind CSS для быстрой верстки и Vitest для тестирования. Настраиваю CI/CD процессы и Docker-окружение для стабильных релизов.',

      },

      web3: {

        title: 'Web3 & Fintech',

        icon: 'web3', // Identifier for CSS

        description:

          'Опыт интеграции крипто-кошельков, работы с DeFi/DEX и разработки Mini Apps для Telegram. Понимаю специфику работы с блокчейн-данными на стороне фронтенда.',

      },

    };

  

    const techArray = Object.keys(techData);

  

    // Auto-rotation logic

    useEffect(() => {

      if (isPaused) return;

  

      const interval = setInterval(() => {

        setCurrentIndex((prev) => (prev + 1) % techArray.length);

      }, 5000); // 5 секунд на карточку

  

      return () => clearInterval(interval);

    }, [isPaused, techArray.length]);

  

      // Sync carousel with active tab

  

      useEffect(() => {
        const index = techArray.indexOf(activeTab);
        if (index !== -1 && index !== currentIndex) {
          setCurrentIndex(index);
        }
      }, [activeTab, techArray, currentIndex]);

  

    const currentTech = techData[techArray[currentIndex] as keyof typeof techData];

  

    return (

      <div

        ref={carouselRef}

        className={styles.carouselWrapper}

        onMouseEnter={() => setIsPaused(true)}

        onMouseLeave={() => setIsPaused(false)}

      >

        <AnimatePresence mode="wait">

          <motion.div

            key={currentIndex}

            className={styles.techCard}

            initial={{ opacity: 0, x: 50 }}

            animate={{ opacity: 1, x: 0 }}

            exit={{ opacity: 0, x: -50 }}

            transition={{ duration: 0.5, ease: cubicBezier(0.22, 1, 0.36, 1) }}

          >

            <div className={styles.cardHeader}>

              <div

                className={`${styles.cardIcon} ${

                  currentTech.icon === 'js' ? styles.jsIcon : ''

                } ${

                  currentTech.icon === 'ts' ? styles.tsIcon : ''

                } ${

                  currentTech.icon === 'react' ? styles.reactIcon : ''

                } ${

                  currentTech.icon === 'nodejs' ? styles.nodejsIcon : ''

                } ${

                  currentTech.icon === 'styles' ? styles.stylesIcon : ''

                } ${

                  currentTech.icon === 'web3' ? styles.web3Icon : ''

                }`}

              >

                {currentTech.icon !== 'js' &&

                  currentTech.icon !== 'ts' &&

                  currentTech.icon !== 'react' &&

                  currentTech.icon !== 'nodejs' &&

                  currentTech.icon !== 'styles' &&

                  currentTech.icon !== 'web3' &&

                  currentTech.icon}

              </div>

              <h3 className={styles.cardTitle}>{currentTech.title}</h3>

            </div>

            <p className={styles.cardDescription}>{currentTech.description}</p>

          </motion.div>

        </AnimatePresence>

  

        {/* Carousel Indicators */}

        <div className={styles.indicators}>

          {techArray.map((_, index) => (

            <button

              key={index}

              className={`${styles.indicator} ${

                index === currentIndex ? styles.indicatorActive : ''

              }`}

              onClick={() => setCurrentIndex(index)}

              aria-label={`Go to slide ${index + 1}`}

            />

          ))}

        </div>

      </div>

    );

  };

export default TechCarousel;