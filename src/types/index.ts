export type ExperienceLevel = 'Fresher (0-1 yr)' | 'Junior (1-3 yrs)' | 'Mid-Level (3-5 yrs)' | 'Senior (5+ yrs)';

export interface ClaimedSkill {
  name: string;
  claimedLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  source?: 'resume' | 'linkedin' | 'portfolio' | 'github';
}

export interface CandidateProject {
  title: string;
  tech: string[];
  description: string;
  repoUrl?: string;
  liveUrl?: string;
  source?: string;
}

export interface GitHubRepoSummary {
  name: string;
  description: string;
  language: string;
  stars: number;
  topics: string[];
  updatedAt: string;
  htmlUrl: string;
  readmeHighlight?: string;
  demonstratedSkills?: string[];
}

export interface ResumeScanMetadata {
  fileName?: string;
  fileSizeBytes?: number;
  extractedMethod: 'native-pdf' | 'scanned-ocr' | 'docx-text' | 'manual-input';
  parseConfidenceScore: number; // 0-100
  pagesCount?: number;
  unparsedSections?: string[];
  extractionTimestamp: string;
}

export interface CandidateProfile {
  id: string;
  name: string | null;
  email: string | null;
  phone?: string | null;
  location?: string | null;
  currentLocation: string | null;
  headline: string | null;
  summary: string | null;
  yearsOfExperience: number | null;
  targetRole: string | null;
  education: Array<{ degree: string; institution: string; year?: string }> | string | null;
  experience: Array<{ company: string; role: string; period: string; highlights: string[] }> | string | null;
  skills: string[] | ClaimedSkill[] | null;
  claimedSkills: ClaimedSkill[];
  projects: CandidateProject[];
  certifications?: string[];
  achievements?: string[];
  internships?: Array<{ company: string; role: string; period: string }>;
  links?: { github?: string; portfolio?: string; linkedin?: string };
  githubUsername?: string;
  githubRepos?: GitHubRepoSummary[];
  portfolioUrl?: string;
  resumeRawText?: string;
  scanMetadata?: ResumeScanMetadata;
  updatedAt: string;
}

export interface NormalizedJobProfile {
  role: string;
  company: string;
  location: string;
  experience_range: string;
  must_have_skills: string[];
  good_to_have_skills: string[];
  responsibilities: string[];
  qualifications: string[];
  interview_signals: string[];
}

export interface RoleInput {
  title: string;
  employer: string;
  location: string;
  experienceLevel: ExperienceLevel;
  jdRaw: string;
  companyBenchmarkId?: string;
}

export type EvidenceStatus = 'strong' | 'moderate' | 'limited' | 'missing' | 'conflicting' | 'unknown';

export interface EvidenceItem {
  skill: string;
  claim_status: 'claimed' | 'unclaimed';
  evidence_status: EvidenceStatus;
  evidence_strength: number; // 0-100
  sources: string[]; // e.g. ["resume", "github:distributed-event-ledger", "interview:q1"]
  explanation: string;
  interview_validated?: boolean;
  interview_validation_status?: 'supported' | 'contradicted' | 'untested';
}

export interface SkillMatch {
  skill: string;
  requiredImportance: 'Must-Have' | 'Good-to-Have' | 'Bonus';
  status: 'Matched' | 'Partial' | 'Missing';
  claimedLevel?: string;
  evidenceFound: string;
  evidenceStrength: 'Strong' | 'Moderate' | 'Limited' | 'None';
  evidencePercentage: number;
  verificationStatus: 'Evidence strong' | 'Evidence moderate' | 'Evidence limited' | 'Verification recommended' | 'Claim not sufficiently supported' | 'Unclaimed requirement';
  notes: string;
  evidenceItem?: EvidenceItem;
}

export interface ClaimEvidenceConflict {
  skill: string;
  claimed: string;
  evidence: string;
  evidenceStrength: 'Strong' | 'Moderate' | 'Limited';
  evidencePercentage: number;
  recommendation: string;
  sources?: string[];
}

export interface CareerPathRecommendation {
  id: string;
  title: string;
  fitPercentage: number;
  gapCount: number;
  requiredSkillGaps: string[];
  milestones: {
    q1: string;
    q2: string;
  };
  suggestedProjects: Array<{
    name: string;
    description: string;
    techStack: string[];
  }>;
  thirtyDayPlan: string[];
}

