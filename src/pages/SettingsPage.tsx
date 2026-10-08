import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_TOKENS } from '../lib/brand';
import { runIntelligenceTestCases, TestCaseResult } from '../lib/testCases';
import { 
  Sliders, 
  Cpu, 
  Database, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  Info,
  FlaskConical,
  PlayCircle,
  XCircle
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { isDemoMode, setIsDemoMode, hasGeminiKey } = useApp();
  const [testResults, setTestResults] = useState<TestCaseResult[]>(() => runIntelligenceTestCases());
  const [isRunningTests, setIsRunningTests] = useState(false);

  const handleRunTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setTestResults(runIntelligenceTestCases());
      setIsRunningTests(false);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
          System Architecture & Settings
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Review the deterministic scoring formula, Gemini model routing strategy, and runtime modes.
        </p>
      </div>

      {/* Deterministic Scoring Engine Configuration */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center text-[#0F172A]">
            <Sliders className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Deterministic Scoring Engine Formula
            </h2>
            <p className="text-xs text-slate-500">
              The AI interprets and enriches data, but the application controls all numeric scoring.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="text-[#0F172A]">Skill Fit Weight</span>
              <span className="font-mono text-base text-[#F59E0B]">40%</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Weighted alignment against core JD requirements. Must-Have competencies carry 3x weight compared to bonus technologies.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="text-[#0F172A]">Evidence Strength</span>
              <span className="font-mono text-base text-[#F59E0B]">25%</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Audits claimed abilities against actual implementations in code repositories, commits, and demonstrated projects.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="text-[#0F172A]">Project / Experience Fit</span>
              <span className="font-mono text-base text-[#F59E0B]">15%</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Practical application tenure and complexity of projects mapped directly to target role responsibilities.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="text-[#0F172A]">Interview Readiness</span>
              <span className="font-mono text-base text-[#F59E0B]">15%</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Performance across technical simulation rounds, evaluating technical accuracy, depth, and edge cases.
            </p>
          </div>

          <div className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70 sm:col-span-2">
            <div className="flex items-center justify-between font-bold mb-1">
              <span className="text-[#0F172A]">Profile Consistency</span>
              <span className="font-mono text-base text-[#F59E0B]">5%</span>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Penalizes unverified claims where "Advanced" or "Expert" is asserted without supporting artifacts.
            </p>
          </div>
        </div>
      </div>

      {/* Gemini Model Routing */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center text-[#0F172A]">
            <Cpu className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0F172A]">
              Gemini Model Routing & Efficiency Strategy
            </h2>
            <p className="text-xs text-slate-500">
              Multi-tier routing prevents redundant latency and excessive token usage.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-slate-200/60 flex items-start gap-3">
            <span className="font-mono font-bold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-slate-200">
              gemini-3.1-flash-lite
            </span>
            <div>
              <p className="font-semibold text-slate-800">Fast Ingestion & Skill Classification</p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Used for resume text parsing, JD entity extraction, and skill normalization.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-slate-200/60 flex items-start gap-3">
            <span className="font-mono font-bold text-[#0F172A] bg-white px-2 py-0.5 rounded border border-slate-200">
              gemini-3.8-flash
            </span>
            <div>
              <p className="font-semibold text-slate-800">Structured Job Readiness & Career Reasoning</p>
              <p className="text-slate-600 text-[11px] mt-0.5">
                Used for main job analysis, interview question generation, response evaluation, and 3-pathway career synthesis.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Mode Toggle */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            Deterministic Demo Mode
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            When enabled, uses verified offline sample datasets (Swiggy SDE-2, Razorpay, Zepto) without requiring live AI calls.
          </p>
        </div>

        <button
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            isDemoMode
              ? 'bg-[#F59E0B] text-white hover:bg-amber-600'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {isDemoMode ? 'Demo Mode Active' : 'Enable Demo Mode'}
        </button>
      </div>

      {/* Intelligence Verification Test Suite */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center text-[#0F172A]">
              <FlaskConical className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-[#0F172A]">
                  Intelligence Verification Suite
                </h2>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-50 text-[#16A34A] border border-emerald-200">
                  {testResults.filter(t => t.passed).length}/{testResults.length} Passing
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Audits deterministic scoring, claim-evidence conflict detection, and edge-case resilience.
              </p>
            </div>
          </div>

          <button
            onClick={handleRunTests}
            disabled={isRunningTests}
            className="px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
          >
            <PlayCircle className="w-3.5 h-3.5 text-[#F59E0B]" />
            <span>{isRunningTests ? 'Running Suite...' : `Re-run ${testResults.length} Test Cases`}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {testResults.map((tc) => (
            <div
              key={tc.id}
              className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {tc.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-[#EF4444] shrink-0" />
                  )}
                  <span className="font-semibold text-[#0F172A]">{tc.name}</span>
                </div>
                <p className="text-slate-600 pl-6 text-[11px]">{tc.description}</p>
                <p className="text-slate-500 pl-6 text-[11px] font-mono">{tc.details}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 sm:pl-4">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-white border border-slate-200 text-[#0F172A]">
                  Score: {tc.score}/100
                </span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                  tc.passed 
                    ? 'bg-emerald-50 text-[#16A34A] border border-emerald-200' 
                    : 'bg-red-50 text-[#EF4444] border border-red-200'
                }`}>
                  {tc.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
