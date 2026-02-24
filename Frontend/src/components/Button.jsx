import React from 'react';

const Button = ({ children, variant = 'primary', ...props }) => {
  let base = 'rounded-lg px-5 py-2 font-medium transition duration-200';
  let style = '';
  switch (variant) {
    case 'secondary':
      style = 'bg-gray-100 hover:bg-gray-200 text-gray-800';
      break;
    case 'danger':
      style = 'bg-red-500 hover:bg-red-600 text-white';
      break;
    default:
      style = 'bg-indigo-600 text-white hover:bg-indigo-700';
  }
  return (
    <button className={`${base} ${style}`} {...props}>
      {children}
    </button>
  );
};

export default Button;