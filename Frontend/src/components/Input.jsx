import React from 'react';

const Input = React.forwardRef(({ label, helper, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && (
      <label className="text-sm font-semibold text-gray-700 ml-1 tracking-tight">
        {label}
      </label>
    )}
    <input
      ref={ref}
      className={`
        w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm 
        placeholder:text-gray-400 outline-none transition-all duration-200
        focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 
        hover:border-gray-300 shadow-sm
        ${className}
      `}
      {...props}
    />
    {helper && <p className="text-[11px] text-gray-500 ml-1 font-medium italic">{helper}</p>}
  </div>
));

export default Input;