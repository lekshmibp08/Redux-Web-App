import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-4 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <button 
          className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 flex items-center justify-center hover:bg-red-700 transition duration-200" 
          onClick={onClose}
          aria-label="Close"
        >
          &times; 
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
