'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useTheme } from '@/components/theme/ThemeProvider';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const themes = [
        { id: 'light', icon: Sun, label: 'Light' },
        { id: 'dark', icon: Moon, label: 'Dark' },
        { id: 'girlish', icon: Sparkles, label: 'Girlish' },
    ] as const;

    return (
        <div className="relative flex items-center p-1 rounded-full bg-surface/50 border border-border/20 backdrop-blur-md">
            {themes.map((t) => {
                const isActive = theme === t.id;

                return (
                    <button
                        key={t.id}
                        onClick={() => setTheme(t.id)}
                        className={`relative z-10 flex items-center justify-center p-2 rounded-full transition-colors duration-200 ${isActive ? 'text-accent' : 'text-textMuted hover:text-textPrimary'
                            }`}
                        aria-label={`Switch to ${t.label} theme`}
                    >
                        <t.icon className="w-4 h-4" />

                        {isActive && (
                            <motion.div
                                layoutId="activeTheme"
                                className="absolute inset-0 bg-accent/10 rounded-full border border-accent/20 -z-10"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
