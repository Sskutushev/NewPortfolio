import React from 'react';
import { motion } from 'framer-motion';
import { Code, ArrowRight } from 'lucide-react';
import styles from './ProjectCard.module.css';

interface Project {
  id: number;
  title: string;
  category: string;
  tech: string;
  metrics: {
    label: string;
    value: string;
  };
  image: string;
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  delay?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onClick,
  delay = 0
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
      whileHover={{ y: -10 }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Открыть проект ${project.title}`}
      whileHover={{
        scale: 1.05,
        y: -12,
        zIndex: 10,
        rotate: 0  // При hover карточка выравнивается
      }}
    >
      {/* Изображение проекта */}
      <div className={styles.projectImage}>
        <img src={project.image} alt={project.title} />

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
        <p className={styles.techStack}>{project.tech}</p>

        {/* Метрики */}
        <div className={styles.cardFooter}>
          <div className={styles.metrics}>
            <span className={styles.metricLabel}>{project.metrics.label}</span>
            <span className={styles.metricValue}>{project.metrics.value}</span>
          </div>
          <ArrowRight className={styles.arrowIcon} />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;