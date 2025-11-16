import { type ThemeName } from './themes';

/**
 * Get the theme from environment variable (server-side only)
 * This runs at build time for static optimization
 */
export function getServerTheme(): ThemeName {
  const theme = process.env.NEXT_PUBLIC_THEME as ThemeName | undefined;

  // Validate theme name
  const validThemes: ThemeName[] = [
    'purplehaze',
    'goldenhour',
    'trichome',
    'westcoast',
    'tropical',
    'laboratory',
    'neon',
    'champagne',
  ];

  if (theme && validThemes.includes(theme)) {
    return theme;
  }

  // Default to purplehaze if not set or invalid
  return 'purplehaze';
}
