import React from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';
import styles from './ProjectCard.module.css';
import * as ProjectsData from '../../data/projects';

interface ProjectCardProps {
  project: ProjectsData.Project;
  onClick?: () => void;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  delay = 0,
}) => {
  const handleClick = () => {
    onClick?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      className={styles.projectCard}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Открыть проект ${project.title}`}
      whileHover={{
        scale: 1.05,
        y: -12,
        zIndex: 10,
        rotate: 0, // При hover карточка выравнивается
      }}
    >
      {/* Изображение проекта */}
      <div className={styles.projectImage}>
        {project.image ? (
          <img src={project.image} alt={project.title} />
        ) : (
          <div className={styles.placeholderImage}>No Image</div>
        )}

        {/* Gradient overlay */}
        <div className={styles.imageGradient} />

        {/* Иконка кода */}
        <motion.div
          className={styles.codeIcon}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <Code size={20} />
        </motion.div>
      </div>

      {/* Контент карточки */}
      <div className={styles.cardContent}>
        {/* Категория badge */}
        <span className={styles.categoryBadge}>{project.category}</span>

        {/* Заголовок */}
        <h3>{project.title}</h3>

        {/* Технологии */}
        <p className={styles.techStack}>{project.tech.join(', ')}</p>

        {/* Метрики */}
        <div className={styles.cardFooter}>
          <div className={styles.metrics}>
            {project.title.includes('NFT Marketplace') &&
              'Performance → Pixel-Perfect Design'}
            {project.title === 'Lumi' && 'Performance → Optimistic UI'}
            {project.title === 'AIBRO Business' &&
              'Готовность → Production-Ready'}
            {project.title.includes('Portfolio') && 'Performance → 95%'}
            {project.title.includes('Yokai') && 'Performance → Real-Time SSE'}
            {project.title.includes('MovieCatalog') &&
              'Performance → Adaptive UI'}
            {project.title.includes('Courses Catalog') &&
              'Architecture → Class-Based ES6'}
            {project.title.includes('SPARTSPRO') &&
              'Products → 30 000+ SKU (каталог)'}
            {project.title === 'DexFlow' && 'Функционал → 8 страниц'}
            {project.title === 'TOT' && 'Placeholder Metric'}
          </div>
          <ArrowRight className={styles.arrowIcon} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
