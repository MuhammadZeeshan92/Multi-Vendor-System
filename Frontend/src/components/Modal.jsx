import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 max-w-lg w-full p-6 relative animate-slideUp">
        <button
          className="absolute top-3 right-3 h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <span className="text-xl leading-none">&times;</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;