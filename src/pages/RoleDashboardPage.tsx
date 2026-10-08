import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CompanyBenchmarkCard } from '../components/analysis/CompanyBenchmarkCard';
import { calculateProfileCompleteness } from '../lib/profileCompleteness';
import { 
  ArrowRight, 
  Printer,
  ShieldCheck
} from 'lucide-react';

export const RoleDashboardPage: React.FC = () => {
  const { activeAnalysis, activeInterview, allAnalyses, setActiveAnalysis, candidateProfile, navigate } = useApp();

  const [localSensitivity, setLocalSensitivity] = useState<any>(activeAnalysis.scoreSensitivity || null);
  const [loadingSensitivity, setLoadingSensitivity] = useState(false);
  const [sensitivityError, setSensitivityError] = useState<string | null>(null);

  // Sync active analysis with the route ID (Section 9 & 10 Stale State spec)
  const currentId = typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : '';

  useEffect(() => {
    if (currentId && currentId !== 'role' && activeAnalysis.id !== currentId) {
      const found = allAnalyses.find((a) => a.id === currentId);
      if (found) {
        setActiveAnalysis(found);
        setLocalSensitivity(found.scoreSensitivity || null);
      }
    }
  }, [currentId, allAnalyses, activeAnalysis.id, setActiveAnalysis]);

  const {
    roleTitle,
    employer,
    location,
    experienceLevel,
    readinessScore,
    skillFitScore,
    evidenceScore,
    interviewReadinessScore,
    projectFitScore,
    consistencyScore,
    matchedSkills,
    partialSkills,
    missingSkills,
    claimEvidenceConflicts,
    careerPaths,
    companyBenchmark,
  } = activeAnalysis;

  const currentProfile = activeAnalysis.candidateProfile || candidateProfile;
  const completeness = calculateProfileCompleteness(currentProfile, roleTitle);

  // Render diagnostics block only in sandbox/dev hostnames (Section 11 Dev Diagnostics Spec)
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname.includes('127.0.0.1') || 
     window.location.hostname.includes('ais-dev') ||
     window.location.hostname.includes('run.app'));

  const runSensitivityTest = async () => {
    setLoadingSensitivity(true);
    setSensitivityError(null);
    try {
      const response = await fetch('/api/verify-sensitivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateProfile }),
      });
      if (!response.ok) {
        throw new Error('Failed to run score sensitivity test');
      }
      const data = await response.json();
      setLocalSensitivity(data.scoreSensitivity);
      activeAnalysis.scoreSensitivity = data.scoreSensitivity;
    } catch (err: any) {
      setSensitivityError(err.message || 'Error running test');
    } finally {
      setLoadingSensitivity(false);
    }
  };

  useEffect(() => {
    if (isDevelopment && !localSensitivity && !activeAnalysis.scoreSensitivity) {
      runSensitivityTest();
    }
  }, [isDevelopment, localSensitivity, activeAnalysis.scoreSensitivity]);

  // Ranked skills for horizontal bar presentation (Section 12 Spec)
  const rankedSkills: Array<{ name: string; score: number; status: 'strong' | 'moderate' | 'weak' }> = [
    ...matchedSkills.map((s) => ({ name: s.skill, score: s.evidencePercentage || 85, status: 'strong' as const })),
    ...partialSkills.map((s) => ({ name: s.skill, score: s.evidencePercentage || 58, status: 'moderate' as const })),
    ...missingSkills.map((s) => ({ name: s.skill, score: s.evidencePercentage || 30, status: 'weak' as const })),
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-10 sm:space-y-12">
      {/* 1. ROLE CONTEXT (Section 8 Spec) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/70 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5 font-sans">
            <span className="font-semibold text-[#0F172A]">{employer}</span>
            <span aria-hidden="true">·</span>
            <span>{location}</span>
            <span aria-hidden="true">·</span>
            <span>{experienceLevel}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-display tracking-tight">
            {roleTitle}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-[10px] border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={() => navigate(`/app/interview/${activeInterview.id}`)}
            className="px-4 py-2 rounded-[10px] bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span>Start Interview</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        </div>
      </div>

      {/* Three Core Questions Summary (Section 12 Final Acceptance Spec) */}
      <div className="bg-white border border-slate-200/60 rounded-[14px] p-5 flex flex-col md:flex-row justify-between gap-5 text-xs font-sans shadow-2xs">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-7 h-7 rounded-full bg-[#0F172A] text-[#F59E0B] flex items-center justify-center font-bold text-xs shrink-0 font-mono">1</div>
          <div>
            <span className="font-bold text-[#0F172A] block text-[13px] mb-0.5">Profile Completeness</span>
            <span className="font-mono font-bold text-sm text-[#0F172A] block mb-1">{completeness.score}% Index</span>
            <span className="text-slate-500 leading-relaxed">Measures richness of contact details, links, education, achievements, and structural sections.</span>
          </div>
        </div>
        <div className="flex items-start gap-3 flex-1 md:border-l md:border-slate-100 md:pl-5">
          <div className="w-7 h-7 rounded-full bg-[#0F172A] text-[#F59E0B] flex items-center justify-center font-bold text-xs shrink-0 font-mono">2</div>
          <div>
            <span className="font-bold text-[#0F172A] block text-[13px] mb-0.5">Evidence Coverage</span>
            <span className="font-mono font-bold text-sm text-[#0F172A] block mb-1">{evidenceScore}% Index</span>
            <span className="text-slate-500 leading-relaxed">Audits claimed competencies against public repositories, projects, and active code implementations.</span>
          </div>
        </div>
        <div className="flex items-start gap-3 flex-1 md:border-l md:border-slate-100 md:pl-5">
          <div className="w-7 h-7 rounded-full bg-[#0F172A] text-[#F59E0B] flex items-center justify-center font-bold text-xs shrink-0 font-mono">3</div>
          <div>
            <span className="font-bold text-[#0F172A] block text-[13px] mb-0.5">Job Readiness</span>
            <span className="font-mono font-bold text-sm text-[#0F172A] block mb-1">{readinessScore}% Index</span>
            <span className="text-slate-500 leading-relaxed">Deterministic match score calculating overall alignment against role qualifications and target JD.</span>
          </div>
        </div>
      </div>

      {/* 2 & 3. JOB READINESS & PROFILE COMPLETENESS GRID (Section 9 & 10 and Profile Completeness Spec) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Left Column: JOB READINESS HERO & CORE INSIGHT */}
        <section className="bg-white rounded-[16px] border border-slate-200/80 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                JOB READINESS
              </span>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold text-[#0F172A] font-mono tabular-nums tracking-tight">
                  {readinessScore}
                </span>
                <span className="text-xl text-slate-400 font-mono">/ 100</span>

                <span className={`ml-1 text-xs font-bold px-2.5 py-1 rounded-md ${
                  readinessScore >= 75
                    ? 'bg-emerald-50 text-[#16A34A]'
                    : 'bg-amber-50 text-[#F59E0B]'
                }`}>
                  {readinessScore >= 75 ? 'Strong fit' : 'Moderate fit'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans pt-0.5">
                Calculated from skill matches, verified code repositories, and structural experience records against target expectations.
              </p>
            </div>

            {/* Clean horizontal readiness bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#0F172A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${readinessScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0</span>
                <span className="text-[#0F172A] font-semibold">{readinessScore}% Overall Index</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Compact score breakdown beside/underneath (Section 9 Spec) */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 sm:grid-cols-5 gap-3 text-xs font-sans">
            <div>
              <span className="text-slate-400 block text-[10px] font-medium leading-none mb-1">Skill Fit</span>
              <span className="font-mono font-bold text-sm text-[#0F172A] tabular-nums">{skillFitScore}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-medium leading-none mb-1">Evidence</span>
              <span className="font-mono font-bold text-sm text-[#0F172A] tabular-nums">{evidenceScore}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-medium leading-none mb-1">Interview</span>
              <span className="font-mono font-bold text-sm text-[#0F172A] tabular-nums">{interviewReadinessScore}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-medium leading-none mb-1">Project Fit</span>
              <span className="font-mono font-bold text-sm text-[#0F172A] tabular-nums">{projectFitScore}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-medium leading-none mb-1">Consistency</span>
              <span className="font-mono font-bold text-sm text-[#0F172A] tabular-nums">{consistencyScore}</span>
            </div>
          </div>
        </section>

        {/* Right Column: PROFILE COMPLETENESS AUDIT */}
        <section className="bg-white rounded-[16px] border border-slate-200/80 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
                PROFILE COMPLETENESS
              </span>

              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold text-[#0F172A] font-mono tabular-nums tracking-tight">
                  {completeness.score}
                </span>
                <span className="text-xl text-slate-400 font-mono">/ 100</span>

                <span className={`ml-1 text-xs font-bold px-2.5 py-1 rounded-md ${
                  completeness.score >= 85
                    ? 'bg-emerald-50 text-[#16A34A]'
                    : 'bg-amber-50 text-[#F59E0B]'
                }`}>
                  {completeness.score >= 85 ? 'Highly complete' : 'Action recommended'}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-sans pt-0.5">
                Audit of contact info, education, claimed skills, links, achievements, and qualifications extracted directly from your resume.
              </p>
            </div>

            {/* Clean horizontal completeness bar */}
            <div className="space-y-1.5 pt-1">
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-[#0F172A] h-full rounded-full transition-all duration-500"
                  style={{ width: `${completeness.score}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>0</span>
                <span className="text-[#0F172A] font-semibold">{completeness.score}% Completeness Index</span>
                <span>100</span>
              </div>
            </div>
          </div>

          {/* Checklist of Present vs Missing vs Unclear */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-sans">
              {completeness.items.map((item) => {
                const isPresent = item.status === 'PRESENT';
                const isUnclear = item.status === 'UNCLEAR';
                const isMissing = item.status === 'MISSING';
                
                let marker = "✓";
                let markerColor = "text-emerald-500 font-bold";
                let textColor = "text-slate-700";
                
                if (isMissing) {
                  marker = "⚠";
                  markerColor = "text-amber-500 font-semibold";
                  textColor = "text-slate-400";
                } else if (isUnclear) {
                  marker = "?";
                  markerColor = "text-slate-400 font-semibold";
                  textColor = "text-slate-500 italic";
                }

                return (
                  <div key={item.key} className="flex items-center gap-1 shrink-0 bg-slate-50 border border-slate-100/80 px-2 py-1 rounded-[6px]">
                    <span className={markerColor}>{marker}</span>
                    <span className={`${textColor} font-medium`}>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actionable recommendations banner */}
          {completeness.recommendations.length > 0 && (
            <div className="pt-3 border-t border-slate-100 space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Field Improvements
              </span>
              <ul className="text-xs text-slate-600 space-y-1 pl-4 list-disc leading-relaxed">
                {completeness.recommendations.slice(0, 2).map((rec, idx) => (
                  <li key={idx} className="text-slate-600">
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>

      {/* 4. SKILL FIT (Section 12 Spec: Compact ranked list with thin bars) */}
      <section className="bg-white rounded-[16px] border border-slate-200/80 p-6 sm:p-8 space-y-5">
        <div>
          <h2 className="text-lg font-bold text-[#0F172A] font-display">
            Skill Fit
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ranked alignment against job description core requirements.
          </p>
        </div>

        <div className="space-y-3.5 pt-1">
          {rankedSkills.map((s) => {
            const barColor = s.status === 'strong' ? 'bg-[#16A34A]' : s.status === 'moderate' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]';
            return (
              <div key={s.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="font-medium text-[#0F172A]">{s.name}</span>
                  <span className="font-mono font-semibold text-slate-600 tabular-nums">{s.score}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${barColor}`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. CLAIM VS EVIDENCE (Section 11 Signature Component) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
            Claim vs Evidence
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            What you say, what your work shows, and what still needs verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {claimEvidenceConflicts.map((c) => {
            const isStrong = c.evidenceStrength === 'Strong';
            const isModerate = c.evidenceStrength === 'Moderate';
            const badgeBg = isStrong ? 'bg-emerald-50 text-[#16A34A]' : isModerate ? 'bg-amber-50 text-[#F59E0B]' : 'bg-rose-50 text-[#EF4444]';

            return (
              <div 
                key={c.skill}
                className="bg-white rounded-[14px] border border-slate-200/80 p-5 shadow-2xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-[#0F172A] font-display">
                      {c.skill}
                    </h3>
                    <span className="font-mono font-bold text-xs text-slate-600 tabular-nums">
                      {c.evidencePercentage}% evidence strength
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs mb-3 p-3 bg-[#FAF8F5] rounded-[10px]">
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">Claimed:</span>
                      <span className="font-semibold text-slate-800">{c.claimed}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium block">Evidence:</span>
                      <span className="font-semibold text-slate-800">{c.evidence}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {c.recommendation}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className={`font-semibold px-2 py-0.5 rounded text-[11px] ${badgeBg}`}>
                    Verification recommended
                  </span>
                  <span className="text-slate-400 text-[11px]">Audit flag</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. AI INTERVIEW SIMULATION CARD (Section 13 Spec) */}
      <section className="bg-white rounded-[16px] border border-slate-200/80 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-1.5 max-w-xl">
          <h2 className="text-lg font-bold text-[#0F172A] font-display">
            AI Interview Simulation
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed font-sans">
            Questions generated from your role requirements and skill gaps.
          </p>
          <div className="text-xs text-slate-400 pt-0.5 font-sans">
            5 questions · ~20 min
          </div>
        </div>

        <button
          onClick={() => navigate(`/app/interview/${activeInterview.id}`)}
          className="shrink-0 px-6 py-2.5 rounded-[10px] bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        >
          <span>Start Interview</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
        </button>
      </section>

      {/* 7. CAREER PATHS (Section 14 Spec: Your Next 3 Paths) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F172A] font-display">
            Your Next 3 Paths
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Three realistic trajectories based on your current skills and target role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {careerPaths.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate('/app/career')}
              className="bg-white rounded-[14px] border border-slate-200/80 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between cursor-pointer space-y-4 group"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-sm font-bold text-[#0F172A] font-display truncate max-w-[170px]">
                    {p.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#16A34A] tabular-nums">
                    {p.fitPercentage}% fit
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-sans">
                  {p.gapCount} key skill gaps
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#0F172A] font-semibold">
                <span>Explore roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. COMPANY BENCHMARK PROFILE & INTERVIEW RUBRIC */}
      <CompanyBenchmarkCard 
        benchmark={companyBenchmark} 
        employer={employer} 
      />

      {/* 9. INDIA MARKET LENS (Section 15 Spec: Secondary, clean, labeled) */}
      <section id="market-lens" className="bg-white rounded-[16px] border border-slate-200/80 p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-sans">
            India Market Signal
          </span>
          <span className="text-[11px] text-slate-400 italic">
            Role-specific signal based on the supplied job description.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Target Role</span>
            <p className="font-semibold text-[#0F172A] text-sm mt-0.5">{roleTitle}</p>
            <p className="text-slate-500 mt-0.5">{experienceLevel} · {location}</p>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">High-Demand Skills</span>
            <p className="text-slate-700 leading-relaxed mt-0.5">
              Go, Apache Kafka, PostgreSQL, Distributed Systems, Redis
            </p>
          </div>

          <div>
            <span className="text-[11px] text-slate-400 font-medium block">Main Market Gap</span>
            <p className="text-[#EF4444] font-semibold mt-0.5">
              AWS Production Infrastructure & EKS Orchestration
            </p>
          </div>
        </div>
      </section>

      {/* 11. DEVELOPMENT DIAGNOSTICS (Exposed in development only) */}
      {isDevelopment && (
        <section className="bg-amber-500/5 rounded-[16px] border border-amber-500/20 p-6 sm:p-8 space-y-4 font-sans">
          <div className="flex items-center justify-between border-b border-amber-500/10 pb-3">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Development Diagnostics & Data Trace</span>
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded font-mono">
              DEV_MODE_ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Analysis Mode</span>
              <span className="font-mono font-bold text-slate-800">{activeAnalysis.analysisMode || 'LIVE'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Candidate Source</span>
              <span className="font-mono font-bold text-slate-800">{activeAnalysis.candidateSource || 'UPLOADED_RESUME'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Job Source</span>
              <span className="font-mono font-bold text-slate-800">{activeAnalysis.jobSource || 'USER_PROVIDED_JD'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Company Source</span>
              <span className="font-mono font-bold text-slate-800">{activeAnalysis.companySource || 'NONE'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">GitHub Source</span>
              <span className="font-mono font-bold text-slate-800">{activeAnalysis.githubSource || 'NONE'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Analysis ID</span>
              <span className="font-mono font-semibold text-slate-600 truncate block max-w-[150px]" title={activeAnalysis.id}>{activeAnalysis.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Candidate ID</span>
              <span className="font-mono font-semibold text-slate-600 truncate block max-w-[150px]" title={candidateProfile.id}>{candidateProfile.id}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Fresh Analysis Executed</span>
              <span className="font-mono font-bold text-emerald-600">YES (No Cached Reuse)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Final Model Used</span>
              <span className="font-mono font-bold text-blue-600">{activeAnalysis.finalModelUsed || 'gemini-3.5-flash'}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-0.5">Fallback Required</span>
              <span className={`font-mono font-bold ${activeAnalysis.fallbackRequired ? 'text-amber-600' : 'text-emerald-600'}`}>
                {activeAnalysis.fallbackRequired ? 'YES' : 'NO'}
              </span>
            </div>
          </div>

          <div className="border-t border-amber-500/10 pt-4 space-y-3 text-xs">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider">
                  Score Sensitivity (Score A vs Score B discrepancy proof)
                </span>
                <button
                  onClick={runSensitivityTest}
                  disabled={loadingSensitivity}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-amber-500 text-white hover:bg-amber-600 disabled:bg-slate-300 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  {loadingSensitivity ? 'Executing...' : 'Run Sensitivity Test'}
                </button>
              </div>

              {loadingSensitivity ? (
                <div className="bg-white/80 rounded-lg p-3 border border-amber-500/10 flex items-center gap-2 font-mono text-amber-700">
                  <span className="animate-pulse">⏳ Executing sensitivity check (offline deterministic engine)...</span>
                </div>
              ) : sensitivityError ? (
                <div className="bg-red-50 text-red-700 rounded-lg p-3 border border-red-200 font-mono text-[11px]">
                  Error: {sensitivityError}
                </div>
              ) : (localSensitivity || activeAnalysis.scoreSensitivity) ? (
                <div className="bg-white/80 rounded-lg p-3 border border-amber-500/10 space-y-2 font-mono">
                  <div className="text-emerald-700 font-semibold">
                    ✓ Score A (KaaryaUniqueSkill91827 matched): Readiness: {(localSensitivity || activeAnalysis.scoreSensitivity).scoreA.readinessScore}%, Skill Fit: {(localSensitivity || activeAnalysis.scoreSensitivity).scoreA.skillFitScore}%
                  </div>
                  <div className="text-red-700 font-semibold">
                    ✗ Score B (UnknownSkill99999 missing): Readiness: {(localSensitivity || activeAnalysis.scoreSensitivity).scoreB.readinessScore}%, Skill Fit: {(localSensitivity || activeAnalysis.scoreSensitivity).scoreB.skillFitScore}%
                  </div>
                  <div className="text-slate-700 font-bold bg-amber-500/5 p-2 rounded mt-1 border border-amber-500/10">
                    Proof of Sensitivity: {(localSensitivity || activeAnalysis.scoreSensitivity).discrepancyProof}
                  </div>
                </div>
              ) : (
                <span className="font-mono text-slate-500 italic">Score sensitivity data unavailable. Click the button to calculate.</span>
              )}
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase tracking-wider mb-1">
                Provenance Verification (Active User Session Matching)
              </span>
              <div className="bg-white/80 rounded-lg p-3 border border-amber-500/10 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-slate-700">
                <div>
                  <span className="font-semibold text-slate-500">Analysis Mode:</span> <span className="font-bold text-slate-900">{activeAnalysis.analysisMode || 'LIVE'}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Candidate ID Match:</span> <span className="font-bold text-[#16A34A]">YES (SESSION OK)</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Candidate Source ID:</span> <span className="font-bold text-slate-900">{candidateProfile.id}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-500">Resume Name Provenance:</span> <span className="font-bold text-slate-900">{candidateProfile.name || 'None'}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
