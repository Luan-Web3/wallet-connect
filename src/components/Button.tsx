import React from 'react';
import './Button.css';

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: string; // Nova prop para o ícone
  iconPosition?: 'left' | 'right'; // Posicionamento do ícone
  width?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'left',
  width,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${className}`}
      style={{ width }}
    >
      {icon && (
        <img
          src={icon}
          className={`${iconPosition == 'left' ? 'left' : 'right'}`}
        />
      )}
      <span className="btn-label">{label}</span>
    </button>
  );
};

export default Button;
