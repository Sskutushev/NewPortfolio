import { useState, useEffect } from 'react';

const useTypewriter = (text: string, speed: number = 50) => {
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    let animationFrameId: number;
    let timeoutId: number; // Используем number вместо NodeJS.Timeout

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        setCurrentText(text.substring(0, currentIndex + 1));
        currentIndex++;

        // Используем setTimeout для контроля скорости
        timeoutId = window.setTimeout(() => {
          animationFrameId = requestAnimationFrame(typeCharacter);
        }, speed);
      }
    };

    // Начинаем анимацию
    animationFrameId = requestAnimationFrame(typeCharacter);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [text, speed]);

  return currentText;
};

export default useTypewriter;
