import React from 'react';

const CoffeeCup: React.FC = () => {
  return (
    <g id="coffee-cup">
      {/* Чашка */}
      <ellipse cx="240" cy="590" rx="25" ry="15" fill="var(--cup-body)" />
      <rect
        x="215"
        y="570"
        width="50"
        height="30"
        rx="5"
        fill="var(--cup-body)"
      />

      {/* Кофе внутри */}
      <ellipse cx="240" cy="575" rx="20" ry="10" fill="var(--coffee-liquid)" />

      {/* Ручка */}
      <path
        d="M265,580 Q280,580 280,590 Q280,600 265,600"
        stroke="var(--cup-handle)"
        strokeWidth="3"
        fill="none"
      />

      {/* Пар (анимация) */}
      <path
        d="M240,565 Q235,555 240,545"
        stroke="var(--steam)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        className="steamAnimation"
      />
      <path
        d="M245,560 Q240,550 245,540"
        stroke="var(--steam)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        className="steamAnimation"
      />
      <path
        d="M235,560 Q230,550 235,540"
        stroke="var(--steam)"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
        className="steamAnimation"
      />
    </g>
  );
};

export default CoffeeCup;
