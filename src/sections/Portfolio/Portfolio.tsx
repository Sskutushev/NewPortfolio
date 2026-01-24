import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import { Link } from 'react-router-dom';
import styles from './Portfolio.module.css';
import { projects } from '../../data/projects';
import * as ProjectsData from '../../data/projects';
import useMediaQuery from '../../hooks/useMediaQuery';

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectsData.Project | null>(null);

  // Mobile Carousel Logic
  const isMobile = useMediaQuery('(max-width: 768px)');
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isMobile && carouselRef.current) {
      const container = carouselRef.current;
      const scrollWidth = container.scrollWidth;
      // The point where we reset the scroll to create the loop
      const scrollResetPoint = scrollWidth / 2;

      const startScrolling = () => {
        scrollIntervalRef.current = setInterval(() => {
          if (container.scrollLeft >= scrollResetPoint) {
            // Instantly jump back to the start
            container.scrollLeft = 0;
          }
          // Smooth scroll by the width of one card plus the gap
          const card = container.querySelector<HTMLElement>(`:scope > div`);
          if (card) {
            const cardWidth = card.offsetWidth;
            const gap = parseInt(window.getComputedStyle(container).gap) || 16;
            container.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
          }
        }, 1500);
      };

      const stopScrolling = () => {
        if (scrollIntervalRef.current) {
          clearInterval(scrollIntervalRef.current);
        }
      };

      startScrolling();

      container.addEventListener('mouseenter', stopScrolling);
      container.addEventListener('mouseleave', startScrolling);
      container.addEventListener('touchstart', stopScrolling);
      container.addEventListener('touchend', startScrolling);

      return () => {
        stopScrolling();
        container.removeEventListener('mouseenter', stopScrolling);
        container.removeEventListener('mouseleave', startScrolling);
        container.removeEventListener('touchstart', stopScrolling);
        container.removeEventListener('touchend', startScrolling);
      };
    }
  }, [isMobile]);

  // Desktop Fan Layout Logic
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

  const delays = [0, 0.2, 0.4, 0.2, 0.4]; // Delays for the fan animation

  interface Position {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    zIndex: number;
  }

  const getFanPosition = (index: number) => {
    const positions = [
      { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3 },
      { x: -230, y: 50, rotate: -6, scale: 0.96, zIndex: 2 },
      { x: -450, y: 100, rotate: -12, scale: 0.92, zIndex: 1 },
      { x: 230, y: 50, rotate: 6, scale: 0.96, zIndex: 2 },
      { x: 450, y: 100, rotate: 12, scale: 0.92, zIndex: 1 },
    ];
    return positions[index];
  };

  const cardVariants = (position: Position, delay: number) => ({
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: {
      opacity: 1,
      scale: position.scale,
      x: position.x,
      y: position.y,
      rotate: position.rotate,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        delay,
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
        <motion.div
          className={styles.sectionHeader}
          id="portfolio-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2>Портфолио</h2>
          <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
        </motion.div>

        {isMobile ? (
          <div
            className={styles.mobileCarouselContainer}
            ref={carouselRef}
            aria-label="Карусель проектов"
          >
            {[...projects, ...projects].map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className={styles.mobileCardWrapper}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={styles.portfolioFan}
            aria-label="Избранные проекты в виде веера"
          >
            {fanProjects.map((project, index) => {
              const position = getFanPosition(index);
              const delay = delays[index];
              return (
                <motion.div
                  key={project.id}
                  className={styles.projectCardWrapper}
                  variants={cardVariants(position, delay)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  style={{ position: 'absolute', ...position }}
                  whileHover={{
                    scale: 1.05,
                    y: position.y - 12,
                    zIndex: 10,
                    rotate: 0,
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
        )}

        <Link
          to="/portfolio"
          className={styles.viewAllBtn}
          aria-label="Перейти ко всем проектам"
        >
          Все проекты
        </Link>

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
