import React from 'react';
import { motion } from 'framer-motion';
import styles from './Stack.module.css';

const Stack: React.FC = () => {
  const stackItems = [
    {
      title: 'TypeScript',
      icon: 'TS',
      description:
        'Основной инструмент последние 3+ года. Использую во всех проектах...',
      type: 'ts',
    },
    {
      title: 'React + Next.js',
      icon: '⚛️',
      description: 'Специализируюсь на создании SPA и SSR приложений...',
      type: 'react',
    },
    {
      title: 'Node.js (Fullstack)',
      icon: 'JS',
      description: 'Пишу внешне красивые блоги Backend на Node.js...',
      type: 'node',
    },
    {
      title: 'JavaScript',
      icon: 'JS',
      description: 'Глубокое понимание...',
      type: 'js',
    },
    {
      title: 'Infrastructure & Styles',
      icon: '⚙️',
      description: 'Предпочитаю...',
      type: 'infra',
    },
    {
      title: 'Web3 & Fintech',
      icon: '🌐',
      description: 'Опыт интеграции...',
      type: 'web3',
    },
  ];

  return (
    <section className={styles.stackSection} id="stack">
      <div className="container">
        <h2 className="sectionTitle">Технологический стек</h2>

        <div className={styles.stackGrid}>
          {stackItems.map((item, index) => (
            <motion.div
              key={index}
              className={`${styles.stackCard} ${styles[`${item.type}Icon`]}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{
                y: -4,
                boxShadow: 'var(--shadow-card-hover)',
              }}
            >
              <div className={styles.stackIcon}>{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;
