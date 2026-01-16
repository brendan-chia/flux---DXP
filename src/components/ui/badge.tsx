'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'gold' | 'success' | 'urgent' | 'warning';
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', pulse = false, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
          'transition-colors duration-200',
          {
            'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30': variant === 'default',
            'bg-slate-700/50 text-slate-300 border border-slate-600/50': variant === 'secondary',
            'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30': variant === 'gold',
            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30': variant === 'success',
            'bg-red-500/20 text-red-300 border border-red-500/30': variant === 'urgent',
            'bg-orange-500/20 text-orange-300 border border-orange-500/30': variant === 'warning',
          },
          className
        )}
        {...props}
      >
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
          </span>
        )}
        {props.children}
      </span>
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };
