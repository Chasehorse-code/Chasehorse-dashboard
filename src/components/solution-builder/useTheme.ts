import { useState, useEffect, useCallback } from 'react';
import { ThemeId, ThemeOption } from './types';

const STORAGE_KEY = 'chasehorse_sb_theme';

export const THEME_OPTIONS: ThemeOption[] = [
  { id: 'classic', label: 'Classic', dotColor: '#ff4d12' },
  { id: 'dark', label: 'Dark Mode', dotColor: '#ff5a1f' },
  { id: 'blue', label: 'Enterprise Blue', dotColor: '#2563eb' },
  { id: 'glass', label: 'Aurora Glass', dotColor: '#7c3aed' },
];

function getInitialTheme(): ThemeId {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && (saved === 'classic' || saved === 'dark' || saved === 'blue' || saved === 'glass')) {
      return saved;
    }
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }

  return 'classic';
}

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeId>(getInitialTheme);

  const setTheme = useCallback((newTheme: ThemeId) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return {
    theme,
    setTheme,
    themesList: THEME_OPTIONS,
  };
}

