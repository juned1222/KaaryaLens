import { 
  DeterministicScoreBreakdown, 
  SkillMatch, 
  ClaimEvidenceConflict, 
  EvidenceItem, 
  CandidateProfile 
} from '../types';
import { BRAND_TOKENS } from './brand';
import { areSkillsEquivalent, normalizeSkillName } from './skillNormalization';

export interface ScoringInputs {
  matchedSkills: SkillMatch[];
  partialSkills: SkillMatch[];
  missingSkills: SkillMatch[];
  candidateProjectsCount: number;
  relevantProjectsCount: number;
  experienceYears: number;
  requiredYears: number;
  claimConflictsCount: number;
  existingInterviewScore?: number;
}

/**
 * Generates a normalized evidence object for every important skill.
 * Strictly adheres to Section 5:
 * {
 *   skill: "AWS",
 *   claim_status: "claimed",
 *   evidence_status: "limited",
 *   evidence_strength: 35,
 *   sources: ["resume"],
 *   explanation: "AWS is listed on the resume, but no strong deployment or infrastructure evidence was provided."
 * }
 */
export function buildNormalizedEvidenceDossier(
  skills: SkillMatch[],
  candidateProfile: CandidateProfile,
  conflicts: ClaimEvidenceConflict[] = []
): Record<string, EvidenceItem> {
  const dossier: Record<string, EvidenceItem> = {};

  for (const s of skills) {
    const canonicalName = normalizeSkillName(s.skill);
    const isClaimed = candidateProfile.claimedSkills?.some(
      (c) => areSkillsEquivalent(c.name, s.skill)
    ) || false;

    // Check if there is an active conflict
    const conflict = conflicts.find((c) => areSkillsEquivalent(c.skill, s.skill));

    // Inspect sources
    const sources: string[] = [];
    if (isClaimed) sources.push('resume');

    // Check GitHub repos
    const matchingRepo = candidateProfile.githubRepos?.find((r) => 
      r.language?.toLowerCase() === canonicalName.toLowerCase() ||
      r.topics?.some((t) => areSkillsEquivalent(t, s.skill)) ||
      r.description?.toLowerCase().includes(canonicalName.toLowerCase())
    );

    if (matchingRepo) {
      sources.push(`github:${matchingRepo.name}`);
    }

    // Determine evidence status
    let evidenceStatus: EvidenceItem['evidence_status'] = 'unknown';
    let strength = s.evidencePercentage || 30;

    if (s.evidenceStrength === 'Strong') {
      evidenceStatus = 'strong';
    } else if (s.evidenceStrength === 'Moderate') {
      evidenceStatus = 'moderate';
    } else if (s.evidenceStrength === 'Limited') {
      evidenceStatus = 'limited';
    } else if (s.status === 'Missing') {
      evidenceStatus = isClaimed ? 'conflicting' : 'missing';
    }

    let explanation = s.notes || '';
    if (!explanation) {
      if (evidenceStatus === 'strong') {
        explanation = `${s.skill} is substantiated by verified repository implementations and projects.`;
      } else if (evidenceStatus === 'limited') {
        explanation = `${s.skill} is asserted in candidate profile, but available public artifacts show limited deployment evidence.`;
      } else if (evidenceStatus === 'missing') {
        explanation = `No concrete evidence or artifacts found in submitted materials for ${s.skill}.`;
      } else {
        explanation = `Evidence level for ${s.skill} is evaluated at ${strength}%. Verification recommended during technical rounds.`;
      }
    }

    dossier[canonicalName] = {
      skill: canonicalName,
      claim_status: isClaimed ? 'claimed' : 'unclaimed',
      evidence_status: evidenceStatus,
      evidence_strength: strength,
      sources,
      explanation,
    };
  }

  return dossier;
}

/**
 * Deterministic scoring engine for KaaryaLens.
 * Strictly adheres to the formula:
 * - Skill Fit: 40%
 * - Evidence Strength: 25%
 * - Project/Experience Fit: 15%
 * - Interview Readiness: 15%
 * - Profile Consistency: 5%
 *
 * Every final score is strictly reproducible given identical inputs.
 */
