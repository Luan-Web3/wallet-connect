import React, { useEffect, useState } from 'react';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setTimeout(() => setIsAnimated(true), 10);
    } else {
      setIsAnimated(false);
      const timeout = setTimeout(() => setIsMounted(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  if (!isMounted) return null;

  return (
    <div
      className={`modal-overlay ${isAnimated ? 'open' : ''}`}
      onClick={onClose}
    >
      <div
        className={`modal-content ${isAnimated ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
