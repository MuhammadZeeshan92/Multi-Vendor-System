import React from 'react';

const Input = React.forwardRef(({ label, helper, ...props }, ref) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
    <input
      ref={ref}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white placeholder:text-gray-400"
      {...props}
    />
    {helper && <p className="text-xs text-gray-500">{helper}</p>}
  </div>
));

export default Input;