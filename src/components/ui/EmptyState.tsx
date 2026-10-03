import React from 'react';
import { FolderOpen } from 'lucide-react';
import { clsx } from 'clsx';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <div
      className={clsx(
        'bg-slate-50/70 border-2 border-dashed border-slate-200 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-3',
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-400">
        {icon || <FolderOpen className="w-6 h-6" />}
      </div>
      <div className="max-w-md space-y-1">
        <h4 className="text-base font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
};
