import React from 'react';

const Monitor: React.FC = () => {
  return (
    <g id="monitor">
      {/* Рамка монитора */}
      <rect
        x="80"
        y="420"
        width="160"
        height="120"
        rx="5"
        fill="var(--monitor-frame)"
      />

      {/* Экран монитора */}
      <rect
        x="90"
        y="430"
        width="140"
        height="100"
        fill="var(--monitor-screen)"
      />

      {/* Контент браузера */}
      <rect x="95" y="435" width="130" height="10" fill="var(--browser-bar)" />
      <text
        x="160"
        y="485"
        textAnchor="middle"
        fill="var(--code-text)"
        fontSize="16"
        fontWeight="bold"
      >
        Hello World
      </text>

      {/* Подставка монитора */}
      <rect x="140" y="540" width="40" height="5" fill="var(--monitor-stand)" />
    </g>
  );
};

export default Monitor;
