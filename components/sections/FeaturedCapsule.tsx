'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CapsuleArchitectureDiagram } from '@/components/ui/CapsuleArchitectureDiagram';

const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
});

const CAPSULE_EVIDENCE = [
    '45+ REST endpoints',
    'JWT rotation + reuse detection',
    'HttpOnly cookie authentication',
    'Redis cache-aside strategy',
    'Bull queue system + workers',
    'AI moderation pipeline (Groq)',
    'Dead-letter queue (DLQ)',
    'Prometheus + Sentry observability',
    '162 passing unit & integration tests',
    'Correlation ID request tracing',
];

export const FeaturedCapsule = () => {
    return (
        <section id="capsule" className="bg-ink section-pad-lg" aria-label="Capsule flagship project">
            <div className="editorial-container">

                {/* Header row */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end mb-14 md:mb-20 pb-7 border-b border-[rgba(243,240,232,0.10)]"
                    variants={fadeUp(0)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <div>
                        <span className="text-micro text-[rgba(200,255,56,0.65)] block mb-4">
                            FLAGSHIP PROJECT
                        </span>
                        <h2
                            className="text-paper font-bold tracking-[-0.04em] leading-[0.92] mb-5"
                            style={{ fontSize: 'clamp(2.75rem, 7vw, 6rem)' }}
                        >
                            CAPSULE
                        </h2>
                        <p className="text-[rgba(243,240,232,0.60)] text-lg md:text-xl leading-relaxed max-w-[600px]">
                            Secure AI-moderated visual vlogging platform with
                            security-first architecture, async processing pipelines,
                            and production observability.
                        </p>
                    </div>
                    <div className="flex flex-col gap-3 md:items-end md:pb-2">
                        <span className="text-micro text-[rgba(200,255,56,0.55)]">Production-Ready</span>
                        <span className="text-micro text-[rgba(243,240,232,0.28)]">Senior Complexity</span>
                    </div>
                </motion.div>

                {/* Engineering thesis */}
                <motion.div
                    className="mb-16 md:mb-20"
                    variants={fadeUp(0.08)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <p
                        className="text-paper font-semibold tracking-[-0.025em] leading-[1.12] max-w-[860px]"
                        style={{ fontSize: 'clamp(1.25rem, 2.5vw, 2rem)' }}
                    >
                        The challenge was not making features work.
                        It was building the security perimeter, async processing,
                        and observability infrastructure that makes a content
                        platform <span className="font-serif-accent text-acid">trustworthy at scale.</span>
                    </p>
                </motion.div>

                {/* Evidence grid */}
                <motion.div
                    className="mb-16 md:mb-20"
                    variants={fadeUp(0.14)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(243,240,232,0.35)] block mb-6">Technical evidence</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-[rgba(243,240,232,0.08)]">
                        {CAPSULE_EVIDENCE.map((item) => (
                            <div
                                key={item}
                                className="bg-ink px-4 py-4 text-[0.75rem] font-medium text-[rgba(243,240,232,0.55)] leading-snug hover:text-paper hover:bg-[rgba(243,240,232,0.04)] transition-colors duration-200"
                            >
                                {item}
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Architecture diagram */}
                <motion.div
                    className="mb-14 md:mb-16"
                    variants={fadeUp(0.2)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <span className="text-micro text-[rgba(243,240,232,0.35)] block mb-6">System architecture</span>
                    <CapsuleArchitectureDiagram />
                </motion.div>

                {/* Links */}
                <motion.div
                    className="flex flex-wrap items-center gap-4"
                    variants={fadeUp(0.26)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-60px' }}
                >
                    <Link href="/projects/capsule" className="btn-acid">
                        Full case study
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                    <a
                        href="https://github.com/Topiia/Capsule"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-ghost-ink"
                    >
                        GitHub ↗
                    </a>
                    <a
                        href="https://capsule.topiiaa.site"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.8125rem] font-semibold text-[rgba(243,240,232,0.42)] hover:text-paper transition-colors duration-200"
                    >
                        Live site ↗
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
