import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './LazyImage.module.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  placeholder?: 'blur' | 'color' | 'svg' | 'none';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'color',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '50px', // Загружаем заранее
        threshold: 0.1,
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
  };

  // Определяем стиль placeholder
  const getPlaceholderStyle = () => {
    if (placeholder === 'blur') {
      return { backgroundColor: '#f0f0f0', filter: 'blur(5px)' };
    } else if (placeholder === 'color') {
      return { backgroundColor: '#e2e8f0' }; // --border-default
    } else if (placeholder === 'svg') {
      return {
        backgroundImage:
          'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
      };
    }
    return {};
  };

  return (
    <div
      className={`${styles.lazyImageContainer} ${className} ${isLoading ? styles.loading : styles.loaded}`}
      style={{ width, height }}
    >
      {isLoading && (
        <div className={styles.placeholder} style={getPlaceholderStyle()} />
      )}
      {isInView && (
        <motion.img
          ref={imgRef}
          src={src}
          alt={alt}
          className={`${styles.image} ${isLoading ? styles.hidden : styles.visible}`}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            overflow: 'hidden', // Убедимся, что изображение не выходит за границы
          }}
        />
      )}
    </div>
  );
};

export default LazyImage;
