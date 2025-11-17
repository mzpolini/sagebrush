export const US_STATES = [
  'Virginia',
  'Florida',
  'Georgia',
  'North Carolina',
  'Maryland',
  'Delaware',
] as const;

export const VIRGINIA_COUNTIES = [
  'Fairfax',
  'Arlington',
  'Loudoun',
  'Richmond City',
  'Virginia Beach',
  'Alexandria',
  'Norfolk',
  'Chesapeake',
] as const;

export const FLORIDA_COUNTIES = [
  'Miami-Dade',
  'Broward',
  'Palm Beach',
  'Hillsborough',
  'Orange',
  'Duval',
] as const;

export const LICENSE_TYPES = [
  'dispensary',
  'cultivation',
  'processing',
  'microbusiness',
  'delivery',
] as const;

export const COMPETITION_THRESHOLDS = {
  low: { max: 50, color: 'emerald' },
  medium: { max: 200, color: 'cyan' },
  high: { max: 500, color: 'amber' },
  extreme: { max: Infinity, color: 'red' },
};
