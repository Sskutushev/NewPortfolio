import React from 'react';

interface MouseProps {
  onClick: () => void;
}

const Mouse: React.FC<MouseProps> = ({ onClick }) => {
  return (
    <g id="mouse" onClick={onClick} style={{ cursor: 'pointer' }}>
      {/* Корпус мыши */}
      <ellipse cx="500" cy="580" rx="20" ry="30" fill="var(--mouse-body)" />

      {/* Разделитель кнопок */}
      <line
        x1="500"
        y1="560"
        x2="500"
        y2="595"
        stroke="var(--mouse-divider)"
        strokeWidth="1"
      />
    </g>
  );
};

export default Mouse;
