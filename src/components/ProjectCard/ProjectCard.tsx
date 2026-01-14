import React from 'react';
import type { Project } from '../../data/projects';
import './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <div className="project-card" onClick={onClick}>
      <div className="project-image">
        <img
          src={
            project.image ||
            'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23718096">Project Image</text></svg>'
          }
          alt={project.title}
          onError={(e) => {
            // Fallback if image doesn't load
            e.currentTarget.src =
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250"><rect width="400" height="250" fill="%23e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23718096">Project Image</text></svg>';
          }}
        />
        <div className="image-overlay"></div>
      </div>

      <div className="project-content">
        <span className="project-category">{project.category}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        <div className="project-tech">
          {project.tech.map((tech, index) => (
            <span key={index}>{tech}</span>
          ))}
        </div>

        <div className="project-actions">
          <button className="btn-details">Подробнее →</button>
          <a
            href={project.liveUrl}
            className="btn-demo"
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo ↗
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
