'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import themeData from '@/data/theme.json';

type Theme = 'light' | 'dark' | 'girlish';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(themeData.default as Theme);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme && themeData.themes[savedTheme]) {
            setTheme(savedTheme);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Apply theme to document root
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Apply CSS variables dynamically (optional, but good for immediate updates if not using pure CSS)
        // With the data-theme attribute, we can rely on CSS selectors in globals.css
        // but explicit mapping here ensures variables are set even if CSS lags or for HMR stability.
        const colors = themeData.themes[theme];
        Object.entries(colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
        });

    }, [theme, mounted]);

    // Return children wrapped in provider even before mount to avoid SSR issues
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
