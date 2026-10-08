import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Github, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  FolderGit2, 
  RefreshCw, 
  FileText, 
  ShieldCheck,
  Star,
  Plus,
  HelpCircle,
  Code2
} from 'lucide-react';
import { normalizeSkillName } from '../lib/skillNormalization';

export const EvidenceLockerPage: React.FC = () => {
  const { candidateProfile, setCandidateProfile, activeAnalysis } = useApp();
  const [githubUser, setGithubUser] = useState<string>(candidateProfile.githubUsername || '');
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const repos = candidateProfile.githubRepos || [];
  const claimedSkills = candidateProfile.claimedSkills || [];
  const dossier = activeAnalysis?.evidenceDossier || {};

  const handleSyncGithub = async () => {
    const trimmedUser = githubUser.trim();

    // Cache Safety: invalidate any previous GitHub evidence immediately when relevant inputs change/are submitted
    setCandidateProfile((prev) => ({
      ...prev,
      githubUsername: trimmedUser,
      githubRepos: [],
    }));
    setStatusMessage(null);
    setIsError(false);

    if (!trimmedUser) {
      setStatusMessage("No GitHub evidence provided.");
      setIsError(false);
      return;
    }

    setIsFetching(true);
    try {
      const res = await fetch(`/api/github/user/${encodeURIComponent(trimmedUser)}`);
      const data = await res.json();

      if (res.ok && data.repos && !data.error) {
        setCandidateProfile((prev) => ({
          ...prev,
          githubUsername: trimmedUser,
          githubRepos: data.repos,
        }));
        setStatusMessage(`Successfully analyzed ${data.repos.length} public repositories.`);
        setIsError(false);
      } else {
        // Handle Rate limits, non-existent users, or general failures strictly
        setStatusMessage(data.message || 'GitHub evidence unavailable.');
        setIsError(true);
      }
    } catch (err: any) {
      console.error('GitHub evidence retrieval failure:', err);
      setStatusMessage('GitHub evidence unavailable.');
      setIsError(true);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-12 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span>Candidate Evidence Locker</span>
          <span aria-hidden="true">·</span>
          <span>Corroboration Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-display tracking-tight">
          Evidence & Proof Locker
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl">
          KaaryaLens audits technical skills by corroborating resume statements against concrete code repositories and deployed artifacts.
        </p>
      </div>

      {/* GitHub Sync Bar */}
      <div className="p-6 rounded-[16px] bg-white border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-slate-200 flex items-center justify-center text-[#0F172A]">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#0F172A]">
              Public GitHub Inspection
            </h2>
            <p className="text-xs text-slate-500">
              Evaluates tech stacks, topics, and applied implementation (not vanity stars).
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={githubUser}
            onChange={(e) => setGithubUser(e.target.value)}
            placeholder="GitHub username"
            className="px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-mono text-[#0F172A] focus:outline-none focus:border-[#F59E0B]"
          />
          <button
            onClick={handleSyncGithub}
            disabled={isFetching}
            className="px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isFetching ? 'animate-spin' : ''}`} />
            <span>Sync Evidence</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 font-medium ${
          isError 
            ? 'bg-red-50 border-red-200 text-red-700' 
            : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {isError ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Repositories Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0F172A]">
            Verified Code Repositories ({repos.length})
          </h2>
          <span className="text-xs text-slate-500">
            Source: GitHub Public API
          </span>
        </div>

        {repos.length === 0 ? (
          <div className="p-10 text-center border-2 border-dashed border-slate-200/80 rounded-[16px] text-slate-400 text-xs font-medium">
            {githubUser.trim() ? "GitHub evidence unavailable." : "No GitHub evidence provided."}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {repos.map((repo) => (
              <div
                key={repo.name}
                className="p-5 rounded-[16px] bg-[#FAF8F5] border border-slate-200/80 flex flex-col justify-between hover:border-slate-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <a
                      href={repo.htmlUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono font-bold text-sm text-[#0F172A] hover:text-[#F59E0B] flex items-center gap-1 transition-colors truncate max-w-[160px]"
                    >
                      <span>{repo.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
                    </a>
                    <span className="text-[11px] font-mono text-slate-500 shrink-0">
                      {repo.language || 'Code'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-3">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {(repo.topics || []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Updated: {new Date(repo.updatedAt).toLocaleDateString()}</span>
                  <span className="text-[#16A34A] font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span>Audited</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Claimed Skills Inventory */}
      <div className="p-6 rounded-[16px] bg-white border border-slate-200/90 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            Candidate Claimed Skills vs Evidence Status
          </h2>
          <p className="text-xs text-slate-500">
            Self-reported resume claims reconciled against available repository evidence. Absence of public code does not represent lack of knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {claimedSkills.length === 0 ? (
            <div className="col-span-full p-4 border border-dashed border-slate-200 rounded-lg text-xs text-slate-400 text-center">
              No skills claimed yet. Upload your resume or add skills in the workspace.
            </div>
          ) : (
            claimedSkills.map((c) => {
              // Match dossier item by normalizing names
              const canonicalName = normalizeSkillName(c.name);
              const evidenceItem = Object.values(dossier).find((item: any) => 
                item.skill.toLowerCase() === canonicalName.toLowerCase() ||
                normalizeSkillName(item.skill).toLowerCase() === canonicalName.toLowerCase()
              ) as any;

              // Compute categories
              let statusLabel = 'NONE';
              let strengthPct = 0;
              let hasGithubEvidence = false;
              let activeSources = ['resume'];

              if (evidenceItem) {
                const evStatus = evidenceItem.evidence_status?.toLowerCase();
                if (evStatus === 'strong') statusLabel = 'STRONG';
                else if (evStatus === 'moderate') statusLabel = 'MODERATE';
                else if (evStatus === 'limited') statusLabel = 'LIMITED';
                strengthPct = evidenceItem.evidence_strength || 0;
                activeSources = evidenceItem.sources || ['resume'];
                hasGithubEvidence = activeSources.some(s => s.toLowerCase().startsWith('github'));
              }

              const isWeak = statusLabel === 'LIMITED' || statusLabel === 'NONE' || !hasGithubEvidence;

              return (
                <div
                  key={c.name}
                  className="p-4 rounded-[14px] bg-[#FAF8F5] border border-slate-200/80 flex flex-col justify-between space-y-3.5"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs sm:text-sm text-[#0F172A] truncate max-w-[130px]">{c.name}</span>
                      <span className="text-[10px] font-mono text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-150 uppercase">
                        {c.claimedLevel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">Public Status:</span>
                      <span className={`font-mono font-bold px-1.5 py-0.5 rounded text-[10px] ${
                        statusLabel === 'STRONG' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : statusLabel === 'MODERATE'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}>
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 text-[11px] space-y-2">
                    {/* Sources representation */}
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-slate-400 text-[10px]">Sources:</span>
                      {activeSources.map((src, srcIdx) => (
                        <span key={srcIdx} className="bg-white px-1.5 py-0.5 rounded text-[9px] font-mono border border-slate-200 text-slate-600 font-semibold truncate max-w-[100px]" title={src}>
                          {src}
                        </span>
                      ))}
                    </div>

                    {/* Labeled warning or highlight */}
                    {isWeak ? (
                      <span className="text-[10px] text-amber-800 font-medium italic flex items-center gap-1 leading-tight bg-amber-50/50 p-1.5 rounded border border-amber-200/30">
                        <AlertTriangle className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>insufficient public evidence</span>
                      </span>
                    ) : (
                      <span className="text-[10px] text-emerald-800 font-bold flex items-center gap-1 bg-emerald-50/50 p-1.5 rounded border border-emerald-200/30">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>Verified Project Evidence</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
