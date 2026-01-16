'use client';

import { cn } from '@/lib/utils';

interface DigitalSongketProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export function DigitalSongket({ 
  className, 
  opacity = 0.05,
  color = 'currentColor' 
}: DigitalSongketProps) {
  return (
    <div 
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
      aria-hidden="true"
    >
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="songket-pattern"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            {/* Traditional Songket-inspired geometric pattern */}
            {/* Central diamond motif */}
            <path
              d="M30 5 L55 30 L30 55 L5 30 Z"
              fill="none"
              stroke={color}
              strokeWidth="1"
            />
            {/* Inner diamond */}
            <path
              d="M30 15 L45 30 L30 45 L15 30 Z"
              fill="none"
              stroke={color}
              strokeWidth="0.5"
            />
            {/* Corner triangles - Pucuk Rebung inspired */}
            <path
              d="M0 0 L10 0 L0 10 Z"
              fill={color}
              fillOpacity="0.3"
            />
            <path
              d="M60 0 L60 10 L50 0 Z"
              fill={color}
              fillOpacity="0.3"
            />
            <path
              d="M0 60 L0 50 L10 60 Z"
              fill={color}
              fillOpacity="0.3"
            />
            <path
              d="M60 60 L50 60 L60 50 Z"
              fill={color}
              fillOpacity="0.3"
            />
            {/* Cross pattern - Bunga Tabur inspired */}
            <line
              x1="30"
              y1="0"
              x2="30"
              y2="60"
              stroke={color}
              strokeWidth="0.3"
              strokeDasharray="2 4"
            />
            <line
              x1="0"
              y1="30"
              x2="60"
              y2="30"
              stroke={color}
              strokeWidth="0.3"
              strokeDasharray="2 4"
            />
            {/* Small decorative dots */}
            <circle cx="30" cy="30" r="2" fill={color} fillOpacity="0.4" />
            <circle cx="30" cy="5" r="1" fill={color} fillOpacity="0.3" />
            <circle cx="30" cy="55" r="1" fill={color} fillOpacity="0.3" />
            <circle cx="5" cy="30" r="1" fill={color} fillOpacity="0.3" />
            <circle cx="55" cy="30" r="1" fill={color} fillOpacity="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#songket-pattern)" />
      </svg>
    </div>
  );
}

export function DigitalSongketGold({ 
  className, 
  opacity = 0.08 
}: Omit<DigitalSongketProps, 'color'>) {
  return (
    <DigitalSongket 
      className={className} 
      opacity={opacity} 
      color="#D4AF37" 
    />
  );
}
