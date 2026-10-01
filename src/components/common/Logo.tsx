import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', variant = 'dark', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const isLight = variant === 'light';

  return (
    <div className={`inline-flex items-center gap-2.5 font-sans select-none tracking-tight ${className}`}>
      {/* Subtle modern healthcare capsule + magnet emblem */}
      <div 
        className={`relative flex items-center justify-center rounded-xl transition-transform ${iconSizes[size]} ${
          isLight 
            ? 'bg-emerald-500 text-white shadow-md shadow-emerald-900/20' 
            : 'bg-emerald-700 text-white shadow-sm shadow-emerald-800/30'
        }`}
      >
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="w-4/6 h-4/6"
        >
          {/* Medical cross inside modern pill/magnet contour */}
          <path d="M12 4v16m-8-8h16" strokeWidth="2.8" stroke="currentColor" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.8" stroke="currentColor" strokeOpacity="0.4" />
        </svg>
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-300 ring-2 ring-white"></div>
      </div>

      <div className="flex flex-col">
        <span 
          className={`font-display font-extrabold tracking-wider leading-none ${sizeClasses[size]} ${
            isLight ? 'text-white' : 'text-slate-900'
          }`}
        >
          MAGNET
        </span>
        <span 
          className={`text-[9px] font-semibold tracking-widest uppercase mt-0.5 ${
            isLight ? 'text-emerald-300' : 'text-emerald-700'
          }`}
        >
          Pharmacy & Healthcare
        </span>
      </div>
    </div>
  );
};
