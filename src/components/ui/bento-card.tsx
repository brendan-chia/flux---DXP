'use client';

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface BentoCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  className?: string;
  glassEffect?: boolean;
  hoverScale?: boolean;
  delay?: number;
}

export function BentoCard({
  children,
  className,
  glassEffect = true,
  hoverScale = true,
  delay = 0,
  ...props
}: BentoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={hoverScale ? { scale: 1.02 } : undefined}
      className={cn(
        'relative rounded-2xl overflow-hidden cursor-pointer',
        'transition-all duration-300',
        glassEffect && [
          'bg-slate-800/50 backdrop-blur-xl',
          'border border-slate-700/50',
          'shadow-lg shadow-black/20',
        ],
        'hover:border-indigo-500/30 hover:shadow-indigo-500/10',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-12 gap-4 md:gap-6',
        className
      )}
    >
      {children}
    </div>
  );
}
