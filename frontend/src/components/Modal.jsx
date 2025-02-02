import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-4xl">
        <button 
          onClick={onClose}
          className="float-right text-gray-600 text-xl"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;