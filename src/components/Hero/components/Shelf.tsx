import React from 'react';

const Shelf: React.FC = () => {
  return (
    <g id="shelf">
      {/* Полка */}
      <rect x="125" y="80" width="400" height="20" fill="var(--shelf-color)" />

      {/* Книги */}
      {/* React книга */}
      <g transform="translate(150, 80)">
        <rect
          x="0"
          y="0"
          width="40"
          height="180"
          fill="var(--book-react)"
          transform="rotate(-15, 0, 0)"
        />
        <text
          x="20"
          y="90"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          transform="rotate(-90, 20, 90)"
        >
          React
        </text>
      </g>

      {/* TypeScript книга */}
      <g transform="translate(195, 80)">
        <rect
          x="0"
          y="0"
          width="45"
          height="190"
          fill="var(--book-typescript)"
        />
        <text
          x="22.5"
          y="95"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          transform="rotate(-90, 22.5, 95)"
        >
          TS
        </text>
      </g>

      {/* Next.js книга */}
      <g transform="translate(247, 80)">
        <rect x="0" y="0" width="42" height="185" fill="var(--book-nextjs)" />
        <text
          x="21"
          y="92.5"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          transform="rotate(-90, 21, 92.5)"
        >
          Next
        </text>
      </g>

      {/* Node.js книга */}
      <g transform="translate(294, 80)">
        <rect x="0" y="0" width="38" height="175" fill="var(--book-nodejs)" />
        <text
          x="19"
          y="87.5"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          transform="rotate(-90, 19, 87.5)"
        >
          Node
        </text>
      </g>

      {/* CSS книга */}
      <g transform="translate(337, 80)">
        <rect x="0" y="0" width="35" height="170" fill="var(--book-css)" />
        <text
          x="17.5"
          y="85"
          fill="white"
          fontSize="12"
          fontWeight="bold"
          textAnchor="middle"
          transform="rotate(-90, 17.5, 85)"
        >
          CSS
        </text>
      </g>
    </g>
  );
};

export default Shelf;
