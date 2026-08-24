'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundVisual } from '@/components/ui/BackgroundVisual';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

export const AboutSection = () => {
    return (
        <section id="about" className="relative bg-ink section-pad-lg overflow-hidden" aria-label="About Ankit Singh">
            {/* Background Image */}
            <BackgroundVisual
                src="/images/06-about-atmosphere.webp"
                alt="Atmospheric visual — engineering workspace"
                theme="dark"
                imageType="atmospheric"
                contentAlignment="left"
                focalPosition="object-center"
            />

            <div className="relative z-10 editorial-container">
                {/* Header */}
                <motion.div
                    className="mb-[clamp(2.5rem,5dvh,5rem)] pb-[clamp(1rem,3dvh,1.5rem)] border-b border-[rgba(243,240,232,0.15)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    <span className="text-micro text-[rgba(243,240,232,0.50)] block mb-[clamp(0.5rem,1.5dvh,0.75rem)]">
                        08 / ABOUT
                    </span>
                </motion.div>

                <div className="max-w-[640px]">
                    <motion.h2
                        className="text-paper font-bold tracking-[-0.04em] leading-[0.94] mb-[clamp(1.5rem,3dvh,2rem)]"
                        style={{ fontSize: 'clamp(2.25rem, min(5vw, 7dvh), 4.25rem)' }}
                        variants={fadeUp(0.06)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        The kind of engineer
                        <br />
                        <span className="font-serif-accent text-[rgba(243,240,232,0.60)]" style={{ fontSize: '0.82em' }}>
                            who reads the whole stack.
                        </span>
                    </motion.h2>

                    <motion.div
                        className="space-y-[clamp(1rem,2.5dvh,1.25rem)] text-[rgba(243,240,232,0.70)] text-[1.0625rem] leading-relaxed"
                        variants={fadeUp(0.12)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <p>
                            I&apos;m a Full Stack Engineer focused on building systems that are
                            reliable, secure, and well-considered — not just functional.
                            My strongest work sits at the intersection of backend architecture,
                            real-time systems, and thoughtful product interfaces.
                        </p>
                        <p>
                            I gravitate toward problems that involve distributed state,
                            security boundaries, async processing, and high-correctness
                            environments. I care about production readiness: observability,
                            error boundaries, graceful degradation, and meaningful
                            instrumentation — not just features shipping.
                        </p>
                        <p>
                            Currently interested in backend engineering, platform/infrastructure
                            roles, and full-stack positions where depth matters.
                            Based in India, open to remote opportunities.
                        </p>
                    </motion.div>

                    {/* Quick facts */}
                    <motion.div
                        className="mt-[clamp(1.5rem,3.5dvh,2.5rem)] grid grid-cols-2 gap-[clamp(1rem,2.5dvh,1.25rem)] max-w-[480px]"
                        variants={fadeUp(0.18)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        {[
                            { label: 'Location', value: 'India' },
                            { label: 'Status', value: 'Open to opportunities' },
                            { label: 'Focus', value: 'Backend + Full Stack' },
                            { label: 'Stack', value: 'Node.js · Python · Next.js' },
                        ].map(({ label, value }) => (
                            <div key={label}>
                                <span className="text-micro text-[rgba(243,240,232,0.40)] block mb-1">{label}</span>
                                <span className="text-[0.9375rem] font-medium text-paper">{value}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        className="mt-[clamp(1.5rem,3.5dvh,2.5rem)] flex flex-wrap gap-[clamp(0.75rem,2dvh,1rem)]"
                        variants={fadeUp(0.22)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                    >
                        <a
                            href="/resume.pdf"
                            download="Ankit_Singh_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-acid"
                        >
                            Download resume ↗
                        </a>
                        <a
                            href="https://github.com/Topiia"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-ghost"
                            style={{ borderColor: 'rgba(243,240,232,0.2)', color: 'var(--paper)' }}
                        >
                            GitHub ↗
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
