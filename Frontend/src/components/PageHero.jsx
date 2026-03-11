import React from 'react';

const PageHero = ({ 
  title, 
  subtitle, 
  className = "", 
  gradient = "from-indigo-600 to-purple-700" 
}) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl mb-8 ${className}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-90`} />
      
      {/* Abstract Shapes/Patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-20%] left-[-10%] w-96 h-96 bg-indigo-400 opacity-20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-8 py-12 md:py-16 md:px-12 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl text-indigo-50/90 md:text-5xl font-bold tracking-tight mb-4 animate-fadeIn">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-indigo-50/90 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.1s' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Glassmorphism accent */}
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-white/5 backdrop-blur-3xl -skew-x-12 translate-x-1/2" />
    </div>
  );
};

export default PageHero;
