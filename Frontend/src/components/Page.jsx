import React from 'react';

// simple wrapper that applies a default page animation
const Page = ({ children, className = '' }) => {
  return (
    <div className={`animate-fadeIn ${className}`}>{children}</div>
  );
};

export default Page;
