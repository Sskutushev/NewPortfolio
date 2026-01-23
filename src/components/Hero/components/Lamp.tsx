import React from 'react';

interface LampProps {
  onClick: () => void;
}

const Lamp: React.FC<LampProps> = ({ onClick }) => {
  return (
    <g id="lamp" onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Провод */}
      <line
        x1="325"
        y1="0"
        x2="325"
        y2="150"
        stroke="var(--lamp-wire)"
        strokeWidth="2"
      />

      {/* Плафон */}
      <ellipse cx="325" cy="160" rx="50" ry="30" fill="var(--lamp-shade)" />

      {/* Лампочка внутри */}
      <circle cx="325" cy="165" r="15" fill="var(--lamp-light)" />

      {/* Свечение (для светлой темы) */}
      <circle
        cx="325"
        cy="165"
        r="40"
        fill="var(--lamp-glow)"
        opacity="0.3"
        filter="url(#glow)"
      />
    </g>
  );
};

export default Lamp;
