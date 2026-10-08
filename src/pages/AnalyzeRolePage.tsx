import React from 'react';
import { useApp } from '../context/AppContext';
import { SimpleAnalysisWorkspace } from '../components/analysis/SimpleAnalysisWorkspace';
import { LoadingAnalysis } from '../components/ui/LoadingAnalysis';

export const AnalyzeRolePage: React.FC = () => {
  const { isAnalyzing, analysisProgressStep, navigate } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-8">
      {isAnalyzing && <LoadingAnalysis step={analysisProgressStep} />}

      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
          Analyze Role Fit
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload your resume and paste the job description to run an evidence-driven readiness audit.
        </p>
      </div>

      <SimpleAnalysisWorkspace 
        onSuccess={() => {
          // Navigates automatically via runAnalysis
        }}
      />
    </div>
  );
};
