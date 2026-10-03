import React from 'react';
import { clsx } from 'clsx';

export interface LoadingStateProps {
  label?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  label = 'Loading data...',
  className,
}) => {
  return (
    <div
      className={clsx(
        'bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-4 shadow-xs',
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
      </div>
      <p className="text-xs font-semibold text-slate-600 tracking-wide">{label}</p>
    </div>
  );
};
