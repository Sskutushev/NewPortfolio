import React, { useRef } from 'react';
import { useMouseTrail } from '../../hooks/useMouseTrail';
import styles from './MouseTrailCanvas.module.css';

interface MouseTrailCanvasProps {
  sectionRef: React.RefObject<HTMLElement | null>;
}

const MouseTrailCanvas: React.FC<MouseTrailCanvasProps> = ({ sectionRef }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useMouseTrail(canvasRef, sectionRef);

  return <canvas ref={canvasRef} className={styles.trailCanvas} />;
};

export default MouseTrailCanvas;
