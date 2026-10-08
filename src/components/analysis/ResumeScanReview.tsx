import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Save, 
  ChevronDown, 
  ChevronUp, 
  Plus, 
  Trash2, 
  Link2, 
  Briefcase, 
  Code2, 
  GraduationCap, 
  Award,
  Globe,
  MapPin,
  X,
  Sparkles,
  Github,
  Linkedin
} from 'lucide-react';
import { CandidateProfile, ResumeScanMetadata, ClaimedSkill, CandidateProject } from '../../types';

interface ResumeScanReviewProps {
  candidateProfile: CandidateProfile;
  onUpdateProfile: (updated: Partial<CandidateProfile>) => void;
  className?: string;
  alwaysExpanded?: boolean;
}

export const ResumeScanReview: React.FC<ResumeScanReviewProps> = ({
  candidateProfile,
  onUpdateProfile,
  className = '',
  alwaysExpanded = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(alwaysExpanded || false);
  const [isEditing, setIsEditing] = useState(false);

  // Core local state variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [headline, setHeadline] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState<number | ''>('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');

  // Complex lists state variables
  const [claimedSkills, setClaimedSkills] = useState<ClaimedSkill[]>([]);
  const [projects, setProjects] = useState<CandidateProject[]>([]);
  const [experience, setExperience] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);

  // Input states for appending items
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('Intermediate');

  useEffect(() => {
    setName(candidateProfile.name || '');
    setEmail(candidateProfile.email || '');
    setHeadline(candidateProfile.headline || '');
    setYearsOfExperience(candidateProfile.yearsOfExperience !== null && candidateProfile.yearsOfExperience !== undefined ? candidateProfile.yearsOfExperience : '');
    setCurrentLocation(candidateProfile.currentLocation || candidateProfile.location || '');
    setSummary(candidateProfile.summary || '');
    setGithubUrl(candidateProfile.links?.github || candidateProfile.githubUsername || '');
    setPortfolioUrl(candidateProfile.links?.portfolio || candidateProfile.portfolioUrl || '');
    setLinkedinUrl(candidateProfile.links?.linkedin || '');

    setClaimedSkills(candidateProfile.claimedSkills || []);
    setProjects(candidateProfile.projects || []);
    setExperience(Array.isArray(candidateProfile.experience) ? candidateProfile.experience : []);
    setEducation(Array.isArray(candidateProfile.education) ? candidateProfile.education : []);
    setCertifications(candidateProfile.certifications || []);
  }, [candidateProfile]);

  const meta: ResumeScanMetadata = candidateProfile.scanMetadata || {
    fileName: 'Uploaded_Resume.pdf',
    extractedMethod: 'native-pdf',
    parseConfidenceScore: 94,
    pagesCount: 1,
    unparsedSections: [],
    extractionTimestamp: new Date().toISOString(),
  };

  const handleSave = () => {
    onUpdateProfile({
      name: name.trim() || null,
      email: email.trim() || null,
      headline: headline.trim() || null,
      yearsOfExperience: yearsOfExperience !== '' ? Number(yearsOfExperience) : null,
      currentLocation: currentLocation.trim() || null,
      location: currentLocation.trim() || null,
      summary: summary.trim() || null,
      claimedSkills: claimedSkills.map(s => ({ ...s, source: s.source || 'resume' })),
      projects: projects.map(p => ({ ...p, source: p.source || 'uploaded_resume' })),
      experience: experience.map(exp => ({ ...exp, source: exp.source || 'uploaded_resume' })),
      education,
      certifications,
      links: {
        github: githubUrl.trim(),
        portfolio: portfolioUrl.trim(),
        linkedin: linkedinUrl.trim(),
      },
      githubUsername: githubUrl.trim() || undefined,
      portfolioUrl: portfolioUrl.trim() || undefined,
      updatedAt: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  const methodBadge = {
    'native-pdf': { label: 'Native PDF Text Extraction', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    'scanned-ocr': { label: 'Scanned Document OCR (Gemini Vision)', color: 'text-amber-800 bg-amber-50 border-amber-200' },
    'docx-text': { label: 'DOCX Word Extraction', color: 'text-blue-700 bg-blue-50 border-blue-200' },
    'manual-input': { label: 'Direct Input', color: 'text-slate-700 bg-slate-50 border-slate-200' },
  }[meta.extractedMethod] || { label: 'Parsed Document', color: 'text-slate-700 bg-slate-50 border-slate-200' };

  // Append handlers
  const addSkill = () => {
    if (!newSkillName.trim()) return;
    if (claimedSkills.some(s => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setNewSkillName('');
      return;
    }
    setClaimedSkills([...claimedSkills, { name: newSkillName.trim(), claimedLevel: newSkillLevel, source: 'resume' }]);
    setNewSkillName('');
  };

  const removeSkill = (nameToRemove: string) => {
    setClaimedSkills(claimedSkills.filter(s => s.name !== nameToRemove));
  };

  const addProject = () => {
    const newProject: CandidateProject = {
      title: 'New Extracted Project',
      tech: [],
      description: 'Describe the project details...',
      source: 'uploaded_resume'
    };
    setProjects([...projects, newProject]);
  };

  const updateProjectField = (index: number, field: keyof CandidateProject, value: any) => {
    const updated = [...projects];
    if (field === 'tech') {
      updated[index] = { ...updated[index], tech: typeof value === 'string' ? value.split(',').map(t => t.trim()).filter(Boolean) : value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setProjects(updated);
  };

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    const newExp = {
      company: 'New Company',
      role: 'Software Engineer',
      period: '2024 - Present',
      highlights: ['Accomplished key milestones.'],
      source: 'uploaded_resume'
    };
    setExperience([...experience, newExp]);
  };

  const updateExperienceField = (index: number, field: string, value: any) => {
    const updated = [...experience];
    if (field === 'highlights') {
      updated[index] = { ...updated[index], highlights: typeof value === 'string' ? value.split('\n').map(h => h.trim()).filter(Boolean) : value };
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setExperience(updated);
  };

  const removeExperience = (index: number) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, { degree: 'Degree Name', institution: 'University', year: '2024' }]);
  };

  const updateEducationField = (index: number, field: string, value: any) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    setEducation(updated);
  };

  const removeEducation = (index: number) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleCertificationsChange = (val: string) => {
    setCertifications(val.split(',').map(c => c.trim()).filter(Boolean));
  };

  return (
    <div className={alwaysExpanded ? `text-[#0F172A] ${className}` : `rounded-[14px] border border-slate-200/90 bg-[#FAF8F5]/80 overflow-hidden text-[#0F172A] ${className}`}>
      {/* Summary Header Bar */}
      {!alwaysExpanded && (
        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0F172A] shrink-0">
              <FileText className="w-4 h-4 text-[#F59E0B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs sm:text-sm text-[#0F172A] font-display">
                  Resume Scan Review & Provenance
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${methodBadge.color}`}>
                  {methodBadge.label}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-sans mt-0.5">
                Confidence score: <span className="font-semibold text-emerald-700 font-mono">{meta.parseConfidenceScore}%</span> · Extracted {claimedSkills.length} skills, {projects.length} projects, {experience.length} roles
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-slate-700 hover:text-[#0F172A] px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{isExpanded ? 'Hide Details' : 'Review & Edit Details'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}

      {/* Expanded Review & Correction Panel */}
      {(isExpanded || alwaysExpanded) && (
        <div className={alwaysExpanded ? "space-y-6 text-slate-800" : "p-5 bg-white border-t border-slate-200/80 space-y-6 animate-in fade-in duration-150 max-h-[70vh] overflow-y-auto"}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <p className="text-xs text-slate-500 font-sans">
                Review, verify, and edit parameters parsed from the resume. Provenance source: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold">uploaded_resume</span>.
              </p>
            </div>
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="text-xs font-bold text-[#0F172A] hover:text-[#F59E0B] flex items-center gap-1 cursor-pointer transition-colors px-2.5 py-1.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Fields</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-2.5 py-1.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-3 py-1.5 bg-[#0F172A] text-white text-xs font-bold rounded-md flex items-center gap-1 cursor-pointer hover:bg-slate-800 transition-colors"
                >
                  <Save className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Save Profile</span>
                </button>
              </div>
            )}
          </div>

          {/* 1. Core Info Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Core Profile Information</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div className="sm:col-span-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Full Name</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] bg-white font-medium"
                    placeholder="Enter full name"
                  />
                ) : (
                  <p className="text-xs font-bold text-[#0F172A] py-1">{name || <span className="text-slate-400 font-normal">Not specified</span>}</p>
                )}
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Location</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] bg-white font-medium"
                    placeholder="e.g. Bengaluru, India"
                  />
                ) : (
                  <p className="text-xs font-bold text-[#0F172A] py-1">{currentLocation || <span className="text-slate-400 font-normal">Not specified</span>}</p>
                )}
              </div>

              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Years of Experience</span>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={yearsOfExperience}
                    onChange={(e) => setYearsOfExperience(e.target.value !== '' ? Number(e.target.value) : '')}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] bg-white font-medium font-mono"
                    placeholder="e.g. 3.7"
                  />
                ) : (
                  <p className="text-xs font-bold text-[#0F172A] py-1 font-mono">{yearsOfExperience !== '' ? `${yearsOfExperience} yrs` : <span className="text-slate-400 font-normal">Not specified</span>}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Professional Headline</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] bg-white font-medium"
                    placeholder="e.g. Senior Software Engineer"
                  />
                ) : (
                  <p className="text-xs font-medium text-slate-700 py-1">{headline || <span className="text-slate-400 font-normal">Not specified</span>}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Email Address</span>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] bg-white font-medium"
                    placeholder="e.g. candidate@example.com"
                  />
                ) : (
                  <p className="text-xs font-medium text-slate-700 py-1">{email || <span className="text-slate-400 font-normal">Not specified</span>}</p>
                )}
              </div>

              <div className="sm:col-span-4">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Professional Summary</span>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 text-[#0F172A] focus:outline-none focus:border-[#F59E0B] bg-white leading-relaxed resize-none font-medium"
                    placeholder="Brief professional profile summary..."
                  />
                ) : (
                  <p className="text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-100 leading-relaxed italic pl-3.5 border-l-2 border-l-[#F59E0B]">
                    {summary || <span className="text-slate-400 font-normal not-italic">No summary specified</span>}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 2. Skills Portfolio */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Extracted Skills ({claimedSkills.length})</span>
            </h4>

            {isEditing && (
              <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-200/50 flex flex-col sm:flex-row items-end gap-3 mb-2">
                <div className="w-full sm:w-2/3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 block mb-1">Add New Skill</label>
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    placeholder="Skill Name (e.g. Go, Kubernetes, React)"
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-amber-200/60 text-slate-800 bg-white focus:outline-none focus:border-amber-500 font-medium"
                  />
                </div>
                <div className="w-full sm:w-1/4">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-amber-900/60 block mb-1">Proficiency</label>
                  <select
                    value={newSkillLevel}
                    onChange={(e) => setNewSkillLevel(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-amber-200/60 text-slate-800 bg-white focus:outline-none focus:border-amber-500 font-medium cursor-pointer"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-1.5 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-all self-stretch sm:self-auto justify-center"
                >
                  <Plus className="w-3.5 h-3.5 text-[#F59E0B]" />
                  <span>Add</span>
                </button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {claimedSkills.length === 0 ? (
                <span className="text-xs text-slate-400">No skills extracted or entered yet.</span>
              ) : (
                claimedSkills.map((s, idx) => (
                  <span
                    key={s.name + idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-lg bg-slate-50 text-slate-800 border border-slate-200"
                  >
                    <span>{s.name}</span>
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1 py-0.5 rounded font-mono font-bold">
                      {s.claimedLevel}
                    </span>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeSkill(s.name)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))
              )}
            </div>
          </div>

          {/* 3. Experience (Work History) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Work History & Highlights ({experience.length})</span>
              </h4>
              {isEditing && (
                <button
                  type="button"
                  onClick={addExperience}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3 text-[#F59E0B]" />
                  <span>Add Role</span>
                </button>
              )}
            </div>

            <div className="space-y-3">
              {experience.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  No work history specified in candidate profile.
                </div>
              ) : (
                experience.map((exp, idx) => (
                  <div key={idx} className="p-4 bg-slate-50/40 rounded-xl border border-slate-200/70 space-y-3 relative group">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeExperience(idx)}
                        className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        title="Remove Role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Company / Organization</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => updateExperienceField(idx, 'company', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-bold"
                          />
                        ) : (
                          <p className="text-xs font-bold text-[#0F172A]">{exp.company}</p>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Role / Job Title</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => updateExperienceField(idx, 'role', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-semibold"
                          />
                        ) : (
                          <p className="text-xs font-semibold text-slate-700">{exp.role}</p>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Employment Period</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={exp.period}
                            onChange={(e) => updateExperienceField(idx, 'period', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-medium font-mono"
                          />
                        ) : (
                          <p className="text-xs font-medium text-slate-500 font-mono">{exp.period}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Key Contributions & Highlights (One per line)</span>
                      {isEditing ? (
                        <textarea
                          rows={3}
                          value={(exp.highlights || []).join('\n')}
                          onChange={(e) => updateExperienceField(idx, 'highlights', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-medium leading-relaxed font-sans resize-none"
                        />
                      ) : (
                        <ul className="list-disc pl-4 space-y-1 mt-1 text-xs text-slate-600 font-medium">
                          {(exp.highlights || []).map((h: string, hIdx: number) => (
                            <li key={hIdx}>{h}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 4. Projects Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
                <Code2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Extracted Project Artifacts ({projects.length})</span>
              </h4>
              {isEditing && (
                <button
                  type="button"
                  onClick={addProject}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3 text-[#F59E0B]" />
                  <span>Add Project</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.length === 0 ? (
                <div className="col-span-2 p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  No projects specified or extracted yet.
                </div>
              ) : (
                projects.map((proj, idx) => (
                  <div key={idx} className="p-4 bg-slate-50/40 rounded-xl border border-slate-200/70 space-y-3 relative group">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeProject(idx)}
                        className="absolute top-3 right-3 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        title="Remove Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Project Name</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProjectField(idx, 'title', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-[#0F172A] bg-white focus:outline-none focus:border-[#F59E0B] font-bold"
                        />
                      ) : (
                        <span className="font-bold text-[#0F172A] block text-xs">{proj.title}</span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Technology Stack (Comma separated)</span>
                      {isEditing ? (
                        <input
                          type="text"
                          value={(proj.tech || []).join(', ')}
                          onChange={(e) => updateProjectField(idx, 'tech', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-[#0F172A] bg-white focus:outline-none focus:border-[#F59E0B] font-semibold"
                          placeholder="e.g. Go, PostgreSQL, Redis"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {(proj.tech || []).map((t, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-mono font-semibold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Description</span>
                      {isEditing ? (
                        <textarea
                          rows={2}
                          value={proj.description}
                          onChange={(e) => updateProjectField(idx, 'description', e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-medium leading-relaxed resize-none"
                        />
                      ) : (
                        <p className="text-[11px] text-slate-600 font-sans leading-relaxed line-clamp-3">{proj.description}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Code Repository URL</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={proj.repoUrl || ''}
                            onChange={(e) => updateProjectField(idx, 'repoUrl', e.target.value)}
                            placeholder="e.g. https://github.com/user/repo"
                            className="w-full px-2 py-1 text-[10px] font-mono rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B]"
                          />
                        ) : (
                          proj.repoUrl ? (
                            <a href={proj.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 hover:text-amber-700 underline truncate max-w-full">
                              <Link2 className="w-3 h-3" />
                              <span>Repository Link</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400">No link specified</span>
                          )
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Live Demo / Deployment URL</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={proj.liveUrl || ''}
                            onChange={(e) => updateProjectField(idx, 'liveUrl', e.target.value)}
                            placeholder="e.g. https://myproject.com"
                            className="w-full px-2 py-1 text-[10px] font-mono rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B]"
                          />
                        ) : (
                          proj.liveUrl ? (
                            <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-600 hover:text-amber-700 underline truncate max-w-full">
                              <Link2 className="w-3 h-3" />
                              <span>Live Demo Link</span>
                            </a>
                          ) : (
                            <span className="text-[10px] text-slate-400">No link specified</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 5. Education Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Education Background ({education.length})</span>
              </h4>
              {isEditing && (
                <button
                  type="button"
                  onClick={addEducation}
                  className="px-2.5 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  <Plus className="w-3 h-3 text-[#F59E0B]" />
                  <span>Add Education</span>
                </button>
              )}
            </div>

            <div className="space-y-2">
              {education.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-slate-200 text-center text-xs text-slate-400">
                  No education details specified.
                </div>
              ) : (
                education.map((edu, idx) => (
                  <div key={idx} className="p-3 bg-slate-50/40 rounded-xl border border-slate-200/70 relative group">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => removeEducation(idx)}
                        className="absolute top-3.5 right-3 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all animate-in"
                        title="Remove Education"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Degree / Specialization</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={edu.degree}
                            onChange={(e) => updateEducationField(idx, 'degree', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-bold"
                          />
                        ) : (
                          <p className="text-xs font-bold text-[#0F172A]">{edu.degree}</p>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Institution / School</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => updateEducationField(idx, 'institution', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-semibold"
                          />
                        ) : (
                          <p className="text-xs font-semibold text-slate-700">{edu.institution}</p>
                        )}
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Graduation Year</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={edu.year || ''}
                            onChange={(e) => updateEducationField(idx, 'year', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-slate-800 bg-white focus:outline-none focus:border-[#F59E0B] font-medium font-mono"
                            placeholder="e.g. 2024"
                          />
                        ) : (
                          <p className="text-xs font-medium text-slate-500 font-mono">{edu.year || 'N/A'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* 6. Certifications */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Certifications & Credentials ({certifications.length})</span>
            </h4>

            {isEditing ? (
              <textarea
                rows={2}
                value={certifications.join(', ')}
                onChange={(e) => handleCertificationsChange(e.target.value)}
                placeholder="Comma separated certifications, e.g. AWS Solutions Architect, GCP Professional..."
                className="w-full p-2.5 rounded-lg border border-slate-200 text-xs text-[#0F172A] bg-white focus:outline-none focus:border-[#F59E0B] leading-relaxed"
              />
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {certifications.length === 0 ? (
                  <span className="text-xs text-slate-400">No certifications parsed or entered yet.</span>
                ) : (
                  certifications.map((cert, idx) => (
                    <span key={idx} className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded bg-[#FAF8F5] text-slate-800 border border-slate-200/80">
                      {cert}
                    </span>
                  ))
                )}
              </div>
            )}
          </div>

          {/* 7. Online Profiles & External Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-sans flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Online Portfolios & Links</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">GitHub URL or Username</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="e.g. live-test-84729"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-[#0F172A] bg-white focus:outline-none focus:border-[#F59E0B] font-mono"
                  />
                ) : (
                  githubUrl ? (
                    <a href={githubUrl.startsWith('http') ? githubUrl : `https://github.com/${githubUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-[#0F172A] underline">
                      <Github className="w-3.5 h-3.5 text-slate-600" />
                      <span>{githubUrl}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Not specified</span>
                  )
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Personal Portfolio URL</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="e.g. https://myportfolio.dev"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-[#0F172A] bg-white focus:outline-none focus:border-[#F59E0B] font-mono"
                  />
                ) : (
                  portfolioUrl ? (
                    <a href={portfolioUrl.startsWith('http') ? portfolioUrl : `https://${portfolioUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-[#0F172A] underline">
                      <Globe className="w-3.5 h-3.5 text-slate-600" />
                      <span>{portfolioUrl}</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Not specified</span>
                  )
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">LinkedIn Profile URL</span>
                {isEditing ? (
                  <input
                    type="text"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="e.g. https://linkedin.com/in/user"
                    className="w-full px-2.5 py-1.5 text-xs rounded border border-slate-200 text-[#0F172A] bg-white focus:outline-none focus:border-[#F59E0B] font-mono"
                  />
                ) : (
                  linkedinUrl ? (
                    <a href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://linkedin.com/in/${linkedinUrl}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-800 hover:text-[#0F172A] underline">
                      <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                      <span>LinkedIn Link</span>
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">Not specified</span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
