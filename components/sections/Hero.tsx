'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundVisual } from '@/components/ui/BackgroundVisual';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 16 },
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
            className="relative bg-paper flex flex-col justify-center overflow-hidden"
            style={{
                minHeight: '100dvh',
                paddingTop: 'calc(72px + clamp(1rem, 4dvh, 4rem))', // 72px nav + fluid padding
                paddingBottom: 'clamp(1.5rem, 4dvh, 4rem)'
            }}
        >
            {/* Background Atmosphere */}
            <BackgroundVisual
                src="/images/04-hero-atmosphere.webp"
                theme="light"
                imageType="atmospheric"
                contentAlignment="left"
                focalPosition="object-right-top"
                priority
            />

            <div className="editorial-container relative z-10 w-full flex flex-col flex-1 justify-center">
                {/* 01 / INTRO Label */}
                <motion.div
                    className="mb-[clamp(1rem,3dvh,3rem)]"
                    variants={fadeIn(0.1)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <span className="text-micro text-[rgba(21,21,21,0.40)]">
                        01 / INTRO
                    </span>
                </motion.div>

                {/* Asymmetric two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[clamp(2rem,5dvh,5rem)] items-center">
                    
                    {/* Left: large editorial type */}
                    <div className="order-last lg:order-first">
                        <motion.h1
                            className="text-display text-ink mb-[clamp(1.25rem,4dvh,2.5rem)]"
                            variants={fadeUp(0.12)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            I build systems<br />
                            that hold up<br />
                            when the interface ends.
                        </motion.h1>

                        {/* Supporting statement */}
                        <motion.p
                            className="text-[rgba(21,21,21,0.64)] text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-[540px] mb-[clamp(1.5rem,5dvh,3rem)]"
                            variants={fadeUp(0.28)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            Full-stack engineer focused on real-time systems,
                            distributed architecture, and thoughtful interfaces.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            className="flex flex-wrap items-center gap-4"
                            variants={fadeUp(0.4)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
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
                                className="inline-flex items-center gap-2 text-[0.8125rem] font-bold uppercase tracking-wide text-ink hover:text-cobalt transition-colors duration-200"
                            >
                                Ask about my work
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>

                    {/* Right: profile image prominent */}
                    <motion.div
                        className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[340px] lg:max-w-[440px] aspect-square mr-auto lg:mr-0 lg:ml-auto flex-shrink-0 order-first lg:order-last"
                        variants={fadeIn(0.15)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {/* Primary: Real profile photo as a circle/rounded prominent element */}
                        <div
                            className="relative overflow-hidden z-10 border-[6px] border-paper shadow-2xl rounded-full w-full h-full"
                        >
                            <Image
                                src="/images/01-profile.jpg"
                                alt="Ankit Singh"
                                fill
                                sizes="(max-width: 1024px) 240px, 440px"
                                className="object-cover object-top scale-105"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Bottom rule + metadata */}
                <motion.div
                    className="mt-[clamp(2rem,6dvh,5rem)] pt-[clamp(1rem,3dvh,2rem)] border-t border-[rgba(21,21,21,0.10)] flex flex-wrap gap-x-8 gap-y-3"
                    variants={fadeIn(0.5)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {[
                        { label: 'Next.js', icon: true },
                        { label: 'TypeScript', icon: true },
                        { label: 'Node.js', icon: true },
                        { label: 'Python', icon: true },
                        { label: 'PostgreSQL', icon: true },
                        { label: 'Redis', icon: true },
                        { label: 'AWS', icon: true },
                    ].map(({ label }) => (
                        <div key={label} className="text-[0.8125rem] md:text-sm font-semibold text-[rgba(21,21,21,0.7)] flex items-center gap-2">
                            {label}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
