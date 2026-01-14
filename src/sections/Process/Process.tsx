import React from 'react';
import { motion } from 'framer-motion';
import './Process.module.css';

const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Проектирование',
      description:
        'Анализ требований, выбор стека и проектирование компонентной архитектуры (CDD).',
    },
    {
      number: '02',
      title: 'Разработка',
      description:
        'Написание чистого кода на TypeScript с модульной структурой и разделением ответственности.',
    },
    {
      number: '03',
      title: 'AI-оптимизация',
      description:
        'Ускоряю рутину (документирование, тесты) с помощью AI, чтобы больше времени уделять сложной логике.',
    },
    {
      number: '04',
      title: 'Стабильность',
      description:
        'Обязательное тестирование, проверка адаптивности и настройка CI/CD для бесшовного деплоя.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section className="process" id="process">
      <div className="container">
        <h2 className="section-title">От идеи до релиза</h2>

        <motion.div
          className="process-timeline"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div className="process-step" variants={itemVariants}>
                <div className="step-number">{step.number}</div>
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </motion.div>

              {index < steps.length - 1 && (
                <div className="process-arrow">→</div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
