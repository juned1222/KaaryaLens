/**
 * KaaryaLens Official Brand Tokens & Assets
 * Locked Palette & Design System
 */

export const BRAND_TOKENS = {
  name: 'KaaryaLens',
  devanagariName: 'कार्यLens',
  tagline: 'See beyond the resume.',
  philosophy: 'Claim → Evidence → Ability → Readiness → Growth',
  colors: {
    primaryNavy: '#0F172A',
    accentOrange: '#F59E0B',
    creamBg: '#FAF8F5',
    whiteSurface: '#FFFFFF',
    successGreen: '#16A34A',
    warningAmber: '#FBBF24',
    errorRed: '#EF4444',
    mutedText: '#64748B',
    borderSubtle: '#E2E8F0',
    cardBorder: 'rgba(15, 23, 42, 0.08)',
  },
  radius: {
    standardCard: '12px',
    primaryPanel: '16px',
    pill: '9999px',
  },
  scoringWeights: {
    skillFit: 0.40,
    evidence: 0.25,
    projectFit: 0.15,
    interviewReadiness: 0.15,
    profileConsistency: 0.05,
  },
} as const;

export type BrandColors = typeof BRAND_TOKENS.colors;
