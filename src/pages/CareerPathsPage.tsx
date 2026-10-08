import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  FolderGit2, 
  Target, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const CareerPathsPage: React.FC = () => {
  const { activeAnalysis, candidateProfile, navigate } = useApp();
  const [selectedPathIndex, setSelectedPathIndex] = useState<number>(0);

  const paths = activeAnalysis?.careerPaths || [];
  const activePath = paths[selectedPathIndex] || paths[0];

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Career Intelligence Engine</span>
          <span aria-hidden="true">·</span>
          <span>Integrated PS3 Pathway Functionality</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
          Your Next 3 Career Paths
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          Three realistic trajectories derived from your current code evidence, target role requirements, and identified skill gaps.
        </p>
      </div>

      {/* 3 Paths Selection Cards (Tabs) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paths.map((p, idx) => {
          const isSelected = selectedPathIndex === idx;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPathIndex(idx)}
              className={`p-5 rounded-[16px] text-left transition-all cursor-pointer border flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#0F172A] shadow-md ring-1 ring-[#0F172A]'
                  : 'bg-[#FAF8F5] border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-sans">
                    Path 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#16A34A]">
                    {p.fitPercentage}% Fit
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-1">
                  {p.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {p.gapCount} specific competency gaps to close
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className={`font-semibold ${isSelected ? 'text-[#0F172A]' : 'text-slate-500'}`}>
                  {isSelected ? 'Viewing Roadmap' : 'Inspect Roadmap'}
                </span>
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-[#F59E0B]' : 'text-slate-400'}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Path Deep Breakdown */}
      {activePath && (
        <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-sm space-y-8">
          {/* Header of Path */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Pathway Roadmap</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#16A34A]">{activePath.fitPercentage}% Current Match</span>
              </div>
              <h2 className="text-2xl font-bold text-[#0F172A]">
                {activePath.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Gaps to Bridge:</span>
              <span className="text-xs font-mono font-bold text-[#0F172A] bg-slate-100 px-2.5 py-1 rounded-md">
                {activePath.requiredSkillGaps.length} Skills
              </span>
            </div>
          </div>

          {/* Gaps List */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Key Competency Gaps
            </h3>
            <div className="flex flex-wrap gap-2">
              {activePath.requiredSkillGaps.map((gap, i) => (
                <div 
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-slate-200 text-xs font-semibold text-[#0F172A] flex items-center gap-1.5"
                >
                  <Target className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones (Q1 / Q2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Milestone 01 (Quarter 1)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {activePath.milestones.q1}
              </p>
            </div>

            <div className="p-5 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Milestone 02 (Quarter 2)
              </span>
              <p className="text-xs text-slate-700 leading-relaxed font-sans">
                {activePath.milestones.q2}
              </p>
            </div>
          </div>

          {/* High-Signal Suggested Proof Projects */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Suggested High-Signal Proof Projects
            </h3>
            <div className="space-y-3">
              {activePath.suggestedProjects.map((proj, i) => (
                <div key={i} className="p-4 rounded-[12px] bg-[#FAF8F5] border border-slate-200/70">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-sm font-bold text-[#0F172A]">{proj.name}</h4>
                    <div className="flex flex-wrap gap-1">
                      {proj.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono font-medium text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 30-Day Execution Plan */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              First-Month Action Plan (30 Days)
            </h3>
            <div className="space-y-2.5">
              {activePath.thirtyDayPlan.map((step, i) => (
                <div key={i} className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/60 flex items-start gap-3 text-xs">
                  <span className="font-mono font-bold text-[#F59E0B] mt-0.5">0{i + 1}.</span>
                  <p className="text-slate-700 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
