import React from 'react';
import { CheckCircle2, Clock, AlertCircle, FileCheck2, PlayCircle } from 'lucide-react';
import { clsx } from 'clsx';

export type StatusType = 'Pending' | 'In Progress' | 'Verified' | 'Approved' | 'Action Required' | 'Completed';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const configs = {
    Pending: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: Clock,
    },
    'In Progress': {
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: PlayCircle,
    },
    Verified: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CheckCircle2,
    },
    Approved: {
      bg: 'bg-teal-50 text-teal-700 border-teal-200',
      icon: FileCheck2,
    },
    'Action Required': {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle,
    },
    Completed: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: CheckCircle2,
    },
  };

  const current = configs[status] || configs.Pending;
  const Icon = current.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border',
        current.bg,
        className
      )}
    >
      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
      <span>{status}</span>
    </span>
  );
};
