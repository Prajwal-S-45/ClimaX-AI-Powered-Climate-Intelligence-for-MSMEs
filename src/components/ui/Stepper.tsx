import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';

export interface StepItem {
  id: number | string;
  title: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed or 1-indexed depending on step matching
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  className,
}) => {
  return (
    <div className={clsx('w-full py-2', className)}>
      <div className="flex items-center justify-between relative">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isCurrent = idx === currentStep;

          return (
            <React.Fragment key={step.id}>
              {/* Connector line */}
              {idx > 0 && (
                <div
                  className={clsx(
                    'flex-1 h-0.5 transition-colors mx-2',
                    idx <= currentStep ? 'bg-emerald-600' : 'bg-slate-200'
                  )}
                />
              )}

              {/* Step indicator node */}
              <div
                onClick={() => onStepClick && onStepClick(idx)}
                className={clsx(
                  'flex items-center gap-2 group',
                  onStepClick && 'cursor-pointer'
                )}
              >
                <div
                  className={clsx(
                    'w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all border',
                    isCompleted && 'bg-emerald-600 border-emerald-600 text-white',
                    isCurrent && 'bg-emerald-50 border-emerald-600 text-emerald-700 ring-4 ring-emerald-50',
                    !isCompleted && !isCurrent && 'bg-white border-slate-300 text-slate-400'
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                </div>
                <div className="hidden md:block">
                  <p
                    className={clsx(
                      'text-xs font-semibold leading-none',
                      isCurrent ? 'text-slate-900' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                    )}
                  >
                    {step.title}
                  </p>
                  {step.description && (
                    <p className="text-[11px] text-slate-400 mt-0.5">{step.description}</p>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
