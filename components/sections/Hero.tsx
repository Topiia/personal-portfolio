'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getProfile } from '@/lib/data-loader';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, ease: 'easeOut', delay },
    },
});

export const Hero = () => {
    const profile = getProfile();

    return (
        <section
            id="hero"
            className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
        >
            {/* Workspace image — full bleed bottom strip */}
            <div className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none">
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: 'linear-gradient(to bottom, var(--color-background) 0%, transparent 40%, transparent 100%)',
                    }}
                />
                <Image
                    src="/images/ChatGPT Image Aug 12, 2026, 04_40_21 PM.png"
                    alt="Workspace"
                    fill
                    sizes="100vw"
                    className="object-cover object-center opacity-[0.18]"
                    priority={false}
                />
            </div>

            <div className="relative z-10 max-w-[1320px] mx-auto px-6 md:px-10 w-full">

                {/* Top meta row */}
                <motion.div
                    className="flex items-center justify-between mb-12 md:mb-16"
                    variants={fadeIn(0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    <span className="mono-label">
                        Full Stack Developer
                    </span>
                    <span className="mono-label">
                        India — {new Date().getFullYear()}
                    </span>
                </motion.div>

                {/* Main layout — asymmetric two-column on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-start">

                    {/* Left: Text block */}
                    <div>
                        {/* Name */}
                        <motion.h1
                            className="font-outfit font-bold text-[var(--color-textPrimary)] leading-[0.92] tracking-[-0.04em] mb-6"
                            style={{ fontSize: 'clamp(3.5rem, 10.5vw, 9rem)' }}
                            variants={fadeUp(0.15)}
                            initial="hidden"
                            animate="visible"
                        >
                            ANKIT<br />SINGH
                        </motion.h1>

                        {/* Positioning statement */}
                        <motion.p
                            className="text-[var(--color-textMuted)] text-lg md:text-xl font-light leading-relaxed max-w-[520px] mb-10"
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate="visible"
                        >
                            Building systems across interfaces,<br className="hidden md:block" />
                            backend, data and real-time applications.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-wrap items-center gap-3"
                            variants={fadeUp(0.42)}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Explore Work — outline */}
                            <a
                                href="#projects"
                                id="hero-explore-work"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border)] text-[var(--color-textPrimary)] text-sm font-medium hover:border-[var(--color-textMuted)] transition-colors duration-300 rounded-sm"
                            >
                                Explore Work
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M7 2L7 12M7 12L3 8M7 12L11 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            {/* Ask Ankit — accent fill */}
                            <a
                                href="/ai-chat"
                                id="hero-ask-ankit"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[var(--color-button-text)] text-sm font-bold tracking-wide hover:opacity-90 transition-opacity duration-200 rounded-sm"
                                style={{ fontFamily: 'var(--font-mono)' }}
                            >
                                <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                                Ask Ankit
                            </a>

                            {/* Resume text link */}
                            <a
                                href="/resume.pdf"
                                download="Ankit_Singh_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mono-label text-[var(--color-textMuted)] hover:text-[var(--color-textPrimary)] transition-colors flex items-center gap-1 pl-1"
                            >
                                Resume ↗
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: Profile photo */}
                    <motion.div
                        className="hidden md:block flex-shrink-0"
                        variants={fadeIn(0.5)}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="relative w-[200px] h-[200px] lg:w-[240px] lg:h-[240px]">
                            {/* Subtle accent border ring */}
                            <div
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: 'conic-gradient(from 0deg, var(--color-accent) 0%, transparent 40%, transparent 100%)',
                                    padding: '2px',
                                    borderRadius: '50%',
                                }}
                            >
                                <div className="w-full h-full rounded-full bg-[var(--color-background)]" />
                            </div>
                            <div className="absolute inset-[3px] rounded-full overflow-hidden">
                                <Image
                                    src="/images/ChatGPT Image Aug 12, 2026, 04_57_06 PM.png"
                                    alt="Ankit Singh"
                                    fill
                                    sizes="240px"
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom stats row */}
                <motion.div
                    className="mt-16 md:mt-20 pt-8 border-t border-[var(--color-rule)] flex flex-wrap gap-x-10 gap-y-4"
                    variants={fadeIn(0.58)}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { label: 'Focus', value: 'Full Stack + Data' },
                        { label: 'Stack', value: 'Next.js · Node.js · Python' },
                        { label: 'Status', value: 'Open to Opportunities' },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <span className="mono-label">{label}</span>
                            <span className="text-sm text-[var(--color-textPrimary)] font-medium">{value}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-1.5"
                >
                    <div className="w-px h-8 bg-gradient-to-b from-transparent to-[var(--color-textMuted)] opacity-40" />
                </motion.div>
            </motion.div>
        </section>
    );
};
