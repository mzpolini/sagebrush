/**
 * Theme definitions extracted from demo
 * Each theme includes colors optimized for cannabis industry + investing
 */

export type ThemeName =
  | 'purplehaze'
  | 'goldenhour'
  | 'trichome'
  | 'westcoast'
  | 'tropical'
  | 'laboratory'
  | 'neon'
  | 'champagne';

export interface ThemeConfig {
  name: string;
  subtitle: string;
  philosophy: string;
  icon: string;
  colors: {
    bg: string;
    card: string;
    border: string;
    text: string;
    textMuted: string;
    primary: string;
    primaryLight: string;
    primaryDark: string;
    accent: string;
    accentLight: string;
    warning: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    chartColors: [string, string, string, string];
  };
}

export const themes: Record<ThemeName, ThemeConfig> = {
  purplehaze: {
    name: 'Purple Haze',
    subtitle: 'Cannabis Royalty Meets Wall Street',
    philosophy: 'Legendary strains deserve legendary wealth. Purple = premium cannabis + prosperity.',
    icon: '💜',
    colors: {
      bg: '#faf5ff',
      card: '#ffffff',
      border: '#e9d5ff',
      text: '#1f2937',
      textMuted: '#6b7280',
      primary: '#9333ea',
      primaryLight: '#a855f7',
      primaryDark: '#7e22ce',
      accent: '#f59e0b',
      accentLight: '#fbbf24',
      warning: '#ec4899',
      gradientFrom: '#c084fc',
      gradientVia: '#a855f7',
      gradientTo: '#9333ea',
      chartColors: ['#9333ea', '#a855f7', '#c084fc', '#e9d5ff'],
    },
  },
  goldenhour: {
    name: 'Golden Hour',
    subtitle: 'Sunset, Harvest, Wealth',
    philosophy: 'The magic hour when the sun hits the canopy. Warm, optimistic, profitable.',
    icon: '🌅',
    colors: {
      bg: '#fffbeb',
      card: '#ffffff',
      border: '#fde68a',
      text: '#1f2937',
      textMuted: '#78716c',
      primary: '#f59e0b',
      primaryLight: '#fbbf24',
      primaryDark: '#d97706',
      accent: '#ea580c',
      accentLight: '#fb923c',
      warning: '#dc2626',
      gradientFrom: '#fbbf24',
      gradientVia: '#f59e0b',
      gradientTo: '#ea580c',
      chartColors: ['#f59e0b', '#fb923c', '#fbbf24', '#fde68a'],
    },
  },
  trichome: {
    name: 'Trichome',
    subtitle: 'Crystal Clear Data',
    philosophy: 'Like examining premium flower under magnification. Clean, precise, valuable.',
    icon: '💎',
    colors: {
      bg: '#f8fafc',
      card: '#ffffff',
      border: '#cbd5e1',
      text: '#0f172a',
      textMuted: '#64748b',
      primary: '#6366f1',
      primaryLight: '#818cf8',
      primaryDark: '#4f46e5',
      accent: '#8b5cf6',
      accentLight: '#a78bfa',
      warning: '#06b6d4',
      gradientFrom: '#c7d2fe',
      gradientVia: '#818cf8',
      gradientTo: '#6366f1',
      chartColors: ['#6366f1', '#818cf8', '#a78bfa', '#c7d2fe'],
    },
  },
  westcoast: {
    name: 'West Coast',
    subtitle: 'Ocean, Sky, Innovation',
    philosophy: 'Where cannabis culture was born. Blue oceans, blue skies, blue-chip returns.',
    icon: '🌊',
    colors: {
      bg: '#f0f9ff',
      card: '#ffffff',
      border: '#bae6fd',
      text: '#0c4a6e',
      textMuted: '#475569',
      primary: '#0ea5e9',
      primaryLight: '#38bdf8',
      primaryDark: '#0284c7',
      accent: '#14b8a6',
      accentLight: '#2dd4bf',
      warning: '#f97316',
      gradientFrom: '#7dd3fc',
      gradientVia: '#38bdf8',
      gradientTo: '#0ea5e9',
      chartColors: ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd'],
    },
  },
  tropical: {
    name: 'Tropical',
    subtitle: 'Island Growth, Exotic Returns',
    philosophy: 'Think dispensaries in Hawaii, Bali, Caribbean. Vibrant, lush, thriving.',
    icon: '🌴',
    colors: {
      bg: '#ecfdf5',
      card: '#ffffff',
      border: '#a7f3d0',
      text: '#064e3b',
      textMuted: '#475569',
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      accent: '#f59e0b',
      accentLight: '#fbbf24',
      warning: '#ec4899',
      gradientFrom: '#6ee7b7',
      gradientVia: '#34d399',
      gradientTo: '#10b981',
      chartColors: ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0'],
    },
  },
  laboratory: {
    name: 'Laboratory',
    subtitle: 'Precision Medicine, Precision Investing',
    philosophy: 'Cannabis is medicine. Testing labs, white coats, data-driven decisions.',
    icon: '⚗️',
    colors: {
      bg: '#ffffff',
      card: '#f9fafb',
      border: '#d1d5db',
      text: '#111827',
      textMuted: '#6b7280',
      primary: '#3b82f6',
      primaryLight: '#60a5fa',
      primaryDark: '#2563eb',
      accent: '#10b981',
      accentLight: '#34d399',
      warning: '#f59e0b',
      gradientFrom: '#93c5fd',
      gradientVia: '#60a5fa',
      gradientTo: '#3b82f6',
      chartColors: ['#3b82f6', '#60a5fa', '#93c5fd', '#dbeafe'],
    },
  },
  neon: {
    name: 'Neon Nights',
    subtitle: 'Vegas Meets Amsterdam',
    philosophy: 'Bold, unapologetic, high-energy. Where nightlife meets high finance.',
    icon: '⚡',
    colors: {
      bg: '#0a0a0a',
      card: '#1a1a1a',
      border: '#2a2a2a',
      text: '#ffffff',
      textMuted: '#a3a3a3',
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      accent: '#f0abfc',
      accentLight: '#f5d0fe',
      warning: '#facc15',
      gradientFrom: '#34d399',
      gradientVia: '#10b981',
      gradientTo: '#059669',
      chartColors: ['#10b981', '#34d399', '#6ee7b7', '#d1fae5'],
    },
  },
  champagne: {
    name: 'Champagne',
    subtitle: 'Celebrating Success, Premium Everything',
    philosophy: 'Popping bottles when licenses drop. Luxury, celebration, victory.',
    icon: '🍾',
    colors: {
      bg: '#fefce8',
      card: '#ffffff',
      border: '#fde047',
      text: '#713f12',
      textMuted: '#78716c',
      primary: '#ca8a04',
      primaryLight: '#eab308',
      primaryDark: '#a16207',
      accent: '#7c3aed',
      accentLight: '#a78bfa',
      warning: '#dc2626',
      gradientFrom: '#fde047',
      gradientVia: '#eab308',
      gradientTo: '#ca8a04',
      chartColors: ['#ca8a04', '#eab308', '#fde047', '#fef08a'],
    },
  },
};

/**
 * Convert hex color to RGB values for Tailwind's opacity modifier syntax
 * Example: #9333ea -> 147 51 234
 */
export function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0 0 0';

  return `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`;
}

/**
 * Get theme by name with fallback to default
 */
export function getTheme(themeName?: string): ThemeConfig {
  const name = (themeName || 'purplehaze') as ThemeName;
  return themes[name] || themes.purplehaze;
}

/**
 * Get all available theme names
 */
export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}
