import React from 'react';
import Shelf from './components/Shelf';
import Lamp from './components/Lamp';
import Desk from './components/Desk';
import Monitor from './components/Monitor';
import Laptop from './components/Laptop';
import Mouse from './components/Mouse';
import CoffeeCup from './components/CoffeeCup';
import styles from './InteractiveDesk.module.css';

interface InteractiveDeskProps {
  theme: 'light' | 'dark';
  onLampClick: () => void;
  onMouseClick: () => void;
}

const InteractiveDesk: React.FC<InteractiveDeskProps> = ({
  onLampClick,
  onMouseClick,
}) => {
  return (
    <div className={styles.interactiveDeskContainer}>
      <svg
        width="650"
        height="650"
        viewBox="0 0 650 650"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.interactiveDesk}
      >
        {/* Фон стены */}
        <rect width="650" height="650" fill="var(--bg-primary)" />

        {/* Определение фильтров */}
        <defs>
          <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow
              dx="0"
              dy="10"
              stdDeviation="30"
              floodColor="rgba(0,0,0,0.2)"
            />
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Полка с книгами */}
        <Shelf />

        {/* Люстра */}
        <Lamp onClick={onLampClick} />

        {/* Стол */}
        <Desk />

        {/* Монитор */}
        <Monitor />

        {/* Ноутбук */}
        <Laptop />

        {/* Мышка */}
        <Mouse onClick={onMouseClick} />

        {/* Чашка кофе */}
        <CoffeeCup />
      </svg>
    </div>
  );
};

export default InteractiveDesk;
