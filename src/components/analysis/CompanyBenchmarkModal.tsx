import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  Check, 
  Sparkles,
  Info,
  Layers,
  MapPin,
  Briefcase
} from 'lucide-react';
import { 
  COMPANY_BENCHMARKS, 
  BENCHMARK_GROUPS, 
  BenchmarkGroup, 
  CompanyBenchmarkProfile 
} from '../../lib/companyBenchmarks';

interface CompanyBenchmarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCompany: (company: CompanyBenchmarkProfile) => void;
  selectedCompanyId?: string;
}

export const CompanyBenchmarkModal: React.FC<CompanyBenchmarkModalProps> = ({
  isOpen,
  onClose,
  onSelectCompany,
  selectedCompanyId,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<BenchmarkGroup | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCompany, setActiveCompany] = useState<CompanyBenchmarkProfile | null>(null);

  // Initialize active company
  useEffect(() => {
    if (selectedCompanyId) {
      const found = COMPANY_BENCHMARKS.find((c) => c.id === selectedCompanyId);
      if (found) {
        setActiveCompany(found);
        return;
      }
    }
    setActiveCompany(COMPANY_BENCHMARKS[0]);
  }, [selectedCompanyId, isOpen]);

  if (!isOpen) return null;

  const filtered = COMPANY_BENCHMARKS.filter((c) => {
    const matchesGroup = selectedGroup === 'All' || c.benchmarkGroup === selectedGroup;
    const matchesQuery = 
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.benchmarkGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyCompetencies.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesGroup && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[20px] border border-slate-200 shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-[#0F172A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1 font-sans">
              <Building2 className="w-4 h-4 text-[#F59E0B]" />
              <span>KaaryaLens Intelligence</span>
              <span>·</span>
              <span>Company Benchmark Selection</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-display">
              Select Company Benchmark
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Calibrate your job fit score against verified hiring rubrics, assessment styles, and technical signals.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-semibold transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-[#FAF8F5] border-b border-slate-200/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Benchmark Group Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            <button
              onClick={() => setSelectedGroup('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                selectedGroup === 'All'
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#0F172A] border border-slate-200'
              }`}
            >
              All Groups ({COMPANY_BENCHMARKS.length})
            </button>
            {BENCHMARK_GROUPS.map((grp) => (
              <button
                key={grp}
                onClick={() => setSelectedGroup(grp)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  selectedGroup === grp
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:text-[#0F172A] border border-slate-200'
                }`}
              >
                {grp}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or skill..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#F59E0B]"
            />
          </div>
        </div>

        {/* Two-Column Explorer: List + Deep Dive */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 min-h-0 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {/* Left Company List (5 cols) */}
          <div className="md:col-span-5 overflow-y-auto p-4 space-y-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No company benchmark found matching your criteria.
              </div>
            ) : (
              filtered.map((comp) => {
                const isCurrent = activeCompany?.id === comp.id;
                const isSelected = selectedCompanyId === comp.id;

                return (
                  <div
                    key={comp.id}
                    onClick={() => setActiveCompany(comp)}
                    className={`p-3.5 rounded-[12px] border transition-all cursor-pointer flex items-center justify-between ${
                      isCurrent
                        ? 'bg-amber-50/60 border-[#F59E0B] shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200/80'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0F172A] font-display">
                          {comp.name}
                        </span>
                        {comp.isVerified && (
                          <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-[#16A34A] bg-emerald-50 px-1.5 py-0.5 rounded">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Verified</span>
                          </span>
                        )}
                        {isSelected && (
                          <span className="text-[10px] font-semibold text-[#F59E0B] bg-amber-50 px-1.5 py-0.5 rounded">
                            Active
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-slate-500 font-sans mt-0.5 truncate">
                        {comp.benchmarkGroup}
                      </p>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isCurrent ? 'text-[#F59E0B] translate-x-0.5' : 'text-slate-300'}`} />
                  </div>
                );
              })
            )}
          </div>

          {/* Right Detailed Benchmark View (7 cols) */}
          <div className="md:col-span-7 overflow-y-auto p-6 space-y-6 bg-white">
            {activeCompany ? (
              <div className="space-y-6">
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {activeCompany.benchmarkGroup}
                      </span>
                      <span className="text-xs text-slate-400">·</span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {activeCompany.hqLocation}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-[#0F172A] font-display">
                      {activeCompany.name} Benchmark
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                        activeCompany.isVerified
                          ? 'bg-emerald-50 text-[#16A34A]'
                          : 'bg-amber-50 text-amber-800'
                      }`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{activeCompany.verificationStatusText}</span>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCompany(activeCompany);
                      onClose();
                    }}
                    className="px-5 py-2.5 rounded-[12px] bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-xs shrink-0"
                  >
                    <Check className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Apply This Benchmark</span>
                  </button>
                </div>

                {/* Provenance & Source */}
                <div className="p-3.5 rounded-[12px] bg-[#FAF8F5] border border-slate-200/80 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-semibold text-[#0F172A]">
                    <Info className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Provenance & Source Validation:</span>
                  </div>
                  <p className="leading-relaxed pl-5 font-sans text-[11px]">
                    {activeCompany.verificationSource}
                  </p>
                  {activeCompany.disclaimerNote && (
                    <p className="leading-relaxed pl-5 font-sans text-[11px] text-amber-800 italic pt-1">
                      {activeCompany.disclaimerNote}
                    </p>
                  )}
                </div>

                {/* Assessment Style & Technical Rubrics */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Evaluation Dimensions & Style
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-lg border border-slate-200/90 bg-white">
                      <span className="font-bold text-[#0F172A] block mb-1">Coding & Implementation</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {activeCompany.evaluationStyle.coding}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border border-slate-200/90 bg-white">
                      <span className="font-bold text-[#0F172A] block mb-1">Problem Solving</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {activeCompany.evaluationStyle.problemSolving}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border border-slate-200/90 bg-white">
                      <span className="font-bold text-[#0F172A] block mb-1">System Design & LLD/HLD</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {activeCompany.evaluationStyle.systemDesign}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border border-slate-200/90 bg-white">
                      <span className="font-bold text-[#0F172A] block mb-1">Behavioral & Culture</span>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {activeCompany.evaluationStyle.behavioralAndCulture}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Interview Stages Summary */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Documented Interview Loop
                  </h4>
                  <div className="space-y-2">
                    {activeCompany.stagesSummary.map((stg, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-sans">
                        <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] flex items-center justify-center shrink-0 font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate-700 leading-relaxed">{stg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Competencies Badges */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
                    Core Target Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCompany.keyCompetencies.map((comp) => (
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
            ) : (
              <div className="p-12 text-center text-xs text-slate-400">
                Select a company to view interview rubrics and verification status.
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Sources verified against published careers documentation.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
