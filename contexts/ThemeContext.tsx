'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference, default to dark if none exists
    const savedTheme = localStorage.getItem('theme') as Theme;
    const initialTheme = savedTheme || 'dark'; // Default to dark theme
    setTheme(initialTheme);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    if (theme === 'light') {
      // Light theme colors
      root.style.setProperty('--brand-primary', '#ef4444');
      root.style.setProperty('--brand-accent', '#dc2626');
      root.style.setProperty('--brand-background', '#ffffff');
      root.style.setProperty('--brand-text', '#1f2937');
      root.style.setProperty('--brand-secondary', '#6b7280');
      root.style.setProperty('--brand-card', '#f9fafb');
      root.style.setProperty('--brand-border', '#e5e7eb');
    } else {
      // Dark theme colors (default)
      root.style.setProperty('--brand-primary', '#ef4444');
      root.style.setProperty('--brand-accent', '#dc2626');
      root.style.setProperty('--brand-background', '#0f172a');
      root.style.setProperty('--brand-text', '#f8fafc');
      root.style.setProperty('--brand-secondary', '#94a3b8');
      root.style.setProperty('--brand-card', '#1e293b');
      root.style.setProperty('--brand-border', '#334155');
    }

    // Save theme preference
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {mounted ? children : <div className="min-h-screen bg-brandColorBackground" />}
    </ThemeContext.Provider>
  );
};