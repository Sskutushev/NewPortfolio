import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Github, Mail } from 'lucide-react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      // Сброс состояния через 2 секунды
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const contactCode = `const contact = {
  telegram: '@sskutushev',
  email: 'sskutushev@gmail.com',
  github: 'github.com/sskutushev',
  location: 'Санкт-Петербург'
};`;

  // Animation variants for social icons
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      className={styles.contactSection}
      id="contact"
      data-auto-scroll-section
      aria-labelledby="contact-heading"
    >
      <div className="container">
        {/* Заголовок */}
        <motion.div
          className={styles.sectionHeader}
          id="contact-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Контакты</h2>
        </motion.div>

        {/* Code Block */}
        <motion.div
          className={styles.contactCode}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          aria-label="Контактная информация в формате кода"
        >
          <pre>
            <code>{contactCode}</code>
          </pre>
        </motion.div>

        {/* Социальные иконки */}
        <motion.div
          className={styles.socialIcons}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          aria-label="Социальные сети и контактная информация"
        >
          <motion.a
            href="https://t.me/sskutushev"
            variants={iconVariants}
            whileHover={{ scale: 1.15, rotate: 5 }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
          >
            <Send size={24} />
          </motion.a>

          <motion.a
            href="https://github.com/sskutushev"
            variants={iconVariants}
            whileHover={{ scale: 1.15, rotate: 5 }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Github size={24} />
          </motion.a>

          <motion.button
            variants={iconVariants}
            whileHover={{ scale: 1.15, rotate: 5 }}
            onClick={() => copyToClipboard('sskutushev@gmail.com')}
            aria-label={copied ? 'Email скопирован' : 'Скопировать email адрес'}
          >
            {copied ? '✓' : <Mail size={24} />}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
