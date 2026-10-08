import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Send, 
  HelpCircle, 
  Terminal, 
  Building2,
  Clock,
  Layers,
  Award
} from 'lucide-react';

export const InterviewWorkspacePage: React.FC = () => {
  const { activeInterview, submitInterviewAnswer, navigate } = useApp();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [candidateResponse, setCandidateResponse] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const questions = activeInterview?.questions || [];
  const currentQ = questions[activeQuestionIdx] || questions[0];

  // If question already has user response, populate it
  React.useEffect(() => {
    if (currentQ?.userResponse) {
      setCandidateResponse(currentQ.userResponse);
    } else {
      setCandidateResponse('');
    }
  }, [activeQuestionIdx, currentQ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateResponse.trim() || !currentQ) return;
    setIsSubmitting(true);
    await submitInterviewAnswer(currentQ.id, candidateResponse.trim());
    setIsSubmitting(false);
  };

  if (!currentQ) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 text-sm">No interview questions loaded yet.</p>
        <button
          onClick={() => navigate('/app/analyze')}
          className="mt-4 px-4 py-2 bg-[#0F172A] text-white text-xs font-semibold rounded-lg"
        >
          Analyze a role first
        </button>
      </div>
    );
  }

  const evaluation = currentQ.evaluation;

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-8">
      {/* Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 gap-3">
        <div>
          <button
            onClick={() => navigate(`/app/role/${activeInterview.roleId}`)}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#0F172A] mb-1 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Role Dossier</span>
          </button>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#0F172A]">{activeInterview.employer}</span>
            <span aria-hidden="true">·</span>
            <span>{activeInterview.roleTitle}</span>
            <span aria-hidden="true">·</span>
            <span>Technical Simulation Round</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0F172A] font-display tracking-tight mt-0.5">
            Interview Gap Simulator
          </h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-1">
          {questions.map((q, idx) => (
            <button
              key={q.id}
              onClick={() => setActiveQuestionIdx(idx)}
              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center justify-center ${
                activeQuestionIdx === idx
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : q.evaluation
                  ? 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title={`Question ${idx + 1}: ${q.targetSkill}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Focused Question Panel (NOT a chatbot UI) */}
      <div className="p-6 sm:p-8 rounded-[16px] bg-white border border-slate-200/90 shadow-sm space-y-6">
        {/* Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#F59E0B]">Question {activeQuestionIdx + 1} of {questions.length}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-600 font-semibold">{currentQ.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-mono text-[11px]">{currentQ.difficulty} Level</span>
          </div>
          <span className="text-slate-500 text-[11px]">Target Focus: {currentQ.targetSkill}</span>
        </div>

        {/* Question Prompt */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0F172A] leading-relaxed">
            {currentQ.question}
          </h2>
          <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans italic">
            Rationale: {currentQ.rationale}
          </p>
        </div>

        {/* Expected Competencies hint */}
        <div className="p-3.5 rounded-[12px] bg-[#FAF8F5] border border-slate-200/60 text-xs">
          <span className="text-[11px] font-semibold text-slate-600 block mb-1.5 uppercase tracking-wider">
            Evaluation Rubric Focus
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
            {currentQ.idealKeyPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-1.5">
                <span className="text-[#F59E0B] font-bold">·</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Response Workspace */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Technical Response
            </label>
            <textarea
              rows={8}
              value={candidateResponse}
              onChange={(e) => setCandidateResponse(e.target.value)}
              placeholder="Structure your answer clearly: 1) Initial design & data structures, 2) Concurrency/locking mechanism, 3) Edge case handling (failure, retry, timeout)..."
              className="w-full p-4 rounded-[12px] border border-slate-200 text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#F59E0B] leading-relaxed shadow-inner"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Evaluates technical accuracy, depth, clarity, and role relevance.
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="submit"
                disabled={isSubmitting || !candidateResponse.trim()}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
              >
                {isSubmitting ? (
                  <span>Evaluating Response...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>{evaluation ? 'Re-Evaluate Response' : 'Submit for Evaluation'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Instant Evaluation Feedback Card */}
        {evaluation && (
          <div className="mt-6 pt-6 border-t border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>Evaluation Dossier</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Detailed technical audit of your response
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block font-sans">Overall Question Score</span>
                <span className="text-2xl font-bold font-mono text-[#0F172A] tabular-nums">
                  {evaluation.overallScore} / 100
                </span>
              </div>
            </div>

            {/* 4 Score Dimensions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-500 block">Technical Accuracy</span>
                <span className="text-lg font-bold font-mono text-[#0F172A]">{evaluation.technicalAccuracy}%</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-500 block">Depth & Internals</span>
                <span className="text-lg font-bold font-mono text-[#0F172A]">{evaluation.depth}%</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-500 block">Clarity & Brevity</span>
                <span className="text-lg font-bold font-mono text-[#0F172A]">{evaluation.clarity}%</span>
              </div>
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-slate-200/60 text-center">
                <span className="text-[10px] text-slate-500 block">Role Relevance</span>
                <span className="text-lg font-bold font-mono text-[#0F172A]">{evaluation.roleRelevance}%</span>
              </div>
            </div>

            {/* Concise Improvement Advice */}
            <div className="p-3.5 bg-amber-50/60 border border-amber-200/70 rounded-[12px] text-xs text-amber-950 font-sans leading-relaxed">
              <span className="font-bold text-[#F59E0B] block mb-1">Concise Improvement Tip:</span>
              <p>{evaluation.conciseImprovement}</p>
            </div>

            {/* Benchmark Model Answer */}
            <div className="p-4 bg-[#FAF8F5] border border-slate-200 rounded-[12px] text-xs space-y-1.5 font-sans">
              <span className="font-bold text-[#0F172A] block uppercase text-[10px] tracking-wider">
                Benchmark Model Answer (Staff/Senior Bar)
              </span>
              <p className="text-slate-700 leading-relaxed">
                {evaluation.benchmarkModelAnswer}
              </p>
            </div>
          </div>
        )}

        {/* Navigation bottom buttons */}
        <div className="pt-4 flex items-center justify-between text-xs">
          <button
            type="button"
            disabled={activeQuestionIdx === 0}
            onClick={() => setActiveQuestionIdx((prev) => Math.max(0, prev - 1))}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer disabled:opacity-40"
          >
            ← Previous Question
          </button>

          <button
            type="button"
            disabled={activeQuestionIdx === questions.length - 1}
            onClick={() => setActiveQuestionIdx((prev) => Math.min(questions.length - 1, prev + 1))}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-[#0F172A] hover:bg-slate-50 transition-colors font-semibold cursor-pointer disabled:opacity-40"
          >
            Next Question →
          </button>
        </div>
      </div>
    </div>
  );
};
