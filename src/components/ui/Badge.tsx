import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'emerald' | 'teal' | 'navy' | 'slate' | 'amber' | 'rose' | 'purple' | 'gold';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  size = 'md',
  icon,
  className,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center gap-1 font-semibold rounded-full border transition-colors';

  const variants = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    navy: 'bg-slate-900 text-white border-slate-800',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    gold: 'bg-amber-100/60 text-amber-900 border-amber-300',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span className={twMerge(clsx(baseStyles, variants[variant], sizes[size], className))} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
