import React from 'react';

interface MountainLandscapeSvgProps {
  className?: string;
}

export const MountainLandscapeSvg: React.FC<MountainLandscapeSvgProps> = ({
  className = '',
}) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Ambient Horizon Soft Radial Sun Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-b from-amber-100/40 via-amber-50/20 to-transparent rounded-full blur-3xl pointer-events-none -translate-y-1/3" />

      {/* Layer 1: Distant Mountain Peaks Silhouette (Slow Parallax Drift) */}
      <div className="absolute inset-x-[-6%] bottom-0 h-[80%] pointer-events-none animate-parallax-slow opacity-70">
        <svg
          viewBox="0 0 1600 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="distantRidgeGradLinear" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.18" />
              <stop offset="45%" stopColor="#cbd5e1" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#fafaf9" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path
            d="M 0 320 
               L 0 190 
               L 110 160 
               L 220 200 
               L 360 120 
               L 500 195 
               L 650 90 
               L 780 180 
               L 920 70 
               L 1060 165 
               L 1190 100 
               L 1320 180 
               L 1460 115 
               L 1600 170 
               L 1600 420 
               L 0 420 Z"
            fill="url(#distantRidgeGradLinear)"
          />
        </svg>
      </div>

      {/* Layer 2: Mid-Ground Rolling Adventure Ridges (Medium Parallax Drift) */}
      <div className="absolute inset-x-[-6%] bottom-0 h-[68%] pointer-events-none animate-parallax-medium opacity-80">
        <svg
          viewBox="0 0 1600 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="midRidgeGradLinear" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" stopOpacity="0.15" />
              <stop offset="40%" stopColor="#78716c" stopOpacity="0.11" />
              <stop offset="100%" stopColor="#fafaf9" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path
            d="M 0 300 
               C 120 280, 220 200, 360 200 
               C 500 200, 580 260, 720 230 
               C 860 200, 940 130, 1080 150 
               C 1220 170, 1340 250, 1480 210 
               C 1540 195, 1570 215, 1600 205 
               L 1600 360 
               L 0 360 Z"
            fill="url(#midRidgeGradLinear)"
          />
          {/* Delicate Spine Line */}
          <path
            d="M 0 300 C 120 280, 220 200, 360 200 C 500 200, 580 260, 720 230 C 860 200, 940 130, 1080 150 C 1220 170, 1340 250, 1480 210"
            stroke="#b45309"
            strokeWidth="1"
            strokeOpacity="0.12"
            fill="none"
          />
        </svg>
      </div>

      {/* Layer 3: Foreground Foothill Silhouettes (Gentle Parallax Drift) */}
      <div className="absolute inset-x-[-6%] bottom-0 h-[50%] pointer-events-none animate-parallax-fore opacity-90">
        <svg
          viewBox="0 0 1600 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover object-bottom"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="foreRidgeGradLinear" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" stopOpacity="0.10" />
              <stop offset="50%" stopColor="#57534e" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#fafaf9" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            d="M 0 250 
               C 150 235, 270 170, 440 185 
               C 610 200, 740 145, 920 160 
               C 1100 175, 1220 140, 1390 170 
               C 1490 190, 1550 175, 1600 185 
               L 1600 280 
               L 0 280 Z"
            fill="url(#foreRidgeGradLinear)"
          />
        </svg>
      </div>

      {/* Soft Bottom Linear Gradient Overlay (Fades seamlessly into stone canvas) */}
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-stone-50 via-stone-50/80 to-transparent pointer-events-none" />
    </div>
  );
};
