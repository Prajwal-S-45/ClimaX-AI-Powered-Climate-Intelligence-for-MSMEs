import React from 'react';
import { clsx } from 'clsx';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'emerald' | 'teal' | 'amber' | 'rose' | 'navy';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'emerald',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

  const colors = {
    emerald: 'bg-emerald-500',
    teal: 'bg-teal-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    navy: 'bg-slate-900',
  };

  const sizes = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={clsx('space-y-1.5 w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
          {label && <span>{label}</span>}
          {showValue && <span className="text-slate-500">{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={clsx('w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60', sizes[size])}>
        <div
          className={clsx('h-full transition-all duration-500 rounded-full', colors[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
