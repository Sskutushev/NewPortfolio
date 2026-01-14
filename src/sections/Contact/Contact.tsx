import React from 'react';
import { motion } from 'framer-motion';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
  return (
    <section className={styles.contactSection} id="contact">
      <div className="container">
        <h2 className="sectionTitle">Контакты</h2>
        <motion.div
          className={styles.contactCode}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <pre>
            <code className={styles.languageTypescript}>
              {`const contact = {
  telegram: '@sskutushev',
  email: 'sskutushev@gmail.com',
  github: 'github.com/Sskutushev',
  location: 'Санкт-Петербург'
};`}
            </code>
          </pre>
        </motion.div>

        {/* Social icons */}
        <motion.div
          className={styles.socialIcons}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        >
          <a
            href="https://t.me/sskutushev"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.socialIcon}>📱</div>
          </a>
          <a href="https://vk.com/id" target="_blank" rel="noopener noreferrer">
            <div className={styles.socialIcon}>.VK</div>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <div className={styles.socialIcon}>💬</div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
