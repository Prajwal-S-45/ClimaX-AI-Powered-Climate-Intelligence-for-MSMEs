import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import { clsx } from 'clsx';

export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';

export interface RiskBadgeProps {
  severity: RiskSeverity;
  showIcon?: boolean;
  className?: string;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ severity, showIcon = true, className }) => {
  const configs = {
    Low: {
      bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: ShieldCheck,
      label: 'Low Risk',
    },
    Medium: {
      bg: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: AlertCircle,
      label: 'Medium Risk',
    },
    High: {
      bg: 'bg-orange-50 text-orange-800 border-orange-200',
      icon: AlertTriangle,
      label: 'High Risk',
    },
    Critical: {
      bg: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: ShieldAlert,
      label: 'Critical Risk',
    },
  };

  const current = configs[severity] || configs.Medium;
  const Icon = current.icon;

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border',
        current.bg,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
      <span>{current.label}</span>
    </span>
  );
};
