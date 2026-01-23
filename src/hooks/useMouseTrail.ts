import { useState, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

const gradientColors = ['#3b82f6', '#16a394'];

export const useMouseTrail = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  sectionRef: React.RefObject<HTMLElement | null>
) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setParticles((prev) => [
        ...prev,
        {
          x,
          y,
          opacity: 1,
          size: Math.random() * 5 + 2,
          color:
            gradientColors[Math.floor(Math.random() * gradientColors.length)],
        },
      ]);
    };

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles((prev) => {
        const updated = prev
          .map((p) => ({
            ...p,
            opacity: p.opacity - 0.02,
            size: p.size * 0.98,
          }))
          .filter((p) => p.opacity > 0);

        updated.forEach((p) => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`;
          ctx.fill();
        });

        return updated;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        canvas.width = canvasRef.current.parentElement.clientWidth;
        canvas.height = canvasRef.current.parentElement.clientHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    section.addEventListener('mousemove', handleMouseMove); // Changed from canvas to section
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      section.removeEventListener('mousemove', handleMouseMove); // Changed from canvas to section
      cancelAnimationFrame(animationFrameId);
    };
  }, [canvasRef, sectionRef]); // Added sectionRef to dependency array

  return particles;
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '0, 0, 0';
}
