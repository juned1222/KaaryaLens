import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  ShieldCheck, 
  Briefcase
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const { 
    navigate, 
    activeAnalysis, 
    candidateProfile, 
    activeInterview 
  } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-10 sm:space-y-12">
      {/* Header Profile Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>{candidateProfile.currentLocation}</span>
            <span aria-hidden="true">·</span>
            <span>{candidateProfile.yearsOfExperience} yrs experience</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
            {candidateProfile.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {candidateProfile.headline}
          </p>
        </div>

        <button
          onClick={() => navigate('/app/analyze')}
          className="px-4 py-2 rounded-[10px] bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <span>Analyze My Job Fit</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
        </button>
      </div>

      {/* Primary Role Readiness Hero Card (5-second clarity) */}
      <section className="bg-white rounded-[16px] border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block font-sans">
              Active Role Readiness
            </span>
            <h2 className="text-xl font-bold text-[#0F172A] font-display mt-0.5">
              {activeAnalysis.roleTitle}
            </h2>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              {activeAnalysis.employer} · {activeAnalysis.location}
            </p>
          </div>

          <button
            onClick={() => navigate(`/app/role/${activeAnalysis.id}`)}
            className="text-xs font-semibold text-[#0F172A] hover:text-[#F59E0B] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View Full Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-1">
            <span className="text-xs text-slate-500 block font-sans">Readiness Index</span>
            <div className="flex items-baseline gap-2 font-mono">
              <span className="text-5xl font-black text-[#0F172A] tabular-nums">
                {activeAnalysis.readinessScore}
              </span>
              <span className="text-lg text-slate-400">/ 100</span>
              <span className="ml-3 text-xs font-bold font-sans text-[#16A34A] bg-emerald-50 px-2 py-0.5 rounded">
                Strong fit
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pt-2">
              Core Go and stream processing abilities validated against Swiggy logistics platform requirements.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#FAF8F5] rounded-[12px] border border-slate-200/70 p-4 space-y-2 text-xs font-sans">
            <div className="flex items-center justify-between py-1 border-b border-slate-200/50">
              <span className="text-slate-600">Skill Fit</span>
              <span className="font-mono font-bold text-[#0F172A]">{activeAnalysis.skillFitScore}</span>
            </div>
            <div className="flex items-center justify-between py-1 border-b border-slate-200/50">
              <span className="text-slate-600">Evidence Strength</span>
              <span className="font-mono font-bold text-[#0F172A]">{activeAnalysis.evidenceScore}</span>
            </div>
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-600">Interview Readiness</span>
              <span className="font-mono font-bold text-[#0F172A]">{activeAnalysis.interviewReadinessScore}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Section: Interview & Career Paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Interview Simulation */}
        <div className="bg-white rounded-[16px] border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold text-[#F59E0B] uppercase tracking-wider block font-sans">
              Targeted Simulation
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] font-display mt-0.5">
              AI Interview Simulation
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              5 targeted rounds generated from candidate gaps and claim conflicts. Evaluates concurrency, Kafka lag mitigation, and AWS architecture.
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
              <span>5 questions</span>
              <span aria-hidden="true">·</span>
              <span>~20 min</span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/app/interview/${activeInterview.id}`)}
            className="w-full py-2.5 rounded-[10px] bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>Start Interview Simulation</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        </div>

        {/* Career Pathways */}
        <div className="bg-white rounded-[16px] border border-slate-200/90 shadow-xs p-6 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block font-sans">
              PS3 Growth
            </span>
            <h3 className="text-lg font-bold text-[#0F172A] font-display mt-0.5">
              Next 3 Career Paths
            </h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Explore 3 viable next trajectories (Distributed Systems, Full Stack Fintech, AI Application Engineer) with quarterly milestones and 30-day execution plans.
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-[#16A34A] font-mono font-medium">
              <span>86% Fit · Distributed Systems</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/career')}
            className="w-full py-2.5 rounded-[10px] bg-white border border-slate-200 text-[#0F172A] text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <span>View 3 Career Trajectories</span>
            <Compass className="w-3.5 h-3.5 text-[#F59E0B]" />
          </button>
        </div>
      </div>
    </div>
  );
};