export interface MarketSignalItem {
  role: string;
  location: string;
  experience_band: string;
  skill: string;
  importance: 'critical' | 'high' | 'medium';
  source?: string;
  source_date?: string;
  sample_size?: number;
  is_verified_dataset?: boolean;
}

export interface IndiaMarketLens {
  locationContext: string;
  tierClassification: string;
  hiringBarExplanation: string;
  fresherRealities: string;
  roleSignalDisclaimer: string; // "Role-specific signal based on the supplied job description."
  estimatedCtcRange: string;
  topCompetencyPriorities: string[];
  market_signals?: MarketSignalItem[];
}

export interface DeterministicScoreBreakdown {
  skillFitScore: number;
  skillFitWeight: number; // 0.40
  evidenceScore: number;
  evidenceWeight: number; // 0.25
  projectFitScore: number;
  projectFitWeight: number; // 0.15
  interviewReadinessScore: number;
  interviewReadinessWeight: number; // 0.15
  consistencyScore: number;
  consistencyWeight: number; // 0.05
  finalReadinessScore: number;
  formulaDescription: string;
  reproducibilityHash?: string;
}

export interface AnalysisResult {
  id: string;
  roleId: string;
  roleTitle: string;
  employer: string;
  location: string;
  experienceLevel: ExperienceLevel;
  readinessScore: number;
  skillFitScore: number;
  evidenceScore: number;
  projectFitScore: number;
  interviewReadinessScore: number;
  consistencyScore: number;
  scoreBreakdown: DeterministicScoreBreakdown;
  matchedSkills: SkillMatch[];
  partialSkills: SkillMatch[];
  missingSkills: SkillMatch[];
  claimEvidenceConflicts: ClaimEvidenceConflict[];
  evidenceDossier?: Record<string, EvidenceItem>;
  indiaMarketLens: IndiaMarketLens;
  interviewFocusAreas: string[];
  candidateProfile?: CandidateProfile;
  careerPaths: CareerPathRecommendation[];
  companyBenchmark?: any;
  actionPlan: {
    week1: string[];
    week2: string[];
    week3: string[];
    week4: string[];
  };
  isDemoMode?: boolean;
  analysisMode?: 'LIVE' | 'DEMO';
  candidateSource?: 'UPLOADED_RESUME' | 'NONE' | 'DEMO_DATA';
  jobSource?: 'USER_PROVIDED_JD' | 'NONE' | 'DEMO_DATA';
  githubSource?: 'GITHUB_API' | 'NONE' | 'DEMO_DATA';
  companySource?: 'CURATED_COMPANY_BENCHMARK' | 'NONE' | 'DEMO_DATA';
  finalModelUsed?: string;
  fallbackRequired?: boolean;
  scoreSensitivity?: {
    scoreA: { readinessScore: number; skillFitScore: number; explanation: string };
    scoreB: { readinessScore: number; skillFitScore: number; explanation: string };
    discrepancyProof: string;
  };
  createdAt: string;
}

export interface InterviewQuestion {
  id: string;
  questionNumber: number;
  question: string;
  category: string;
  targetSkill: string;
  difficulty: 'Junior' | 'Mid' | 'Senior';
  rationale: string;
  idealKeyPoints: string[];
  userResponse?: string;
  evaluation?: InterviewQuestionEvaluation;
}

export interface InterviewQuestionEvaluation {
  technicalAccuracy: number; // 0-100
  depth: number; // 0-100
  clarity: number; // 0-100
  roleRelevance: number; // 0-100
  problemSolving?: number; // 0-100
  overallScore: number; // 0-100
  conciseImprovement: string;
  benchmarkModelAnswer: string;
  evaluatedAt: string;
  evidenceImpact?: {
    skillValidated: string;
    previousEvidenceStrength: number;
    newEvidenceStrength: number;
    validationStatus: 'supported' | 'needs_verification';
  };
}

export interface InterviewSession {
  id: string;
  roleId: string;
  roleTitle: string;
  employer: string;
  currentQuestionIndex: number;
  questions: InterviewQuestion[];
  overallInterviewScore?: number;
  status: 'in-progress' | 'completed';
  createdAt: string;
  updatedAt: string;
}
