import React from 'react';

interface AppIconProps {
  className?: string;
  size?: number;
}

export const AppIcon: React.FC<AppIconProps> = ({ className = '', size = 32 }) => {
  return (
    <img
      src="/brand/app-icon.png"
      alt="KaaryaLens Icon"
      width={size}
      height={size}
      className={`shrink-0 select-none object-contain rounded-[8px] ${className}`}
      style={{ width: size, height: size }}
      loading="eager"
    />
  );
};

interface LogoProps {
  className?: string;
  height?: number;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  height = 36,
}) => {
  return (
    <img
      src="/brand/logo.png"
      alt="KaaryaLens — See beyond the resume."
      style={{ height: `${height}px`, width: 'auto' }}
      className={`select-none object-contain ${className}`}
      loading="eager"
    />
  );
};

interface BrandMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const BrandMark: React.FC<BrandMarkProps> = ({ 
  className = '', 
  size = 'md',
}) => {
  const heights = {
    sm: 28,
    md: 34,
    lg: 44,
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/brand/logo.png"
        alt="KaaryaLens"
        style={{ height: `${heights[size]}px`, width: 'auto' }}
        className="object-contain"
        loading="eager"
      />
    </div>
  );
};
