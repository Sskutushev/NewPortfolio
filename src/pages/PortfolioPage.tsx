import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard/ProjectCard';
import ProjectModal from '../components/ProjectModal/ProjectModal';
import styles from './PortfolioPage.module.css';

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

const PortfolioPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // All projects for the portfolio page
  const allProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      category: 'Web',
      tech: 'React, Node.js, MongoDB',
      metrics: { label: 'Sales', value: '$2.5M+' },
      image: '/project-ecommerce.jpg',
      flow: {
        input: 'Customer browses products',
        process: 'Cart management and payment processing',
        output: 'Order fulfillment'
      },
      codeHighlight: {
        title: 'Shopping Cart Logic',
        code: `const addToCart = (product, quantity) => {\n  const existingItem = cart.find(item => item.id === product.id);\n  \n  if (existingItem) {\n    existingItem.quantity += quantity;\n  } else {\n    cart.push({ ...product, quantity });\n  }\n  \n  updateCartTotal();\n};`
      }
    },
    {
      id: 2,
      title: 'Health Tracker',
      category: 'Mobile',
      tech: 'React Native, Firebase',
      metrics: { label: 'Downloads', value: '50K+' },
      image: '/project-health.jpg',
      flow: {
        input: 'User logs health data',
        process: 'Data analysis and trend identification',
        output: 'Personalized health insights'
      },
      codeHighlight: {
        title: 'Data Analysis Algorithm',
        code: `const analyzeHealthData = (data) => {\n  const trends = calculateTrends(data);\n  const anomalies = detectAnomalies(data);\n  \n  return {\n    trends,\n    anomalies,\n    recommendations: generateRecommendations(trends, anomalies)\n  };\n};`
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
      id: 4,
      title: 'Blockchain Wallet',
      category: 'Web3',
      tech: 'React, Web3.js, Solidity',
      metrics: { label: 'Transactions', value: '500K+' },
      image: '/project-wallet.jpg',
      flow: {
        input: 'User initiates transaction',
        process: 'Blockchain validation and processing',
        output: 'Secure asset transfer'
      },
      codeHighlight: {
        title: 'Transaction Signing',
        code: `const signTransaction = async (transaction) => {\n  const signature = await web3.eth.sign(\n    transaction.message,\n    account.address\n  );\n  \n  return { ...transaction, signature };\n};`
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
      id: 6,
      title: 'Social Network',
      category: 'Web',
      tech: 'React, GraphQL, PostgreSQL',
      metrics: { label: 'Users', value: '100K+' },
      image: '/project-social.jpg',
      flow: {
        input: 'User creates content',
        process: 'Content moderation and distribution',
        output: 'Engaging social feed'
      },
      codeHighlight: {
        title: 'Content Moderation',
        code: `const moderateContent = async (content) => {\n  const flaggedWords = await checkForFlaggedWords(content.text);\n  const imageAnalysis = await analyzeImage(content.image);\n  \n  return {\n    isApproved: flaggedWords.length === 0 && !imageAnalysis.flags,\n    flags: [...flaggedWords, ...imageAnalysis.flags]\n  };\n};`
      }
    },
    {
      id: 7,
      title: 'Analytics Dashboard',
      category: 'Business',
      tech: 'React, D3.js, Redux',
      metrics: { label: 'Charts', value: '50+' },
      image: '/project-analytics.jpg',
      flow: {
        input: 'Data streams from various sources',
        process: 'Real-time aggregation and visualization',
        output: 'Actionable business insights'
      },
      codeHighlight: {
        title: 'Data Visualization',
        code: `const createChart = (data, type) => {\n  const chart = d3.select('#chart')\n    .append('svg')\n    .attr('width', width)\n    .attr('height', height);\n  \n  // Draw chart based on type\n  switch(type) {\n    case 'bar':\n      drawBarChart(chart, data);\n      break;\n    case 'line':\n      drawLineChart(chart, data);\n      break;\n  }\n};`
      }
    },
    {
      id: 8,
      title: 'IoT Control Panel',
      category: 'Hardware',
      tech: 'React, Socket.io, Raspberry Pi',
      metrics: { label: 'Devices', value: '1K+' },
      image: '/project-iot.jpg',
      flow: {
        input: 'Sensor data received',
        process: 'Data processing and alert generation',
        output: 'Automated device control'
      },
      codeHighlight: {
        title: 'Real-time Data Handling',
        code: `socket.on('sensorData', (data) => {\n  updateDashboard(data);\n  \n  if (data.temperature > THRESHOLD) {\n    triggerAlert('High temperature detected');\n  }\n});`
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
      id: 10,
      title: 'Educational Platform',
      category: 'EdTech',
      tech: 'React, WebRTC, AWS',
      metrics: { label: 'Courses', value: '200+' },
      image: '/project-edu.jpg',
      flow: {
        input: 'Student enrolls in course',
        process: 'Content delivery and progress tracking',
        output: 'Certified learning outcomes'
      },
      codeHighlight: {
        title: 'Progress Tracking',
        code: `const trackProgress = (studentId, courseId, lessonId) => {\n  const progress = getStudentProgress(studentId, courseId);\n  progress.completedLessons.add(lessonId);\n  \n  if (progress.completedLessons.size === progress.totalLessons) {\n    awardCertificate(studentId, courseId);\n  }\n  \n  saveProgress(progress);\n};`
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
    },
    {
      id: 12,
      title: 'Supply Chain',
      category: 'Logistics',
      tech: 'React, Blockchain, IoT',
      metrics: { label: 'Tracked Items', value: '1M+' },
      image: '/project-supply.jpg',
      flow: {
        input: 'Product enters supply chain',
        process: 'Tracking and verification at each stage',
        output: 'Verified product journey'
      },
      codeHighlight: {
        title: 'Supply Chain Verification',
        code: `const verifyProductJourney = async (productId) => {\n  const journey = await getProductJourney(productId);\n  const blockchainRecords = await getBlockchainRecords(productId);\n  \n  return journey.every(stage => \n    blockchainRecords.some(record => record.stageId === stage.id)\n  );\n};`
      }
    },
    {
      id: 13,
      title: 'AR Navigation',
      category: 'AR',
      tech: 'React, AR.js, WebGL',
      metrics: { label: 'Locations', value: '500+' },
      image: '/project-ar.jpg',
      flow: {
        input: 'User opens AR navigation',
        process: 'Location detection and route calculation',
        output: 'Visual navigation guidance'
      },
      codeHighlight: {
        title: 'AR Location Detection',
        code: `const detectLocation = () => {\n  return new Promise((resolve, reject) => {\n    navigator.geolocation.getCurrentPosition(\n      position => {\n        const { latitude, longitude } = position.coords;\n        const nearbyPOIs = findNearbyPOIs(latitude, longitude);\n        resolve(nearbyPOIs);\n      },\n      error => reject(error)\n    );\n  });\n};`
      }
    },
    {
      id: 14,
      title: 'Voice Assistant',
      category: 'AI',
      tech: 'React, Web Speech API, TensorFlow.js',
      metrics: { label: 'Commands', value: '10K+' },
      image: '/project-voice.jpg',
      flow: {
        input: 'User speaks command',
        process: 'Speech recognition and intent parsing',
        output: 'Action execution'
      },
      codeHighlight: {
        title: 'Speech Recognition',
        code: `const recognizeSpeech = () => {\n  recognition.start();\n  \n  recognition.onresult = (event) => {\n    const transcript = event.results[0][0].transcript;\n    const intent = parseIntent(transcript);\n    executeAction(intent);\n  };\n};`
      }
    },
    {
      id: 15,
      title: 'Crypto Exchange',
      category: 'Web3',
      tech: 'React, Rust, Solana',
      metrics: { label: 'Trades', value: '100K+' },
      image: '/project-exchange.jpg',
      flow: {
        input: 'User places trade order',
        process: 'Order matching and execution',
        output: 'Completed trade with settlement'
      },
      codeHighlight: {
        title: 'Order Matching',
        code: `const matchOrders = (buyOrders, sellOrders) => {\n  const matches = [];\n  \n  buyOrders.forEach(buyOrder => {\n    const sellOrder = sellOrders.find(sell => \n      sell.price <= buyOrder.price && sell.quantity >= buyOrder.quantity\n    );\n    \n    if (sellOrder) {\n      matches.push({ buyOrder, sellOrder });\n      // Execute trade...\n    }\n  });\n  \n  return matches;\n};`
      }
    },
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
    }
  ];

  return (
    <div className={styles.portfolioPage}>
      <div className="container">
        {/* Back Button */}
        <motion.div className={styles.backButton} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/">
            <ArrowLeft /> Назад к сайту
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div className={styles.pageHeader} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>Портфолио</h1>
          <p>Реализованные проекты, демонстрирующие мой подход к разработке</p>
        </motion.div>

        {/* Grid всех проектов */}
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
                project={project}
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