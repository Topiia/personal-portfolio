'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getNavigation } from '@/lib/data-loader';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigation = getNavigation();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [mobileMenuOpen]);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        setMobileMenuOpen(false);
        if (href.startsWith('#')) {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleMobileNavClick = (href: string) => {
        setMobileMenuOpen(false);
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
            router.push(href);
        }
    };

    return (
        <>
            <motion.nav
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                    scrolled || mobileMenuOpen
                        ? 'backdrop-blur-xl bg-surface/80 border-b border-border/10 shadow-lg shadow-black/5 py-4'
                        : 'bg-transparent py-6'
                )}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: 'circOut' }}
            >
                <div className="container mx-auto px-6 max-w-[1200px]">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-2xl font-bold bg-gradient-to-r from-textPrimary to-accent bg-clip-text text-transparent hover:from-accent hover:to-textPrimary transition-all duration-300 relative z-50"
                        >
                            {navigation.logo.text}
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navigation.mainMenu.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => handleSmoothScroll(e, item.href)}
                                    className="relative text-textMuted hover:text-textPrimary transition-colors font-medium group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                            <div className="pl-4 border-l border-border/20">
                                <ThemeToggle />
                            </div>
                        </div>

                        {/* Desktop CTA */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navigation.ctaButtons.map((btn) =>
                                btn.variant === 'icon' ? (
                                    <a key={btn.label} href={btn.href} target="_blank" rel="noopener noreferrer" className="text-textMuted hover:text-textHeading transition-all hover:scale-105">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                ) : (
                                    <Button key={btn.label} href={btn.href} variant={btn.variant === 'primary' ? 'primary' : 'outline'} size="sm">
                                        {btn.label}
                                    </Button>
                                )
                            )}
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center gap-4 relative z-50">
                            <ThemeToggle />
                            <button
                                onClick={() => setMobileMenuOpen(prev => !prev)}
                                className="text-textHeading p-2 focus:outline-none"
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {mobileMenuOpen ? (
                                        <motion.svg key="close" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </motion.svg>
                                    ) : (
                                        <motion.svg key="open" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </motion.svg>
                                    )}
                                </AnimatePresence>
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Drawer Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        className="fixed inset-0 z-40 md:hidden flex flex-col pt-[72px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Link list */}
                        <motion.nav
                            className="relative z-10 flex flex-col px-6 py-8 gap-2 overflow-y-auto"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.25, delay: 0.05 }}
                        >
                            {navigation.mainMenu.map((item, i) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => handleMobileNavClick(item.href)}
                                    className="w-full text-left py-3 px-4 text-lg font-medium text-textPrimary hover:text-accent hover:bg-accent/5 rounded-xl transition-all"
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.08 + i * 0.05 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}

                            {/* Divider */}
                            <div className="my-3 h-px bg-border/20" />

                            {/* AI Chat CTA */}
                            <motion.button
                                onClick={() => handleMobileNavClick('/ai-chat')}
                                className="w-full text-left py-3 px-4 text-lg font-semibold text-accent hover:bg-accent/10 rounded-xl transition-all flex items-center gap-3"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.08 + navigation.mainMenu.length * 0.05 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Talk With AI About Me
                            </motion.button>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
