import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './Portfolio.module.css';

const Portfolio: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  const projects = [
    { title: 'Web3 & Fintech', category: 'DeFi', icon: '🌐' },
    { title: 'E-commerce', category: 'Marketplace', icon: '🛒' },
    { title: 'Productivity', category: 'SaaS', icon: '📊' },
    { title: 'Social Media', category: 'Platform', icon: '💬' },
    { title: 'Analytics', category: 'Dashboard', icon: '📈' },
  ];

  const cardPositions = [
    { x: -500, y: 120, rotate: -15, scale: 0.95 }, // Крайняя левая
    { x: -250, y: 40, rotate: -7, scale: 0.98 }, // Левая
    { x: 0, y: 0, rotate: 0, scale: 1 }, // Центральная
    { x: 250, y: 40, rotate: 7, scale: 0.98 }, // Правая
    { x: 500, y: 120, rotate: 15, scale: 0.95 }, // Крайняя правая
  ];

  return (
    <section ref={ref} className={styles.portfolioSection} id="portfolio">
      <div className="container">
        <h2 className="sectionTitle">Портфолио</h2>

        <div className={styles.portfolioRainbow}>
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={styles.projectCardRainbow}
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={
                isInView
                  ? i === 2 // Центральная карточка
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        x: 0,
                        rotate: 0,
                      }
                    : {
                        opacity: 1,
                        scale: cardPositions[i].scale,
                        x: cardPositions[i].x,
                        y: cardPositions[i].y,
                        rotate: cardPositions[i].rotate,
                      }
                  : {}
              }
              transition={{
                duration: i === 2 ? 0.6 : 0.8,
                delay: i === 2 ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                scale: 1.05,
                y: -12,
                zIndex: 10,
                transition: { duration: 0.3 },
              }}
            >
              <div className={styles.cardIcon}>{project.icon}</div>
              <h4>{project.title}</h4>
              <p>{project.category}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          className={styles.btnViewAll}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Смотреть все
        </motion.button>
      </div>
    </section>
  );
};

export default Portfolio;
