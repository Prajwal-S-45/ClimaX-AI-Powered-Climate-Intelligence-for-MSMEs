import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

export interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  accentColor?: 'emerald' | 'teal' | 'navy' | 'amber' | 'rose';
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  accentColor = 'emerald',
  className,
}) => {
  const iconAccents = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    teal: 'bg-teal-50 text-teal-600 border-teal-200',
    navy: 'bg-slate-100 text-slate-800 border-slate-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    rose: 'bg-rose-50 text-rose-600 border-rose-200',
  };

  return (
    <div className={clsx('bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {icon && (
          <div className={clsx('w-9 h-9 rounded-xl border flex items-center justify-center', iconAccents[accentColor])}>
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</div>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      {trend && (
        <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold">
          {trend.direction === 'up' && (
            <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              {trend.value}
            </span>
          )}
          {trend.direction === 'down' && (
            <span className="flex items-center text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
              <TrendingDown className="w-3.5 h-3.5 mr-1" />
              {trend.value}
            </span>
          )}
          {trend.direction === 'neutral' && (
            <span className="flex items-center text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              <Minus className="w-3.5 h-3.5 mr-1" />
              {trend.value}
            </span>
          )}
          {trend.label && <span className="text-slate-400 font-normal">{trend.label}</span>}
        </div>
      )}
    </div>
  );
};
