import React from 'react';

const Desk: React.FC = () => {
  return (
    <g id="desk">
      {/* Столешница */}
      <rect
        x="50"
        y="400"
        width="550"
        height="250"
        rx="10"
        fill="var(--desk-surface)"
        filter="url(#dropShadow)"
      />

      {/* Ножки стола */}
      <rect x="80" y="640" width="20" height="10" fill="var(--desk-legs)" />
      <rect x="550" y="640" width="20" height="10" fill="var(--desk-legs)" />
    </g>
  );
};

export default Desk;
