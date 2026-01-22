import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import ProjectModal from '../../components/ProjectModal/ProjectModal';
import { Link } from 'react-router-dom';
import styles from './Portfolio.module.css';

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
  flow: {
    input: string;
    process: string;
    output: string;
  };
  codeHighlight: {
    title: string;
    code: string;
  };
}

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Featured projects for the fan layout
  const featuredProjects = [
    {
      id: 16,
      title: 'NFT Marketplace',
      category: 'Web3',
      tech: 'React, Solidity, Web3.js',
      metrics: { label: 'Transactions', value: '1.2K+' },
      image: '/project-nft.jpg',
      flow: {
        input: 'User connects wallet and browses NFTs',
        process: 'Smart contracts handle minting and trading',
        output: 'Secure NFT transactions with low fees'
      },
      codeHighlight: {
        title: 'Smart Contract Integration',
        code: `const contract = new ethers.Contract(address, abi, signer);\n\nconst mintNFT = async (uri) => {\n  const tx = await contract.mint(uri);\n  await tx.wait();\n};`
      }
    },
    {
      id: 9,
      title: 'Lumi',
      category: 'Fintech',
      tech: 'React, Node.js, PostgreSQL',
      metrics: { label: 'Users', value: '5K+' },
      image: '/project-lumi.jpg',
      flow: {
        input: 'User enters financial data',
        process: 'AI analyzes spending patterns',
        output: 'Personalized budget recommendations'
      },
      codeHighlight: {
        title: 'Financial Data Processing',
        code: `const calculateBudget = (income, expenses) => {\n  const remaining = income - expenses.total;\n  const allocation = {};\n  \n  Object.keys(expenses).forEach(category => {\n    allocation[category] = expenses[category] / income;\n  });\n  \n  return { remaining, allocation };\n};`
      }
    },
    {
      id: 3,
      title: 'AIBRO',
      category: 'AI',
      tech: 'React, TensorFlow.js, Python',
      metrics: { label: 'Models', value: '15+' },
      image: '/project-aibro.jpg',
      flow: {
        input: 'User uploads data for analysis',
        process: 'AI models process and analyze data',
        output: 'Actionable insights and predictions'
      },
      codeHighlight: {
        title: 'AI Model Prediction',
        code: `const predict = async (inputData) => {\n  const tensor = tf.tensor(inputData);\n  const prediction = model.predict(tensor);\n  const result = await prediction.data();\n  \n  return result;\n};`
      }
    },
    {
      id: 5,
      title: 'Portfolio',
      category: 'Web',
      tech: 'React, TypeScript, Framer Motion',
      metrics: { label: 'Views', value: '10K+' },
      image: '/project-portfolio.jpg',
      flow: {
        input: 'Visitor accesses portfolio site',
        process: 'Animations and transitions engage user',
        output: 'Professional showcase of skills'
      },
      codeHighlight: {
        title: 'Smooth Animations',
        code: `const containerVariants = {\n  hidden: { opacity: 0 },\n  visible: {\n    opacity: 1,\n    transition: {\n      staggerChildren: 0.1\n    }\n  }\n};`
      }
    },
    {
      id: 11,
      title: 'Yokai',
      category: 'Gaming',
      tech: 'React, Phaser.js, Socket.io',
      metrics: { label: 'Players', value: '2K+' },
      image: '/project-yokai.jpg',
      flow: {
        input: 'Player joins multiplayer game',
        process: 'Real-time game state synchronization',
        output: 'Seamless gaming experience'
      },
      codeHighlight: {
        title: 'Real-time Game Sync',
        code: `socket.on('gameState', (state) => {\n  updateGameObjects(state.entities);\n  render();\n});\n\nconst syncState = () => {\n  socket.emit('playerMove', player.position);\n};`
      }
    }
  ];

  // Position calculation for fan layout
  const getFanPosition = (index: number) => {
    const positions = [
      // Left-2 (NFT Marketplace)
      { x: -450, y: 100, rotate: -12, scale: 0.92, zIndex: 1 },
      // Left-1 (Lumi)
      { x: -230, y: 50, rotate: -6, scale: 0.96, zIndex: 2 },
      // Center (AIBRO)
      { x: 0, y: 0, rotate: 0, scale: 1, zIndex: 3 },
      // Right-1 (Portfolio)
      { x: 230, y: 50, rotate: 6, scale: 0.96, zIndex: 2 },
      // Right-2 (Yokai)
      { x: 450, y: 100, rotate: 12, scale: 0.92, zIndex: 1 },
    ];

    return positions[index];
  };

  interface Position {
    x: number;
    y: number;
    rotate: number;
    scale: number;
    zIndex: number;
  }

  const cardVariants = (position: Position) => ({
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 100
    },
    visible: {
      opacity: 1,
      scale: position.scale,
      x: position.x,
      y: position.y,
      rotate: position.rotate,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  });

  return (
    <section className={styles.portfolioSection} id="portfolio" data-auto-scroll-section aria-labelledby="portfolio-heading">
      <div className="container">
        {/* Заголовок */}
        <motion.div className={styles.sectionHeader} id="portfolio-heading" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2>Портфолио</h2>
          <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
        </motion.div>

        {/* Контейнер веера */}
        <div className={styles.portfolioFan} aria-label="Избранные проекты в виде веера">
          {featuredProjects.map((project, index) => {
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
                  ...position
                }}
                whileHover={{
                  scale: 1.05,
                  y: position.y - 12,
                  zIndex: 10,
                  rotate: 0  // При hover карточка выравнивается
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
        <Link to="/portfolio" className={styles.viewAllBtn} aria-label="Перейти ко всем проектам">
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