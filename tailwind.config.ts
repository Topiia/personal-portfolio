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
                xs: '380px',
            },
            colors: {
                // Editorial palette
                ink:    'var(--ink)',
                paper:  'var(--paper)',
                soft:   'var(--soft)',
                acid:   'var(--acid)',
                cobalt: 'var(--cobalt)',
                coral:  'var(--coral)',

                // Backward-compat aliases
                background:  'var(--color-background)',
                surface:     'var(--color-surface)',
                card:        'var(--color-card)',
                border:      'var(--color-border)',
                primary:     'var(--color-primary)',
                secondary:   'var(--color-secondary)',
                accent:      'var(--color-accent)',
                textPrimary: 'var(--color-textPrimary)',
                textHeading: 'var(--color-textPrimary)',
                textMuted:   'var(--color-textMuted)',
                accentHover: 'var(--color-primary)',
                glow:        'var(--color-glow)',
            },
            fontFamily: {
                sans:           ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                serif:          ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                // Legacy aliases kept for existing components
                outfit:         ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                inter:          ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
                mono:           ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
            spacing: {
                section: '7.5rem',
            },
            borderRadius: {
                card: '1.5rem',
            },
            boxShadow: {
                card:       '0 4px 24px rgba(0, 0, 0, 0.06)',
                'card-hover': '0 8px 32px rgba(0, 0, 0, 0.10)',
            },
            letterSpacing: {
                tightest: '-0.04em',
                tighter:  '-0.03em',
                tight:    '-0.02em',
            },
        },
    },
    plugins: [],
};

export default config;
