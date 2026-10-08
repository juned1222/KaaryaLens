import { CandidateProfile } from '../types';

export interface CompletenessItem {
  key: string;
  label: string;
  status: 'PRESENT' | 'MISSING' | 'UNCLEAR';
  importance: 'HIGH' | 'RECOMMENDED';
  roleValue: 'HIGH-VALUE' | 'MEDIUM-VALUE' | 'LOW-VALUE' | 'HIGH' | 'RECOMMENDED';
  value?: string;
  recommendation?: string;
}

export interface CompletenessResult {
  score: number;
  items: CompletenessItem[];
  recommendations: string[];
}

/**
 * Determines whether a string is a placeholder or ambiguous value.
 */
function isPlaceholder(val: string | null | undefined): boolean {
  if (!val) return false;
  const clean = val.trim().toLowerCase();
  const placeholders = [
    'none',
    'n/a',
    'not provided',
    'not found',
    'unknown',
    'placeholder',
    'tbd',
    'null',
    'undefined',
    'your email',
    'your phone',
    '123-456-7890',
    '0000000000',
    '000-000-0000'
  ];
  return placeholders.some(p => clean === p || clean.includes('not provided') || clean.includes('not found'));
}

/**
 * Categorizes a target role title into technical, design, managerial, or default.
 */
export function getRoleCategory(title: string | null | undefined): 'TECHNICAL' | 'DESIGN' | 'MANAGERIAL' | 'DEFAULT' {
  if (!title) return 'DEFAULT';
  const clean = title.toLowerCase();
  
  if (
    clean.includes('design') || 
    clean.includes('ui') || 
    clean.includes('ux') || 
    clean.includes('creative') || 
    clean.includes('artist') || 
    clean.includes('graphics')
  ) {
    return 'DESIGN';
  }

  if (
    clean.includes('product') || 
    clean.includes('manager') || 
    clean.includes('pm') || 
    clean.includes('scrum') || 
    clean.includes('business analyst') || 
    clean.includes('marketing') || 
    clean.includes('sales') || 
    clean.includes('director') || 
    clean.includes('lead')
  ) {
    return 'MANAGERIAL';
  }

  if (
    clean.includes('software') || 
    clean.includes('developer') || 
    clean.includes('engineer') || 
    clean.includes('tech') || 
    clean.includes('backend') || 
    clean.includes('frontend') || 
    clean.includes('fullstack') || 
    clean.includes('ai') || 
    clean.includes('ml') || 
    clean.includes('data') || 
    clean.includes('cloud') || 
    clean.includes('devops') || 
    clean.includes('systems')
  ) {
    return 'TECHNICAL';
  }

  return 'DEFAULT';
}

/**
 * Computes a completely deterministic profile completeness score and missing field intelligence audit.
 */
