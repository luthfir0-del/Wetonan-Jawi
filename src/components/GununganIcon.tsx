import React from 'react';

interface GununganIconProps {
  className?: string;
  size?: number;
}

export const GununganIcon: React.FC<GununganIconProps> = ({ className = 'w-6 h-6 text-amber-400', size = 24 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 130"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Gunungan Wayang Silhouette */}
      <path
        d="M50 5 
           C65 25, 80 45, 85 70 
           C90 92, 75 110, 56 122 
           C52 124, 48 124, 44 122 
           C25 110, 10 92, 15 70 
           C20 45, 35 25, 50 5 Z"
        fill="currentColor"
        opacity="0.9"
      />
      {/* Inner sacred tree / Kalpataru filigree */}
      <path
        d="M50 18 
           C58 35, 70 52, 72 72 
           C75 88, 65 102, 50 112 
           C35 102, 25 88, 28 72 
           C30 52, 42 35, 50 18 Z"
        fill="#0b0d11"
        opacity="0.85"
      />
      {/* Central trunk & branches */}
      <path
        d="M48 60 L52 60 L52 110 L48 110 Z"
        fill="currentColor"
      />
      <circle cx="50" cy="40" r="5" fill="currentColor" />
      <circle cx="42" cy="55" r="3" fill="currentColor" />
      <circle cx="58" cy="55" r="3" fill="currentColor" />
      <circle cx="36" cy="72" r="3" fill="currentColor" />
      <circle cx="64" cy="72" r="3" fill="currentColor" />
      {/* Bottom stem */}
      <rect x="47" y="122" width="6" height="8" rx="2" fill="currentColor" />
    </svg>
  );
};

export const KeratonOrnament: React.FC<{ className?: string }> = ({ className = 'text-amber-500/40' }) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500/50"></span>
      <span className="text-xs tracking-widest text-amber-400 font-serif">✦ ꦮꦼꦠꦺꦴꦤ꧀ ✦</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500/50"></span>
    </div>
  );
};
