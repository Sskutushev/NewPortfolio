import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import ProjectModal from '../components/ProjectModal/ProjectModal';
import styles from './PortfolioPage.module.css';
import { projects as allProjects } from '../data/projects';
import * as ProjectsData from '../data/projects';

// Function to truncate title before the dash (not needed anymore since titles are already clean)
const truncateTitle = (title: string) => {
  return title;
};

const PortfolioPage: React.FC = () => {
  const [selectedProject, setSelectedProject] =
    useState<ProjectsData.Project | null>(null);

  return (
    <div className={styles.portfolioPage}>
      <div className="container">
        {/* Back Button */}
        <motion.div
          className={styles.backButton}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/">
            <ArrowLeft /> Назад к сайту
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className={styles.pageHeader}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>Портфолио</h1>
          <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
        </motion.div>

        {/* Projects Grid */}
        <div className={styles.projectsGrid}>
          {allProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <ProjectCard
                project={{ ...project, title: truncateTitle(project.title) }}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;
