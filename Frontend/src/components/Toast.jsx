import React from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  if (!message) return null;

  const colors = {
    info: 'bg-indigo-50 text-indigo-800 border-indigo-100',
    success: 'bg-emerald-50 text-emerald-800 border-emerald-100',
    error: 'bg-red-50 text-red-800 border-red-100',
    warning: 'bg-amber-50 text-amber-800 border-amber-100',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-2xl shadow-lg border ${colors[type]} max-w-sm w-[calc(100vw-2rem)] md:w-auto`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium pr-4">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 h-8 w-8 rounded-full border border-black/5 bg-white/50 hover:bg-white transition font-bold flex items-center justify-center"
          aria-label="Close toast"
        >
          <span className="leading-none">&times;</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;