export function calculateJobReadinessScore(inputs: ScoringInputs): DeterministicScoreBreakdown {
  const {
    matchedSkills,
    partialSkills,
    missingSkills,
    candidateProjectsCount,
    relevantProjectsCount,
    experienceYears,
    requiredYears,
    claimConflictsCount,
    existingInterviewScore = 70, // Default baseline readiness until interview taken
  } = inputs;

  // 1. Skill Fit Score (40% weight)
  // Weighted by importance: Must-Have = 3, Good-to-Have = 1.5, Bonus = 1
  let totalWeight = 0;
  let earnedScore = 0;

  const scoreForImportance = (importance: 'Must-Have' | 'Good-to-Have' | 'Bonus') => {
    switch (importance) {
      case 'Must-Have': return 3.0;
      case 'Good-to-Have': return 1.5;
      case 'Bonus': return 1.0;
    }
  };

  for (const s of matchedSkills) {
    const w = scoreForImportance(s.requiredImportance);
    totalWeight += w;
    earnedScore += w * 1.0;
  }
  for (const s of partialSkills) {
    const w = scoreForImportance(s.requiredImportance);
    totalWeight += w;
    earnedScore += w * 0.55;
  }
  for (const s of missingSkills) {
    const w = scoreForImportance(s.requiredImportance);
    totalWeight += w;
    earnedScore += w * 0.0;
  }

  const rawSkillFit = totalWeight > 0 ? (earnedScore / totalWeight) * 100 : 50;
  const skillFitScore = Math.min(100, Math.max(0, Math.round(rawSkillFit)));

  // 2. Evidence Strength Score (25% weight)
  const skillsWithClaims = [...matchedSkills, ...partialSkills];
  let evidenceSum = 0;
  if (skillsWithClaims.length > 0) {
    for (const s of skillsWithClaims) {
      if (s.evidenceStrength === 'Strong') evidenceSum += 92;
      else if (s.evidenceStrength === 'Moderate') evidenceSum += 65;
      else if (s.evidenceStrength === 'Limited') evidenceSum += 32;
      else evidenceSum += 10;
    }
    evidenceSum = evidenceSum / skillsWithClaims.length;
  } else {
    evidenceSum = 30;
  }
  const evidenceScore = Math.min(100, Math.max(0, Math.round(evidenceSum)));

  // 3. Project / Experience Fit (15% weight)
  const projectPoints = Math.min(60, (relevantProjectsCount * 25) + (candidateProjectsCount * 5));
  const expRatio = requiredYears > 0 ? Math.min(1.2, experienceYears / requiredYears) : 1;
  const expPoints = Math.min(40, expRatio * 40);
  const projectFitScore = Math.min(100, Math.max(0, Math.round(projectPoints + expPoints)));

  // 4. Interview Readiness Score (15% weight)
  const interviewReadinessScore = Math.min(100, Math.max(0, Math.round(existingInterviewScore)));

  // 5. Profile Consistency (5% weight)
  const penalty = Math.min(50, claimConflictsCount * 18);
  const consistencyScore = Math.max(20, Math.min(100, 100 - penalty));

  // Final deterministic composite
  const w = BRAND_TOKENS.scoringWeights;
  const composite = 
    (skillFitScore * w.skillFit) +
    (evidenceScore * w.evidence) +
    (projectFitScore * w.projectFit) +
    (interviewReadinessScore * w.interviewReadiness) +
    (consistencyScore * w.profileConsistency);

  const finalReadinessScore = Math.min(100, Math.max(0, Math.round(composite)));

  const formulaDescription = `Deterministic formula: (${skillFitScore} × 40%) + (${evidenceScore} × 25%) + (${projectFitScore} × 15%) + (${interviewReadinessScore} × 15%) + (${consistencyScore} × 5%) = ${finalReadinessScore}`;
  
  // Deterministic seed signature for repeatability
  const reproducibilityHash = `det-${skillFitScore}-${evidenceScore}-${projectFitScore}-${interviewReadinessScore}-${consistencyScore}`;

  return {
    skillFitScore,
    skillFitWeight: w.skillFit,
    evidenceScore,
    evidenceWeight: w.evidence,
    projectFitScore,
    projectFitWeight: w.projectFit,
    interviewReadinessScore,
    interviewReadinessWeight: w.interviewReadiness,
    consistencyScore,
    consistencyWeight: w.profileConsistency,
    finalReadinessScore,
    formulaDescription,
    reproducibilityHash,
  };
}
