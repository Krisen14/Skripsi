'use client';

import React from 'react';
import './Modal.css';

type Modal2Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal2 = ({ isOpen, onClose, children }: Modal2Props) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal2;
