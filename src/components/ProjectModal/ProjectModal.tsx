import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code } from 'lucide-react';
import styles from './ProjectModal.module.css';

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
  flow?: {
    input: string;
    process: string;
    output: string;
  };
  codeHighlight?: {
    title: string;
    code: string;
  };
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'flow' | 'code'>('flow');

  // Close modal on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          className={styles.modalContent}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          role="document"
          aria-label={`Детали проекта ${project.title}`}
        >
          {/* Sticky Header */}
          <div className={styles.modalHeader}>
            <h3>{project.title}</h3>
            <button
              onClick={onClose}
              aria-label="Закрыть модальное окно"
              autoFocus
            >
              ✕
            </button>
          </div>

          {/* Табы */}
          <div className={styles.modalTabs} role="tablist">
            <button
              className={activeTab === 'flow' ? styles.active : ''}
              onClick={() => setActiveTab('flow')}
              role="tab"
              aria-selected={activeTab === 'flow'}
              aria-controls="flow-panel"
            >
              The Flow
            </button>
            <button
              className={activeTab === 'code' ? styles.active : ''}
              onClick={() => setActiveTab('code')}
              role="tab"
              aria-selected={activeTab === 'code'}
              aria-controls="code-panel"
            >
              Code Highlight
            </button>
          </div>

          {/* Контент */}
          <div className={styles.modalBody}>
            {activeTab === 'flow' ? (
              <div className={styles.flowContent} id="flow-panel" role="tabpanel">
                <div className={`${styles.flowBlock} ${styles.input}`}>
                  <h4>Input</h4>
                  <p>{project.flow?.input || 'No flow data available'}</p>
                </div>
                <div className={`${styles.flowBlock} ${styles.process}`}>
                  <h4>Process</h4>
                  <p>{project.flow?.process || 'No process data available'}</p>
                </div>
                <div className={`${styles.flowBlock} ${styles.output}`}>
                  <h4>Output</h4>
                  <p>{project.flow?.output || 'No output data available'}</p>
                </div>
              </div>
            ) : (
              <div className={styles.codeContent} id="code-panel" role="tabpanel">
                <div className={styles.codeHeader}>
                  <Code size={24} />
                  <h4>{project.codeHighlight?.title || 'Code Highlight'}</h4>
                </div>
                <pre>
                  <code>{project.codeHighlight?.code || '// No code available'}</code>
                </pre>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;