import React from 'react';
import { motion, AnimatePresence, cubicBezier } from 'framer-motion';
import styles from './TechCarousel.module.css';

interface TechCarouselProps {
  currentIndex: number;
  techData: any;
  techArray: string[];
  onIndicatorClick: (index: number) => void;
}

const TechCarousel: React.FC<TechCarouselProps> = ({
  currentIndex,
  techData,
  techArray,
  onIndicatorClick,
}) => {
  const currentTech = techData[techArray[currentIndex] as keyof typeof techData];

  return (
    <div className={styles.carouselWrapper}>
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
              } ${currentTech.icon === 'ts' ? styles.tsIcon : ''} ${
                currentTech.icon === 'react' ? styles.reactIcon : ''
              } ${currentTech.icon === 'nodejs' ? styles.nodejsIcon : ''} ${
                currentTech.icon === 'styles' ? styles.stylesIcon : ''
              } ${currentTech.icon === 'web3' ? styles.web3Icon : ''}`}
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
            onClick={() => onIndicatorClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TechCarousel;

export default TechCarousel;