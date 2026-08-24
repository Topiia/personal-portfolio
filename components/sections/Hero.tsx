'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 32 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
    },
});

const fadeIn = (delay = 0) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.7, ease: 'easeOut', delay },
    },
});

export const Hero = () => {
    return (
        <section
            id="hero"
            className="relative bg-paper min-h-[90svh] flex flex-col justify-center overflow-hidden pt-[72px]"
        >
            <div className="editorial-container relative z-10 w-full">
                {/* Top meta row */}
                <motion.div
                    className="flex items-center justify-between mb-10 md:mb-16"
                    variants={fadeIn(0.1)}
                    initial="hidden"
                    animate="visible"
                >
                    <span className="text-micro text-[rgba(21,21,21,0.40)]">
                        Full Stack Engineer
                    </span>
                    <span className="text-micro text-[rgba(21,21,21,0.40)]">
                        India — {new Date().getFullYear()}
                    </span>
                </motion.div>

                {/* Asymmetric two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-20 items-start">

                    {/* Left: large editorial type */}
                    <div>
                        <motion.h1
                            className="text-ink leading-[0.88] tracking-[-0.045em] font-bold mb-8"
                            style={{ fontSize: 'clamp(3.75rem, 11vw, 9rem)' }}
                            variants={fadeUp(0.12)}
                            initial="hidden"
                            animate="visible"
                        >
                            I build systems<br />
                            <span className="font-serif-accent" style={{ fontSize: '0.88em' }}>
                                that hold up
                            </span><br />
                            when the interface<br />ends.
                        </motion.h1>

                        {/* Supporting statement */}
                        <motion.p
                            className="text-[rgba(21,21,21,0.56)] text-lg md:text-xl font-normal leading-relaxed max-w-[480px] mb-10"
                            variants={fadeUp(0.28)}
                            initial="hidden"
                            animate="visible"
                        >
                            Full-stack engineering across backend architecture,
                            real-time systems, distributed infrastructure, and
                            AI-powered services.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4"
                            variants={fadeUp(0.4)}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Primary — ACID */}
                            <a
                                href="#work"
                                id="hero-view-work"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="btn-acid"
                            >
                                View selected work
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            {/* Secondary — text link */}
                            <a
                                href="/ai-chat"
                                id="hero-ask-work"
                                className="inline-flex items-center gap-2 text-[0.8125rem] font-semibold text-ink hover:text-cobalt transition-colors duration-200 underline underline-offset-4 decoration-[rgba(21,21,21,0.25)] hover:decoration-cobalt"
                            >
                                Ask about my work
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            {/* Tertiary — resume */}
                            <a
                                href="/resume.pdf"
                                download="Ankit_Singh_Resume.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[0.6875rem] font-semibold tracking-[0.10em] uppercase text-[rgba(21,21,21,0.40)] hover:text-ink transition-colors duration-200 pl-1"
                            >
                                Resume ↗
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: landscape image element */}
                    <motion.div
                        className="hidden lg:block relative w-[340px] xl:w-[400px] flex-shrink-0 self-center"
                        variants={fadeIn(0.55)}
                        initial="hidden"
                        animate="visible"
                    >
                        <div
                            className="relative overflow-hidden"
                            style={{ borderRadius: '28px', aspectRatio: '3/4' }}
                        >
                            <Image
                                src="/images/ChatGPT Image Aug 24, 2026, 12_51_46 PM.png"
                                alt="Atmospheric landscape — visual counterweight"
                                fill
                                sizes="(max-width: 1280px) 340px, 400px"
                                className="object-cover object-center"
                                priority
                            />
                            {/* Subtle warm overlay to blend with PAPER */}
                            <div
                                className="absolute inset-0"
                                style={{ background: 'linear-gradient(135deg, rgba(243,240,232,0.10) 0%, transparent 60%)' }}
                            />
                        </div>
                        {/* Small editorial label below image */}
                        <p className="text-micro text-[rgba(21,21,21,0.36)] mt-3 text-right">
                            Available for opportunities
                        </p>
                    </motion.div>
                </div>

                {/* Bottom rule + metadata */}
                <motion.div
                    className="mt-14 md:mt-20 pt-7 border-t border-[rgba(21,21,21,0.10)] flex flex-wrap gap-x-10 gap-y-4"
                    variants={fadeIn(0.55)}
                    initial="hidden"
                    animate="visible"
                >
                    {[
                        { label: 'Focus', value: 'Full Stack + Data' },
                        { label: 'Stack', value: 'Next.js · Node.js · Python' },
                        { label: 'Status', value: 'Open to opportunities' },
                    ].map(({ label, value }) => (
                        <div key={label} className="flex flex-col gap-1">
                            <span className="text-micro text-[rgba(21,21,21,0.36)]">{label}</span>
                            <span className="text-sm font-medium text-ink">{value}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-[clamp(1.25rem,5vw,5rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.0, duration: 1 }}
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
                >
                    <div className="w-px h-10 bg-gradient-to-b from-transparent to-[rgba(21,21,21,0.28)]" />
                </motion.div>
            </motion.div>
        </section>
    );
};
