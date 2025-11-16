'use client';

import { useTheme } from './theme-provider';
import { themes, type ThemeName } from '@/lib/themes';

export function ThemeSwitcher() {
  const { theme: currentTheme, setTheme } = useTheme();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-card border-2 border-border rounded-xl shadow-2xl p-4 max-w-md">
        <h3 className="text-sm font-bold mb-3 text-text">
          Theme Switcher
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(themes).map(([key, t]) => (
            <button
              key={key}
              onClick={() => setTheme(key as ThemeName)}
              className={`px-3 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                currentTheme === key
                  ? 'scale-105 shadow-lg ring-2 ring-primary'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{
                backgroundColor: currentTheme === key ? t.colors.primary : t.colors.border,
                color: currentTheme === key ? '#ffffff' : t.colors.text,
              }}
              title={t.subtitle}
            >
              {t.icon} {t.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-text-muted mt-3">
          Current: <span className="font-bold text-primary">{themes[currentTheme].name}</span>
        </p>
        <p className="text-xs text-text-muted mt-1">
          Change in .env.local: NEXT_PUBLIC_THEME={currentTheme}
        </p>
      </div>
    </div>
  );
}
