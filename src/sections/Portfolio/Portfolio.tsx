import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import { Link } from 'react-router-dom';
import styles from './Portfolio.module.css';
import { projects } from '../../data/projects';
import * as ProjectsData from '../../data/projects';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectsData.Project | null>(null);

  // Featured projects for the fan layout
  const featuredProjectTitles = [
    'NFT Marketplace',
    'Lumi',
    'AIBRO Business',
    'TOT',
    'Yokai Threat Matrix',
  ];
  const featuredProjects = featuredProjectTitles
    .map((title) => projects.find((p) => p.title === title))
    .filter((p) => p) as ProjectsData.Project[];

  // Reorder to match the fan layout: NFT, Lumi, AIBRO, TOT, Yokai
  const reorderedProjects = [
    featuredProjects.find((p) => p?.title === 'NFT Marketplace'), // Center
    featuredProjects.find((p) => p?.title === 'Lumi'), // Left-1
    featuredProjects.find((p) => p?.title === 'AIBRO Business'), // Left-2
    featuredProjects.find((p) => p?.title === 'TOT'), // Right-1
    featuredProjects.find((p) => p?.title === 'Yokai Threat Matrix'), // Right-2
  ];

  const fanProjects = reorderedProjects.filter(
    Boolean
  ) as ProjectsData.Project[];

  interface Position {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    zIndex: number;
  }

  // Position calculation for fan layout
  const getFanPosition = (index: number) => {
    const positions = [
      // Center (NFT Marketplace)
      { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3 },
      // Left-1 (Lumi)
      { x: -230, y: 50, rotate: -6, scale: 0.96, zIndex: 2 },
      // Left-2 (AIBRO Business)
      { x: -450, y: 100, rotate: -12, scale: 0.92, zIndex: 1 },
      // Right-1 (TOT)
      { x: 230, y: 50, rotate: 6, scale: 0.96, zIndex: 2 },
      // Right-2 (Yokai)
      { x: 450, y: 100, rotate: 12, scale: 0.92, zIndex: 1 },
    ];

    return positions[index];
  };

  const cardVariants = (position: Position) => ({
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100,
    },
    visible: {
      opacity: 1,
      scale: position.scale,
      x: position.x,
      y: position.y,
      rotate: position.rotate,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  });

  return (
    <section
      className={styles.portfolioSection}
      id="portfolio"
      data-auto-scroll-section
      aria-labelledby="portfolio-heading"
    >
      <div className="container">
        {/* Заголовок */}
        <motion.div
          className={styles.sectionHeader}
          id="portfolio-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Портфолио</h2>
          <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
        </motion.div>

        {/* Контейнер веера */}
        <div
          className={styles.portfolioFan}
          aria-label="Избранные проекты в виде веера"
        >
          {fanProjects.map((project, index) => {
            const position = getFanPosition(index);
            return (
              <motion.div
                key={project.id}
                className={styles.projectCardWrapper}
                variants={cardVariants(position)}
                initial="hidden"
                animate="visible"
                style={{
                  position: 'absolute',
                  ...position,
                }}
                whileHover={{
                  scale: 1.05,
                  y: position.y - 12,
                  zIndex: 10,
                  rotate: 0, // При hover карточка выравнивается
                }}
                aria-label={`Проект ${project.title}`}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Кнопка "Все проекты" */}
        <Link
          to="/portfolio"
          className={styles.viewAllBtn}
          aria-label="Перейти ко всем проектам"
        >
          Все проекты
        </Link>

        {/* Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Portfolio;
