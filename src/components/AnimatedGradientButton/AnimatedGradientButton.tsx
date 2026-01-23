import React from 'react';
import './AnimatedGradientButton.module.css';

interface AnimatedGradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const AnimatedGradientButton: React.FC<AnimatedGradientButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      className={`animated-gradient-button ${className}`}
      onClick={onClick}
    >
      <span className="animated-gradient-span">{children}</span>
    </button>
  );
};

export default AnimatedGradientButton;
