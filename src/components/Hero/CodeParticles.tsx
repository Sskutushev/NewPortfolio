import React from 'react';
import { motion } from 'framer-motion';

interface CodeParticle {
  id: number;
  x: number;
  y: number;
  code: string;
  rotation: number;
  velocity: { x: number; y: number };
}

interface CodeParticlesProps {
  particles: CodeParticle[];
  onRemoveParticle: (id: number) => void;
}

const CodeParticles: React.FC<CodeParticlesProps> = ({
  particles,
  onRemoveParticle,
}) => {
  return (
    <>
      {particles.map((particle) => (
        <motion.text
          key={particle.id}
          x={particle.x}
          y={particle.y}
          className="codeParticle"
          initial={{ opacity: 1, x: 0, y: 0, rotate: particle.rotation }}
          animate={{
            x: particle.velocity.x * 50,
            y: particle.velocity.y * 50,
            rotate: particle.rotation + 180,
            opacity: 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          onAnimationComplete={() => {
            onRemoveParticle(particle.id);
          }}
          style={{
            fontFamily: '"Fira Code", monospace',
            fontSize: '12px',
            fill: 'var(--code-particle)',
            pointerEvents: 'none',
          }}
        >
          {particle.code}
        </motion.text>
      ))}
    </>
  );
};

export default CodeParticles;
