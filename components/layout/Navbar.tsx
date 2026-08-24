'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
    { label: 'Work', href: '#work' },
    { label: 'Experience', href: '#experience' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMobileMenuOpen(false);
        if (href.startsWith('#')) {
            e.preventDefault();
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMobileNavClick = (href: string) => {
        setMobileMenuOpen(false);
        if (href.startsWith('#')) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(href);
        }
    };

    return (
        <>
            <motion.header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                    scrolled || mobileMenuOpen
                        ? 'bg-paper/96 backdrop-blur-sm border-b border-[rgba(21,21,21,0.10)]'
                        : 'bg-transparent'
                )}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="editorial-container">
                    <div className="flex items-center justify-between" style={{ height: 'var(--nav-height)' }}>

                        {/* Wordmark */}
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="relative z-50 group"
                            aria-label="Ankit Singh — home"
                        >
                            <span className="text-[0.6875rem] font-bold tracking-[0.20em] uppercase text-ink group-hover:text-cobalt transition-colors duration-200">
                                ANKIT SINGH
                            </span>
                        </Link>

                        {/* Desktop nav */}
                        <nav className="hidden md:flex items-center gap-8" aria-label="Primary navigation">
                            {NAV_LINKS.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleSmoothScroll(e, item.href)}
                                    className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-[rgba(21,21,21,0.52)] hover:text-ink transition-colors duration-200"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>

                        {/* Desktop right actions */}
                        <div className="hidden md:flex items-center gap-5">
                            <a
                                href="https://github.com/Topiia"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[rgba(21,21,21,0.48)] hover:text-ink transition-colors duration-200"
                                aria-label="GitHub profile"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </a>
                            <a
                                href="/ai-chat"
                                id="nav-ask-cta"
                                className="btn-acid text-[0.6875rem]"
                                style={{ padding: '0.5rem 1rem', borderRadius: '14px' }}
                            >
                                Ask about the work
                            </a>
                        </div>

                        {/* Mobile: hamburger */}
                        <div className="md:hidden flex items-center gap-3 relative z-50">
                            <a
                                href="/ai-chat"
                                className="text-[0.625rem] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-[12px] bg-acid text-ink"
                            >
                                Ask
                            </a>
                            <button
                                onClick={() => setMobileMenuOpen((prev) => !prev)}
                                className="flex flex-col gap-[5px] p-1 text-ink"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {mobileMenuOpen ? (
                                        <motion.svg key="close" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }}
                                            transition={{ duration: 0.15 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                        </motion.svg>
                                    ) : (
                                        <motion.svg key="open" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            transition={{ duration: 0.15 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-drawer"
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div
                            className="absolute inset-0 bg-paper"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.nav
                            className="relative z-10 flex flex-col px-6 pt-[clamp(4rem,10dvh,6rem)] pb-[clamp(1.5rem,4dvh,2rem)] gap-0"
                            initial={{ y: -16, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ duration: 0.22, delay: 0.05 }}
                            aria-label="Mobile navigation"
                        >
                            {NAV_LINKS.map((item, i) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => handleMobileNavClick(item.href)}
                                    className="w-full text-left py-[clamp(1rem,3dvh,1.25rem)] border-b border-[rgba(21,21,21,0.10)] text-3xl font-bold text-ink hover:text-cobalt transition-colors duration-200 tracking-[-0.03em]"
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.06 + i * 0.05 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}

                            <motion.div
                                className="mt-[clamp(1.5rem,4dvh,2rem)] flex items-center justify-between"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.06 + NAV_LINKS.length * 0.05 + 0.05 }}
                            >
                                <a
                                    href="/resume.pdf"
                                    download="Ankit_Singh_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[0.6875rem] font-semibold tracking-[0.12em] uppercase text-[rgba(21,21,21,0.52)] hover:text-ink transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Resume ↗
                                </a>
                                <a
                                    href="https://github.com/Topiia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[rgba(21,21,21,0.52)] hover:text-ink transition-colors"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
