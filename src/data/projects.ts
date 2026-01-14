export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'AIBRO Business',
    category: 'Full-Stack SaaS',
    description:
      'Production-ready SaaS платформа с JWT-аутентификацией, криптоплатежами и личным кабинетом.',
    tech: ['React 19', 'TypeScript', 'Prisma', 'PostgreSQL'],
    image: '/src/assets/images/aibro.jpg',
    liveUrl: 'https://aibro-business.com',
    githubUrl: 'https://github.com/sskutushev/aibro-business',
  },
  {
    id: 2,
    title: 'Lumi',
    category: 'PWA',
    description:
      'Продвинутая система управления задачами с синхронизацией в реальном времени.',
    tech: ['React', 'TypeScript', 'Firebase', 'Material UI'],
    image: '/src/assets/images/lumi.jpg',
    liveUrl: 'https://lumi-pwa.com',
    githubUrl: 'https://github.com/sskutushev/lumi',
  },
  {
    id: 3,
    title: 'NFT Marketplace',
    category: 'E-commerce',
    description:
      'Тестовое задание для международной компании, реализующее функционал NFT маркетплейса.',
    tech: ['Next.js', 'Solidity', 'Ethers.js', 'Tailwind'],
    image: '/src/assets/images/nft-marketplace.jpg',
    liveUrl: 'https://nft-marketplace.com',
    githubUrl: 'https://github.com/sskutushev/nft-marketplace',
  },
  {
    id: 4,
    title: 'Yokai Threat Matrix',
    category: 'Real-Time Dashboard',
    description:
      'PWA дашборд для мониторинга киберугроз с визуализацией данных в реальном времени.',
    tech: ['React', 'D3.js', 'Socket.io', 'Node.js'],
    image: '/src/assets/images/yokai-threat-matrix.jpg',
    liveUrl: 'https://yokai-threat-matrix.com',
    githubUrl: 'https://github.com/sskutushev/yokai-threat-matrix',
  },
  {
    id: 5,
    title: 'Reactive Velocity Portfolio',
    category: 'Personal',
    description:
      'Открытый исходный код этого портфолио с продвинутыми анимациями и адаптивным дизайном.',
    tech: ['React', 'TypeScript', 'Framer Motion', 'Tailwind'],
    image: '/src/assets/images/portfolio.jpg',
    liveUrl: 'https://reactive-velocity.com',
    githubUrl: 'https://github.com/sskutushev/reactive-velocity-portfolio',
  },
];

export const allProjects: Project[] = [
  ...projects,
  {
    id: 6,
    title: 'FinTech Analytics',
    category: 'Dashboard',
    description:
      'Аналитическая панель для финансовых показателей с интерактивными графиками.',
    tech: ['React', 'Redux', 'D3.js', 'Express'],
    image: '/src/assets/images/fintech-analytics.jpg',
    liveUrl: 'https://fintech-analytics.com',
    githubUrl: 'https://github.com/sskutushev/fintech-analytics',
  },
  {
    id: 7,
    title: 'Crypto Wallet',
    category: 'Web3',
    description:
      'Безопасное хранилище криптовалюты с поддержкой нескольких блокчейнов.',
    tech: ['React', 'Web3.js', 'Ethers.js', 'Material UI'],
    image: '/src/assets/images/crypto-wallet.jpg',
    liveUrl: 'https://crypto-wallet.com',
    githubUrl: 'https://github.com/sskutushev/crypto-wallet',
  },
  {
    id: 8,
    title: 'E-Learning Platform',
    category: 'Education',
    description:
      'Платформа для онлайн-обучения с видео-лекциями и интерактивными заданиями.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe'],
    image: '/src/assets/images/elearning-platform.jpg',
    liveUrl: 'https://elearning-platform.com',
    githubUrl: 'https://github.com/sskutushev/elearning-platform',
  },
  {
    id: 9,
    title: 'Health Tracker',
    category: 'Mobile App',
    description:
      'PWA приложение для отслеживания здоровья и физической активности.',
    tech: ['React', 'Firebase', 'Chart.js', 'PWA'],
    image: '/src/assets/images/health-tracker.jpg',
    liveUrl: 'https://health-tracker.com',
    githubUrl: 'https://github.com/sskutushev/health-tracker',
  },
  {
    id: 10,
    title: 'Supply Chain Manager',
    category: 'Enterprise',
    description:
      'Система управления цепочками поставок с трассировкой в реальном времени.',
    tech: ['Vue.js', 'Node.js', 'PostgreSQL', 'Socket.io'],
    image: '/src/assets/images/supply-chain-manager.jpg',
    liveUrl: 'https://supply-chain-manager.com',
    githubUrl: 'https://github.com/sskutushev/supply-chain-manager',
  },
];
