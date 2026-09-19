import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ThemeColors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  secondaryText: string;
  border: string;
  primary: string;
  inputBackground: string;
  placeholder: string;
  tabBackground: string;
  danger: string;
  success: string;
  warning: string;
  primarySoft: string;
  successSoft: string;
  dangerSoft: string;
  warningSoft: string;
};

const lightColors: ThemeColors = {
  background: '#F1F5F9',
  surface: '#FFFFFF',
  card: '#FFFFFF',
  text: '#0F172A',
  secondaryText: '#64748B',
  border: '#CBD5E1',
  primary: '#2563EB',
  inputBackground: '#FFFFFF',
  placeholder: '#94A3B8',
  tabBackground: '#FFFFFF',
  danger: '#DC2626',
  success: '#16A34A',
  warning: '#D97706',
  primarySoft: '#DBEAFE',
  successSoft: '#DCFCE7',
  dangerSoft: '#FEE2E2',
  warningSoft: '#FEF3C7',
};

const darkColors: ThemeColors = {
  background: '#0F172A',
  surface: '#1E293B',
  card: '#1E293B',
  text: '#F8FAFC',
  secondaryText: '#94A3B8',
  border: '#475569',
  primary: '#60A5FA',
  inputBackground: '#1E293B',
  placeholder: '#64748B',
  tabBackground: '#1E293B',
  danger: '#F87171',
  success: '#4ADE80',
  warning: '#FBBF24',
  primarySoft: '#1E3A8A',
  successSoft: '#14532D',
  dangerSoft: '#450A0A',
  warningSoft: '#451A03',
};

type ThemeContextValue = {
  theme: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  const value = useMemo(
    () => ({
      theme,
      colors: theme === 'light' ? lightColors : darkColors,
      toggleTheme: () => setTheme((current) => current === 'light' ? 'dark' : 'light'),
    }),
    [theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme debe utilizarse dentro de ThemeProvider');
  return context;
}
