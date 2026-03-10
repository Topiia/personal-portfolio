'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getProfile } from '@/lib/data-loader';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export const Hero = () => {
    const profile = getProfile();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <Section id="hero" className="min-h-screen flex items-center pt-20">
            <motion.div
                className="w-full text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="mb-6 sm:mb-8 px-4"
                    variants={itemVariants}
                >
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight mb-3 sm:mb-4 text-textHeading font-outfit">
                        {profile.name}
                    </h1>
                    <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-outfit text-gradient font-bold mb-4 sm:mb-6">
                        {profile.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-textMuted max-w-2xl mx-auto font-light tracking-wide">
                        {profile.tagline}
                    </p>
                </motion.div>

                <motion.div
                    className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mb-8 sm:mb-12 px-4"
                    variants={itemVariants}
                >
                    {profile.focusAreas.map((area) => (
                        <span
                            key={area}
                            className="px-2 sm:px-3 py-1 rounded-full bg-accent/5 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-accent border border-accent/20"
                        >
                            {area}
                        </span>
                    ))}
                </motion.div>

                <motion.div
                    className="flex flex-wrap gap-3 sm:gap-4 justify-center px-4"
                    variants={itemVariants}
                >
                    {profile.ctaButtons.map((btn) => {
                        const Variant = btn.type === 'primary' ? 'primary' : btn.type === 'accent' ? 'primary' : 'outline';
                        const isExternal = btn.action === 'link';

                        if (btn.action === 'download') {
                            return (
                                <a
                                    key={btn.label}
                                    href="/resume.pdf"
                                    download="Ankit_Singh_Resume.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center min-w-[140px] sm:min-w-[180px] rounded-full min-h-[44px] text-sm sm:text-base px-6 border border-border/40 text-textPrimary hover:text-accent hover:border-accent/40 transition-all duration-300"
                                >
                                    {btn.label}
                                </a>
                            );
                        }
                        return (
                            <Button
                                key={btn.label}
                                href={btn.link}
                                variant={Variant}
                                size="lg"
                                className="min-w-[140px] sm:min-w-[180px] rounded-full min-h-[44px] text-sm sm:text-base"
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                            >
                                {btn.label}
                            </Button>
                        );
                    })}
                </motion.div>

                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    variants={itemVariants}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="p-2 rounded-full border border-border/20 backdrop-blur-sm"
                    >
                        <svg
                            className="w-5 h-5 text-textMuted/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M19 14l-7 7m0 0l-7-7"
                            />
                        </svg>
                    </motion.div>
                </motion.div>
            </motion.div>
        </Section>
    );
};
