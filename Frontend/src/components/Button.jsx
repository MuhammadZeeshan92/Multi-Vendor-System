import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  let base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2 text-sm font-medium transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';
  let style = '';
  switch (variant) {
    case 'secondary':
      style =
        'bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200';
      break;
    case 'danger':
      style = 'bg-red-500 hover:bg-red-600 text-white';
      break;
    default:
      style =
        'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm hover:shadow';
  }
  return (
    <button className={`${base} ${style} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;