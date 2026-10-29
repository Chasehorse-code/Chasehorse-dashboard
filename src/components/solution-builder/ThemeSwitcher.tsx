import React from 'react';
import { motion } from 'framer-motion';
import { ThemeId, ThemeOption } from './types';

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  themes: ThemeOption[];
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  currentTheme,
  onThemeChange,
  themes,
}) => {
  return (
    <div 
      role="radiogroup" 
      aria-label="Color Theme Switcher"
      className="inline-flex items-center p-1 rounded-xl border sb-border sb-card shadow-sm gap-1"
      style={{
        background: 'var(--card)',
        borderColor: 'var(--line)',
      }}
    >
      <span className="text-[11px] font-mono font-bold tracking-wider uppercase px-2.5 hidden sm:inline-block" style={{ color: 'var(--mut)' }}>
        THEME:
      </span>
      {themes.map((t) => {
        const isActive = currentTheme === t.id;
        return (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onThemeChange(t.id)}
            className="relative px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all outline-none focus-visible:ring-2"
            style={{
              color: isActive ? 'var(--ink)' : 'var(--mut)',
            }}
          >
            {isActive && (
              <motion.div
                layoutId="activeThemePill"
                className="absolute inset-0 rounded-lg shadow-sm"
                style={{
                  background: 'var(--soft)',
                  border: '1px solid var(--acc)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span
              className="w-2.5 h-2.5 rounded-full relative z-10 shrink-0"
              style={{
                backgroundColor: t.dotColor,
                boxShadow: isActive ? `0 0 6px ${t.dotColor}` : 'none',
              }}
            />
            <span className="relative z-10 font-medium">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
};

