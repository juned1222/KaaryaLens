import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { SEED_ROLES, SEED_CANDIDATE_PROFILE, EMPTY_CANDIDATE_PROFILE } from '../../lib/seedData';
import { RoleInput, ExperienceLevel } from '../../types';
import { CompanyBenchmarkProfile, getCompanyBenchmark } from '../../lib/companyBenchmarks';
import { CompanyBenchmarkSelector } from './CompanyBenchmarkSelector';
import { ResumeScanReview } from './ResumeScanReview';
import { calculateProfileCompleteness } from '../../lib/profileCompleteness';
import { 
  Upload, 
  Check, 
  ArrowRight, 
  ChevronDown,
  X,
  FileText
} from 'lucide-react';

interface SimpleAnalysisWorkspaceProps {
  onSuccess?: () => void;
  className?: string;
}

export const SimpleAnalysisWorkspace: React.FC<SimpleAnalysisWorkspaceProps> = ({ 
  onSuccess,
  className = '' 
}) => {
  const { runAnalysis, isAnalyzing, candidateProfile, setCandidateProfile, isDemoMode, setIsDemoMode } = useApp();

  // Resume state - follows Section 5 specification
  const [resumeFile, setResumeFile] = useState<{ name: string; size: string } | null>(null);
  const [resumeRawText, setResumeRawText] = useState<string>('');
  const [isExtractingResume, setIsExtractingResume] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Drawer visibility state (Slide-in review profile drawer)
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Extraction and Analysis Errors (Sections 3 & 4)
  const [extractionError, setExtractionError] = useState<string | null>(null);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Job Description state - follows Section 6 specification
  const [jdRaw, setJdRaw] = useState<string>('');
  const [showOptionalFields, setShowOptionalFields] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [employer, setEmployer] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Junior (1-3 yrs)');
  const [selectedBenchmark, setSelectedBenchmark] = useState<CompanyBenchmarkProfile | null>(null);

  // Deterministic profile completeness score
  const completeness = calculateProfileCompleteness(candidateProfile, title || 'Software Engineer');

  const handleLoadDemo = () => {
    setIsDemoMode(true);
    setExtractionError(null);
    setAnalysisError(null);
    setResumeFile({
      name: 'Arjun_Mehta_Resume_2026.pdf',
      size: '184 KB',
    });
    setCandidateProfile(SEED_CANDIDATE_PROFILE);
    setTitle('SDE-2 Backend Engineer');
    setEmployer('Swiggy');
    setLocation('Bengaluru, India');
    setExperienceLevel('Junior (1-3 yrs)');
    setJdRaw(SEED_ROLES[0].jdRaw);
    setSelectedBenchmark(getCompanyBenchmark('Swiggy'));
  };

  const handleSwitchToLive = () => {
    setIsDemoMode(false);
    setExtractionError(null);
    setAnalysisError(null);
    setResumeFile(null);
    setResumeRawText('');
    setCandidateProfile(EMPTY_CANDIDATE_PROFILE);
    setTitle('');
    setEmployer('');
    setLocation('');
    setExperienceLevel('Junior (1-3 yrs)');
    setJdRaw('');
    setSelectedBenchmark(null);
  };

  const handleFileUpload = async (file: File) => {
    const sizeKb = Math.round(file.size / 1024);
    const sizeFormatted = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
    setResumeFile({
      name: file.name,
      size: sizeFormatted,
    });
    setExtractionError(null);
    setIsExtractingResume(true);

    try {
      let body: any = { isDemoMode: false };
      if (file.type === 'application/pdf') {
        const reader = new FileReader();
        const base64Promise = new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
        });
        reader.readAsDataURL(file);
        const base64 = await base64Promise;
        body = { ...body, fileBase64: base64, mimeType: file.type };
      } else {
        const text = await file.text();
        setResumeRawText(text.slice(0, 10000));
        body = { ...body, resumeText: text };
      }

      const res = await fetch('/api/extract/resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.profile) {
          setCandidateProfile((prev) => ({
            ...prev,
            ...data.profile,
            updatedAt: new Date().toISOString(),
          }));
        } else {
          throw new Error('No profile data returned');
        }
      } else {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.reason || errData.error || 'Failed to extract resume');
      }
    } catch (err: any) {
      console.warn('Resume extraction notice:', err);
      setResumeFile(null);
      setCandidateProfile(EMPTY_CANDIDATE_PROFILE);
      setExtractionError("Could not extract your resume. Please retry or review the file.");
    } finally {
      setIsExtractingResume(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleLoadSample = (index: number) => {
    setIsDemoMode(true);
    setExtractionError(null);
    setAnalysisError(null);
    setResumeFile({
      name: 'Arjun_Mehta_Resume_2026.pdf',
      size: '184 KB',
    });
    setCandidateProfile(SEED_CANDIDATE_PROFILE);
    const r = SEED_ROLES[index];
    setTitle(r.title);
    setEmployer(r.employer);
    setLocation(r.location);
    setExperienceLevel(r.experienceLevel);
    setJdRaw(r.jdRaw);
    setSelectedBenchmark(getCompanyBenchmark(r.employer));
  };

  const handleSelectCompanyBenchmark = (comp: CompanyBenchmarkProfile | null) => {
    setSelectedBenchmark(comp);
    if (comp) {
      setEmployer(comp.name);
      if (comp.sampleRoles && comp.sampleRoles.length > 0 && !title) {
        setTitle(comp.sampleRoles[0]);
      }
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jdRaw.trim() || isAnalyzing) return;
    setAnalysisError(null);

    const mappedExpLevel = 
      experienceLevel === 'Fresher (0-1 yr)' ? 'Fresher (0-1 yr)' :
      experienceLevel === 'Junior (1-3 yrs)' ? 'Junior (1-3 yrs)' :
      experienceLevel === 'Mid-Level (3-5 yrs)' ? 'Mid-Level (3-5 yrs)' :
      'Senior (5+ yrs)';

    try {
      const payload: RoleInput = {
        title: title || 'Target Professional',
        employer: employer || 'Target Company',
        location: location || 'India',
        experienceLevel: mappedExpLevel as any,
        jdRaw,
        companyBenchmarkId: selectedBenchmark?.id,
      };

      await runAnalysis(payload);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      console.error('Analysis execution error:', err);
      setAnalysisError(err.message || 'The AI model cascade failed to complete analysis. Please retry.');
    }
  };

  // Helper flags for external links present on candidate profile
  const hasGithub = !!(candidateProfile.links?.github || candidateProfile.githubUsername || (candidateProfile as any).githubUrl);
  const hasLinkedin = !!(candidateProfile.links?.linkedin || (candidateProfile as any).linkedinUrl);
  const hasPortfolio = !!(candidateProfile.links?.portfolio || candidateProfile.portfolioUrl || (candidateProfile as any).portfolioUrl);

  return (
    <div className={`bg-white rounded-[16px] border border-slate-200/80 shadow-xs p-6 sm:p-8 ${className}`}>
      {/* Dynamic Slide-in Drawer Container */}
      <div 
        className={`fixed inset-0 bg-[#0F172A]/30 backdrop-blur-xs z-50 transition-opacity duration-200 ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      <div 
        className={`fixed inset-y-0 right-0 z-55 w-full md:max-w-xl lg:max-w-2xl bg-[#FAF8F5] border-l border-slate-200 flex flex-col transition-transform duration-200 ease-out shadow-2xl ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="h-16 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <h3 className="font-display font-extrabold text-[#0F172A] text-sm tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#F59E0B]" />
            <span>Extracted Candidate Profile</span>
          </h3>
          <button 
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body with independent scrolling */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          <ResumeScanReview 
            candidateProfile={candidateProfile}
            alwaysExpanded={true}
            onUpdateProfile={(updated) => {
              setCandidateProfile((prev) => ({
                ...prev,
                ...updated,
              }));
            }}
          />
        </div>
      </div>

      {/* Explicit Mode Selector (Sections 1 & 9) */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-sans block">
            Analysis Scope
          </span>
          <h3 className="text-sm font-bold text-[#0F172A] font-display">
            {isDemoMode ? "DEMO MODE (Sample Preview)" : "LIVE ANALYSIS MODE"}
          </h3>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            type="button"
            onClick={handleSwitchToLive}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              !isDemoMode 
                ? 'bg-white text-[#0F172A] shadow-xs' 
                : 'text-slate-500 hover:text-[#0F172A]'
            }`}
          >
            Live Mode
          </button>
          <button
            type="button"
            onClick={handleLoadDemo}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              isDemoMode 
                ? 'bg-amber-500 text-white shadow-xs' 
                : 'text-slate-500 hover:text-[#0F172A]'
            }`}
          >
            Demo Mode
          </button>
        </div>
      </div>

      <form onSubmit={handleAnalyze} className="space-y-6">
        {/* RESUME SECTION - Compact layout */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-[#0F172A] font-display">
              Resume
            </label>
            <span className="text-xs text-slate-400 font-sans">PDF or DOCX</span>
          </div>

          {resumeFile ? (
            /* Compact Resume Intelligence Card (UX Refinement Spec) */
            <div className="p-4 sm:p-5 rounded-[14px] bg-[#FAF8F5] border border-slate-200/90 shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#16A34A] flex items-center justify-center shrink-0">
                    <Check className="w-4.5 h-4-5 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-sm text-[#0F172A]">
                        Resume
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-md">
                        ✓ {candidateProfile.name || resumeFile.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-sans mt-1">
                      {candidateProfile.headline || "Full Stack Software Developer"} · {candidateProfile.yearsOfExperience !== null ? `${candidateProfile.yearsOfExperience} yrs` : "0 yrs"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center pt-1 sm:pt-0">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#0F172A] hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    Review Profile
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                        fileInputRef.current.click();
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/60 transition-colors cursor-pointer"
                  >
                    Replace
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc,.txt"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Subtitle Tech Highlights & Social Link badges */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex flex-wrap gap-x-3 gap-y-1 font-medium text-slate-500">
                  <span>
                    <strong className="font-semibold text-slate-700 font-mono">{(candidateProfile.claimedSkills || []).length || (candidateProfile.skills || []).length || 0}</strong> skills
                  </span>
                  <span className="text-slate-200">•</span>
                  <span>
                    <strong className="font-semibold text-slate-700 font-mono">{(candidateProfile.projects || []).length || 0}</strong> projects
                  </span>
                  <span className="text-slate-200">•</span>
                  <span>
                    <strong className="font-semibold text-slate-700 font-mono">{Array.isArray(candidateProfile.experience) ? candidateProfile.experience.length : 0}</strong> roles
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-2.5 gap-y-1 text-slate-400 font-medium">
                  <span className={`inline-flex items-center gap-0.5 ${hasGithub ? 'text-emerald-600' : 'text-slate-300'}`}>
                    GitHub {hasGithub ? '✓' : '✗'}
                  </span>
                  <span className={`inline-flex items-center gap-0.5 ${hasLinkedin ? 'text-emerald-600' : 'text-slate-300'}`}>
                    LinkedIn {hasLinkedin ? '✓' : '✗'}
                  </span>
                  <span className={`inline-flex items-center gap-0.5 ${hasPortfolio ? 'text-emerald-600' : 'text-slate-300'}`}>
                    Portfolio {hasPortfolio ? '✓' : '✗'}
                  </span>
                </div>
              </div>

              {/* Profile Completeness summary & quality badge */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-medium">Profile Completeness:</span>
                  <span className="font-mono font-bold text-slate-700">{completeness.score}%</span>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(true)}
                    className="text-[#F59E0B] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    View details <span className="font-mono">→</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-slate-400 font-medium">
                  <span>Extraction quality:</span>
                  <span className="text-emerald-600 font-bold bg-emerald-50/80 px-2 py-0.5 rounded text-[10px] border border-emerald-100">
                    Good
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Upload drop zone */
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`h-40 rounded-[12px] border-2 border-dashed transition-all flex flex-col items-center justify-center text-center p-6 cursor-pointer ${
                isDragging
                  ? 'border-[#F59E0B] bg-amber-500/5'
                  : 'border-slate-200 hover:border-slate-300 bg-[#FAF8F5]/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <div className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 mb-2.5">
                <Upload className="w-4 h-4 text-[#0F172A]" />
              </div>
              <p className="text-sm font-semibold text-[#0F172A] font-display">
                Drop your resume here
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PDF or DOCX · <span className="text-[#0F172A] underline underline-offset-2 font-medium">Browse file</span>
              </p>
            </div>
          )}

          {isExtractingResume && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
              <span>Extracting normalized candidate profile with Gemini Flash-Lite...</span>
            </div>
          )}

          {extractionError && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium animate-in fade-in duration-100">
              {extractionError}
            </div>
          )}
        </div>

        {/* JOB DESCRIPTION SECTION */}
        <div className="space-y-4 border-t border-slate-100 pt-5">
          {/* Company selector */}
          <CompanyBenchmarkSelector
            selectedCompany={selectedBenchmark}
            onSelectCompany={handleSelectCompanyBenchmark}
          />

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#0F172A] font-display">
                Job Description
              </label>
              {/* Secondary sample loaders */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-sans">
                <span>Samples:</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample(0)}
                  className="text-slate-600 hover:text-[#0F172A] font-medium underline cursor-pointer"
                >
                  Swiggy
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample(1)}
                  className="text-slate-600 hover:text-[#0F172A] font-medium underline cursor-pointer"
                >
                  Razorpay
                </button>
                <span>·</span>
                <button
                  type="button"
                  onClick={() => handleLoadSample(2)}
                  className="text-slate-600 hover:text-[#0F172A] font-medium underline cursor-pointer"
                >
                  Zepto
                </button>
              </div>
            </div>

            <textarea
              rows={6}
              value={jdRaw}
              onChange={(e) => setJdRaw(e.target.value)}
              placeholder="Paste the job description here..."
              required
              className="w-full p-3.5 rounded-[12px] border border-slate-200 text-xs font-sans text-[#0F172A] focus:outline-none focus:border-[#F59E0B] leading-relaxed resize-none bg-white placeholder:text-slate-400 focus:ring-1 focus:ring-[#F59E0B]/50 transition-shadow"
            />
          </div>

          {/* Optional Details Collapsible Fields */}
          <div>
            <button
              type="button"
              onClick={() => setShowOptionalFields(!showOptionalFields)}
              className="text-xs text-slate-500 hover:text-[#0F172A] flex items-center gap-1 font-medium cursor-pointer"
            >
              <span>Optional details: Company, Role & Location</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showOptionalFields ? 'rotate-180' : ''}`} />
            </button>

            {showOptionalFields && (
              <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 animate-in slide-in-from-top-1 duration-150">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Company</span>
                  <input
                    type="text"
                    value={employer}
                    onChange={(e) => setEmployer(e.target.value)}
                    placeholder="e.g. Swiggy"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Target Role</span>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. SDE-2"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Location</span>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Bengaluru"
                    className="px-3 py-2 rounded-lg border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#F59E0B]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Failure Alert with Retry */}
        {analysisError && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center justify-between gap-4 animate-in fade-in duration-100">
            <div className="font-medium">
              <span className="font-bold">Analysis Failed:</span> {analysisError}
            </div>
            <button
              type="submit"
              className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold transition-all cursor-pointer shadow-xs shrink-0"
            >
              Retry
            </button>
          </div>
        )}

        {/* BOTTOM: EXACTLY ONE PRIMARY CTA */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 font-sans text-center sm:text-left">
            Extracts requirements, audits evidence, and prepares interview simulation.
          </p>

          <button
            type="submit"
            disabled={isAnalyzing || !jdRaw.trim()}
            className="w-full sm:w-auto px-7 py-3 rounded-[12px] bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-xs hover:shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 group"
          >
            <span>Analyze My Job Fit</span>
            <ArrowRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </form>
    </div>
  );
};
