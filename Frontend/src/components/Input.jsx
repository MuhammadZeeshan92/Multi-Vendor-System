import React from 'react';

const Input = React.forwardRef(({ label, ...props }, ref) => (
  <div className="flex flex-col">
    {label && <label className="mb-1 text-gray-700">{label}</label>}
    <input
      ref={ref}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      {...props}
    />
  </div>
));

export default Input;