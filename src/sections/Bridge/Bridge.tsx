import React from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { Layers, Zap, Code } from 'lucide-react';
import './Bridge.module.css';

const Bridge: React.FC = () => {
  const principles = [
    {
      icon: <Layers size={28} />,
      title: 'Системный подход',
      description:
        'Опыт в бэкенде (Node.js/Python) помогает проектировать фронтенд как часть единой экосистемы.',
    },
    {
      icon: <Zap size={28} />,
      title: 'Производительность',
      description:
        'Оптимизирую Web Vitals, пишу тесты (Vitest, RTL) и внедряю CI/CD для стабильных релизов.',
    },
    {
      icon: <Code size={28} />,
      title: 'Чистота кода',
      description:
        'Создаю поддерживаемый код, который минимизирует техдолг и упрощает масштабирование.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
      },
    },
    whileHover: {
      y: -8,
      boxShadow: 'var(--shadow-lg)',
      transition: {
        duration: 0.3,
        ease: cubicBezier(0.25, 0.1, 0.25, 1.0),
      },
    },
  };

  return (
    <section className="bridge" id="about">
      <div className="container">
        <div className="bridge-header">
          <h2 className="section-title">
            Финтех-инженер → Frontend-разработчик
          </h2>
          <p className="bridge-text">
            Мой путь в разработке начался с автоматизации сложных торговых
            систем в финтехе. Это научило меня ответственности за архитектуру,
            производительность и чистоту данных. Сейчас я переношу этот опыт во
            фронтенд, создавая решения от PWA до Web3-сервисов.
          </p>
        </div>

        <motion.div
          className="principles-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              className="principle-card"
              variants={itemVariants}
              whileHover="whileHover"
            >
              <div className="icon-wrapper">{principle.icon}</div>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Bridge;
