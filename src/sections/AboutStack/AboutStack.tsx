import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './AboutStack.module.css';
import MouseTrailCanvas from '../../components/MouseTrailCanvas/MouseTrailCanvas';

const AboutStack: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Define tech stack data
  const techStack = [
    { name: 'React', icon: '/images/reactimg.svg', category: 'frontend' },
    { name: 'Next.js', icon: '/images/next.js.svg', category: 'frontend' },
    {
      name: 'TypeScript',
      icon: '/images/TypeScriptimg.svg',
      category: 'frontend',
    },
    {
      name: 'Tailwind CSS',
      icon: '/images/tailwindimg.svg',
      category: 'styles',
    },
    { name: 'Framer Motion', icon: '/images/framer.svg', category: 'frontend' },
    { name: 'Vite', icon: '/images/viteimg.svg', category: 'tools' },
    { name: 'Docker', icon: '/images/docker.svg', category: 'backend' },
    { name: 'Ethers.js', icon: '/images/ethers.svg', category: 'web3' },
    { name: 'Wagmi', icon: '/images/wagmi.svg', category: 'web3' },
  ];

  return (
    <section
      ref={sectionRef}
      className={styles.aboutSection}
      id="about"
      data-auto-scroll-section
      aria-labelledby="about-heading"
    >
      <MouseTrailCanvas sectionRef={sectionRef} />
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div className={styles.aboutGrid}>
            {/* Левая карточка - Обо мне */}
            <motion.div
              className={styles.glassCard}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              aria-labelledby="about-me-heading"
            >
              <h2 id="about-me-heading">Обо мне</h2>
              <p>
                Frontend-разработчик с пониманием бизнес-логики и фокусом на
                конечный результат
                <br />
                Проектирую и реализую интерфейсы, которые решают задачи
                продукта, а не просто выглядят хорошо.
              </p>
              <ul
                className={styles.aboutPoints}
                aria-label="Информация обо мне"
              >
                <li>
                  <span>
                    Создаю быстрые интерфейсы, опираясь на общий опыт 10+ лет
                    работы с бизнесом и IT
                  </span>
                </li>
                <li>
                  <span>
                    Разрабатываю реальные продукты в сфере Fintech и
                    Web3-сервисов
                  </span>
                </li>
                <li>
                  <span>
                    Проектирую архитектуру, пишу чистый код и соблюдаю сроки
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Правая карточка - Стек */}
            <motion.div
              className={styles.glassCard}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2 }}
              aria-labelledby="tech-stack-heading"
            >
              <div className={styles.techHeader}>
                <h2 id="tech-stack-heading">Технологический стек</h2>
              </div>

              <div
                className={styles.techGrid}
                aria-label="Технологии и инструменты"
              >
                {techStack.map((tech, index) => (
                  <motion.div
                    className={styles.techItem}
                    key={index}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                    aria-label={tech.name}
                  >
                    <img src={tech.icon} alt={tech.name} />
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating element at the bottom center of the section */}
        <div className={styles.floatingElementContainer}>
          <motion.div
            className={styles.floatingElement}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: [0, -15, 0] }}
            transition={{
              y: {
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
              delay: 0.8,
            }}
            onClick={() => {
              document.getElementById('portfolio')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/Vector (1).svg"
              alt="Scroll to portfolio"
              className={styles.floatingImage}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutStack;
