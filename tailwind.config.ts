import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                xs: '380px', // custom: show Ask AI label text on ≥380px, icon-only below
            },
            colors: {
                background: 'var(--color-background)',
                surface: 'var(--color-surface)',
                card: 'var(--color-card)',
                border: 'var(--color-border)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                accent: 'var(--color-accent)',
                textPrimary: 'var(--color-textPrimary)',
                textHeading: 'var(--color-textPrimary)', // Alias for backward compatibility
                textMuted: 'var(--color-textMuted)',
                accentHover: 'var(--color-primary)', // Fallback for hover state
                glow: 'var(--color-glow)',
            },
            spacing: {
                section: '7.5rem', // 120px
            },
            borderRadius: {
                card: '1.5rem', // 24px
            },
            boxShadow: {
                card: '0 4px 24px rgba(0, 0, 0, 0.12)',
                'card-hover': '0 8px 32px rgba(0, 0, 0, 0.16)',
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                outfit: ['var(--font-outfit)', 'sans-serif'],
                mono: ['var(--font-mono)', 'monospace'],
            },
        },
    },
    plugins: [],
};

export default config;
