import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Code2, 
  Cpu, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react';
import { CompanyBenchmarkProfile } from '../../lib/companyBenchmarks';

interface CompanyBenchmarkCardProps {
  benchmark?: CompanyBenchmarkProfile | null;
  employer: string;
  className?: string;
}

export const CompanyBenchmarkCard: React.FC<CompanyBenchmarkCardProps> = ({
  benchmark,
  employer,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!benchmark) {
    return (
      <section className={`bg-white rounded-[16px] border border-slate-200/80 p-6 space-y-3 ${className}`}>
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
              Company Interview Benchmark
            </span>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
            General Benchmark
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          No official company-specific benchmark selected for <strong className="text-[#0F172A]">{employer}</strong>. The evaluation is calibrated against generalized software engineering industry standards.
        </p>
      </section>
    );
  }

  return (
    <section className={`bg-white rounded-[16px] border border-slate-200/80 p-6 sm:p-8 space-y-5 ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-sans mb-1">
            <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span className="font-bold uppercase tracking-wider">Company Interview Benchmark</span>
            <span>·</span>
            <span className="font-medium text-slate-600">{benchmark.benchmarkGroup}</span>
          </div>
          <h2 className="text-xl font-bold text-[#0F172A] font-display">
            {benchmark.name} Hiring Bar & Assessment Rubric
          </h2>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
            benchmark.isVerified
              ? 'bg-emerald-50 text-[#16A34A]'
              : 'bg-amber-50 text-amber-800'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{benchmark.verificationStatusText}</span>
          </span>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-slate-600 hover:text-[#0F172A] px-2.5 py-1 rounded-md bg-slate-50 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{isExpanded ? 'Collapse' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Verified Source Disclaimer */}
      <div className="p-3.5 rounded-[12px] bg-[#FAF8F5] border border-slate-200/80 text-xs text-slate-600 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
          <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Source & Verification Provenance:</span>
        </div>
        <p className="leading-relaxed pl-5 font-sans text-[11px]">
          {benchmark.verificationSource}
        </p>
        {benchmark.disclaimerNote && (
          <p className="leading-relaxed pl-5 font-sans text-[11px] text-amber-800 italic pt-0.5">
            {benchmark.disclaimerNote}
          </p>
        )}
      </div>

      {/* Top Dimensions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-[12px] bg-[#FAF8F5]/60 border border-slate-200/70">
          <span className="font-bold text-[#0F172A] block mb-1">Coding & Rigor</span>
          <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
            {benchmark.evaluationStyle.coding}
          </p>
        </div>

        <div className="p-3.5 rounded-[12px] bg-[#FAF8F5]/60 border border-slate-200/70">
          <span className="font-bold text-[#0F172A] block mb-1">System Design</span>
          <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
            {benchmark.evaluationStyle.systemDesign}
          </p>
        </div>

        <div className="p-3.5 rounded-[12px] bg-[#FAF8F5]/60 border border-slate-200/70">
          <span className="font-bold text-[#0F172A] block mb-1">Problem Solving</span>
          <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
            {benchmark.evaluationStyle.problemSolving}
          </p>
        </div>

        <div className="p-3.5 rounded-[12px] bg-[#FAF8F5]/60 border border-slate-200/70">
          <span className="font-bold text-[#0F172A] block mb-1">Culture & Values</span>
          <p className="text-slate-600 text-[11px] leading-relaxed line-clamp-3">
            {benchmark.evaluationStyle.behavioralAndCulture}
          </p>
        </div>
      </div>

      {/* Expanded Detailed Stages */}
      {isExpanded && (
        <div className="space-y-4 pt-2 border-t border-slate-100 animate-in fade-in duration-150">
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">
              Published Interview Stages ({benchmark.name})
            </h3>
            <div className="space-y-2">
              {benchmark.stagesSummary.map((stg, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs font-sans p-2 rounded-lg bg-[#FAF8F5]/40 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white font-mono text-[10px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 leading-relaxed font-medium">{stg}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-sans">
              Benchmark Core Competencies
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {benchmark.keyCompetencies.map((comp) => (
                <span
                  key={comp}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#FAF8F5] text-slate-800 border border-slate-200/70"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
