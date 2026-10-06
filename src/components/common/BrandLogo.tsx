import React from 'react';

interface BrandLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  size = 'md',
  showText = false,
}) => {
  const sizeClasses = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-xl overflow-hidden bg-white shadow-2xs border border-neutral-200/90 flex items-center justify-center p-0.5 shrink-0 transition-transform hover:scale-105`}
      >
        <img
          src="/logo.png"
          alt="Volunteer Vihara Logo"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback to asset path if needed
            (e.currentTarget as HTMLImageElement).src =
              '/src/assets/images/volunteer_vihara_logo_1791274336682.jpg';
          }}
        />
      </div>

      {showText && (
        <div>
          <span className="text-lg font-black tracking-tight text-neutral-900 font-display block leading-tight">
            Volunteer Vihara
          </span>
          <span className="text-[10px] text-neutral-500 font-medium tracking-wide">
            Purpose · People · Safety
          </span>
        </div>
      )}
    </div>
  );
};