export function calculateProfileCompleteness(profile: CandidateProfile, targetRoleTitle?: string): CompletenessResult {
  const roleCategory = getRoleCategory(targetRoleTitle || profile.targetRole);
  const items: CompletenessItem[] = [];

  // 1. Full Name
  const nameVal = profile.name;
  let nameStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!nameVal || nameVal.trim().length === 0) {
    nameStatus = 'MISSING';
  } else if (isPlaceholder(nameVal)) {
    nameStatus = 'UNCLEAR';
  }
  items.push({
    key: 'name',
    label: 'Full Name',
    status: nameStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: nameVal || undefined,
    recommendation: nameStatus === 'MISSING' 
      ? 'Full Name is required on your profile. Please add your legal or professional name.' 
      : nameStatus === 'UNCLEAR' 
      ? 'Review the extracted Full Name detail to resolve ambiguous or placeholder values.' 
      : undefined
  });

  // 2. Email
  const emailVal = profile.email;
  let emailStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!emailVal || emailVal.trim().length === 0) {
    emailStatus = 'MISSING';
  } else if (!emailVal.includes('@') || isPlaceholder(emailVal)) {
    emailStatus = 'UNCLEAR';
  }
  items.push({
    key: 'email',
    label: 'Email',
    status: emailStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: emailVal || undefined,
    recommendation: emailStatus === 'MISSING'
      ? 'Add your email address to ensure employers and verified networks can reach you.'
      : emailStatus === 'UNCLEAR'
      ? 'Review the extracted Email detail to resolve ambiguous or placeholder values.'
      : undefined
  });

  // 3. Phone
  const phoneVal = profile.phone;
  let phoneStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!phoneVal || phoneVal.trim().length === 0) {
    phoneStatus = 'MISSING';
  } else if (isPlaceholder(phoneVal) || !/[0-9]/.test(phoneVal)) {
    phoneStatus = 'UNCLEAR';
  }
  items.push({
    key: 'phone',
    label: 'Phone',
    status: phoneStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: phoneVal || undefined,
    recommendation: phoneStatus === 'MISSING'
      ? 'Add your phone number to facilitate direct outreach and scheduling.'
      : phoneStatus === 'UNCLEAR'
      ? 'Review the extracted Phone detail to resolve ambiguous or placeholder values.'
      : undefined
  });

  // 4. Location
  const locVal = profile.location || profile.currentLocation;
  let locStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!locVal || locVal.trim().length === 0) {
    locStatus = 'MISSING';
  } else if (isPlaceholder(locVal)) {
    locStatus = 'UNCLEAR';
  }
  items.push({
    key: 'location',
    label: 'Location',
    status: locStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: locVal || undefined,
    recommendation: locStatus === 'MISSING'
      ? 'Add your location (city, country) to indicate work authorization and relocation preferences.'
      : locStatus === 'UNCLEAR'
      ? 'Review the extracted Location detail to resolve ambiguous or placeholder values.'
      : undefined
  });

  // 5. Education
  const eduVal = profile.education;
  let eduStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  const hasEduItems = Array.isArray(eduVal) && eduVal.length > 0;
  const hasEduString = typeof eduVal === 'string' && eduVal.trim().length > 0;
  if (!eduVal || (!hasEduItems && !hasEduString)) {
    eduStatus = 'MISSING';
  } else if (typeof eduVal === 'string' && isPlaceholder(eduVal)) {
    eduStatus = 'UNCLEAR';
  }
  items.push({
    key: 'education',
    label: 'Education',
    status: eduStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: hasEduString ? (eduVal as string) : hasEduItems ? `${(eduVal as any)[0].degree} at ${(eduVal as any)[0].institution}` : undefined,
    recommendation: eduStatus === 'MISSING'
      ? 'Include your education details to establish your academic credentials.'
      : eduStatus === 'UNCLEAR'
      ? 'Review the extracted Education detail to resolve ambiguous or placeholder values.'
      : undefined
  });

  // 6. Skills
  const skillsVal = profile.claimedSkills || profile.skills;
  let skillsStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  const hasSkills = Array.isArray(skillsVal) && skillsVal.length > 0;
  if (!hasSkills) {
    skillsStatus = 'MISSING';
  }
  items.push({
    key: 'skills',
    label: 'Skills',
    status: skillsStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: hasSkills ? `${skillsVal.length} skills` : undefined,
    recommendation: skillsStatus === 'MISSING'
      ? 'List your key technical skills on your resume so parser and fit engines can map your competencies.'
      : undefined
  });

  // 7. Experience
  const expVal = profile.experience;
  let expStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  const hasExpItems = Array.isArray(expVal) && expVal.length > 0;
  const hasExpString = typeof expVal === 'string' && expVal.trim().length > 0;
  if (!expVal || (!hasExpItems && !hasExpString)) {
    expStatus = 'MISSING';
  } else if (typeof expVal === 'string' && isPlaceholder(expVal)) {
    expStatus = 'UNCLEAR';
  }
  items.push({
    key: 'experience',
    label: 'Experience',
    status: expStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: hasExpString ? (expVal as string) : hasExpItems ? `${(expVal as any)[0].role} at ${(expVal as any)[0].company}` : undefined,
    recommendation: expStatus === 'MISSING'
      ? 'Add professional experience records to detail your career progression.'
      : expStatus === 'UNCLEAR'
      ? 'Review the extracted Experience detail to resolve ambiguous or placeholder values.'
      : undefined
  });

  // 8. Projects
  const projVal = profile.projects;
  let projStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  const hasProjects = Array.isArray(projVal) && projVal.length > 0;
  if (!hasProjects) {
    projStatus = 'MISSING';
  }
  items.push({
    key: 'projects',
    label: 'Projects',
    status: projStatus,
    importance: 'HIGH',
    roleValue: 'HIGH',
    value: hasProjects ? `${projVal.length} projects` : undefined,
    recommendation: projStatus === 'MISSING'
      ? 'Include representative projects to demonstrate hands-on application of your skills.'
      : undefined
  });

  // RECOMMENDED FIELDS (ROLE-DEPENDENT IMPORTANCE)
  
  // LinkedIn Link
  const linkedinUrl = profile.links?.linkedin || (profile as any).linkedinUrl;
  let linkedinStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!linkedinUrl || linkedinUrl.trim().length === 0) {
    linkedinStatus = 'MISSING';
  } else if (isPlaceholder(linkedinUrl)) {
    linkedinStatus = 'UNCLEAR';
  }
  const linkedinRoleVal = roleCategory === 'MANAGERIAL' || roleCategory === 'DEFAULT' ? 'HIGH-VALUE' : 'MEDIUM-VALUE';
  items.push({
    key: 'linkedin',
    label: 'LinkedIn',
    status: linkedinStatus,
    importance: 'RECOMMENDED',
    roleValue: linkedinRoleVal,
    value: linkedinUrl || undefined,
    recommendation: linkedinStatus === 'MISSING'
      ? linkedinRoleVal === 'HIGH-VALUE'
        ? 'Add your LinkedIn profile to strengthen your professional identity for this leadership/business role.'
        : 'Add your LinkedIn profile to expand your professional network and visibility.'
      : linkedinStatus === 'UNCLEAR'
      ? 'Review the extracted LinkedIn URL.'
      : undefined
  });

  // GitHub Link
  const githubUrl = profile.links?.github || profile.githubUsername || (profile as any).githubUrl;
  let githubStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!githubUrl || githubUrl.trim().length === 0) {
    githubStatus = 'MISSING';
  } else if (isPlaceholder(githubUrl)) {
    githubStatus = 'UNCLEAR';
  }
  const githubRoleVal = roleCategory === 'TECHNICAL' ? 'HIGH-VALUE' : roleCategory === 'DESIGN' ? 'MEDIUM-VALUE' : 'LOW-VALUE';
  items.push({
    key: 'github',
    label: 'GitHub',
    status: githubStatus,
    importance: 'RECOMMENDED',
    roleValue: githubRoleVal,
    value: githubUrl || undefined,
    recommendation: githubStatus === 'MISSING'
      ? githubRoleVal === 'HIGH-VALUE'
        ? 'Add a GitHub profile or representative repository to provide essential technical code evidence.'
        : 'Optionally add a GitHub link if you have open-source contributions or technical projects.'
      : githubStatus === 'UNCLEAR'
      ? 'Review the extracted GitHub link.'
      : undefined
  });

  // Portfolio Link
  const portfolioUrl = profile.links?.portfolio || profile.portfolioUrl;
  let portfolioStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  if (!portfolioUrl || portfolioUrl.trim().length === 0) {
    portfolioStatus = 'MISSING';
  } else if (isPlaceholder(portfolioUrl)) {
    portfolioStatus = 'UNCLEAR';
  }
  const portfolioRoleVal = roleCategory === 'DESIGN' ? 'HIGH-VALUE' : 'MEDIUM-VALUE';
  items.push({
    key: 'portfolio',
    label: 'Portfolio',
    status: portfolioStatus,
    importance: 'RECOMMENDED',
    roleValue: portfolioRoleVal,
    value: portfolioUrl || undefined,
    recommendation: portfolioStatus === 'MISSING'
      ? portfolioRoleVal === 'HIGH-VALUE'
        ? 'Add a portfolio link with your 2–3 strongest designs to showcase your creative and UI/UX work.'
        : 'Add a personal portfolio website or interactive demo link to showcase your projects.'
      : portfolioStatus === 'UNCLEAR'
      ? 'Review the extracted Portfolio link.'
      : undefined
  });

  // Certifications
  const certsVal = profile.certifications;
  let certsStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  const hasCerts = Array.isArray(certsVal) && certsVal.length > 0;
  if (!hasCerts) {
    certsStatus = 'MISSING';
  }
  items.push({
    key: 'certifications',
    label: 'Certifications',
    status: certsStatus,
    importance: 'RECOMMENDED',
    roleValue: 'RECOMMENDED',
    value: hasCerts ? `${certsVal.length} certs` : undefined,
    recommendation: certsStatus === 'MISSING'
      ? 'Add any professional certifications to validate your structured training and expertise.'
      : undefined
  });

  // Achievements
  const achVal = profile.achievements;
  let achStatus: 'PRESENT' | 'MISSING' | 'UNCLEAR' = 'PRESENT';
  const hasAch = Array.isArray(achVal) && achVal.length > 0;
  if (!hasAch) {
    achStatus = 'MISSING';
  }
  items.push({
    key: 'achievements',
    label: 'Achievements',
    status: achStatus,
    importance: 'RECOMMENDED',
    roleValue: 'RECOMMENDED',
    value: hasAch ? `${achVal.length} achievements` : undefined,
    recommendation: achStatus === 'MISSING'
      ? 'List key achievements or awards to demonstrate outstanding performance milestones.'
      : undefined
  });

  // CALCULATE DETERMINISTIC SCORE
  let score = 0;

  // Identity & Contact (20%): Name (8), Email (6), Phone (6)
  if (nameStatus === 'PRESENT') score += 8;
  else if (nameStatus === 'UNCLEAR') score += 4;

  if (emailStatus === 'PRESENT') score += 6;
  else if (emailStatus === 'UNCLEAR') score += 3;

  if (phoneStatus === 'PRESENT') score += 6;
  else if (phoneStatus === 'UNCLEAR') score += 3;

  // Education (15%)
  if (eduStatus === 'PRESENT') score += 15;
  else if (eduStatus === 'UNCLEAR') score += 7;

  // Skills (20%)
  if (skillsStatus === 'PRESENT') score += 20;

  // Experience / Projects (25%): Exp (15), Proj (10)
  if (expStatus === 'PRESENT') score += 15;
  else if (expStatus === 'UNCLEAR') score += 7;

  if (projStatus === 'PRESENT') score += 10;

  // Professional links (10%): LinkedIn (4), GitHub (3), Portfolio (3)
  if (linkedinStatus === 'PRESENT') score += 4;
  else if (linkedinStatus === 'UNCLEAR') score += 2;

  if (githubStatus === 'PRESENT') score += 3;
  else if (githubStatus === 'UNCLEAR') score += 1;

  if (portfolioStatus === 'PRESENT') score += 3;
  else if (portfolioStatus === 'UNCLEAR') score += 1;

  // Additional credentials (10%): Certs (5), Achs (5)
  if (certsStatus === 'PRESENT') score += 5;
  if (achStatus === 'PRESENT') score += 5;

  // Filter recommendations
  const recs = items
    .filter(item => item.status !== 'PRESENT' && item.recommendation)
    .map(item => item.recommendation!);

  return {
    score: Math.min(100, Math.max(0, Math.round(score))),
    items,
    recommendations: recs
  };
}
