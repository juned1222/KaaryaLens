import React, { useState } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  Search,
  ExternalLink,
  SlidersHorizontal,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  COMPANY_BENCHMARKS, 
  BENCHMARK_GROUPS, 
  CompanyBenchmarkProfile 
} from '../../lib/companyBenchmarks';
import { CompanyBenchmarkModal } from './CompanyBenchmarkModal';

interface CompanyBenchmarkSelectorProps {
  selectedCompany: CompanyBenchmarkProfile | null;
  onSelectCompany: (company: CompanyBenchmarkProfile | null) => void;
  className?: string;
}

export const CompanyBenchmarkSelector: React.FC<CompanyBenchmarkSelectorProps> = ({
  selectedCompany,
  onSelectCompany,
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-[#0F172A] font-sans flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
          <span>Company Benchmark Profile</span>
        </label>
        
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-[11px] font-medium text-slate-600 hover:text-[#0F172A] underline underline-offset-2 flex items-center gap-1 cursor-pointer"
        >
          <span>Browse 5 Benchmark Groups</span>
        </button>
      </div>

      {selectedCompany ? (
        <div className="p-3.5 rounded-[12px] bg-[#FAF8F5] border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#0F172A] font-display">
                {selectedCompany.name}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200/80 text-slate-700">
                {selectedCompany.benchmarkGroup}
              </span>
              {selectedCompany.isVerified && (
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#16A34A] bg-emerald-50 px-1.5 py-0.5 rounded">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              )}
            </div>

            <p className="text-xs text-slate-500 font-sans mt-0.5 truncate">
              {selectedCompany.verificationStatusText} · {selectedCompany.stagesSummary.length} interview stages mapped
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Change
            </button>
            <button
              type="button"
              onClick={() => onSelectCompany(null)}
              className="text-xs text-slate-400 hover:text-rose-600 transition-colors cursor-pointer px-1.5"
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => setIsModalOpen(true)}
          className="p-3.5 rounded-[12px] bg-white border border-dashed border-slate-200 hover:border-slate-300 flex items-center justify-between cursor-pointer transition-colors group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] flex items-center justify-center text-slate-500 group-hover:text-[#0F172A]">
              <Search className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-medium text-[#0F172A]">
                Select target company benchmark (Optional)
              </p>
              <p className="text-[11px] text-slate-400">
                Calibrates interview loops for Microsoft, Amazon, Razorpay, TCS, etc.
              </p>
            </div>
          </div>

          <span className="text-xs text-[#0F172A] font-semibold group-hover:underline">
            Choose →
          </span>
        </div>
      )}

      {/* Benchmark Modal */}
      <CompanyBenchmarkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectCompany={onSelectCompany}
        selectedCompanyId={selectedCompany?.id}
      />
    </div>
  );
};
