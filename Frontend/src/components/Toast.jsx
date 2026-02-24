import React from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const colors = {
    info: 'bg-blue-100 text-blue-700',
    success: 'bg-green-100 text-green-700',
    error: 'bg-red-100 text-red-700',
    warning: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-md ${colors[type]}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 font-bold">
          &times;
        </button>
      </div>
    </div>
  );
};

export default Toast;