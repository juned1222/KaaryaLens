import React from 'react';
import { AppIcon } from '../brand/BrandComponents';

interface LoadingAnalysisProps {
  step: number;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({ step }) => {
  const steps = [
    'Reading requirements',
    'Comparing skills',
    'Checking evidence',
    'Preparing interview gaps',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0F172A]/30 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[16px] border border-slate-200/90 shadow-md max-w-sm w-full p-6 sm:p-7 space-y-5">
        <div className="flex items-center gap-3">
          <AppIcon size={32} />
          <div>
            <h3 className="text-sm font-bold text-[#0F172A] font-display">
              Analyzing your role...
            </h3>
            <p className="text-xs text-slate-400">
              Corroborating credentials and requirements
            </p>
          </div>
        </div>

        {/* Skeleton Bar */}
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div 
            className="bg-[#0F172A] h-full transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(100, Math.max(20, (step / 5) * 100))}%` }}
          />
        </div>

        {/* Steps sequence */}
        <div className="space-y-2 pt-1 text-xs font-sans">
          {steps.map((label, idx) => {
            const isCompleted = step > idx + 1;
            const isCurrent = step === idx + 1;

            return (
              <div 
                key={label}
                className={`flex items-center gap-2.5 transition-opacity duration-200 ${
                  isCurrent ? 'text-[#0F172A] font-semibold' : isCompleted ? 'text-slate-500' : 'text-slate-300'
                }`}
              >
                <div className={`w-1.5 h-1.5 rounded-full ${
                  isCurrent ? 'bg-[#F59E0B] ring-2 ring-[#F59E0B]/30' : isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                }`} />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
