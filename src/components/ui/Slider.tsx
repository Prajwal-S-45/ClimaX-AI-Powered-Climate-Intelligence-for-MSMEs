import React from 'react';
import { clsx } from 'clsx';

export interface SliderProps {
  label?: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
  valueFormat?: (val: number) => string;
  minLabel?: string;
  maxLabel?: string;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  onChange,
  valueFormat = (val) => `${val}`,
  minLabel,
  maxLabel,
  className,
}) => {
  return (
    <div className={clsx('space-y-2 w-full', className)}>
      <div className="flex justify-between items-center text-xs">
        {label && <span className="font-semibold text-slate-700">{label}</span>}
        <span className="font-bold text-emerald-700 px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200">
          {valueFormat(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      />
      {(minLabel || maxLabel) && (
        <div className="flex justify-between text-[11px] text-slate-400">
          <span>{minLabel || valueFormat(min)}</span>
          <span>{maxLabel || valueFormat(max)}</span>
        </div>
      )}
    </div>
  );
};
