import React from 'react';

const Laptop: React.FC = () => {
  return (
    <g id="laptop">
      {/* Основа (нижняя часть) */}
      <rect
        x="280"
        y="520"
        width="180"
        height="130"
        rx="5"
        fill="var(--laptop-body)"
      />

      {/* Экран */}
      <rect
        x="285"
        y="430"
        width="170"
        height="95"
        rx="3"
        fill="var(--laptop-screen)"
        stroke="var(--laptop-border)"
        strokeWidth="2"
      />

      {/* Терминал внутри экрана */}
      <rect x="290" y="435" width="160" height="85" fill="#1a1a1a" />

      {/* Строки кода */}
      <text x="295" y="455" fill="#00ff00" fontFamily="monospace" fontSize="8">
        $ npm run dev
      </text>
      <text x="295" y="470" fill="#00ff00" fontFamily="monospace" fontSize="8">
        &gt; vite
      </text>
      <text x="295" y="485" fill="#00ff00" fontFamily="monospace" fontSize="8">
        Server running on localhost:5173
      </text>

      {/* Клавиатура */}
      <rect x="285" y="640" width="170" height="3" fill="var(--laptop-keys)" />
      <rect x="285" y="645" width="170" height="3" fill="var(--laptop-keys)" />
      <rect x="285" y="650" width="170" height="3" fill="var(--laptop-keys)" />
      <rect x="285" y="655" width="170" height="3" fill="var(--laptop-keys)" />
      <rect x="285" y="660" width="170" height="3" fill="var(--laptop-keys)" />
    </g>
  );
};

export default Laptop;
