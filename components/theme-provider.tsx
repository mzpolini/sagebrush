'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { getTheme, hexToRgb, type ThemeName } from '@/lib/themes';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeName;
}

export function ThemeProvider({ children, defaultTheme = 'purplehaze' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const themeConfig = getTheme(theme);
    const root = document.documentElement;

    // Apply all theme colors as CSS variables
    root.style.setProperty('--color-bg', hexToRgb(themeConfig.colors.bg));
    root.style.setProperty('--color-card', hexToRgb(themeConfig.colors.card));
    root.style.setProperty('--color-border', hexToRgb(themeConfig.colors.border));
    root.style.setProperty('--color-text', hexToRgb(themeConfig.colors.text));
    root.style.setProperty('--color-text-muted', hexToRgb(themeConfig.colors.textMuted));
    root.style.setProperty('--color-primary', hexToRgb(themeConfig.colors.primary));
    root.style.setProperty('--color-primary-light', hexToRgb(themeConfig.colors.primaryLight));
    root.style.setProperty('--color-primary-dark', hexToRgb(themeConfig.colors.primaryDark));
    root.style.setProperty('--color-accent', hexToRgb(themeConfig.colors.accent));
    root.style.setProperty('--color-accent-light', hexToRgb(themeConfig.colors.accentLight));
    root.style.setProperty('--color-warning', hexToRgb(themeConfig.colors.warning));
    root.style.setProperty('--color-gradient-from', hexToRgb(themeConfig.colors.gradientFrom));
    root.style.setProperty('--color-gradient-via', hexToRgb(themeConfig.colors.gradientVia));
    root.style.setProperty('--color-gradient-to', hexToRgb(themeConfig.colors.gradientTo));
    root.style.setProperty('--color-chart-1', hexToRgb(themeConfig.colors.chartColors[0]));
    root.style.setProperty('--color-chart-2', hexToRgb(themeConfig.colors.chartColors[1]));
    root.style.setProperty('--color-chart-3', hexToRgb(themeConfig.colors.chartColors[2]));
    root.style.setProperty('--color-chart-4', hexToRgb(themeConfig.colors.chartColors[3]));
  }, [theme, mounted]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
